const express = require('express')
const app = express()
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient
const PORT = 8000
require('dotenv').config()

app.use(cors())

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'posts'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true})
    .then(client => {
        console.log(`Connected to ${dbName} database`)
        db = client.db(dbName)
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

let michigan = [{
    'sport': 'football',
    'mascot': 'wolverines',
    'conference': 'Big Ten'
    },
    {
    'sport': 'basketball',
     'mascot': 'wolverines',
    'conference': 'Big Ten'
    },
    {
    'sport': 'hockey',
    'mascot': 'wolverines',
    'conference': 'Big Ten'
        }
]

app.get('/', (request, response) => {
    db.collection('posts').find().toArray()
    .then(data => {
        response.render('index.ejs', {info: data})
    })
})

app.post('/addPlayer', (request, response) => {
    db.collection('posts').insertOne({
        playerName: request.body.playerName,
        sportName: request.body.sportName,
        schoolName: request.body.schoolName
    })
    .then(result => [
        console.log('player added'),
        response.redirect('/')
    ])
})

app.get('/api/michigan', (request, response)=>{
    response.json(michigan)
})

app.listen(PORT, ()=> {
    console.log(`server running on port ${PORT}`)
})