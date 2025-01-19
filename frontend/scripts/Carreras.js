/* 
    <div class="grid m-6 is-gap-4 is-col-min-20" id="carreras">
        <div class="cell box has-background-warning">
            <h2 class="subtitle has-text-black">id</h2>
            <h2 class="subtitle has-text-black">Nombre Carrera</h2>
            <h2 class="subtitle has-text-black">Primer Puesto</h2>
            <h2 class="subtitle has-text-black">Pais sede</h2>
            <h2 class="subtitle has-text-black">anio</h2>
            <h2 class="subtitle has-text-black">circuito asociado</h2>
        </div>
    </div> 
*/
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
    const carreraId = urlParams.get('id');

    const urlActual = window.location.href;

    if (carreraId) {
        fetch(`http://127.0.0.1:3000/api/v1/carreras/${carreraId}`)
            .then(response => response.json())
            .then(carrera => {
                rellenar_formulario(carrera);
                document.querySelector('#boton_modificar').style.display = 'inline-block';
            })
            .catch(error => {
                console.error('Error al obtener la carrera:', error);
            });
    }

    if (urlActual.includes('agregar_carrera.html')) {
        cargar_pilotos_y_circuitos()
    }

    mostrar_carreras();
});


mostrar_carreras = function () {
    fetch('http://127.0.0.1:3000/api/v1/carreras')
        .then(response => response.json())
        .then(carreras => {
            console.log(carreras)

            let contenedor_tarjetas = document.getElementById('contenedor-tarjetas');
            contenedor_tarjetas.innerHTML = '';

            if (!contenedor_tarjetas) {
                console.error("No se encontró un elemento con ese ID");
                return;
            }
            carreras.forEach(carrera => {

                let tarjeta = document.createElement('div');
                tarjeta.className = 'tarjeta';
                tarjeta.id = `carrera-${carrera.id_carrera}`;

                let nombre = document.createElement('h2');
                nombre.textContent = `${carrera.nombre_carrera}`;
                tarjeta.appendChild(nombre);

                let id = document.createElement('p');
                id.textContent = `ID: ${carrera.id_carrera}`;
                tarjeta.appendChild(id);

                let pais_sede = document.createElement('p');
                pais_sede.textContent = `Sede: ${carrera.pais_sede}`;
                tarjeta.appendChild(pais_sede);

                let anio = document.createElement('p');
                anio.textContent = `Año: ${carrera.anio}`;
                tarjeta.appendChild(anio);

                let primer_puesto = document.createElement('p');
                primer_puesto.textContent = carrera.piloto ? `Piloto ganador: ${carrera.piloto.nombre_piloto}` : "Piloto ganador: No disponible";
                tarjeta.appendChild(primer_puesto);

                let circuito_asociado = document.createElement('p');
                circuito_asociado.textContent = carrera.circuito ? `Circuito: ${carrera.circuito.nombre}` : "Circuito asociado: No disponible"
                tarjeta.appendChild(circuito_asociado);

                let borrar = document.createElement('button')
                borrar.className = "boton_borrar"
                borrar.textContent = "Borrar"
                borrar.onclick = function () {
                    eliminar_carrera(carrera.id_carrera);
                }
                tarjeta.appendChild(borrar)

                let boton_modificar = document.createElement('button');
                boton_modificar.className = 'boton_modificar';
                boton_modificar.textContent = 'Modificar';
                boton_modificar.onclick = function () {
                    const carreraId = carrera.id_carrera;
                    window.location.href = `agregar_carrera.html?id=${carreraId}`;

                };
                tarjeta.appendChild(boton_modificar);

                contenedor_tarjetas.appendChild(tarjeta);


            });
        })
}

