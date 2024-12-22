function manejar_clic_tabs(tab) {
  document.querySelectorAll('.tabs ul li').forEach(item => item.classList.remove('is-active')); 
  tab.classList.add('is-active'); 

  document.querySelectorAll('.table').forEach(tabla => tabla.classList.add('hidden')); 
  const target = tab.getAttribute('data-target'); 
  document.getElementById(target).classList.remove('hidden'); 
}

document.querySelectorAll('.tabs ul li').forEach(tab => { 
  tab.addEventListener('click', () => manejar_clic_tabs(tab));
});

function llenar_tabla_carreras(carreras) {
  let tabla = document.getElementById('carreras-data');

  carreras.forEach(carrera => {
      let fila = document.createElement('tr');

      let nombre = document.createElement('td');
      nombre.textContent = carrera.nombre_carrera;

      let pais_sede = document.createElement('td');
      pais_sede.textContent = carrera.pais_sede;

      let anio = document.createElement('td');
      anio.textContent = carrera.anio;

      let piloto_ganador = document.createElement('td');
      piloto_ganador.textContent = carrera.piloto.nombre_piloto;

      let circuito = document.createElement('td');
      circuito.textContent = carrera.circuito.nombre;

      fila.appendChild(nombre);
      fila.appendChild(pais_sede);
      fila.appendChild(anio);
      fila.appendChild(piloto_ganador);
      fila.appendChild(circuito);
      tabla.appendChild(fila);
  });
}

function llenar_tabla_pilotos(pilotos) {
  let tabla = document.getElementById('pilotos-data');

  pilotos.forEach(piloto => {
      let fila = document.createElement('tr');

      let posicion = document.createElement('td');
      posicion.textContent = piloto.posicion_piloto;

      let id = document.createElement('td');
      id.textContent = piloto.id_piloto;

      let nombre = document.createElement('td');
      nombre.textContent = piloto.nombre_piloto;

      let nacionalidad = document.createElement('td');
      nacionalidad.textContent = piloto.nacionalidad_piloto;

      let escuderia = document.createElement('td');
      escuderia.textContent = piloto.escuderia.nombre_escuderia;

      let puntos = document.createElement('td');
      puntos.textContent = piloto.puntos_piloto;

      fila.appendChild(posicion);
      fila.appendChild(id);
      fila.appendChild(nombre);
      fila.appendChild(nacionalidad);
      fila.appendChild(escuderia);
      fila.appendChild(puntos);
      tabla.appendChild(fila);
  });
}

function llenar_tabla_escuderias(escuderias) {
  let tabla = document.getElementById('escuderias-data');

  escuderias.forEach(escuderia => {
      let fila = document.createElement('tr');

      let posicion = document.createElement('td');
      posicion.textContent = escuderia.posicion_escuderia;

      let nombre = document.createElement('td');
      nombre.textContent = escuderia.nombre_escuderia;

      let pais = document.createElement('td');
      pais.textContent = escuderia.pais_escuderia;

      let puntos = document.createElement('td');
      puntos.textContent = escuderia.puntos_escuderia;

      fila.appendChild(posicion);
      fila.appendChild(nombre);
      fila.appendChild(pais);
      fila.appendChild(puntos);
      tabla.appendChild(fila);
  });
}

fetch('http://127.0.0.1:3000/api/v1/carreras')
.then(response => response.json())
.then(carreras => {
    console.log(carreras);
    llenar_tabla_carreras(carreras);
});

fetch('http://127.0.0.1:3000/api/v1/pilotos')
  .then(response => response.json())
  .then(pilotos => {
      console.log(pilotos);
      llenar_tabla_pilotos(pilotos);
  });

fetch('http://127.0.0.1:3000/api/v1/escuderias')
  .then(response => response.json())
  .then(escuderias => {
      console.log(escuderias);
      llenar_tabla_escuderias(escuderias);
  });