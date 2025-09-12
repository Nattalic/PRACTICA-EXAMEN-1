// Se obtiene el archivo destinos.json usando fetch
fetch("destinos.json") // Fetch: obtener recursos (archivos, APIs externas)
  // fetch es asincrónico = no sabemos cuándo responderá
  .then((response) => {
    // "response" es la respuesta que envía el servidor
    return response.json() // Convierte la respuesta (texto plano) a un objeto JS
  })
  .then((destinos) => mostrarDestinos(destinos)) // Cuando ya tenemos el objeto convertido, llamamos a mostrarDestinos()


// Función que crea las tarjetas de cada destino
function mostrarDestinos(destinos) {

  // Recorremos cada destino y creamos su tarjeta (card)
  destinos.forEach((destino) => { 

    //crramos el contenedor donde va a ir toda la info de destinos
    const destinoCard = document.createElement("div")
    destinoCard.id = "card" // Le asignamos un id

    // Usamos innerHTML para mostrar la información del destino en la tarjeta
    //este tmb se puede hacer por separado

    destinoCard.innerHTML = `
            <h2>${destino.destino}</h2>
            <img src=${destino.imagen} />
            <h3>Tiempo de duración: ${destino.duracion} semanas</h3>
            <h4>${destino.costo}</h4>
            <p>${destino.descripcion}</p>
            <p>${destino.actividades}</p>
            <p>${destino.calificacion}</p>
            <p>${destino.alojamiento}</p>
        `

    
    //se crea el boton de reserva
    const reservarBtn = document.createElement("button")

    // Revisamos si ya existe información guardada en localStorage
    // Si no hay nada guardado, ponemos {} como objeto vacío
    const reservedStorageString =
      localStorage.getItem("reservedStorage") || "{}"
    const reservedStorage = JSON.parse(reservedStorageString)

    // estado inicial : se toma el valor "reservado" del JSON por defecto
    let isReserved = destino.reservado
    reservarBtn.textContent = isReserved ? "Reservado" : "Reservar"

    // Pero si hay información en localStorage, esa tiene prioridad
    if (reservedStorage[destino.id] !== undefined) {
      reservarBtn.textContent = reservedStorage[destino.id]
        ? "Reservado"
        : "Reservar"
      isReserved = reservedStorage[destino.id]
    }

    // Clase CSS según el estado actual (para el color del botón)
    reservarBtn.className = isReserved ? "boton-activo" : ""
    console.log(reservarBtn, isReserved)

    
    reservarBtn.addEventListener("click", () => {
      // Cambiamos visualmente el botón
      //ternario: 1. condicion 2. parte verdadera (true) 3. parte falsa(false)
      reservarBtn.className = isReserved ? "" : "boton-activo"
      reservarBtn.textContent = isReserved ? "Reservar" : "Reservado"

      // Invertimos el estado de reserva
      isReserved = !isReserved

      // Actualizamos el localStorage
      const reservedStorageString =
        localStorage.getItem("reservedStorage") || "{}"
      const reservedStorage = JSON.parse(reservedStorageString)
      reservedStorage[destino.id] = isReserved // Guardamos el estado actualizado
      localStorage.setItem("reservedStorage", JSON.stringify(reservedStorage))
    })

    // Agregamos el botón a la tarjeta
    destinoCard.appendChild(reservarBtn)

    // Finalmente, agregamos la tarjeta al contenedor principal en el DOM
    app.appendChild(destinoCard)
  })
}
