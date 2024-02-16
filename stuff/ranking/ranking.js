// preguntar al usuario que introduzca un nombre
var nombre = prompt('Introduce un nombre: ');
// verificar si ha introducido un nombre
if (!!nombre) {
    // obtener lista mediante un archivo json, llamaremos nombres al JSON creado
    var nombresGuardados = JSON.parse(localStorage.getItem('nombres'));
    // agregamos al json el nombre del usuario
    nombresGuardados.push(nombre);
    // guardar la lista actualizada en el localStorage
    localStorage.setItem('nombres', JSON.stringify(nombresGuardados));
    // llamamos a una funcion para actualizar el div donde se guarda el nombre
    actualizarNombresEnRanking(nombresGuardados);
} else {
    // por si acaso no han introducido nombre xd
    console.log('No se proporcionó un nombre.');
}
// ctualizaremos el contenido del div de ranking con la lista de nombres
function actualizarNombresEnRanking(nombres) {
    // obtenemos los elementos del div de ranking
    var rankingDiv = document.getElementById('ranking');
    // creamos un contenido html con la lista de nombres
    var contenidoHTML = '';
    nombres.forEach(function (nombre, index) {
        // si quereis que la lista empiece por 1 sumar 1 al index, tal que asi (index + 1)
        contenidoHTML += '<div style="text-align: center;font-size: 24px;color: black;">' + index + '. ' + nombre + '</div><br>';
    });
    // por ultimo agregar el contenido HTML al div de ranking
    rankingDiv.innerHTML = contenidoHTML;
}
