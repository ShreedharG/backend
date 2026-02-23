import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { User } from '../models/user.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

const generateAccessAndRefreshTokens = async(userId)=>{
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false});

        return { accessToken, refreshToken};

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating tokens");
    }
}

const registerUser = asyncHandler( async(req, res) => {
    // get user details from frontend
    // validation - not empty
    // check if user already exists - by username, email
    // check for images, check for avatar
    // upload to cloudinary if any
    // create user object 
    // remove password, refresh token from response
    // check for user creation success/failure
    // return response

    const {fullName, email, username, password} = req.body

    // check for empty fields
    if (
        [fullName, email, username, password].some((field) => !field || field?.trim() === "")
    ){
        throw new ApiError(400, "All fields are required");
    }

    // check if user already exists
    const existedUser = await User.findOne({
        $or: [{ username },{ email }]
    })

    if (existedUser){
        throw new ApiError(409, "User with given username or email already exists");
    }

    // check for images
    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

    let avatar, coverImage;
    
    if(avatarLocalPath){
        avatar = await uploadOnCloudinary(avatarLocalPath);
    }

    if(coverImageLocalPath){
        coverImage = await uploadOnCloudinary(coverImageLocalPath);
    }

    const user = await User.create({
        fullName: fullName,
        avatar: avatar?.url || "",
        coverImage: coverImage?.url || "",
        email: email,
        username: username.toLowerCase(),
        password: password,
    });

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if( !createdUser ){
        throw new ApiError(500, "Something went wrong while registering user");
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    );
})

const loginUser = asyncHandler ( async (req, res) => {
    // get email/username, password from frontend
    // validation - not empty feilds
    // find the user  - check for db
    // if user found : password check
    // if password correct : generate access token, refresh token
    // send cookie to save refresh token

    const {email, username, password} = req.body;
    if(!username && !email){
        throw new ApiError(400, "Email or username is required");
    }

    const user = await User.findOne({
        $or: [{username}, {email}]
    })

    if(!user){
        throw new ApiError(404, "User doesn't exist");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if(!isPasswordValid){
        throw new ApiError(401, "Invalid user credentials");
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id);

    const loggedInUser = await User.findById(user._id).select(" -password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(200,{
                    user: loggedInUser,
                    accessToken,
                    refreshToken
                },
                "User logged in successfully")
            )
});

const logoutUser = asyncHandler( async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
            .status(200)
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .json( new ApiResponse(200,{},"User logged out"))
});

export { registerUser, loginUser, logoutUser };