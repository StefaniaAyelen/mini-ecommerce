let productosTienda = [
{id: 1, titulo: "Bocaditos", precio: 1500, img: "imgs/bocaditos.png"},
{id: 2, titulo: "Brownie", precio: 5000, img: "imgs/brownie.png"},
{id: 3, titulo: "Chessecake", precio: 10000, img: "imgs/chesecake.png"},
{id: 4, titulo: "Chocotorta", precio: 8000, img: "imgs/chocotorta.png"},
{id: 5, titulo: "Cookies", precio: 2000, img: "imgs/cookie.png"},
{id: 6, titulo: "Flan", precio: 6000, img: "imgs/flan.png"},
{id: 7, titulo: "Huevo pascua", precio: 8000, img: "imgs/huevopascua.png"},
{id: 8, titulo: "Red velvet", precio: 9000, img: "imgs/redVelvet.png"},
{id: 9, titulo: "Roll de canella", precio: 3000, img: "imgs/rollCanela.png"},
{id: 10, titulo: "Rosca pascua", precio: 7000, img: "imgs/roscapascua.png"},
{id: 11, titulo: "Torta oreo", precio: 12000, img: "imgs/tortaOreo.png"},
{id: 12, titulo: "Torta", precio: 15000, img: "imgs/tortapersonalizada.png"},
{id: 13, titulo: "Lemon Pay", precio: 20000, img: "imgs/lemon.png"},
{id: 14, titulo: "Rogel", precio: 25000, img: "imgs/rogel.png"},
{id: 15, titulo: "Torta de Manzana", precio: 30000, img: "imgs/tortamanzana.png"},
{id: 16, titulo: "Carrot Cake", precio: 27000, img: "imgs/zanahoria.png"},
{id: 17, titulo: "Arrollado frutal", precio: 15000, img: "imgs/arrollado.png"},
{id: 18, titulo: "Torta Francia", precio: 35000, img: "imgs/francia.png"},
{id: 19, titulo: "Budin de Chocolate", precio: 17000, img: "imgs/budinchocolate.png"},
{id: 20, titulo: "Pasta Frola", precio: 15000, img: "imgs/pastafrola.jpeg"},
{id: 21, titulo: "Macarons", precio: 5000, img: "imgs/macarons.png"},
{id: 22, titulo: "Tarta de frutos rojos", precio: 27000, img: "imgs/tartafrutos.png"},
{id: 23, titulo: "Croissant", precio: 9000, img: "imgs/croissant.png"},
]



// VARIABLES GLOBALES
let carrito = [];
let cantidad = 0;
let productoContainer = document.querySelector(".container-productos");
let barraBusqueda = document.querySelector(".barra-busqueda");
let itemsCarrito = document.getElementById("items-carrito");
let totalCarrito = document.querySelector(".total-carrito");


///////////////////////////   MOSTRAR PRODUCTOS   //////////////////////////////////////

function mostrarProductos (array) {
    
    let cartaProducto = "";
    for (let i = 0; i < array.length; i++) {
        cartaProducto += `<div class= "tarjeta-producto">
        <img src=${array[i].img} alt = "imagen-bocaditos" class= "producto">
        <h3>${array[i].titulo}</h3>
        <p>$${array[i].precio}</p>
        <button class = "boton-carrito" onclick = "agregarCarrito(${array[i].id})">Agregar a carrito</button>
        </div>`
    }
    
    productoContainer.innerHTML = cartaProducto;
}


///////////////////////////   BARRA DE BUSQUEDA  //////////////////////////////////////

barraBusqueda.addEventListener("keyup", function(){
    let valorInput = barraBusqueda.value.toLowerCase();
    console.log(barraBusqueda.value);
    let productosFiltrado = productosTienda.filter(producto => producto.titulo.toLowerCase().includes(valorInput));
    mostrarProductos(productosFiltrado);
})


///////////////////////////   CARRITO   //////////////////////////////////////

function agregarCarrito (id) {
    console.log(`El id del producto es: ${id}`)
    let nuevoProducto = productosTienda.find(producto => producto.id === id);
    let productoCarrito = carrito.find(objeto => objeto.id === id);
    if (productoCarrito) {
        productoCarrito.cantidad += 1
    }else{
        nuevoProducto.cantidad = 1;
        carrito.push(nuevoProducto);
    }
    
    localStorage.setItem("carrito", JSON.stringify(carrito)) //Pasamos el array a String
    //  y guardamos ese String bajo la clave "carrito"
    
    console.log(nuevoProducto)
    console.log(nuevoProducto.cantidad);
    console.log(carrito);
    mostrarCarrito();
}

function mostrarCarrito() {
    let producto = "";
    carrito.forEach(item => {
        producto += `
        <li class="tarjeta-carrito">
        <p>${item.titulo} - $${item.precio} - Cantidad: ${item.cantidad}</p>
        <button onclick= "eliminarProducto(${item.id})">
        <img src="imgs/basura.png" alt="" width="40" height="40">
        </button>
        </li>
        `
    })
    mostrarTotal()
    itemsCarrito.innerHTML = producto;
    
}

///////////////////////////   ELIMINAR PRODUCTO   //////////////////////////////////////

function eliminarProducto(id) {
    let producto = carrito.find(producto => producto.id === id) //buscamos el producto
    let indice = carrito.findIndex(producto => producto.id === id); //busco el indice del producto para el splice
    
    if (producto) { //si el producto existe
        if (producto.cantidad > 1) {
            producto.cantidad -= 1 //resto la cantidad
        }else{
            carrito.splice(indice, 1);
        }
    }
    localStorage.setItem("carrito", JSON.stringify(carrito))
    mostrarCarrito(); //muestro el carrito actualizado
    mostrarTotal()
    
    
}


///////////////////////////   CALCULAR TOTAL   //////////////////////////////////////

function mostrarTotal() {
    let total = 0;
    let variable = ""
    carrito.forEach(item => {
        total += (item.precio * item.cantidad)
    })
    variable += `<h3>Total: $${total}</h3>
    <button onclick ="vaciarCarrito()">Vaciar carrito</button>`  
    totalCarrito.innerHTML = variable;
}

///////////////////////////   VACIAR CARRITO   //////////////////////////////////////

function vaciarCarrito() {
    carrito = []
    localStorage.setItem("carrito", JSON.stringify([]));
    mostrarCarrito()
    mostrarTotal()
}


///////////////////////////   FUNCION INICIALIZADORA   //////////////////////////////////////

function init() {
    mostrarProductos(productosTienda)

    const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) //Pasamos el String a objeto 
    // y obtenemos el valor guardado bajo la clave "carrito"

    if (carritoGuardado) { //si existe el carrito guardado

        carrito = carritoGuardado //reemplazamos la variable global "carrito" por el carrito recuperado del localStorag
        //  y restauramos el estado del carrito al cargar la pagina

        mostrarCarrito()   
    }
}

init();

