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
    const pilotoId = urlParams.get('id');

	const urlActual = window.location.href;

    if (pilotoId) {
        fetch(`http://127.0.0.1:3000/api/v1/pilotos/${pilotoId}`)
            .then(response => response.json())
            .then(piloto => {
                rellenar_formulario(piloto);
                document.querySelector('.boton_modificar').style.display = 'inline-block'; 
            })
            .catch(error => {
                console.error('Error al obtener el piloto:', error);
            });
    }

	if (urlActual.includes('/frontend/agregar_piloto.html')) {
        cargar_escuderias();
    }

	mostrar_Pilotos();
});

function asociar_piloto_con_carrera(carreras) {

	let carreras_ganadas = document.createElement('p');

	if (carreras.length > 0) {
		let nombres_carreras = '';
		carreras.forEach(carrera => {
			if (nombres_carreras !== '') {
				nombres_carreras += ', ';
			}
			nombres_carreras += carrera.nombre_carrera;
		});
		carreras_ganadas.textContent = `Carreras ganadas: ${nombres_carreras}.`;
	} else {
		carreras_ganadas.textContent = 'Carreras ganadas: Ninguna';
	}

	return carreras_ganadas;
}

mostrar_Pilotos = function() {
	fetch('http://127.0.0.1:3000/api/v1/pilotos')
		.then(response => response.json())
		.then(pilotos => {
			console.log(pilotos)

			let padre = document.getElementById('contenedor-pilotos')
			padre.innerHTML = '';

            if (!padre) {
				console.error("No se encontró un elemento con ese ID");
				return;
			}

			pilotos.forEach(piloto => {
				let div = document.createElement('div');
				div.className = 'tarjeta';

                let nombre = document.createElement('h2');
				nombre.textContent = piloto.nombre_piloto;

				let id = document.createElement('p');
				id.textContent = `ID: ${piloto.id_piloto}`;

				let nacionalidad = document.createElement('p');
				nacionalidad.textContent = `Nacionalidad: ${piloto.nacionalidad_piloto}`;

				let edad = document.createElement('p');
				edad.textContent = `Edad: ${piloto.edad_piloto}`;

				let puntos = document.createElement('p');
				puntos.textContent = `Puntos: ${piloto.puntos_piloto}`;

				let posicion = document.createElement('p');
				posicion.textContent = `Posicion: ${piloto.posicion_piloto}`;

				let escuderia_nombre = document.createElement('p');
				escuderia_nombre.textContent = `Escuderia: ${piloto.escuderia.nombre_escuderia}`;

				let carreras = asociar_piloto_con_carrera(piloto.carreras);

				let boton = document.createElement('button');
				boton.className = 'boton_borrar';
				boton.textContent = 'Borrar';
				boton.onclick = function () {
					borrar_Piloto(piloto.id_piloto);
				};

                let boton_modificar = document.createElement('button');
				boton_modificar.className = 'boton_modificar';
				boton_modificar.textContent = 'Modificar';
				boton_modificar.onclick = function () {
					const pilotoId = piloto.id_piloto; 
    				window.location.href = `agregar_piloto.html?id=${pilotoId}`;
				};

                div.appendChild(nombre);
				div.appendChild(id);
				div.appendChild(nacionalidad);
				div.appendChild(edad);
				div.appendChild(puntos);
				div.appendChild(posicion);
				div.appendChild(escuderia_nombre);
				div.appendChild(carreras);
				div.appendChild(boton);
				div.appendChild(boton_modificar);

				padre.appendChild(div);

			});
		});
}

