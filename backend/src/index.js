const { PrismaClient } = require('@prisma/client')
const express = require('express')
const app = express()
const port = 3000

const prisma = new PrismaClient()

// let pilotos = [{
//     "id": 1,
//     "nombre": "Lewis Hamilton",
//     "escuderia": "Mercedes",
//     "numero": 44,
//     "nacionalidad": "Reino Unido"
// }]

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Formula1 app')
})

app.get('/api/v1/pilotos', async(req, res) => {
    // let pilotos = []
    // res.json(pilotos)

    // find many es como hacer un select*
    const pilotos = await prisma.piloto.findMany()
    res.json(pilotos)
})

app.get('/api/v1/pilotos/:id', async (req, res) => {
    const piloto = await prisma.piloto.fidUnique({
        where: {
            id: parseInt(req.params.id)
        }
    })

    if(piloto === null) {
        res.sendStatus(404)
        return
    }
    res.json(piloto)
})

app.post('/api/v1/pilotos', async(req, res) => {
    const piloto = await prisma.piloto.create({
        data: {
            nombre: req.body.nombre,
            numero: req.body.numero,
            nacionalidad: req.body.nacionalidad
        }
    })
    res.status(201).send(piloto)

})

app.delete('/api/v1/pilotos/:id', async (req, res) => {
    const piloto = await prisma.piloto.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    })

    if (piloto === null) {
        res.sendStatus(404)
        return
    }

    await prisma.piloto.delete({
        where: {
            id: parseInt(req.params.id)
        }
    })

    res.send(piloto)
})

app.get('/api/v1/carreras', async(req, res) => {
    const carreras = await prisma.carrera.findMany()
    res.json(carreras)
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})