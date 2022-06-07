const express = require('express')
const app = express()
const cors = require('cors')
const fs = require('fs')
const PORT = 8000

app.use(cors())

let rawData = fs.readFileSync("champions.json")
let champions = JSON.parse(rawData)

console.log(champions)

app.get('/', (request,response)=>{
    response.sendFile(__dirname + '/index.html')
})

app.get('/api/:name', (request,response)=>{
    const championName = request.params.name.toLowerCase()
    if( champions[championName] ){
        response.json(champions[championName]) 
    }else{
        response.json(champions['unknown'])
    }
})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`The server is running on port ${PORT}`)
})