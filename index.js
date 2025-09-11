fetch("destinos.json") // Fetch obtención de elementos (archivos, apis)
  // Fetch es una operacion asincronica, cuando llegue (no se cuando) aviseme para yo poder hacer la siguiente accion
  .then((response) => {
    // Parametro hace referencia a lo que yo estoy recibiendo, puede tener cualquier nombre, como un parametro de una funcion
    return response.json(); // Convertir de texto plano, a un objeto de js
  })
  .then((destinos) => mostrarDestinos(destinos));

function mostrarDestinos(destinos) {
  // Estara dentro de esta funcion toda la manipulacion

  destinos.forEach((destino) => {
    const destinoCard = document.createElement("div");
    destinoCard.id = "card";

    const destinoId = destino.id;

    destinoCard.innerHTML = `
            <h2>${destino.destino}</h2>
            <img src=${destino.imagen} />
            <h3>Tiempo de duración: ${destino.duracion} semanas</h3>
            <h4>${destino.costo}</h4>
            <p>${destino.descripcion}</p>
            <p>${destino.actividades}</p>
            <p>${destino.calificacion}</p>
            <p>${destino.alojamiento}</p>
        `;

    const reservarBtn = document.createElement("button");

    const reservedStorageString =
      localStorage.getItem("reservedStorage") || "{}";
    const reservedStorage = JSON.parse(reservedStorageString);

    let isReserved = destino.reservado; // Por defecto toma lo que dice el JSON
    reservarBtn.textContent = isReserved ? "Reservado" : "Reservar"; // Lo mismo acá

    if (reservedStorage[destino.id] !== undefined) {
      // Pero si hay información en localStorage, le creeremos al localStorage primero
      reservarBtn.textContent = reservedStorage[destino.id]
        ? "Reservado"
        : "Reservar";
      isReserved = reservedStorage[destino.id];
    }
    reservarBtn.className = isReserved ? "boton-activo" : "";
    console.log(reservarBtn, isReserved);

    reservarBtn.addEventListener("click", () => {
      reservarBtn.className = isReserved ? "" : "boton-activo";
      reservarBtn.textContent = isReserved ? "Reservar" : "Reservado";
      isReserved = !isReserved;
      const reservedStorageString =
        localStorage.getItem("reservedStorage") || "{}";
      const reservedStorage = JSON.parse(reservedStorageString);
      reservedStorage[destino.id] = isReserved;
      localStorage.setItem("reservedStorage", JSON.stringify(reservedStorage));
    });
    destinoCard.appendChild(reservarBtn);

    app.appendChild(destinoCard);
  });
}