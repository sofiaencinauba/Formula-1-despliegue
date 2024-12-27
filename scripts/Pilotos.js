window.onload = function() {
	mostrar_Pilotos();
}
mostrar_Pilotos = function() {
	fetch('http://127.0.0.1:3000/api/v1/pilotos')
		.then(response => response.json())
		.then(pilotos => {
			console.log(pilotos)

			let padre = document.getElementById('pilotos')
			padre.innerHTML = '';

			pilotos.forEach(piloto => {
				let div = document.createElement('div');
				div.className = 'tarjeta';
				div.id_piloto = 'piloto' + piloto.id_piloto;

				let id = document.createElement('h2');
				id.textContent = piloto.id_piloto;

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

				let borrar = document.createElement('h2');
				let button = document.createElement('button');
				borrar.className = "button is-danger is-inverted";
				borrar.textContent = "Borrar";
				borrar.appendChild(button);
				button.onclick = function() { borrar_Piloto(piloto.id_piloto) };


				div.appendChild(id);
				div.appendChild(nombre);
				div.appendChild(nacionalidad);
				div.appendChild(edad);
				div.appendChild(puntos);
				div.appendChild(posicion);
				div.appendChild(borrar);

				padre.appendChild(div);

			});

			borrar_Piloto = function(id_piloto) {
				alert('Piloto eliminado' + id_piloto);
				fetch('http://127.0.0.1:3000/api/v1/pilotos/' + id_piloto, {
					method: 'DELETE'
				})
				.then(response => response.json())
				.then(response => { 
					console.log(response);
					let piloto = document.getElementById('piloto' + id_piloto);
					piloto.remove();
				});
			}

			});
	}

    function crearPiloto() {
        event.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const nacionalidad = document.getElementById('nacionalidad').value;
        const edad = document.getElementById('edad').value;
        const puntos = document.getElementById('puntos').value;
        const posicion = document.getElementById('posicion').value;
        const escuderia = document.getElementById('escuderia').value;

        console.log(nombre, nacionalidad, edad, puntos, posicion, escuderia);

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
                borrarPiloto();
            }else{
                alert('Error al crear el piloto');
            }
        });
        fetch("http://127.0.0.1:3000/api/v1/pilotos",{
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(response =>{
            if (response.status == 200){
                alert('Piloto obtenido correctamente');
                borrarPiloto();
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
        fetch("http://127.0.0.1:3000/api/v1/pilotos",{
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(response =>{
            if (response.status == 200){
                alert('Piloto actualizado correctamente');
                borrarPiloto();
            }else{
                alert('Error al actualizar el piloto');
            }
        });
    }


    function borrarPiloto() {
        document.getElementById('nombre').value = '';
        document.getElementById('nacionalidad').value = '';
        document.getElementById('edad').value = '';
        document.getElementById('puntos').value = '';
        document.getElementById('posicion').value = '';
        document.getElementById('escuderia').value = '';
    }