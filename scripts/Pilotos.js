mostrar_Pilotos = function() {
	fetch('http://127.0.0.1:3000/api/v1/pilotos')
		.then(response => response.json())
		.then(pilotos => {
			console.log(pilotos)

			let padre = document.getElementById('pilotos')
			padre.innerHTML = '';

            if (!padre) {
				console.error("No se encontró un elemento con ese ID");
				return;
			}

			pilotos.forEach(piloto => {
				let div = document.createElement('div');
				div.className = 'piloto';
				div.id = 'piloto' + piloto.id_piloto;

				let id = document.createElement('h2');
				id.textContent = `ID: ${piloto.id_piloto}`;

				let nombre = document.createElement('h2');
				nombre.textContent = `Nombre: ${piloto.nombre_piloto}`;

				let nacionalidad = document.createElement('h2');
				nacionalidad.textContent = `Nacionalidad: ${piloto.nacionalidad_piloto}`;

				let edad = document.createElement('h2');
				edad.textContent = `Edad: ${piloto.edad_piloto}`;

				let puntos = document.createElement('h2');
				puntos.textContent = `Puntos: ${piloto.puntos_piloto}`;

				let posicion = document.createElement('h2');
				posicion.textContent = `Posicion: ${piloto.posicion_piloto}`;

				let boton = document.createElement('button');
				boton.className = "button is-danger is-inverted";
				boton.textContent = "Borrar";
				boton.onclick = function() { borrar_Piloto(piloto.id_piloto) };


				div.appendChild(id);
				div.appendChild(nombre);
				div.appendChild(nacionalidad);
				div.appendChild(edad);
				div.appendChild(puntos);
				div.appendChild(posicion);
				div.appendChild(boton);

				padre.appendChild(div);

			});
			});
	}

borrar_Piloto = function(id_piloto) {
    alert('Piloto eliminado' + id);
    fetch(`http://127.0.0.1:3000/api/v1/pilotos/` + id, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(response => { 
        console.log(response);
        mostrar_Pilotos();
    });
}

function crearPiloto(event) {
        event.preventDefault();

        const nombre = document.getElementById('nombre_piloto').value;
        const nacionalidad = document.getElementById('nacionalidad_piloto').value;
        const edad = document.getElementById('edad_piloto').value;
        const puntos = document.getElementById('puntos_piloto').value;
        const posicion = document.getElementById('posicion_piloto').value;
        const escuderia = document.getElementById('id_escuderia').value;

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
                borrarPiloto();
            }else{
                alert('Error al crear el piloto');
            }
        });/*
        fetch("http://127.0.0.1:3000/api/v1/pilotos",{
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            },
        }).then(response =>{
            if (response.status == 200){
                alert('Piloto obtenido correctamente');
                mostrar_Pilotos();
            }else{
                alert('Error al obtener el piloto');
            }
        });
        fetch("http://127.0.0.1:3000/api/v1/pilotos",{
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(response =>{
            if (response.status == 200){
                alert('Piloto eliminado correctamente');
                borrarPiloto();
            }else{
                alert('Error al eliminar el piloto');
            }
        });
        fetch("http://127.0.0.1:3000/api/v1/pilotos/" + id_piloto,{
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(response =>{
            if (response.status == 200){
                alert('Piloto actualizado correctamente');
                mostrar_Pilotos();
            }else{
                alert('Error al actualizar el piloto');
            }
        });*/
    }


function borrarPiloto() {
    document.getElementById('nombre_piloto').value = '';
    document.getElementById('nacionalidad_piloto').value = '';
    document.getElementById('edad_pilot').value = '';
    document.getElementById('puntos_piloto').value = '';
    document.getElementById('posicion_piloto').value = '';
    document.getElementById('id_escuderia').value = '';
}

mostrar_Pilotos();