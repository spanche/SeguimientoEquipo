let personas = JSON.parse(localStorage.getItem("personas")) || []; // Arreglo de personas
let tareas = JSON.parse(localStorage.getItem("tareas")) || []; // Arreglo de tareas

var estadoDisplayBtnSeguimiento = 'none';
var indexUpdate = 0;
var ubicationBtnDeleteUser = 'images/delete-user.png';
var ubicationBtnDeleteTaks = 'images/delete-taks.png';
var ubicationBtnUpdateUser = 'images/update-user.png';

function evaluateOptions() {

	let option = document.getElementById("btn-agregar-persona").textContent;

	if (option == "Agregar") {
        agregarPersona();
	} else {
		actualizarPersona();
	}
}

function limpiarCampo(){
	document.getElementById("persona").value = ''; // Muestra el nombre de la persona en el campo de entrada
	document.getElementById("btn-agregar-persona").innerHTML = "Agregar";
}

function agregarPersona() {

	let persona = document.getElementById("persona").value;

	if (persona.length > 0) {
        console.log("Ingrese");

		let nuevaPersona = {persona: persona, comentario: ' ', estadoMarca: false, estadoSeguimiento: false};
		personas.push(nuevaPersona);
		localStorage.setItem("personas", JSON.stringify(personas));
		listarPersonasCreadas();

		// Se limpia campo de la persona a crear
		document.getElementById("persona").value = "";
	}
}

function actualizarPersona() {

	let persona = document.getElementById("persona").value;

	if (persona.length > 0) {
		personas[indexUpdate].persona = document.getElementById("persona").value;
		localStorage.setItem("personas", JSON.stringify(personas)); // Actualizar almacenamiento local
		limpiarCampo();
		listarPersonasCreadas();
	}
}

function listarPersonasCreadas() {
	
	let listaPersonas = document.getElementById("lista-personas");
	listaPersonas.innerHTML = "";

	personas.forEach((persona, index) => {
		let li = document.createElement("li");
		li.className = 'persona-individual';

		let nombrePersona = document.createElement("p");
		nombrePersona.className = 'name-user';

        let eliminarPersona = document.createElement("img");
        eliminarPersona.className = 'btn-delete-user';
        eliminarPersona.src = ubicationBtnDeleteUser;

        let modificarPersona = document.createElement("img");
        modificarPersona.className = 'btn-update-user';
        modificarPersona.src = ubicationBtnUpdateUser;
		modificarPersona.setAttribute('data-index', index); // agrega el atributo data-index

		let tituloPersona = document.createTextNode(`${persona.persona}`);

		eliminarPersona.addEventListener('click', function() {
			personas.splice(index, 1); // Elimina la persona del arreglo
			localStorage.setItem("personas", JSON.stringify(personas)); // Actualiza el almacenamiento local
			listarPersonasCreadas(); // Actualiza la lista de personas en la interfaz de usuario

			// Restablece los valores por defecto del formulario Persona
			limpiarCampo();
		});

		modificarPersona.addEventListener('click', function() {
			indexUpdate = this.getAttribute('data-index'); // obtiene el índice de la persona
			document.getElementById("persona").value = persona.persona; // Muestra el nombre de la persona en el campo de entrada
			document.getElementById("btn-agregar-persona").innerHTML = "Actualizar";
		});

        nombrePersona.appendChild(tituloPersona);
        li.appendChild(nombrePersona);
        li.appendChild(modificarPersona);
        li.appendChild(eliminarPersona);
        listaPersonas.appendChild(li);
	});

}

