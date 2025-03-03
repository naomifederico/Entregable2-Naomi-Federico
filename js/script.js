const título = document.getElementById("título");
título.innerText = "Tienda online Mi Atelier 3D";

let productos = JSON.parse(localStorage.getItem("productos")) || [];

const agregarProducto = (producto) => {
    productos.push(producto);
    localStorage.setItem("productos", JSON.stringify(productos));
    container.innerHTML = "";
    mostrarProductos();
};

const eliminarProducto = (nombre) => {
    productos = productos.filter(el => el.producto !== nombre);
    localStorage.setItem("productos", JSON.stringify(productos));
    mostrarProductos();
};

const miFormulario = document.getElementById("formulario");
miFormulario.addEventListener("submit", (e) => {
    e.preventDefault();
    const producto = e.target[0].value;
    const precio = e.target[1].value;

    const nuevoProducto = {
        producto,
        precio
    };

    console.log("Este es el nuevo producto: ", nuevoProducto);

    agregarProducto(nuevoProducto);

    e.target[0].value = "";
    e.target[1].value = "";
});
const crearCard = (producto) => {
    const card = document.createElement("div");
    card.className = "card";

    const nombreProducto = document.createElement("p");
    nombreProducto.innerText = producto.producto;

    const precio = document.createElement("p");
    precio.innerText = `${producto.precio}`;

    const eliminarProductoBtn = document.createElement("button");
    eliminarProductoBtn.innerText = "Eliminar producto";
    eliminarProductoBtn.addEventListener("click", () => eliminarProducto(producto.producto));

    card.appendChild(nombreProducto);
    card.appendChild(precio);
    card.appendChild(eliminarProductoBtn);

    container.appendChild(card);
};


const mostrarProductos = () => {

    container.innerHTML = "";

    if (productos.length > 0) {
        productos.forEach(element => {
            crearCard(element);
        });
    } else {
        const mensajeNoProductos = document.createElement("p");
        mensajeNoProductos.innerText = "No hay productos disponibles.";
        container.appendChild(mensajeNoProductos);
    }
};


const container = document.getElementById("productos-container");


mostrarProductos();