import React from "react";
import { NavLink } from "react-router-dom";
import { HOST_SERVER } from "@/config";

async function consulta(){
    const registrosAlmacenados = await fetch(`${HOST_SERVER}/api/esp/traer-datos`).then(respuesta => respuesta.json());
    //NO LE HAGAS CASO A LA LINEA 7
    //console.log(JSON.stringify(registrosAlmacenados, null, 2));

    //Aqui extraemos los datos de la base de datos de MongoDB
    // let datos = registrosAlmacenados.valor;

    //AQUI CARGAMOS LOS DATOS MEDIANTE FOREACH
    // datos.forEach(element => {
    //     document.getElementById("contenido").innerHTML += `<p>temperatura: ${element.temperatura}</p>`;
    // });

}

export const MensajePrueba = () => {
    return (
        <div>
            <h1>Solicitando datos</h1>
            <div id="contenido"></div>
            {/* <button onClick={async () => {
                const resp = await fetch("http://192.168.100.14:3001/api/esp/traer-datos").then(response => response.json()).then(data => console.log(data));
                console.log();
            }}>Enviar peticion</button> */}
            <button id="botonconsulta" onClick={consulta}>Traer Datos</button>
        </div>
    );
}