window.onload = function(){
    mostrarCarreras();
}
mostrarCarreras = function(){
    fetch('http://localhost:5000/api/v1/Carreras')
    .then(response => response.json())
    .then(carreras => {
        console.log(carreras);

        let tabla = document.getElementById('datos-Carreras');
        tabla.innerHTML= '';
        carreras.forEach(carreras => {
            let tr = document.createElement('tr');
            tr.id = 'carreras-' + carreras.id;
            let th = document.createElement('th');
            th.textContent = carreras.id;
            let nombre = document.createElement('td');
            nombre.textContent = carreras.name;
            let plata = document.createElement('td');
            plata.textContent = carreras.money;

            let borrar = document.createElement('td');
            let button = document.createElement('button');
            button.textContent= 'Borrar';
            button.className = 'button is-danger is-small';
            button.onclick = function(){
                deleteCarrera();
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
deleteCarrera = function(id){
    alert('Borrando carrera' + id)
    fetch('http://localhost:5000/api/v1/Carreras' + id, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(carreras => {
        console.log(carreras);
        let tr = document.getElementById('carreras-' + response.id);
        tr.remove();
    });
}