document.addEventListener('DOMContentLoaded', async () => {
    const registrosTableBody = document.getElementById('registrosBody');
  
    async function cargarRegistros() {
      try {
        const response = await fetch('http://localhost:3000/ver-registro?user_id=1');
        const registros = await response.json();
  
        registrosTableBody.innerHTML = '';
        registros.forEach(registro => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${registro.id}</td>
            <td>${registro.aliment_description}</td>
            <td>
              <input type="number" value="${registro.quantity}" min="0" step="0.01" data-id="${registro.id}" class="cantidad-input">
            </td>
            <td>${registro.calory_total}</td>
            <td>
              <button class="actualizar-btn" data-id="${registro.id}">Actualizar</button>
            </td>
          `;
          registrosTableBody.appendChild(row);
        });
      } catch (error) {
        console.error('Error al cargar registros:', error);
      }
    }
  
    // Escucha clicks en el botón "Actualizar"
    registrosTableBody.addEventListener('click', async (e) => {
      if (e.target.classList.contains('actualizar-btn')) {
        const id = e.target.getAttribute('data-id');
        const input = document.querySelector(`input[data-id="${id}"]`);
        const nuevaCantidad = parseFloat(input.value);
  
        try {
          const res = await fetch(`ver-registro`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quantity: nuevaCantidad, id:id })
          });
  
          if (res.ok) {
            await cargarRegistros(); // Recargar los datos
          } else {
            alert('Error al actualizar cantidad.');
          }
        } catch (error) {
          console.error('Error al actualizar cantidad:', error);
        }
      }
    });
  
    cargarRegistros();
  });