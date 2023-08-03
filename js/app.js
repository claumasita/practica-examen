class Preguntas{
    constructor(pregunta, respuesta){
        this.pregunta  = pregunta;
        this.respuesta = respuesta;
    }
}

let preguntas = [];

//******************************************************************//
// Recupera JSON desde SessionStorage
//******************************************************************//
const getJsonSessionStorage=(clave)=>{
    return sessionStorage.getItem(clave);
};

//******************************************************************//
// Convierte JSON (desde SessionStorage) a Array de Objetos
//******************************************************************//
const getSessionStorageToArray=(clave)=>{

    const coleccion = JSON.parse(getJsonSessionStorage(clave));
    if (coleccion != null){
        return coleccion;
    }else{
        return [];
    }
};

//******************************************************************//
// Elimina todos los elementos del Sesion Storage Indicado
//******************************************************************//
const vaciarSessionStorage=(clave)=>{sessionStorage.removeItem(clave);}

//******************************************************************//
// Recibe JSON para almacenar en el SessionStorage
//******************************************************************//
const agregarJsonSessionStorage=(clave, json)=>{
    sessionStorage.setItem(clave, json);
};

//******************************************************************//
// JSON de Preguntas => almacenar en el SessionStorage
//******************************************************************//
const guardarPreguntasStorage=(enJson)=>{
    vaciarSessionStorage("preguntas");
    agregarJsonSessionStorage("preguntas", enJson);
};

//******************************************************************//
// Genera las Cards para las preguntas y respuestas
//******************************************************************//
const mostrarPreguntas = () =>{

    const busqueda = document.querySelector("#palabra").value.toUpperCase();
    const main = document.querySelector("#main");
    main.innerHTML = "";

    const arrayPreguntas = getSessionStorageToArray("preguntas");
    arrayPreguntas.forEach(pregunta => {

        const enunciado = pregunta.pregunta.toUpperCase();
        const existe = enunciado.indexOf(busqueda);
        if (existe !== -1 || busqueda == ""){
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = 
            `
            <div class="card-content">
                <h2>${pregunta.pregunta}</h2>
                <p>${pregunta.respuesta}</p>
            </div>
            `
            main.append(card);
        }
    });

}

//******************************************************************//
// Agrega los objetos de todos los diseños al Array correspondiente
//******************************************************************//
const cargarPreguntas = async () =>{

    let rutaJson = "./json/preguntas.json";

    try {
        const resp = await fetch(rutaJson);
        preguntas  = await resp.json();
        guardarPreguntasStorage(JSON.stringify(preguntas));
        mostrarPreguntas();
    } catch (error) {
        console.log(error);
    }
}

//******************************************************************//
// Evento Input (Busqueda)
//******************************************************************//
const crearEventoInput = () =>{
    document.querySelector("#palabra").addEventListener("input", (e)=>{
            e.preventDefault();
            mostrarPreguntas();
        });
}

//******************************************************************//
// Función Principal
//******************************************************************//
const inicio = async () =>{
    // Carga de Preguntas
    await cargarPreguntas();
    crearEventoInput();
    //mostrarImagenes();
}

//******************************************************************//
//                      INICIO DEL PROGRAMA                         //
//******************************************************************//
inicio();