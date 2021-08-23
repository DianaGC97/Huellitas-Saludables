const carrito = document.querySelector('.carrito')
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarrito = document.querySelector('#vaciar-carrito')
const listaProductos = document.querySelector('.container')
const carritoImg = document.querySelector('#img-carrito')
const total = document.querySelector('.suma-total')
let productosCarrito = []
let sum = 0

cargarListeners();
function cargarListeners(){
    //mostrar los curos del localStorage
    document.addEventListener('DOMContentLoaded', ()=>{
        productosCarrito = JSON.parse( localStorage.getItem('carrito')) || [];
        carritoHTML();
    })

    //mostrar el carrito al hacer click en el icono
    carritoImg.addEventListener('click',()=>{
        if(carrito.classList.contains('activo')){
            carrito.classList.remove('activo')
        }else{
            carrito.classList.add('activo')
        }
    })

    //agregar producto al darle comprar 
    listaProductos.addEventListener('click', agregarProducto)

    //eliminar cursos del producto 
    carrito.addEventListener('click', eliminarProducto);

    //vaciar carrito
    vaciarCarrito.addEventListener('click',(e)=>{
        e.preventDefault;
        productosCarrito = [];
        sum = 0
        total.innerHTML = `<h3>${sum}</h3>`
        limpiar();
        sincronizarStorage();
    })
}



//funciones

function agregarProducto(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const productoSeleccionado = e.target.parentElement
        console.log(productoSeleccionado)
        leerCard(productoSeleccionado);
    }
}

function eliminarProducto(e){
    e.preventDefault()
    if(e.target.classList.contains('borrar')){
        const productoId = e.target.getAttribute('data-id');
        //eliminarlo del arreglo por el data-id
        productosCarrito = productosCarrito.filter(producto => producto.id !== productoId);

        ///////////////////////////
        sumarTodo();
        total.innerHTML = `<h3>${sum}</h3>`
        
        carritoHTML();
    }
}

//leer el contenido del card
function leerCard(producto){
    //crear objeto con el contenido del producto
    const infoProducto = {
        imagen: producto.querySelector('img').src,
        titulo: producto.querySelector('p').textContent,
        precio: producto.querySelector('h3').textContent,
        id: producto.querySelector('button').getAttribute('data-id'),
        cantidad: 1,
        precioTotal: 0
    }

    //suma del total de veces de un producto
    let precio = parseFloat(infoProducto.precio).toFixed(3)
    let cantidad = parseFloat(infoProducto.cantidad)
    infoProducto.precioTotal = precio


    //revisar si el elemento existe
    const existe = productosCarrito.some( producto => producto.id == infoProducto.id)
    if(existe){
        //aumentar la cantidad del producto
        const productos = productosCarrito.map(producto =>{
            if(producto.id == infoProducto.id){
                producto.cantidad ++;
                let cantidad = parseFloat(producto.cantidad)
                let totalPorProducto = (precio * cantidad).toFixed(3)
                producto.precioTotal = totalPorProducto
                return producto;// retorna el objeto con la cantidad modificada
                //hacer suma de todo
            }else{
                return producto;// retorna el objeto original
                
            }
        })
        productosCarrito = [...productos]
    }else{
        //se agregan los elemnetos al carrito
        productosCarrito = [...productosCarrito, infoProducto]
        //hacer suma de todo
        producto.precioTotal = precio
    }
    
    carritoHTML()
}


//mostrar el carrito en el html
function carritoHTML(){
    //limpiar el html
    limpiar()

    productosCarrito.forEach(producto =>{
        const { imagen, titulo, precio, cantidad, id, precioTotal} = producto
        const row = document.createElement('tr')
        row.innerHTML  =  `
        <td><img src="${imagen}" width="100px"></td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td class="no-ver">${precioTotal}</td>
        <td><a href="#" class="borrar" data-id="${id}"> X </a></td>`

        //agregar el html del carrito en el tbody
        contenedorCarrito.appendChild(row)

        sumarTodo();

        total.innerHTML = `<h3>${sum.toFixed(3)}</h3>`
        
    })

    //agregar al storage 
    sincronizarStorage();
}

function sumarTodo(){
    //agregar la suma de todos los productos y los suma 
    sum = 0
    for (let i = 0; i < productosCarrito.length; i++) {
        sum += parseFloat(productosCarrito[i].precioTotal);
    }
}

// eliminar los cursos repetidos 
function limpiar(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}

//para que se gurade al recargar la pagina
function sincronizarStorage(){
    localStorage.setItem('carrito', JSON.stringify( productosCarrito))
}