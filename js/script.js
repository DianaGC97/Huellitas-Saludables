const verMas = document.querySelector('.ver-mas');
const lista = document.querySelector('.lista')

cargarListeners();
function cargarListeners(){
    verMas.addEventListener('click', mostrar)
}

console.log(verMas)

function mostrar(e){
    e.preventDefault;
    verMas.textContent = 'Ver menos...'
    console.log(e.target)
    console.log('sirve')
    if (lista.classList.contains('active')){
        lista.classList.remove('active')
        lista.classList.add('no-active')
    }else{
        lista.classList.remove('no-active')
        lista.classList.add('active')
        verMas.textContent = 'Ver más...'
    }
}