const { PrismaClient } = require('@prisma/client')
const express = require('express')
const app = express()
const port = 3000

const prisma = new PrismaClient()

app.use(express.json())

async function seed() {
	const mercedes = await prisma.escuderia.create({
		data: {
			nombre_escuderia: "Mercedes",
			puntos_escuderia: 100,
			pais_escuderia: "Alemania",
			anio_creacion_escuderia: 1984,
			pilotos: {
				create: [
					{
						nombre_piloto: "Lewis Hamilton",
						nacionalidad_piloto: "Reino Unido",
						edad_piloto: 39,
						puntos_piloto: 20,
					}
				]
			}
		}
	})

	const ferrari = await prisma.escuderia.create({
		data: {
			nombre_escuderia: "Ferrari",
			puntos_escuderia: 450,
			pais_escuderia: "Italia",
			anio_creacion_escuderia: 1929,
			pilotos: {
				create: [
					{
						nombre_piloto: "Charles Leclerc",
						nacionalidad_piloto: "Mónaco",
						edad_piloto: 26,
						puntos_piloto: 23,
					}
				]
			}
		}
	})

	const carrera1 = await prisma.carreras.create({
		data: {
			nombre_carrera: 'Gran Premio de Mónaco',
			pais_carrera: 'Mónaco',
			fecha_carrera: new Date('2024-05-26'),
			id_piloto_ganador: 1,
			id_escuderia_ganadora: mercedes.id_escuderia
		}
	})

	const carrera2 = await prisma.carreras.create({
		data: {
			nombre_carrera: 'Gran Premio de Italia',
			pais_carrera: 'Italia',
			fecha_carrera: new Date('2024-09-08'),
			id_piloto_ganador: 2,
			id_escuderia_ganadora: ferrari.id_escuderia
		}
	})

	console.log('Datos de Escuderías, Pilotos y Carreras insertados correctamente.')
}

seed().catch(e => {
	console.error(e)
	process.exit(1)
})

app.get('/', (req, res) => {
	res.send('Formula1 app')
})

app.get('/api/v1/pilotos', async (req, res) => {
	const pilotos = await prisma.piloto.findMany({
		include: {
			escuderia: true,
		}
	})
	res.json(pilotos)
})

app.get('/api/v1/pilotos/:id', async (req, res) => {
	const piloto = await prisma.piloto.findUnique({
		where: {
			id_piloto: parseInt(req.params.id)
		},
		include: {
			escuderia: true,
		}
	})

	if (piloto === null) {
		res.sendStatus(404)
		return
	}
	res.json(piloto)
})

app.post('/api/v1/pilotos', async (req, res) => {
	const piloto = await prisma.piloto.create({
		data: {
			nombre_piloto: req.body.nombre,
			nacionalidad_piloto: req.body.nacionalidad,
			edad_piloto: req.body.edad,
			puntos_piloto: req.body.puntos,
			id_escuderia: req.body.escuderia_id,
		}
	})
	res.status(201).send(piloto)
})

app.get('/api/v1/carreras', async (req, res) => {
	const carreras = await prisma.carreras.findMany({
		include: {
			piloto_ganador: true,
			escuderia_ganadora: true,
		}
	})
	res.json(carreras)
})

app.get('/api/v1/carreras/:id', async (req, res) => {
	const carrera = await prisma.carreras.findUnique({
		where: {
			id_carrera: parseInt(req.params.id)
		},
		include: {
			piloto_ganador: true,
			escuderia_ganadora: true,
		}
	})

	if (carrera === null) {
		res.sendStatus(404)
		return
	}
	res.json(carrera)
})

app.listen(port, () => {
	console.log(`Formula1 app listening on port ${port}`)
})
