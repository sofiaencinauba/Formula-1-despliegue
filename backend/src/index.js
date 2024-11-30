const express = require('express')
const app = express()
const port = 3000

let pilotos = []

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/api/v1/pilotos', (req, res) => {
    res.json(pilotos)
})

app.get('/api/v1/pilotos/:id', (req, res) => {
    const piloto = pilotos.find(piloto => piloto.id === parseInt(req.params.id))
    if(piloto === undefined) {
        res.sendStatus(404)
        return
    }
    res.json(piloto)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})