borrar_Piloto = function(id) {
    alert(`Piloto eliminado ${id}`);
    fetch('http://127.0.0.1:3000/api/v1/pilotos/' + id, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(response => { 
            console.log(response);
            mostrar_Pilotos();
        });
}

agregar_piloto = function() {
        const nombre = document.getElementById('nombre_piloto').value;
        const nacionalidad = document.getElementById('nacionalidad_piloto').value;
        const edad = document.getElementById('edad_piloto').value;
        const puntos = document.getElementById('puntos_piloto').value;
        const posicion = document.getElementById('posicion_piloto').value;
        const escuderia = document.getElementById('select_escuderias').value;

        let body = {
            nombre_piloto: nombre,
            nacionalidad_piloto: nacionalidad,
            edad_piloto: parseInt(edad),
            puntos_piloto: parseInt(puntos),
            posicion_piloto: parseInt(posicion),
            id_escuderia: parseInt(escuderia)
        };
        fetch("http://127.0.0.1:3000/api/v1/pilotos",{
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then (response =>{
            if(response.status == 201){
                alert('Piloto creado correctamente');
                mostrar_Pilotos();
                limpiar_formulario();
				window.location.href = 'Piloto.html';
            }else{
                alert('Error al crear el piloto');
            }
        })
    }


function limpiar_formulario() {
    document.getElementById('nombre_piloto').value = '';
    document.getElementById('nacionalidad_piloto').value = '';
    document.getElementById('edad_piloto').value = '';
    document.getElementById('puntos_piloto').value = '';
    document.getElementById('posicion_piloto').value = '';
    document.getElementById('select_escuderias').value = '';
}

rellenar_formulario = function (piloto) {
	document.getElementById('id_piloto').value = piloto.id_piloto;
	document.getElementById('nombre_piloto').value = piloto.nombre_piloto;
	document.getElementById('nacionalidad_piloto').value = piloto.nacionalidad_piloto;
	document.getElementById('edad_piloto').value = piloto.edad_piloto;
	document.getElementById('puntos_piloto').value = piloto.puntos_piloto;
	document.getElementById('posicion_piloto').value = piloto.posicion_piloto;
	document.getElementById('select_escuderias').value = piloto.id_escuderia;

	document.querySelector('.boton_agregar').style.display = 'none';
	document.querySelector('.boton_modificar').style.display = 'inline-block';

	setTimeout(() => {
        document.getElementById('select_escuderias').value = String(piloto.id_escuderia);
    }, 10)
}

modificar_piloto = function () {
	const id = document.getElementById('id_piloto').value;
	const nombre = document.getElementById('nombre_piloto').value;
    const nacionalidad = document.getElementById('nacionalidad_piloto').value;
    const edad = document.getElementById('edad_piloto').value;
    const puntos = document.getElementById('puntos_piloto').value;
    const posicion = document.getElementById('posicion_piloto').value;
    const escuderia = document.getElementById('select_escuderias').value;

	if (!id || !nombre || !nacionalidad || !edad || !puntos || !posicion || !escuderia) {
		alert('Todos los campos son obligatorios.');
		return;
	}

	let piloto = {
		nombre_piloto: nombre,
		nacionalidad_piloto: nacionalidad,
		edad_piloto: parseInt(edad, 10),
		puntos_piloto: parseInt(puntos, 10),
		posicion_piloto: parseInt(posicion, 10),
		id_escuderia: parseInt(escuderia, 10),
	};

	fetch('http://127.0.0.1:3000/api/v1/pilotos/' + id, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(piloto),
	})
		.then(response => {
			if (response.ok) {
				alert('Piloto actualizado correctamente.');
				limpiar_formulario();
				mostrar_Pilotos();
				window.location.href = 'Piloto.html';
			} else {
				return response.json().then(error => {
					alert('Ocurrió un error al actualizar el piloto');
				});
			}
		})
		.catch(error => {
			console.error('Error:', error);
			alert('Ocurrió un error al actualizar el piloto');
		});
}

cargar_escuderias = function(){
    fetch('http://127.0.0.1:3000/api/v1/escuderias')
    .then(response => response.json())
    .then(escuderias => {

        let padre = document.getElementById('select_escuderias')
        padre.innerHTML = ''
        const opcionVacia = document.createElement('option');
        opcionVacia.value = '';
        opcionVacia.innerText = 'Selecciona una opción';
        padre.appendChild(opcionVacia);

        escuderias.forEach(escuderia => {
            let option = document.createElement('option');
            option.value = escuderia.id_escuderia;
            option.innerText = `${escuderia.nombre_escuderia}`; 
            
            padre.appendChild(option);
        });
    })
}