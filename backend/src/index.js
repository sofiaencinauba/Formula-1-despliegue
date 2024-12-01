const express = require('express')
const app = express()
const port = 3000

let pilotos = [{
    "id": 1,
    "nombre": "Lewis Hamilton",
    "escuderia": "Mercedes",
    "numero": 44,
    "nacionalidad": "Reino Unido"
}]

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/api/v1/pilotos', (req, res) => {
    let pilotos = []
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

app.get('/api/v1/carreras', async(req, res) => {
    const carreras = await prisma.carrera.findMany()
    res.json(carreras)
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})