//variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listacarrito = document.querySelector('#lista-carrito tbody');
const vaciarcarrito = document.getElementById('vaciar-carrito')



//listener

cargarEventListener();

function cargarEventListener(){

    cursos.addEventListener('click', seleccionarCurso);
    carrito.addEventListener('click', eliminarcurso);
    vaciarcarrito.addEventListener('click', vaciarCarrito);

    document.addEventListener('DOMContentLoaded', leerLocalStorage);


}



//funciones

    //añadiendo curso al carrito

    function seleccionarCurso(e){
        e.preventDefault();
        if(e.target.classList.contains('agregar-carrito')){
            
            const curso = e.target.parentElement.parentElement;

            leerDatos(curso);
            
        }

    }

    //leendo datos
    function leerDatos(curso){

        const infocurso = {
            imagen : curso.querySelector('img').src,
            titulo : curso.querySelector('h4').textContent,
            precio : curso.querySelector('.precio span').textContent,
            id: curso.querySelector('a').getAttribute('data-id'),
        }

        insertarCurso(infocurso);
    }

    //insertando los datos del curso al carrito
    function insertarCurso(curso){

        const contenedor = document.createElement('tr');

        contenedor.innerHTML = `
            <td>
                <img src= "${curso.imagen}">
            </td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>
                <a href = "#" class = "borrar-curso" data-id="${curso.id}"> X </a>
            </td>
        `;

        listacarrito.appendChild(contenedor);
        alert('se agrego curso al carrito')
        guardarCursoLocalstorage(curso);

    }


    //eliminando curso del carrito

    function eliminarcurso(e){
        e.preventDefault();

        if(e.target.classList.contains('borrar-curso')){
            
            e.target.parentElement.parentElement.remove();
        }

        borrarCursoLocalStorage(e.target.getAttribute('data-id'));
    }

    //vaciar carrito

    function vaciarCarrito(){
        
        //forma lenta
        // listacarrito.innerHTML = ``;

        //forma recomendada
        while(listacarrito.firstChild){
            listacarrito.removeChild(listacarrito.firstChild);
        }
        

        vaciarCursosLocalStorage();

        return false;
    }


    //almacenando curso en localStorage

    function guardarCursoLocalstorage(curso){
        let cursos;

        cursos = obtenerCursosLocalStorage();

        cursos.push(curso)

        localStorage.setItem('cursos' , JSON.stringify(cursos));
    }

    function obtenerCursosLocalStorage(){

        let cursosLS;

            if(localStorage.getItem('cursos')){
                cursosLS = JSON.parse(localStorage.getItem('cursos'));
            }else{
                cursosLS = [];
            }
            return cursosLS;
    }

    //cargar del localStorage los cursos 

    function leerLocalStorage(){
        let cursosLS;

        cursosLS = obtenerCursosLocalStorage();

        cargardatosLocalStorage(cursosLS);
    }

    function cargardatosLocalStorage(cursosLS){

        cursosLS.forEach(function(curso){

            const contenedor = document.createElement('tr');

            contenedor.innerHTML = `
            <td>
                <img src= "${curso.imagen}">
            </td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>
                <a href = "#" class = "borrar-curso" data-id="${curso.id}"> X </a>
            </td>
            `;

            listacarrito.appendChild(contenedor);
        })

    }

    //borrando del localStorage

    function borrarCursoLocalStorage(idcurso){
        let cursosLS;

        cursosLS = obtenerCursosLocalStorage();

        cursosLS.forEach(function(curso, index){
         
            if(curso.id === idcurso){

                cursosLS.splice(index, 1);
                console.log(curso.id);
                console.log(cursosLS);
            }
        });

        console.log(cursosLS);
        localStorage.setItem('cursos', JSON.stringify(cursosLS));

    }


    // vaciar curos del localStorage

    function vaciarCursosLocalStorage(){

        localStorage.removeItem('cursos');
    }