const título = document.getElementById("título");
título.innerText = "Tienda online Mi Atelier 3D";

const container = document.getElementById("productos-container");
let productos = [];

const guardarProductoEnLocalStorage = (producto) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        productos.push(producto);
        localStorage.setItem("productos", JSON.stringify(productos));
        resolve("Producto guardado exitosamente");
      } catch (error) {
        reject("Error al guardar producto");
      }
    }, 500);
  });
};

const cargarProductosDesdeJSON = async () => {
  try {
    const response = await fetch('productos.json');
    if (!response.ok) throw new Error('No se pudo cargar el archivo JSON');

    const productosExistentes = await response.json();
    console.log("Productos cargados desde JSON:", productosExistentes);

    localStorage.setItem("productos", JSON.stringify(productosExistentes));
    productos = productosExistentes;
  } catch (error) {
    console.error("Error al cargar JSON:", error);
  }
};

const mostrarProductos = () => {
  container.innerHTML = "";

  if (productos.length > 0) {
    productos.forEach(crearCard);
  } else {
    const mensaje = document.createElement("p");
    mensaje.innerText = "No hay productos disponibles.";
    container.appendChild(mensaje);
  }
};

const crearCard = (producto) => {
  const card = document.createElement("div");
  card.className = "card";

  const nombreProducto = document.createElement("p");
  nombreProducto.innerText = producto.producto.toUpperCase();

  const precio = document.createElement("p");
  precio.innerText = `$${producto.precio}`;

  const eliminarProductoBtn = document.createElement("button");
  eliminarProductoBtn.innerText = "Eliminar producto";
  eliminarProductoBtn.addEventListener("click", async () => {
    try {
      await eliminarProducto(producto.producto);
    } catch (error) {
      console.error("Error al eliminar el producto: ", error);
    }
  });

  card.appendChild(nombreProducto);
  card.appendChild(precio);
  card.appendChild(eliminarProductoBtn);

  container.appendChild(card);
};

const agregarProducto = async (producto) => {
  try {
    const mensaje = await guardarProductoEnLocalStorage(producto);
    console.log(mensaje);
    container.innerHTML = "";
    mostrarProductos();

    Swal.fire({
      icon: 'success',
      title: '¡Producto agregado!',
      text: 'El producto fue guardado correctamente.',
      showConfirmButton: false,
      timer: 2000
    });

  } catch (error) {
    console.error("Error al agregar producto: ", error);


    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'No se pudo guardar el producto.'
    });

  } finally {
    console.log("Intento de agregar producto completado.");
  }
};

const eliminarProducto = async (nombre) => {
  await new Promise((resolve) => {
    setTimeout(() => {
      productos = productos.filter(p => p.producto !== nombre);
      localStorage.setItem("productos", JSON.stringify(productos));
      resolve();
    }, 500);
    Swal.fire({
      icon: 'info',
      title: 'Producto eliminado',
      text: 'El producto fue eliminado de la tienda.',
      showConfirmButton: false,
      timer: 1500
    });
  });

  mostrarProductos();
};


const miFormulario = document.getElementById("formulario");
miFormulario.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nombre = e.target[0].value;
  const precio = e.target[1].value;

  const nuevoProducto = { producto: nombre, precio };
  await agregarProducto(nuevoProducto);

  e.target.reset();
});

const iniciarProgramación = async () => {
  if (!localStorage.getItem("productos")) {
    await cargarProductosDesdeJSON();
  } else {
    productos = JSON.parse(localStorage.getItem("productos"));
  }
  mostrarProductos();
};

iniciarProgramación();