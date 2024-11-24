window.onload = function(){
    mostrarEscuderias();
}
mostrarEscuderias = function(){
    fetch('http://localhost:5000/api/v1/Escuderia')
    .then(response => response.json())
    .then(escuderias => {
        console.log(escuderias);

        let tabla = document.getElementById('datos-Escuderia');
        tabla.innerHTML= '';
        escuderias.forEach(escuderia => {
            let tr = document.createElement('tr');
            tr.id = 'escuderia-' + escuderia.id;
            let th = document.createElement('th');
            th.textContent = escuderia.id;
            let nombre = document.createElement('td');
            nombre.textContent = escuderia.name;
            let plata = document.createElement('td');
            plata.textContent = escuderia.money;

            let borrar = document.createElement('td');
            let button = document.createElement('button');
            button.textContent= 'Borrar';
            button.className = 'button is-danger is-small';
            button.onclick = function(){
                deleteEscuderia();
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
deleteEscuderia = function(id){
    alert('Borrando escuderia' + id)
    fetch('http://localhost:5000/api/v1/Escuderia' + id, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(escuderias => {
        console.log(escuderias);
        let tr = document.getElementById('escuderia-' + response.id);
        tr.remove();
    });
}