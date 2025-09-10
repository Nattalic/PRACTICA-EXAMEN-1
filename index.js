// Traemos los datos del JSON con fetch
fetch ("lugares.json") //fetch funcion asincronica , aviseme cuando llegue (nose cuando) aviseme para yo poder hacer la sgte accion
.then ((response) => { 
    return response.json()
})
.then ((lugares) => mostrarLugares (lugares))

function mostrarLugares(lugares) {
    console.log(lugares)
    const app = document.getElementById("app")

    lugares.forEach(lugar => {
    
    const lugaresCard = document.createElement("div")
    lugaresCard.classList.add("lugaresCard")
    lugaresCard.id = 'card'
    console.log(lugaresCard)


    lugaresCard.innerHTML = `
    <h2>${lugar.destino}</h2>
    <img src=${lugar.imagen}/>
    <p>Duración: ${lugar.duracion} semanas </p>
    <p>Costo:  $${lugar.costo}</p>
    <p>Descripción: ${lugar.descripcion}</p>
    <p>Actividades: ${lugar.actividades}</p>
    <p>Alojamiento: ${lugar.alojamiento}</p>
    <p>Calificación: ${lugar.calificacion}</p>
    `
    
    //como hacer la imagen

    const btnReservado = document.createElement("button")
    btnReservado.textContent = lugar.reservado ? "Reservado" : "Reservar"

    let isReserved = lugar.reservado

    btnReservado.addEventListener('click' ,() =>{ 
    btnReservado.classList.toggle("boton-activo")

    btnReservado.textContent = isReserved ? 'Reservar' : 'Reservado' //true y false 
    isReserved = !isReserved
    })


    lugaresCard.appendChild(btnReservado)
    app.appendChild(lugaresCard)
    

    
    
    })
        


}
