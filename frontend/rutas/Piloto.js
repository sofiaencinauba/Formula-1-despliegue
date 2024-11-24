window.onload = function(){
    mostrarPiloto();
}

mostrarPiloto = function(){
    fetch('http://localhost:5000/api/v1/Piloto')
    .then(response => response.json())
    .then(piloto => {
        console.log(piloto);

        let tabla = document.getElementById('datos-Pilotos');
        tabla.innerHTML= '';
        piloto.forEach(piloto => {
            let tr = document.createElement('tr');
            tr.id = 'piloto-' + piloto.id;
            let th = document.createElement('th');
            th.textContent = piloto.id;
            let nombre = document.createElement('td');
            nombre.textContent = piloto.name;
            let plata = document.createElement('td');
            plata.textContent = piloto.money;

            let borrar = document.createElement('td');
            let button = document.createElement('button');
            button.textContent= 'Borrar';
            button.className = 'button is-danger is-small';
            button.onclick = function(){
                deletePiloto();
            };
            borrar.appendChild(button);

            tr.appendChild(th);
            tr.appendChild(nombre);
            tr.appendChild(plata);
            tr.appendChild(borrar);
            tabla.appendChild(tr);
        });
    })
}
deletePiloto = function(id){
    alert('Borrando piloto' + id)
    fetch('http://localhost:5000/api/v1/Piloto' + id, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(piloto => {
        console.log(piloto);
        let tr = document.getElementById('piloto-' + response.id);
        tr.remove();
    });
}