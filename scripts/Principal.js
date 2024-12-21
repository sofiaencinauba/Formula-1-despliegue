document.querySelectorAll('.tabs ul li').forEach(nav_item => { 
    nav_item.addEventListener('click', () => { 

      document.querySelectorAll('.tabs ul li').forEach(item => item.classList.remove('is-active')); 
      nav_item.classList.add('is-active'); 

      document.querySelectorAll('.table').forEach(tabla => tabla.classList.add('hidden')); 

      const target = nav_item.getAttribute('data-target'); 
      document.getElementById(target).classList.remove('hidden'); 
    }); 
  });

  fetch('http://127.0.0.1:3000/api/v1/pilotos')
  .then(response => response.json())
  .then(pilotos => {
    console.log(pilotos);

    let table = document.getElementById('pilotos-data');

    pilotos.forEach(piloto => {
      let tr = document.createElement('tr');
      
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

      tr.appendChild(posicion);
      tr.appendChild(id);
      tr.appendChild(nombre);
      tr.appendChild(nacionalidad);
      tr.appendChild(escuderia);
      tr.appendChild(puntos);
      table.appendChild(tr);
    })
  })

  fetch('http://127.0.0.1:3000/api/v1/escuderias')
  .then(response => response.json())
  .then(escuderias => {
    console.log(escuderias);

    let table = document.getElementById('escuderias-data');

    escuderias.forEach(escuderia => {
      let tr = document.createElement('tr');
      let posicion = document.createElement('td');
      posicion.textContent = escuderia.posicion_escuderia;
      let nombre = document.createElement('td');
      nombre.textContent = escuderia.nombre_escuderia;
      let pais = document.createElement('td');
      pais.textContent = escuderia.pais_escuderia;
      let puntos = document.createElement('td');
      puntos.textContent = escuderia.puntos_escuderia;
      tr.appendChild(posicion);
      tr.appendChild(nombre);
      tr.appendChild(pais);
      tr.appendChild(puntos);
      table.appendChild(tr);
    })
  })