function CargarPersonasDaily() {
	
	let listaPersonas = document.getElementById("lista-personas");
	listaPersonas.innerHTML = "";

	personas.forEach((persona, index) => {
		let li = document.createElement("li");
		li.className = 'persona-individual';

		let nombrePersona = document.createElement("h2");
		nombrePersona.className = 'titulo-seguimiento-persona';

		let tituloPersona = document.createTextNode(`${persona.persona}`);

		let seguimientoPersona = document.createElement("strong");
		seguimientoPersona.className = 'seguimientoPersona';
		seguimientoPersona.innerHTML = '&excl;';

        let comentariosPersona = document.createElement("textarea");
		comentariosPersona.className = 'comentariosPersona';
        comentariosPersona.value = persona.comentario;

		let divBtnsPersonas = document.createElement("div");
		divBtnsPersonas.className = 'cajon-btns-persona';

		let btnMarcarPersona = document.createElement("button");
		btnMarcarPersona.className = 'btn btn-marcar-persona  btn-personas';
		btnMarcarPersona.innerHTML = "Marcar";

		let btnLlevarSeguimiento = document.createElement("button");
		btnLlevarSeguimiento.className = 'btn btn-llevar-seguimiento btn-personas';
		btnLlevarSeguimiento.innerHTML = "Seguimiento";

		if(persona.estadoMarca == false){
			comentariosPersona.style.borderLeft = "2px solid black";
			comentariosPersona.style.borderRight = "2px solid black";
			nombrePersona.style.color = "black";
			btnMarcarPersona.innerHTML = "Marcar";
		} else {
			comentariosPersona.style.borderLeft = "2px solid rgb(233, 7, 7)";
			comentariosPersona.style.borderRight = "2px solid rgb(233, 7, 7)";
			nombrePersona.style.color = "rgb(233, 7, 7)";
			btnMarcarPersona.innerHTML = "Desmarcar";
		}


		if(persona.estadoSeguimiento == false){			
			seguimientoPersona.style.display = "none";
		} else {
			seguimientoPersona.style.display = "block";
		}

        comentariosPersona.onblur = function() {
			personas[index].comentario = comentariosPersona.value; // Actualizar comentario en objeto de "personas"
			localStorage.setItem("personas", JSON.stringify(personas)); // Actualizar almacenamiento local
		};

		btnMarcarPersona.addEventListener('click', function() {

			if (btnMarcarPersona.textContent == 'Marcar') {
				personas[index].estadoMarca = true; // Actualizar comentario en objeto de "personas"
				
				comentariosPersona.style.borderLeft = "2px solid rgb(233, 7, 7)";
				comentariosPersona.style.borderRight = "2px solid rgb(233, 7, 7)";
				nombrePersona.style.color = "rgb(233, 7, 7)";
				btnMarcarPersona.innerHTML = "Desmarcar";
			} else {
				personas[index].estadoMarca = false; // Actualizar comentario en objeto de "personas"
				
				comentariosPersona.style.borderLeft = "2px solid black";
				comentariosPersona.style.borderRight = "2px solid black";
				nombrePersona.style.color = "black";
				btnMarcarPersona.innerHTML = "Marcar";
			}
			localStorage.setItem("personas", JSON.stringify(personas)); // Actualizar almacenamiento local

			comentariosPersona.style.borderBottom = "none";
			comentariosPersona.style.borderTop = "none";
		});

		btnLlevarSeguimiento.addEventListener('click', function() {

			estadoDisplayBtnSeguimiento = seguimientoPersona.style.display;

			if (estadoDisplayBtnSeguimiento == 'none' || estadoDisplayBtnSeguimiento == '') {
				personas[index].estadoSeguimiento = true; // Actualizar comentario en objeto de "personas"
				seguimientoPersona.style.display = "block";
			} else {
				personas[index].estadoSeguimiento = false; // Actualizar comentario en objeto de "personas"
				seguimientoPersona.style.display = "none";
			}

			localStorage.setItem("personas", JSON.stringify(personas)); // Actualizar almacenamiento local
		});

		li.appendChild(nombrePersona);
        li.appendChild(comentariosPersona);
		nombrePersona.appendChild(tituloPersona);
		nombrePersona.appendChild(seguimientoPersona);
		listaPersonas.appendChild(li);
		li.appendChild(divBtnsPersonas);

		divBtnsPersonas.appendChild(btnMarcarPersona);
		divBtnsPersonas.appendChild(btnLlevarSeguimiento);

	});
}

// Seccion JavaScript para la funcionalidad de las tareas pendientes
function fechaActual() {
	let fechaActual = new Date();
	let dateInput = document.getElementById("fecha");
	dateInput.value = fechaActual.toISOString().substring(0, 10);
}

function agregarTarea() {
	let tarea = document.getElementById("tarea").value;
	let fecha = document.getElementById("fecha").value;

	if (tarea && fecha) {
		let nuevaTarea = {tarea: tarea, fecha: fecha};
		tareas.push(nuevaTarea);
		localStorage.setItem("tareas", JSON.stringify(tareas));
		actualizarListaTareas();

		// Se limpian los campos de las tareas a crear
		document.getElementById("tarea").value = "";
		document.getElementById("fecha").value = "";
	}

	fechaActual();
}

function eliminarTarea(index) {
	tareas.splice(index, 1);
	localStorage.setItem("tareas", JSON.stringify(tareas));
	actualizarListaTareas();
}

function actualizarListaTareas() {
	let listaTareas = document.getElementById("lista-tareas");
	listaTareas.innerHTML = "";

	tareas.forEach((tarea, index) => {
		let li = document.createElement("li");
		li.className = 'tarea-individual';

		let parrafoLista = document.createElement("p");
		parrafoLista.className = 'parrafo-tarea';

		let textoTarea = document.createTextNode(`${tarea.tarea} / ${tarea.fecha}`);

		let botonEliminar = document.createElement("button");
		botonEliminar.className = 'btn-eliminar';
		botonEliminar.appendChild(document.createTextNode(" X "));
		botonEliminar.onclick = function() {
			eliminarTarea(index);
		};

		li.appendChild(parrafoLista);
		parrafoLista.appendChild(textoTarea);
		listaTareas.appendChild(li);

		li.appendChild(botonEliminar);
	});

}

function CargarTareasPendientes() {
    actualizarListaTareas();
	fechaActual();
};