eliminar_carrera = function (id_carrera) {
    alert("eliminando carrera " + id_carrera)
    fetch('http://127.0.0.1:3000/api/v1/carreras/' + id_carrera, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(carrera => {
            console.log(carrera)
            let div = document.getElementById("carrera-" + id_carrera)
            div.remove()
        })
}

function crearCarrera(event) {
    event.preventDefault()

    const nombre = document.getElementById('nombre').value
    const sede = document.getElementById('sede').value
    const anio = document.getElementById('anio').value
    const piloto_ganador = document.getElementById('select_pilotos').value
    const circuito_asociado = document.getElementById('select_circuitos').value

    if (!nombre || !sede || !anio || !piloto_ganador || !circuito_asociado) {
        alert('Error: Algún campo no existe en el DOM.')
        return
    }

    let body = {
        nombre_carrera: nombre,
        pais_sede: sede,
        anio: parseInt(anio),
        id_primer_puesto: parseInt(piloto_ganador),
        id_circuito_asociado: parseInt(circuito_asociado)
    }

    console.log(body)

    fetch('http://127.0.0.1:3000/api/v1/carreras', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(response => {
        if (response.status === 201) {
            alert("carrera creada con exito")
        } else {
            alert("error al crear la carrera")
        }
    })
    window.location.href = 'Carreras.html';

}

function limpiarFormulario() {
    document.getElementById('nombre').value = ''
    document.getElementById('sede').value = ''
    document.getElementById('anio').value = ''
    document.getElementById('select_pilotos').value = ''
    document.getElementById('select_circuitos').value = ''

    document.querySelector('#boton_crear').style.display = 'inline-block';
    document.querySelector('#boton_limpiar').style.display = 'inline-block';
    document.querySelector('#boton_modificar').style.display = 'none';
}

rellenar_formulario = function (carrera) {

    document.getElementById('id_carrera').value = carrera.id_carrera;
    document.getElementById('nombre').value = carrera.nombre_carrera;
    document.getElementById('sede').value = carrera.pais_sede;
    document.getElementById('anio').value = carrera.anio;



    document.querySelector('#boton_crear').style.display = 'none';
    document.querySelector('#boton_limpiar').style.display = 'none';
    document.querySelector('#boton_modificar').style.display = 'inline-block';

    setTimeout(() => {
        document.getElementById('select_pilotos').value = String(carrera.id_primer_puesto);
        document.getElementById('select_circuitos').value = String(carrera.id_circuito_asociado);

    }, 10)
}

modificar_carrera = function () {
    const id = document.getElementById('id_carrera').value.trim();
    const nombre = document.getElementById('nombre').value.trim();
    const sede = document.getElementById('sede').value.trim();
    const anio = document.getElementById('anio').value.trim();
    const piloto_ganador = document.getElementById('select_pilotos').value.trim();
    const circuito_asociado = document.getElementById('select_circuitos').value.trim();

    if (!id || !nombre || !sede || !anio || !piloto_ganador || !circuito_asociado) {
        alert('Todos los campos son obligatorios.');
        return;
    }

    let carrera = {
        nombre_carrera: nombre,
        pais_sede: sede,
        anio: parseInt(anio, 10),
        id_primer_puesto: parseInt(piloto_ganador, 10),
        id_circuito_asociado: parseInt(circuito_asociado, 10),
    };

    console.log(carrera)

    fetch(`http://127.0.0.1:3000/api/v1/carreras/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(carrera),
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return response.json().then(error => {
                    throw new Error(error.error);
                });
            }
        })
        .then(updatedCarrera => {
            console.log('Carrera actualizada:', updatedCarrera);
            alert('Carrera actualizada correctamente.');
            limpiarFormulario();
            window.location.href = 'Carreras.html';

        })
        .catch(error => {
            console.error('Error al modificar la carrera:', error);
            alert('Ocurrió un error al actualizar la carrera: ' + error.message);
        });
}

cargar_pilotos_y_circuitos = function () {
    fetch('http://127.0.0.1:3000/api/v1/pilotos')
        .then(response => response.json())
        .then(pilotos => {

            let padre = document.getElementById('select_pilotos')
            padre.innerHTML = ''
            const opcionVacia = document.createElement('option');
            opcionVacia.value = '';
            opcionVacia.innerText = 'Selecciona una opción';
            padre.appendChild(opcionVacia);

            pilotos.forEach(piloto => {
                let option = document.createElement('option');
                option.value = piloto.id_piloto
                option.innerText = `Piloto ${piloto.id_piloto} -> nombre: ${piloto.nombre_piloto}, nacionalidad: ${piloto.nacionalidad_piloto}, edad: ${piloto.edad_piloto}, puntos: ${piloto.puntos_piloto}, posicion: ${piloto.posicion_piloto}`

                padre.appendChild(option);


            });
        })
    fetch('http://127.0.0.1:3000/api/v1/circuitos')
        .then(response => response.json())
        .then(circuitos => {

            let padre = document.getElementById('select_circuitos')
            padre.innerHTML = ''
            const opcionVacia = document.createElement('option');
            opcionVacia.value = '';
            opcionVacia.innerText = 'Selecciona una opción';
            padre.appendChild(opcionVacia);

            circuitos.forEach(circuito => {
                let option = document.createElement('option');
                option.value = circuito.id_circuito
                option.innerText = option.innerText = `Circuito ${circuito.id_circuito} -> nombre: ${circuito.nombre}, tipo: ${circuito.tipo}, longitud: ${circuito.longitud_total}, cantidad de curvas: ${circuito.cantidad_curvas}`

                padre.appendChild(option);


            });
        })
}