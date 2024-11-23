const express = require('express')
var cors = require('cors')
const escuderia = require('./rutas/Escuderia')
const piloto = require('./rutas/Piloto')
const historia = require('./rutas/Historia')
const carreras = require('./rutas/Carreras')
const app = express()
const puerto = 5000

app.use(express.json())
app.use(cors())

app.get('/', (req,res) => {
    res.send('Pagina Formula 1')
})

app.use('/api/v1/Escuderia', escuderia)
app.use('/api/v1/Piloto', piloto)
app.use('/api/v1/Historia', historia)
app.use('/api/v1/Carreras', carreras)

app.listen(port, () => {
    console.log(`Aplicacion de formula 1 en el puerto ${puerto}`)
})