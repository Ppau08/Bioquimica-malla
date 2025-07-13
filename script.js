// Datos de ejemplo (agregamos más después)
const materias = [
  {
    nombre: "Química General",
    categoria: "basicas",
    año: 1,
    cuatrimestre: 1,
    correlativas: [],
  },
  {
    nombre: "Química Inorgánica",
    categoria: "basicas",
    año: 1,
    cuatrimestre: 2,
    correlativas: ["Química General"],
  }
];

const estados = {}; // Guardamos si está regularizada o aprobada

function renderMalla() {
  const contenedor = document.getElementById("malla-container");
  contenedor.innerHTML = "";

  for (let año = 1; año <= 6; año++) {
    const divAño = document.createElement("div");
    divAño.className = "año";
    divAño.innerHTML = `<h2>Año ${año}</h2>`;

    for (let cuatri = 1; cuatri <= 2; cuatri++) {
      const divCuatri = document.createElement("div");
      divCuatri.className = "cuatrimestre";
      divCuatri.dataset.cuatri = cuatri;

      materias.filter(m =>
        m.año === año && m.cuatrimestre === cuatri
      ).forEach(m => {
        const divMateria = document.createElement("div");
        divMateria.className = `materia ${m.categoria}`;
        divMateria.textContent = m.nombre;
        divMateria.dataset.nombre = m.nombre;

        // Aplicar estilos según estado
        if (estados[m.nombre] === "regularizada") {
          divMateria.classList.add("regularizada");
        }
        if (estados[m.nombre] === "aprobada") {
          divMateria.classList.add("aprobada");
        }

        // Clic para cambiar estado
        divMateria.onclick = () => toggleEstado(m);

        divCuatri.appendChild(divMateria);
      });

      if (divCuatri.children.length > 0) {
        divAño.appendChild(document.createElement("hr"));
        divAño.appendChild(divCuatri);
      }
    }

    contenedor.appendChild(divAño);
  }
}

function toggleEstado(materia) {
  const estadoActual = estados[materia.nombre];

  if (!estadoActual) {
    estados[materia.nombre] = "regularizada";
  } else if (estadoActual === "regularizada") {
    estados[materia.nombre] = "aprobada";
  } else {
    delete estados[materia.nombre];
  }

  renderMalla();
}

renderMalla();
