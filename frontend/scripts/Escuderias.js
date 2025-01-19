document.addEventListener('DOMContentLoaded', () => {
	const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  
	$navbarBurgers.forEach( el => {
	  el.addEventListener('click', () => {
  
		const target = el.dataset.target;
		const $target = document.getElementById(target);
  
		el.classList.toggle('is-active');
		$target.classList.toggle('is-active');
  
	  });
	});
});

document.addEventListener('DOMContentLoaded', () => { 
	const urlParams = new URLSearchParams(window.location.search);
    const escuderiaId = urlParams.get('id');

    if (escuderiaId) {
        fetch(`http://127.0.0.1:3000/api/v1/escuderias/${escuderiaId}`)
            .then(response => response.json())
            .then(escuderia => {
                rellenar_formulario(escuderia);
                document.querySelector('.boton_modificar').style.display = 'inline-block'; 
            })
            .catch(error => {
                console.error('Error al obtener la escudería:', error);
            });
    }

	mostrar_escuderias();
});

/* 
En esta funcion me encargo de asociar los pilotos a las escuderias, primero tengo que agregar un piloto con ese id, si no este mismo se va a mostrar como ningun piloto asociado.
*/
function asociar_escuderia_con_piloto(pilotos) {

	let pilotos_asociados = document.createElement('p');

	if (pilotos.length > 0) {
		let nombres_pilotos = '';
		pilotos.forEach(piloto => {
			if (nombres_pilotos !== '') {
				nombres_pilotos += ', ';
			}
			nombres_pilotos += piloto.nombre_piloto;
		});
		pilotos_asociados.textContent = `Pilotos Asociados: ${nombres_pilotos}.`;
	} else {
		pilotos_asociados.textContent = 'Pilotos Asociados: Ninguno';
	}

	return pilotos_asociados;
}


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

				let pilotos_mostrados = asociar_escuderia_con_piloto(escuderia.pilotos);
				tarjeta.appendChild(pilotos_mostrados);

				let boton = document.createElement('button');
				boton.className = 'boton_borrar';
				boton.textContent = 'Borrar';
				boton.onclick = function () {
					eliminar_escuderia(escuderia.id_escuderia);
				};
				tarjeta.appendChild(boton);

				let boton_modificar = document.createElement('button');
				boton_modificar.className = 'boton_modificar';
				boton_modificar.textContent = 'Modificar';
				boton_modificar.onclick = function () {
					const escuderiaId = escuderia.id_escuderia; 
    				window.location.href = `agregar_escuderia.html?id=${escuderiaId}`;
				};
				tarjeta.appendChild(boton_modificar);

				contenedor_tarjetas.appendChild(tarjeta);
			});
		})

		.catch(error => {
			console.error('Error al obtener las escuderías:', error);
		});

};

eliminar_escuderia = function (id) {
	alert(`Eliminar escudería: ${id}, se eliminan los pilotos asociados y las carreras ganadas`);
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
				window.location.href = 'Escuderia.html';
			} else {
				return response.json().then(error => {
					alert('Ocurrió un error al agregar la escudería, fijate que la posicion no este ya ocupada');
				});
			}
		})
		
};

limpiar_formulario = function () {
	document.getElementById('nombre').value = '';
	document.getElementById('puntos').value = '';
	document.getElementById('pais').value = '';
	document.getElementById('anio').value = '';
	document.getElementById('posicion').value = '';

	document.querySelector('.boton_agregar').style.display = 'inline-block'; 
	document.querySelector('.boton_modificar').style.display = 'none';
}

rellenar_formulario = function (escuderia) {
	document.getElementById('id').value = escuderia.id_escuderia;
	document.getElementById('nombre').value = escuderia.nombre_escuderia;
	document.getElementById('puntos').value = escuderia.puntos_escuderia;
	document.getElementById('pais').value = escuderia.pais_escuderia;
	document.getElementById('anio').value = escuderia.anio_creacion_escuderia;
	document.getElementById('posicion').value = escuderia.posicion_escuderia;

	document.querySelector('.boton_agregar').style.display = 'none';
	document.querySelector('.boton_modificar').style.display = 'inline-block';
}

modificar_escuderia = function () {
	const id = document.getElementById('id').value.trim();
	const nombre = document.getElementById('nombre').value.trim();
	const puntos = document.getElementById('puntos').value.trim();
	const pais = document.getElementById('pais').value.trim();
	const anio = document.getElementById('anio').value.trim();
	const posicion = document.getElementById('posicion').value.trim();

	if (!id || !nombre || !puntos || !pais || !anio || !posicion) {
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

	fetch('http://127.0.0.1:3000/api/v1/escuderias/' + id, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(escuderia),
	})
		.then(response => {
			if (response.ok) {
				alert('Escudería actualizada correctamente.');
				limpiar_formulario();
				mostrar_escuderias();
				window.location.href = 'Escuderia.html';
			} else {
				return response.json().then(error => {
					alert('Ocurrió un error al actualizar la escudería');
				});
			}
		})
		.catch(error => {
			console.error('Error:', error);
			alert('Ocurrió un error al actualizar la escudería');
		});
}