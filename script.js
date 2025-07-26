// Estructura de la malla por semestre
const malla = [
  ["Taller de comprensión lectora", "Cálculo Diferencial", "Introducción a la Ciencia de Datos", "Fundamentos de Economía", "Desarrollo Universitario", "Fundamentos de Programación"],
  ["Lengua Extranjera I", "Taller de Escritura Académica", "Estadística y Probabilidad", "Cálculo Integral", "Álgebra lineal", "Programación para Ciencia de Datos"],
  ["Lengua Extranjera II", "Estadística Inferencial", "Cálculo Vectorial", "Microeconomía I", "Matemáticas Discretas"],
  ["Lengua Extranjera III", "Electiva De Humanidades I", "Ecuaciones Diferenciales y en Diferencia", "Modelos de Regresión y Series de Tiempo", "Sensado y Modelación de Sistemas Físicos", "Macroeconomía I", "Estructuras de Datos"],
  ["Lengua Extranjera IV", "Ciudadanía global", "Electiva de Humanidades II", "Métodos Numéricos", "Electiva Complementaria I", "Optimización", "Algoritmos y Complejidad"],
  ["Lengua Extranjera V", "Machine Learning", "Narrativa de Datos", "Electiva Complementaria II", "Procesos Estocasticos", "Base de Datos"],
  ["Ética", "Analítica y Minería de Datos", "Visualización de Datos", "Electiva Complementaria III", "Proyecto de Grado I", "Formulación y Evaluación de Proyectos"],
  ["Creatividad y Emprendimiento", "Tópicos en Ciencia de Datos e IA", "Big Data", "Electiva Complementaria IV", "Proyecto de Grado II"],
  ["Electiva Complementaria V", "Práctica Profesional"]
];

// Requisitos
const requisitos = {
  "Cálculo Integral": ["Cálculo Diferencial"],
  "Programación para Ciencia de Datos": ["Fundamentos de Programación"],
  "Lengua Extranjera II": ["Lengua Extranjera I"],
  "Estadística Inferencial": ["Estadística y Probabilidad"],
  "Cálculo Vectorial": ["Cálculo Integral", "Álgebra lineal"],
  "Microeconomía I": ["Fundamentos de Economía", "Cálculo Diferencial"],
  "Matemáticas Discretas": ["Programación para Ciencia de Datos", "Álgebra lineal"],
  "Lengua Extranjera III": ["Lengua Extranjera II"],
  "Ecuaciones Diferenciales y en Diferencia": ["Cálculo Vectorial"],
  "Modelos de Regresión y Series de Tiempo": ["Estadística Inferencial"],
  "Sensado y Modelación de Sistemas Físicos": ["Cálculo Vectorial"],
  "Macroeconomía I": ["Fundamentos de Economía", "Cálculo Diferencial"],
  "Estructuras de Datos": ["Programación para Ciencia de Datos"],
  "Lengua Extranjera IV": ["Lengua Extranjera III"],
  "Métodos Numéricos": ["Ecuaciones Diferenciales y en Diferencia"],
  "Optimización": ["Álgebra lineal"],
  "Algoritmos y Complejidad": ["Estructuras de Datos"],
  "Lengua Extranjera V": ["Lengua Extranjera IV"],
  "Machine Learning": ["Fundamentos de Programación", "Álgebra lineal"],
  "Narrativa de Datos": ["Introducción a la Ciencia de Datos", "Álgebra lineal"],
  "Procesos Estocasticos": ["Optimización", "Estadística Inferencial"],
  "Base de Datos": ["Programación para Ciencia de Datos"],
  "Analítica y Minería de Datos": ["Álgebra lineal", "Estadística Inferencial"],
  "Visualización de Datos": ["Narrativa de Datos"],
  "Proyecto de Grado I": ["Machine Learning"],
  "Formulación y Evaluación de Proyectos": ["Estadística y Probabilidad"],
  "Tópicos en Ciencia de Datos e IA": ["Machine Learning"],
  "Big Data": ["Base de Datos"],
  "Proyecto de Grado II": ["Proyecto de Grado I"]
};

// Obtener asignaturas aprobadas del almacenamiento
let aprobadas = JSON.parse(localStorage.getItem("aprobadasCD")) || [];

// Crear HTML
const container = document.getElementById("malla-container");

malla.forEach((semestre, index) => {
  const col = document.createElement("div");
  col.className = "semestre";
  col.innerHTML = `<h2>Semestre ${index + 1}</h2>`;

  semestre.forEach(asig => {
    const div = document.createElement("div");
    div.className = "asignatura";
    div.textContent = asig;

    if (aprobadas.includes(asig)) {
      div.classList.add("aprobada");
    }

    div.addEventListener("click", () => {
      if (div.classList.contains("aprobada")) {
        // Desaprobar
        aprobadas = aprobadas.filter(a => a !== asig);
        div.classList.remove("aprobada");
        localStorage.setItem("aprobadasCD", JSON.stringify(aprobadas));
        return;
      }

      // Validar requisitos
      const req = requisitos[asig];
      if (req && !req.every(r => aprobadas.includes(r))) {
        div.classList.add("bloqueada");
        setTimeout(() => div.classList.remove("bloqueada"), 1500);
        alert(`Para aprobar "${asig}", necesitas primero:\n- ${req.filter(r => !aprobadas.includes(r)).join("\n- ")}`);
        return;
      }

      // Aprobar
      div.classList.add("aprobada");
      aprobadas.push(asig);
      localStorage.setItem("aprobadasCD", JSON.stringify(aprobadas));
    });

    col.appendChild(div);
  });

  container.appendChild(col);
});

