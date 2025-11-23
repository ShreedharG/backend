import express from 'express';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

const port =  process.env.PORT || 4000; 

app.get('/api/jokes', (req,res) => {
    const jokes = [
        {
            id : 1,
            title : 'joke1',
            content : 'First Joke'
        },
        {
            id : 2,
            title : 'joke2',
            content : 'First Joke'
        },
        {
            id : 3,
            title : 'joke3',
            content : 'First Joke'
        },
        {
            id : 4,
            title : 'joke4',
            content : 'First Joke'
        },
        {
            id : 5,
            title : 'joke5',
            content : 'First Joke'
        }
    ];
    res.send(jokes);
});


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/linkedin', (req, res) => {
    res.send('shreedharlinkedin')
})

app.get('/login', (req, res) => {
    res.send('<h1>Please login to our page</h1>')
})

app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`)
})