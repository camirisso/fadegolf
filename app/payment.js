// * payment.html


//SELECTORES

const paymentCard = document.querySelector('#tarjeta'), 
      btnOpenForm = document.querySelector('#btn-open-form'),
      dataForm = document.querySelector('#formulario-tarjeta'),
      cardNumber = document.querySelector('#tarjeta .numero'),
      cardName = document.querySelector('#tarjeta .nombre'),
      cardLogo = document.querySelector('#logo-marca'),
      expirationMonth = document.querySelector('#tarjeta .month'),
      expirationYear = document.querySelector('#tarjeta .year'),
      cvv = document.querySelector('#tarjeta .code');

// LISTENERS
//Botón apertura del formulario
btnOpenForm.addEventListener('click', () => {
    btnOpenForm.classList.toggle('active');
    dataForm.classList.toggle('active');
});

//Número de tarjeta
dataForm.inputNumero.addEventListener('keyup', (e) => {
    let inputValue = e.target.value;
    dataForm.inputNumero.value = inputValue

    //Eliminar espacios en blanco
    .replace(/\s/g, '')
    //Eliminar letras
    .replace(/\D/g, '')
    //Añadir espacio cada 4 números
    .replace(/([0-9]{4})/g, '$1 ')
    //Quitar el ultimo espacio
    .trim();

    cardNumber.textContent = inputValue;

    //Completar cardNumber si el usuario borra completamente los datos ingresados
    if(inputValue == ''){
        cardNumber.textContent = '#### #### #### ####';

        cardLogo.innerHTML = '';
    }

    //Agregar logo de Visa si el primer número ingresado por el usuario es 4
    if(inputValue[0] == 4){
        cardLogo.innerHTML = '';
        const img = document.createElement('img');
        img.src = "img/visa.png";

        cardLogo.appendChild(img);
    } //Agregar logo de Mastercard si el primer número ingresado por el usuario es 4 
    else if(inputValue[0] == 5){
        cardLogo.innerHTML = '';
        const img = document.createElement('img');
        img.src = "img/mastercard.png";

        cardLogo.appendChild(img);
    }
});


//Nombre tarjeta
dataForm.inputNombre.addEventListener('keyup', (e) => {
    let inputValue = e.target.value;
    dataForm.inputNombre.value = inputValue

    //Eliminar numeros
    .replace(/[0-9]/g, '');
    cardName.textContent = inputValue;

    //Completar cardName si el usuario borra completamente los datos ingresados
    if(inputValue == ''){
        cardName.textContent = 'Juan Perez';
    }
});

//Mes expiración tarjeta
dataForm.selectMonth.addEventListener('change', (e) => {
    expirationMonth.textContent = e.target.value;

});  

//Año expiración tarjeta
dataForm.selectYear.addEventListener('change', (e) => {
    expirationYear.textContent = e.target.value.slice(2);
});  

//CVV tarjeta
dataForm.inputCVV.addEventListener('keyup', (e) => {
    dataForm.inputCVV.value = dataForm.inputCVV.value
    //Eliminar espacios en blanco
    .replace(/\s/g, '')
    //Eliminar letras
    .replace(/\D/g, '');

    cvv.textContent = inputValue;
});

//FUNCIONES
//Rellenar los select del mes en payment.html 
for(let i = 1; i <= 12; i++){
    let option = document.createElement('option');
    option.value = i;
    option.innerText = i;

    dataForm.selectMonth.appendChild(option);
};

//Rellenar los select de año en payment.html 
actualYear = new Date().getFullYear();
for(let i = actualYear; i <= actualYear + 8; i++){
    let option = document.createElement('option');
    option.value = i;
    option.innerText = i;

    dataForm.selectYear.appendChild(option);
};

$('#btn-send').click( 
      swal("Pago acreditado", "Gracias por su compra!", "success")
);
