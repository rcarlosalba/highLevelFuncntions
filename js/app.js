// variables
const resultado = document.querySelector("#resultados"),
  year = document.querySelector("#year"),
  marca = document.querySelector("#marca"),
  minimo = document.querySelector("#minimo"),
  maximo = document.querySelector("#maximo"),
  puertas = document.querySelector("#puertas"),
  transmision = document.querySelector("#transmision"),
  color = document.querySelector("#color"),
  maxYear = new Date().getFullYear(),
  minYear = maxYear - 13;

const datosBusqueda = {
  marca: "",
  year: "",
  minimo: "",
  maximo: "",
  puertas: "",
  transmision: "",
  color: "",
};

// eventListeners

document.addEventListener("DOMContentLoaded", () => {
  mostrarAutos(todosLosAutos);

  llenarSelecYear();
});

marca.addEventListener("change", (e) => {
  datosBusqueda.marca = e.target.value;
  filtrarAuto();
});
year.addEventListener("change", (e) => {
  datosBusqueda.year = Number(e.target.value);
  filtrarAuto();
});
minimo.addEventListener("change", (e) => {
  datosBusqueda.minimo = Number(e.target.value);
  filtrarAuto();
});
maximo.addEventListener("change", (e) => {
  datosBusqueda.maximo = Number(e.target.value);
  filtrarAuto();
});
puertas.addEventListener("change", (e) => {
  datosBusqueda.puertas = Number(e.target.value);
  filtrarAuto();
});
transmision.addEventListener("change", (e) => {
  datosBusqueda.transmision = e.target.value;
  filtrarAuto();
});
color.addEventListener("change", (e) => {
  datosBusqueda.color = e.target.value;
  filtrarAuto();
});

// funciones

function mostrarAutos(todosLosAutos) {
  limpiarHTML();
  todosLosAutos.forEach((auto) => {
    const autoHTML = document.createElement("div");
    autoHTML.classList.add("text-center");
    const { marca, modelo, year, puertas, precio, color, transmision, img } =
      auto;
    autoHTML.innerHTML = `
            <span class="font-bold"> Marca: </span>${marca} - 
            <span class="font-bold"> Modelo: </span>${modelo} - 
            <span class="font-bold"> Año: </span>${year} - 
            <span class="font-bold"> Puertas: </span>${puertas} - 
            <span class="font-bold"> Color: </span>${color} - 
            <span class="font-bold"> Tranmisión: </span>${transmision} - 
            <span class="font-bold"> Precio: </span>$ ${precio} USD

            <img src="${img}" class="rounded-md border-4 max-w-sm object-cover mx-auto">
        `;

    resultado.appendChild(autoHTML);
  });
}

function llenarSelecYear() {
  for (let i = maxYear; i >= minYear; i--) {
    const opcion = document.createElement("option");
    opcion.value = i;
    opcion.textContent = i;
    year.appendChild(opcion);
  }
}

function filtrarAuto() {
  const resultado = todosLosAutos
    .filter(filtrarMarca)
    .filter(filtrarYear)
    .filter(filtrarMinimo)
    .filter(filtrarMaximo)
    .filter(filtrarPuertas)
    .filter(filtrarTransmision)
    .filter(filtrarColor);

  if (resultado.length) {
    mostrarAutos(resultado);
  } else {
    sinResultados();
  }
}

function filtrarMarca(auto) {
  const { marca } = datosBusqueda;
  if (marca) {
    return auto.marca === marca;
  }
  return auto;
}
function filtrarYear(auto) {
  const { year } = datosBusqueda;
  if (year) {
    return auto.year === year;
  }
  return auto;
}
function filtrarMinimo(auto) {
  const { minimo } = datosBusqueda;
  if (minimo) {
    return auto.precio >= minimo;
  }
  return auto;
}
function filtrarMaximo(auto) {
  const { maximo } = datosBusqueda;
  if (maximo) {
    return auto.precio <= maximo;
  }
  return auto;
}
function filtrarPuertas(auto) {
  const { puertas } = datosBusqueda;
  if (puertas) {
    return auto.puertas === puertas;
  }
  return auto;
}
function filtrarTransmision(auto) {
  const { transmision } = datosBusqueda;
  if (transmision) {
    return auto.transmision === transmision;
  }
  return auto;
}
function filtrarColor(auto) {
  const { color } = datosBusqueda;
  if (color) {
    return auto.color === color;
  }
  return auto;
}

function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

function sinResultados() {
  limpiarHTML();
  const sinResultados = document.createElement("div");
  sinResultados.classList.add(
    "bg-red-600",
    "text-white",
    "text-center",
    "font-bold",
    "text-xl",
    "p-2",
    "rounded-md"
  );
  sinResultados.textContent =
    "¿Podrías intentar con otros criterios? por el momento, no tenemos el auto que buscas";

  resultado.appendChild(sinResultados);
}
