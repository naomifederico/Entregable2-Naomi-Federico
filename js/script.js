let opcion;
const listadeProductos = [];
const listadePrecios = [];

function verProductos() {
    if (listadeProductos.length === 0) {
        alert("No hay productos disponibles.");
    } else {
        alert("Estos son los productos disponibles:");
        alert(listadeProductos.join("/n"));
    };
};
function verListadePrecios() {
    if (listadePrecios.length <= 1) {
        alert("No hay productos disponibles por lo que el listado de precios no se puede proporcionar.");

    } else {
        alert("Esta es la lista de precios de nuestra tienda");
        alert(listadePrecios.join("/n"));
    }
}
function efectuarPago() {
    let confirmacion = confirm("¿Deseas confirmar el pago?");
    if (confirmacion) {
        alert("¡Pago realizado con éxito!");
      } else {
        alert("Pago cancelado.");
}
}
do {
    opcion = parseInt(prompt("Bienvenido a nuestra tienda\n\n1. Para ver los productos.\n2. Para ver lista de precios.\n3. Para realizar una compra.\n\n Para salir ingrese 0"))
    switch (opcion) {
        case 0:
            alert("Gracias por visitar nuestra tienda.");
            break;
        case 1:
            verProductos();
            break;
        case 2:
            verListadePrecios();
            break;
        case 3:
            efectuarPago();
            break;
        default:
            alert("Opción inválida.")
            break;
    };
} while (opcion !== 0);

