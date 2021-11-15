// * index.html

//VARIABLES
fadeCart = [];
totalPriceCart = [];

// SELECTORES 
//Selectores index.html
const gridProd = document.querySelector('#productos__row');
const tableCart = document.querySelector('#table-cart tbody');
const footerCart = document.getElementById('footer-empty-cart');
const total = 0;


// LISTENERS
document.addEventListener('DOMContentLoaded', () => { 
    const cartStorage = JSON.parse(localStorage.getItem('cart'));
    // Se asigna el contenido del carrito al Storage
    fadeCart = cartStorage || []; 
       
});

//PreventDefault generales
$(document).ready(function() {

    $('#empty-cart').click(function(e){
        e.preventDefault();
    });

    //AJAX
    $.ajax({
        method: 'GET',
        contentType: 'JSON',
        url: 'app/productos.json',
        success: function(productos, textStatus, xhr){
            absorbProducts(productos);
            console.log(textStatus);
            console.log(xhr);
        },
        error: function(xhr, textStatus, error){
            console.log(xhr);
            console.log(textStatus);
            console.log(error);
        }
});

});

//Boton vaciado completo de carrito
$('#empty-cart').click(function(){
    //Vaciar el carrito completo
    fadeCart = [];
    
    // Se actualiza el HTML y Storage con el fadeCart
    updateCartHTML(); 
    updateStorage();

})

//Botón agregar producto
gridProd.addEventListener('click', addProduct);
//Botón icono trash para eliminar producto
tableCart.addEventListener('click', deleteProd);

//FUNCIONES
//Eliminar producto trash icon
function deleteProd(e){
    e.preventDefault();
    if(e.target.nodeName === "I"){
        //Identificar el producto a eliminar 
        const id = e.target.closest('a').dataset.id;

        //Modificar carrito
        const cartModified = fadeCart.filter(producto => producto.id !== id);
		fadeCart = [...cartModified];
    
        // Se actualiza el HTML y Storage con el fadeCart
        updateCartHTML(); 
        updateStorage();
    }
};

//Agregar productos al carrito
function addProduct(e){
    e.preventDefault();

    if(e.target.classList.contains("btn-comprar")){
        const infoProd = e.target.parentElement;
                  
        const selectedProd = {
        nombre: infoProd.querySelector('h4').textContent,
        precio: infoProd.querySelector('p.producto__texto--precio').textContent,
        cantidad: 1,
        id: infoProd.querySelector('a').getAttribute('data-id'), 
        };

        // Condición para +1 a la cantidad si el ID existe
        if(fadeCart.hasOwnProperty(selectedProd.id)){
            selectedProd.cantidad = fadeCart[selectedProd.id].cantidad + 1
        }

        // Condición para impedir clonación de productos
        const index = fadeCart.findIndex(producto => producto.id === selectedProd.id);
        
        if(index !== -1){
            const newFadeCart = fadeCart.map(producto => {
                if(producto.id === selectedProd.id){
                    fadeCart[index].cantidad++;
                }
                return producto;
            });
            
            fadeCart = [...newFadeCart];
        } else {
            // Se pushean productos al arreglo fadeCart
            fadeCart.push(selectedProd);
        }

        // Se actualiza el HTML y Storage con el fadeCart
        updateCartHTML(); 
        updateStorage();
     }
};

// Actualizar productos en el carrito de compras
function updateCartHTML(){
    tableCart.innerHTML = '';
    
    fadeCart.forEach(producto => {
        const {nombre, precio, cantidad, id} = producto;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            ${nombre}
        </td>
        <td>
            ${precio}
        <td>
            ${cantidad}
        </td>
        <td>
            <a href="#" class="delete-product" data-id="${id}"><i class="fas fa-trash-alt"></i></a>
        </td>
        `
        tableCart.appendChild(row);
    });

    updateFooterCart();
}

// Actualizar Storage
function updateStorage(){
    localStorage.setItem('cart', JSON.stringify(fadeCart))
}

// Absorber productos del archivo productos.js e instertarlos en html
function absorbProducts(productos){
    productos.forEach(producto => {

        const html = `
        <div class="col-6 col-md-4 card cardProducto productos__col">
            <img src="${producto.imagen}" alt="${producto.alt}" class="productos__img  img-fluid desvanecer">
            <div class="info-card cardProductoInfo productos__texto">
                <h4>${producto.nombre}</h4>
                <p>${producto.descripcion}</p>
                <p class="producto__texto--precio">${producto.precio}</p>
                <a href="#" class="u-full-width btn btn-primary input btn-comprar btn-buy" data-id="${producto.id}">Agregar al carrito</a>
            </div>
        </div>`

        gridProd.innerHTML += html;
    });
}; 


//Modificar footer del carrito y agregar cantidad de productos y total
const updateFooterCart = () => {

    //Calcular cantidad de productos en el carrito
    const nCantidad = fadeCart.reduce(function (acc, value) {
        return acc + value.cantidad}, 0);

    //Calcular precio total del carrito
    const nTotal = fadeCart.reduce(function (acc,value){
        return acc + value.precio * value.cantidad
    },0);
        
    footerCart.innerHTML = '';    
    if (fadeCart.length === 0) {
            footerCart.innerHTML = `
            <th scope="row" colspan="5">Carrito vacío</th>
            `
    } else {
            footerCart.innerHTML = `
            <td>
                Total
            </td>
            <td>
                ${nTotal}
            <td>
                ${nCantidad}
            </td>
            <td>
            </td>
            `
    };

};

//ANIMACIONES
//Botón flecha 
$('#btn-arrow')
    .css(
    "cursor", "pointer")
    .click(function(){
    $('html, body')
    .animate({scrollTop : 0}, 2000)});

$('#empty-cart')
    .css(
        "background-color", "#ABBF29",
        "border", "solid #ABBF29 0.09em",
        "margin", "0.5em",
        "padding", "0.5em"
    );

$('#empty-cart').mouseover(function() {
    $(this)
    .css(
        'background-color', '#919467',
        'border', 'none');
    }).mouseout(function() {
        $(this)
        .css(
            "background-color", "#ABBF29",
            "margin", "0.5em",
            "padding", "0.5em",
            "border", "0.05em solid #ABBF29");
    });

