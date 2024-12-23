mostrar_escuderias = function () {
	fetch('http://127.0.0.1:3000/api/v1/escuderias')
		.then(response => response.json())
		.then(escuderias => {
			console.log(escuderias);

			let contenedor_tarjetas = document.getElementById('contenedor-tarjetas');
			contenedor_tarjetas.innerHTML = '';

			if (!contenedor_tarjetas) {
				console.error("No se encontró un elemento con ese ID");
				return;
			}

			escuderias.forEach(escuderia => {
				let tarjeta = document.createElement('div');
				tarjeta.className = 'tarjeta';

				let titulo = document.createElement('h2');
				titulo.textContent = escuderia.nombre_escuderia;
				tarjeta.appendChild(titulo);

				let id = document.createElement('p');
				id.textContent = `ID: ${escuderia.id_escuderia}`;
				tarjeta.appendChild(id);

				let puntos = document.createElement('p');
				puntos.textContent = `Puntos: ${escuderia.puntos_escuderia || '0'}`;
				tarjeta.appendChild(puntos);

				let pais = document.createElement('p');
				pais.textContent = `País: ${escuderia.pais_escuderia}`;
				tarjeta.appendChild(pais);

				let anio = document.createElement('p');
				anio.textContent = `Año: ${escuderia.anio_creacion_escuderia}`;
				tarjeta.appendChild(anio);

				let posicion = document.createElement('p');
				posicion.textContent = `Posición: ${escuderia.posicion_escuderia}`;
				tarjeta.appendChild(posicion);

				let boton = document.createElement('button');
				boton.className = 'boton_borrar';
				boton.textContent = 'Borrar';
				boton.onclick = function () {
					eliminar_escuderia(escuderia.id_escuderia);
				};
				tarjeta.appendChild(boton);

				contenedor_tarjetas.appendChild(tarjeta);
			});
		})

		.catch(error => {
			console.error('Error al obtener las escuderías:', error);
		});

};

eliminar_escuderia = function (id) {
	alert(`Eliminar escudería: ${id}`);
	fetch('http://127.0.0.1:3000/api/v1/escuderias/' + id, {
		method: 'DELETE'
	})
		.then(response => response.json())
		.then(response => {
			console.log(response);
			mostrar_escuderias();
		})
		.catch(error => {
			console.error('Error al eliminar la escudería:', error);
		});
};

agregar_escuderia = function () {
	const nombre = document.getElementById('nombre').value.trim();
	const puntos = document.getElementById('puntos').value.trim();
	const pais = document.getElementById('pais').value.trim();
	const anio = document.getElementById('anio').value.trim();
	const posicion = document.getElementById('posicion').value.trim();

	if (!nombre || !puntos || !pais || !anio || !posicion) {
		alert('Todos los campos son obligatorios.');
		return;
	}

	let escuderia = {
		nombre_escuderia: nombre,
		puntos_escuderia: parseInt(puntos, 10),
		pais_escuderia: pais,
		anio_creacion_escuderia: parseInt(anio, 10),
		posicion_escuderia: parseInt(posicion, 10),
	};

	fetch('http://127.0.0.1:3000/api/v1/escuderias', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(escuderia),
	})
		.then(response => {
			if (response.ok) {
				alert('Escudería agregada correctamente.');
				limpiar_formulario();
				mostrar_escuderias();
			} else {
				return response.json().then(error => {
					alert('Ocurrió un error: al agregar la escudería:');
				});
			}
		})
		.catch(error => {
			console.error('Error:', error);
			alert('Ocurrió un error: al agregar la escudería:');
		});
};

function limpiar_formulario() {
	document.getElementById('nombre').value = '';
	document.getElementById('puntos').value = '';
	document.getElementById('pais').value = '';
	document.getElementById('anio').value = '';
	document.getElementById('posicion').value = '';
}

mostrar_escuderias();