fetch('http://127.0.0.1:3000/api/v1/escuderias')
	.then(response => response.json())
	.then(escuderias => {
		console.log(escuderias);

		// Seleccionamos el cuerpo de la tabla
		let tablaCuerpo = document.getElementById('datos-Escuderia');

		if (!tablaCuerpo) {
			console.error("No se encontró un elemento con ID 'datos-Escuderia' en el DOM.");
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

			tablaCuerpo.appendChild(fila);
		});
	})
	.catch(error => {
		console.error('Error al obtener las escuderías:', error);
	});

eliminar_escuderia = function (id_escuderia) {
	alert(`Eliminar escudería con ID: ${id_escuderia}`);
};
