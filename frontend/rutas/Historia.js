window.onload = function(){
    mostrarHistoria();
}

mostrarHistoria = function(){
    fetch('http://localhost:5000/api/v1/Historia')
    .then(response => response.json())
    .then(historia => {
        console.log(historia);

        let tabla = document.getElementById('datos-Historia');
        tabla.innerHTML= '';
        historia.forEach(historia => {
            let tr = document.createElement('tr');
            tr.id = 'historia-' + historia.id;
            let th = document.createElement('th');
            th.textContent = historia.id;
            let nombre = document.createElement('td');
            nombre.textContent = historia.name;
            let plata = document.createElement('td');
            plata.textContent = historia.money;

            let borrar = document.createElement('td');
            let button = document.createElement('button');
            button.textContent= 'Borrar';
            button.className = 'button is-danger is-small';
            button.onclick = function(){
                deleteHistoria();
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
deleteHistoria = function(id){
    alert('Borrando Historia' + id)
    fetch('http://localhost:5000/api/v1/Historia' + id, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(historia => {
        console.log(historia);
        let tr = document.getElementById('historia-' + response.id);
        tr.remove();
    });
}