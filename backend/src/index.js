const { PrismaClient } = require('@prisma/client')
const express = require('express')
const app = express()
const port = 3000

const prisma = new PrismaClient()

app.use(express.json())

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
	const { nombre_piloto, nacionalidad_piloto, edad_piloto, puntos_piloto, 
			posicion_piloto, id_escuderia } = req.body

	if (!nombre_piloto || !nacionalidad_piloto || !edad_piloto || !puntos_piloto || 
		!posicion_piloto || !id_escuderia) {
		return res.status(400).send({ 
			error: 'Todos los campos son obligatorios.' 
		})
	}

	try {
		const piloto = await prisma.piloto.create({
			data: {
				nombre_piloto,
				nacionalidad_piloto,
				edad_piloto,
				puntos_piloto,
				posicion_piloto,
				id_escuderia,
			}
		})
		res.status(201).send(piloto)
	} catch (error) { 
		res.status(500).send({ 
			error: 'Error al crear el piloto' 
		}) 
	}
})

app.put('/api/v1/pilotos/:id', async (req, res) => {
	try { 
		let piloto = await prisma.piloto.findUnique({ 
			where: { 
				id_piloto: parseInt(req.params.id) 
			} 
		}) 
		if (piloto === null) {
			return res.status(404).send({ 
				error: 'Piloto no encontrado' 
			}) 
		}
	  	piloto = await prisma.piloto.update({
	    	where: { 
				id_piloto: parseInt(req.params.id)
			},
	    	data: { 
				nombre_piloto: req.body.nombre_piloto,
				nacionalidad_piloto: req.body.nacionalidad_piloto,
				edad_piloto: req.body.edad_piloto,
				puntos_piloto: req.body.puntos_piloto,
				id_escuderia: req.body.id_escuderia
			}
	 	})
	  	res.json(piloto)
	} catch (error) { 
		res.status(500).send({ 
			error: 'Error al actualizar el piloto'
		}) 
	}
})

app.delete('/api/v1/pilotos/:id', async (req, res) => {
	try { 
		const piloto_exist = await prisma.piloto.findUnique({ 
			where: { 
				id_piloto: parseInt(req.params.id) 
			} 
		}) 
		if (piloto_exist === null) {
			return res.status(404).send({ 
				error: 'Piloto no encontrado' 
			}) 
		}
	
		const piloto = await prisma.piloto.delete({
	    	where: {
	      		id_piloto: parseInt(req.params.id)
	    	}
	  	})
	  	res.json(piloto)
	} catch (error) { 
		res.status(500).send({ 
			error: 'Error al eliminar el piloto' 
		}) 
	}
})

/*app.get('/api/v1/carreras', async (req, res) => {
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

app.delete('/api/v1/carreras/:id', async (req, res) => {
	try { 
		const carrera_exist = await prisma.carreras.findUnique({ 
			where: { 
				id_carrera: parseInt(req.params.id) 
			} 
		}) 
		if (carrera_exist === null) {
			return res.status(404).send({ 
				error: 'Carrera no encontrada'
			}) 
		}
	
		const carrera = await prisma.carreras.delete({
	    	where: {
	      		id_carrera: parseInt(req.params.id)
	    	}
	  	})
	  	res.json(carrera)
	} catch (error) { 
		res.status(500).send({ 
			error: 'Error al eliminar la carrera'
		}) 
	}
})
*/

app.get('/api/v1/escuderias', async (req, res) => {
	const escuderias = await prisma.escuderia.findMany({
		include: {
			pilotos: true
		}
	})
	res.json(escuderias)
})

app.get('/api/v1/escuderias/:id', async (req, res) => {
	const escuderia = await prisma.escuderia.findUnique({
		where: {
			id_escuderia: parseInt(req.params.id)
		},
		include: {
			pilotos: true
		}
	})

	if (escuderia === null) {
		res.sendStatus(404)
		return
	}
	res.json(escuderia)
})

app.post('/api/v1/escuderias', async (req, res) => {
	const { nombre_escuderia, puntos_escuderia, pais_escuderia, 
			anio_creacion_escuderia, posicion_escuderia } = req.body

	if (!nombre_escuderia || !puntos_escuderia || !pais_escuderia || !anio_creacion_escuderia ||
		 !posicion_escuderia) {
		return res.status(400).send({ 
			error: 'Todos los campos son obligatorios.' 
		})
	}

	try {
		const escuderia = await prisma.escuderia.create({
			data: {
				nombre_escuderia,
				puntos_escuderia,
				pais_escuderia,
				anio_creacion_escuderia,
				posicion_escuderia
			}
		})
		res.status(201).send(escuderia)
	} catch (error) { 
		res.status(500).send({ 
			error: 'Error al crear la escuderia' 
		}) 
	}
})

app.put('/api/v1/escuderias/:id', async (req, res) => {
	try { 
		let escuderia = await prisma.escuderia.findUnique({ 
			where: { 
				id_escuderia: parseInt(req.params.id) 
			} 
		}) 
		if (escuderia === null) {
			return res.status(404).send({ 
				error: 'Escuderia no encontrada' 
			}) 
		}
	  	escuderia = await prisma.escuderia.update({
	    	where: { 
				id_escuderia: parseInt(req.params.id)
			},
	    	data: { 
				nombre_escuderia: req.body.nombre_escuderia,
				puntos_escuderia: req.body.puntos_escuderia,
				pais_escuderia: req.body.pais_escuderia,
				anio_creacion_escuderia: req.body.anio_creacion_escuderia,
				posicion_escuderia: req.body.posicion_escuderia
			}
	 	})
	  	res.json(escuderia)
	} catch (error) { 
		res.status(500).send({ 
			error: 'Error al actualizar la escuderia'
		}) 
	}
})

app.delete('/api/v1/escuderias/:id', async (req, res) => {
	try { 
		const escuderia_exist = await prisma.escuderia.findUnique({ 
			where: { 
				id_escuderia: parseInt(req.params.id) 
			} 
		}) 
		if (escuderia_exist === null) {
			return res.status(404).send({ 
				error: 'Escuderia no encontrada' 
			}) 
		}
	
		const escuderia = await prisma.escuderia.delete({
	    	where: {
	      		id_escuderia: parseInt(req.params.id)
	    	}
	  	})
	  	res.json(escuderia)
	} catch (error) { 
		res.status(500).send({ 
			error: 'Error al eliminar la escuderia' 
		}) 
	}
})

app.listen(port, () => {
	console.log(`Formula1 app listening on port ${port}`)
})
