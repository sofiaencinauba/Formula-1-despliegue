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
        div.className = "box";
        
        let id = document.createElement('h2');
        id.className = "subtitle";
        id.textContent = carrera.id;

        let nombre = document.createElement('h2');
        nombre.className = "subtitle";
        nombre.textContent = `Nombre: ${carrera.nombre_carrera}`;

        let pais_sede = document.createElement('h2');
        pais_sede.className = "subtitle";
        pais_sede.textContent = `Sede: ${carrera.pais_sede}`;

        let anio = document.createElement('h2');
        anio.className = "subtitle";
        anio.textContent = `Año: ${carrera.anio}`;

        let primer_puesto = document.createElement('h2');
        primer_puesto.className = "subtitle";
        primer_puesto.textContent = `Piloto ganador: ${carrera.piloto ? carrera.piloto.nombre_piloto : 'desconocido'}`;

        let circuito_asociado = document.createElement('h2');
        circuito_asociado.className = "subtitle";
        circuito_asociado.textContent = `Circuito: ${carrera.circuito ? carrera.circuito.nombre : 'Desconocido'}`;

        div.appendChild(id);
        div.appendChild(nombre);
        div.appendChild(pais_sede)
        div.appendChild(anio)
        div.appendChild(primer_puesto);
        div.appendChild(circuito_asociado);

        padre.appendChild(div);


    });
})


