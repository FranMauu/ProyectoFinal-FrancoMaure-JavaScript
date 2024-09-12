document.addEventListener('DOMContentLoaded', () => {
    const gradeForm = document.getElementById('gradeForm');
    const generateFieldsButton = document.getElementById('generateFields');
    const notesInputsDiv = document.getElementById('notesInputs');
    const resultDiv = document.getElementById('result');

let animacionActiva = false;

document.getElementById('btn-interact').addEventListener('click', function() {
  if (!animacionActiva) {
    document.getElementById('spline-embed').style.animation = 'animacion 2s infinite';
    animacionActiva = true;
  } else {
    document.getElementById('spline-embed').style.animation = '';
    animacionActiva = false;
  }
});

    // Event listener para generar campos de notas
    generateFieldsButton.addEventListener('click', () => {
        notesInputsDiv.innerHTML = ''; // Limpiar cualquier campo existente
        const subjectCount = parseInt(document.getElementById('subjectCount').value, 10);

        if (isNaN(subjectCount) || subjectCount < 1) {
            alert('Por favor, ingrese un número válido de asignaturas.');
            return;
        }

        for (let i = 1; i <= subjectCount; i++) {
            notesInputsDiv.innerHTML += `
                <label for="note${i}">Nota de la Asignatura ${i}:</label>
                <input type="number" id="note${i}" name="note${i}" min="0" max="10" required>
            `;
        }
    });

    // Event listener para el formulario
    gradeForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const subjectCount = parseInt(document.getElementById('subjectCount').value, 10);
        let notes = [];

        for (let i = 1; i <= subjectCount; i++) {
            const note = parseFloat(document.getElementById(`note${i}`).value);
            if (isNaN(note)) {
                alert(`Por favor, ingrese una nota válida para la Asignatura ${i}.`);
                return;
            }
            notes.push(note);
        }

        // Calcular el promedio
        const average = notes.reduce((acc, curr) => acc + curr, 0) / notes.length;

        // Almacenar los datos en localStorage
        const data = {
            subjectCount: subjectCount,
            notes: notes,
            average: average
        };
        localStorage.setItem('gradeData', JSON.stringify(data));

        // Mostrar el resultado en el DOM
        resultDiv.innerHTML = `
            <p>Promedio de las notas: ${average.toFixed(2)}</p>
            <p>Detalles de las notas ingresadas:</p>
            <ul>
                ${notes.map((note, index) => `<li>Asignatura ${index + 1}: ${note}</li>`).join('')}
            </ul>
        `;
    });

    // Recuperar datos del localStorage al cargar la página
    const storedData = JSON.parse(localStorage.getItem('gradeData'));

    if (storedData) {
        document.getElementById('subjectCount').value = storedData.subjectCount;
        generateFieldsButton.click(); // Generar campos de notas

        storedData.notes.forEach((note, index) => {
            document.getElementById(`note${index + 1}`).value = note;
        });

        resultDiv.innerHTML = `
            <p>Promedio de las notas: ${storedData.average.toFixed(2)}</p>
            <p>Detalles de las notas ingresadas:</p>
            <ul>
                ${storedData.notes.map((note, index) => `<li>Asignatura ${index + 1}: ${note}</li>`).join('')}
            </ul>
        `;+    
    }
});

 
             



  let animacionActiva = false;

document.getElementById('btn-interact').addEventListener('click', function() {
  if (!animacionActiva) {
    document.getElementById('spline-embed').classList.add('animacion-activa');
    animacionActiva = true;
  } else {
    document.getElementById('spline-embed').classList.remove('animacion-activa');
    animacionActiva = false;
  }
});


  