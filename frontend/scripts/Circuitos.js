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
    const circuitoId = urlParams.get('id');

    if (circuitoId) {
        fetch(`http://127.0.0.1:3000/api/v1/circuitos/${circuitoId}`)
            .then(response => response.json())
            .then(circuito => {
                rellenar_formulario(circuito);
                document.querySelector('#boton_modificar').style.display = 'inline-block'; 
            })
            .catch(error => {
                console.error('Error al obtener el circuito:', error);
            });
    }

	mostrar_circuitos();
});

mostrar_circuitos = function() {
    fetch('http://127.0.0.1:3000/api/v1/circuitos')
    .then(response => response.json())
    .then(circuitos => {
        console.log(circuitos)

        let padre = document.getElementById('circuitos')
        padre.innerHTML = ''

        circuitos.forEach(circuito => {

            let fila = document.createElement('tr')
            fila.id = `circuito-` + circuito.id_circuito
            
            let id = document.createElement('td');
            id.textContent = circuito.id_circuito;

            let nombre = document.createElement('td');
            nombre.textContent = circuito.nombre

            let tipo = document.createElement('td');
            tipo.textContent = circuito.tipo

            let longitud_total = document.createElement('td');
            longitud_total.textContent = circuito.longitud_total

            let cantidad_curvas = document.createElement('td');
            cantidad_curvas.textContent = circuito.cantidad_curvas

            let carreras = document.createElement('td');
            let nombres_carreras = document.createElement('ul')
            circuito.carreras.forEach(carrera =>
            {
                let nombre_carrera = document.createElement('li')
                nombre_carrera.textContent = carrera.nombre_carrera
                nombres_carreras.appendChild(nombre_carrera)
            }
            )
            carreras.appendChild(nombres_carreras)

            let borrado = document.createElement('td')
            let boton_borrar = document.createElement('button')
            boton_borrar.className = "button is-danger is-inverted"
            boton_borrar.textContent = "Borrar"
            boton_borrar.onclick = function() { eliminar_circuito(circuito.id_circuito) }
            borrado.appendChild(boton_borrar)

            let modificar = document.createElement('td')
            let boton_modificar = document.createElement('button');
			boton_modificar.className = 'button is-danger is-inverted';
			boton_modificar.textContent = 'Modificar';
			boton_modificar.onclick = function () {
				const circuitoId = circuito.id_circuito; 
    			window.location.href = `agregar_circuito.html?id=${circuitoId}`;
			};
            modificar.appendChild(boton_modificar)


            fila.appendChild(id)
            fila.appendChild(nombre)
            fila.appendChild(tipo)
            fila.appendChild(longitud_total)
            fila.appendChild(cantidad_curvas)
            fila.appendChild(carreras)
            fila.appendChild(borrado)
            fila.appendChild(modificar)

            padre.appendChild(fila)


        });
    })
}

eliminar_circuito = function(circuitoId) {
    alert("eliminando circuito " + circuitoId)
    fetch('http://127.0.0.1:3000/api/v1/circuitos/' + circuitoId, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(circuito => {
        console.log(circuito)
        let fila = document.getElementById("circuito-" + circuitoId)
        fila.remove()
    })
}

function crearCircuito(event) {
    event.preventDefault()

   

    const nombre = document.getElementById('nombre').value
    const tipo = document.getElementById('select').value
    const longitud_total = document.getElementById('longitud').value
    const cantidad_curvas = document.getElementById('cantidad_curvas').value

    if (!nombre || !tipo || !longitud_total || !cantidad_curvas) {
        alert('Error: Algún campo no existe en el DOM.')
        return
    }

    let body = {
        nombre: nombre,
        tipo: tipo,
        longitud_total: parseInt(longitud_total),
        cantidad_curvas: parseInt(cantidad_curvas)
    }

    console.log(body)

    fetch('http://127.0.0.1:3000/api/v1/circuitos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(response => {
        if(response.status === 201){
            alert("circuito creado con exito")
            limpiarFormulario()
        } else{
            alert("error al crear el circuito")
        }
    })
    
    window.location.href = 'Circuitos.html';
}

function limpiarFormulario(){
    document.getElementById('nombre').value = ''
    document.getElementById('select').value = ''
    document.getElementById('longitud').value = ''
    document.getElementById('cantidad_curvas').value = ''

}

rellenar_formulario = function (circuito) {
	document.getElementById('id_circuito').value = circuito.id_circuito;
	document.getElementById('nombre').value = circuito.nombre;
	document.getElementById('select').value = circuito.tipo;
	document.getElementById('longitud').value = circuito.longitud_total;
	document.getElementById('cantidad_curvas').value = circuito.cantidad_curvas;

	document.querySelector('#boton_crear').style.display = 'none';
    document.querySelector('#boton_limpiar').style.display = 'none';
	document.querySelector('#boton_modificar').style.display = 'inline-block';
}

modificar_circuito = function () {
    const id = document.getElementById('id_circuito').value.trim();
    const nombre = document.getElementById('nombre').value.trim();
    const tipo = document.getElementById('select').value.trim();
    const longitud = document.getElementById('longitud').value.trim();
    const cantidad_curvas = document.getElementById('cantidad_curvas').value.trim();

    if (!id || !nombre || !tipo || !longitud || !cantidad_curvas) {
        alert('Todos los campos son obligatorios.');
        return;
    }

    let circuito = {
        nombre: nombre,
        tipo: tipo,
        longitud_total: parseInt(longitud, 10),
        cantidad_curvas: parseInt(cantidad_curvas, 10)
    };

    fetch(`http://127.0.0.1:3000/api/v1/circuitos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(circuito),
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
    .then(updatedCircuito => {
        console.log('Circuito actualizado:', updatedCircuito);
        alert('Circuito actualizado correctamente.');
        limpiarFormulario();
        window.location.href = 'Circuitos.html';
    })
    .catch(error => {
        console.error('Error al modificar el circuito:', error);
        alert('Ocurrió un error al actualizar el circuito: ' + error.message);
    });
}