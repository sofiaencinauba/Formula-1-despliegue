mostrar_escuderias = function () {
	fetch('http://127.0.0.1:3000/api/v1/escuderias')
	.then(response => response.json())
	.then(escuderias => {console.log(escuderias);
	
		let tabla = document.getElementById('datos-Escuderia');
		tabla.innerHTML = '';
	
		if (!tabla) {
			console.error("No se encontró un elemento con ese ID");
			return;
		}
	
		escuderias.forEach(escuderia => {
			let fila = document.createElement('tr');
	
			let id = document.createElement('th');
			id.textContent = escuderia.id_escuderia;
			fila.appendChild(id);
	
			let nombre = document.createElement('td');
			nombre.textContent = escuderia.nombre_escuderia;
			fila.appendChild(nombre);
	
			let puntos = document.createElement('td');
			puntos.textContent = escuderia.puntos_escuderia || '0';
			fila.appendChild(puntos);
	
			let pais = document.createElement('td');
			pais.textContent = escuderia.pais_escuderia;
			fila.appendChild(pais);
	
			let anio = document.createElement('td');
			anio.textContent = escuderia.anio_creacion_escuderia;
			fila.appendChild(anio);
	
			let posicion = document.createElement('td');
			posicion.textContent = escuderia.posicion_escuderia;
			fila.appendChild(posicion);
	
			let pilotos = document.createElement('td');
			pilotos.textContent = escuderia.pilotos;
			fila.appendChild(pilotos);
	
			let boton = document.createElement('td');
			let borrar = document.createElement('button');
			borrar.className = "button is-danger is-inverted";
			borrar.textContent = "Borrar";
			borrar.onclick = function () {
				eliminar_escuderia(escuderia.id_escuderia);
			};
			boton.appendChild(borrar);
			fila.appendChild(boton);
	
			tabla.appendChild(fila);
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
			} else {
				return response.json().then(error => {
					throw new Error(error.message || 'Error al agregar la escudería.');
				});
			}
		})
		.catch(error => {
			console.error('Error:', error);
			alert('Ocurrió un error: ' + error.message);
		});
};

function limpiar_formulario() {
	document.getElementById('nombre').value = '';
	document.getElementById('puntos').value = '';
	document.getElementById('pais').value = '';
	document.getElementById('anio').value = '';
	document.getElementById('posicion').value = '';
	alert('Se cancelo agregar las escuderias');
}

mostrar_escuderias();