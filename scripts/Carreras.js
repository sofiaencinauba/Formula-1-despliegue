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

window.onload = function() {
    mostrar_carreras()
}

mostrar_carreras = function() {
    fetch('http://127.0.0.1:3000/api/v1/carreras')
    .then(response => response.json())
    .then(carreras => {
        console.log(carreras)

        let padre = document.getElementById('carreras')
        padre.innerHTML = ''

        carreras.forEach(carrera => {
            let div = document.createElement('div');
            div.className = "cell box has-background-warning ";
            div.id = "carrera-" + carrera.id_carrera
            
            let id = document.createElement('h2');
            id.className = "subtitle has-text-black";
            id.textContent = carrera.id_carrera;
            let id_carrera = carrera.id_carrera

            let nombre = document.createElement('h2');
            nombre.className = "subtitle has-text-black";
            nombre.textContent = `Nombre: ${carrera.nombre_carrera}`;

            let pais_sede = document.createElement('h2');
            pais_sede.className = "subtitle has-text-black";
            pais_sede.textContent = `Sede: ${carrera.pais_sede}`;

            let anio = document.createElement('h2');
            anio.className = "subtitle has-text-black";
            anio.textContent = `Año: ${carrera.anio}`;

            let primer_puesto = document.createElement('h2');
            primer_puesto.className = "subtitle has-text-black";
            primer_puesto.textContent = `Piloto ganador: ${carrera.piloto ? carrera.piloto.nombre_piloto : 'desconocido'}`;

            let circuito_asociado = document.createElement('h2');
            circuito_asociado.className = "subtitle has-text-black";
            circuito_asociado.textContent = `Circuito: ${carrera.circuito ? carrera.circuito.nombre : 'Desconocido'}`;

            // <button class="button is-danger is-inverted">Inverted</button>
            let borrar = document.createElement('button')
            borrar.className = "button is-danger is-inverted"
            borrar.textContent = "Borrar"
            borrar.onclick = function() { eliminar_carrera(id_carrera) }

            div.appendChild(id);
            div.appendChild(nombre);
            div.appendChild(pais_sede)
            div.appendChild(anio)
            div.appendChild(primer_puesto);
            div.appendChild(circuito_asociado);
            div.appendChild(borrar)

            padre.appendChild(div);


        });
    })
}

eliminar_carrera = function(id_carrera) {
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
    const piloto_ganador = document.getElementById('piloto_ganador').value
    const circuito_asociado = document.getElementById('circuito_asociado').value

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
        if(response.status === 201){
            alert("carrera creada con exito")
            limpiarFormulario()
        } else{
            alert("error al crear la carrera")
        }
    })

}

function limpiarFormulario(){
    document.getElementById('nombre').value = ''
    document.getElementById('sede').value = ''
    document.getElementById('anio').value = ''
    document.getElementById('piloto_ganador').value = ''
    document.getElementById('circuito_asociado').value = ''
}