const fecha = document.querySelector('#fecha');
const inputNombre = document.querySelector('#input-name');
const botonNombre = document.querySelector('#add_name');
const spanNombre = document.querySelector('#span-name');
const nombre = document.querySelector('#nombre');
const inputTarea = document.querySelector('#input-tarea');
const lista = document.querySelector('#lista');
const addTarea = document.querySelector('#add_tarea');
const btnRealizado = lista.querySelector('.fa-regular');

let listaTareas = JSON.parse(localStorage.getItem("ListaTareas")) || [];
let nombreGuardado = localStorage.getItem("Nombre");

console.log(btnRealizado)

if(listaTareas){
pintarTareas(listaTareas)
}

if(nombreGuardado){
    nombre.textContent = nombreGuardado
    spanNombre.style.display = 'none';
}

botonNombre.addEventListener('click', function() {
    const nombreInput = inputNombre.value;
    nombre.textContent = nombreInput
    spanNombre.style.display = 'none';
    localStorage.setItem('Nombre', nombreInput);
});
addTarea.addEventListener('click', addNuevaTarea);

lista.addEventListener('click', tareaPulsada);




function addNuevaTarea() {
    const tarea = {
        id: listaTareas.length ? listaTareas[listaTareas.length - 1].id + 1 : 1,
        tarea: inputTarea.value,
        realizada: false
    }
    console.log(listaTareas)
    listaTareas.push(tarea);
    localStorage.setItem("ListaTareas", JSON.stringify(listaTareas));
    pintarTareas(listaTareas);
}

function pintarTareas(lisaTareasPintar){
    const fragment = document.createDocumentFragment();
    lista.innerHTML = "";

    lisaTareasPintar.forEach(tarea => {
        const li = document.createElement('li');
        const iRealizado = document.createElement('i');
        const p = document.createElement('p');
        const iEliminado = document.createElement('i');
        if(tarea.realizada){
            iRealizado.classList.add('line-through')
        }
        li.id = tarea.id;
        iRealizado.classList.add("fa-regular", "fa-circle");
        iRealizado.dataset.id_tarea = tarea.id;
        p.classList.add("texto_tarea");
        p.textContent = tarea.tarea;
        iEliminado.classList.add("fa-solid", "fa-trash");
        iEliminado.dataset.id_tarea = tarea.id;


        li.append(iRealizado,p,iEliminado);
        fragment.append(li);
    });

    lista.append(fragment);

}//22

function tareaPulsada(event){

switch (event.target.classList.item(0)) {
    case "fa-regular":
        console.log(event.target)
        realizar(event)
        console.log("relizar")
        break;
    case "fa-solid":
        console.log("borrar")
        break;
}


}

function realizar(event) {

    const idTareaSeleccionada = event.target.dataset.id_tarea;
    const tareaSeleccionada = document.getElementById(idTareaSeleccionada);
    const pSeleccionado = tareaSeleccionada.querySelector('.texto_tarea');
    const iSeleccionado = tareaSeleccionada.querySelector('.fa-regular');

    if(pSeleccionado.classList.item(1)){
        pSeleccionado.classList.remove('line-through');
        iSeleccionado.classList.remove('fa-check-circle');
        iSeleccionado.classList.add('fa-circle');

        
    }else{
        pSeleccionado.classList.add('line-through')
        iSeleccionado.classList.remove('fa-circle');
        iSeleccionado.classList.add('fa-check-circle');
    }

}

