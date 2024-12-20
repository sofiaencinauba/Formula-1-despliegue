{/* <h1 class="title">CARRERAS</h1>
    <div class="box">
        <h2 class="subtitle">id</h2>
        <h2 class="subtitle">Nombre Carrera</h2>
        <h2 class="subtitle">Primer Puesto</h2>
        <h2 class="subtitle">Pais sede</h2>
        <h2 class="subtitle">anio</h2>
        <h2 class="subtitle">circuito asociado</h2>
    </div> */}

fetch('http://127.0.0.1:3000/api/v1/carreras')
.then(response => response.json())
.then(carreras => {
    console.log(carreras)

    let padre = document.getElementById('carreras')

    carreras.forEach(carrera => {
        let div = document.createElement('div');
        div.className = "cell box has-background-warning ";
        
        let id = document.createElement('h2');
        id.className = "subtitle has-text-black";
        id.textContent = carrera.id_carrera;

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

eliminar_carrera = function(id_carrera) {
    alert("eliminar carrera")
}

