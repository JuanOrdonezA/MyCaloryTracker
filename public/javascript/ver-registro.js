document.addEventListener('DOMContentLoaded', async () => {
  const registrosTableBody = document.getElementById('registrosBody');

  async function cargarRegistros() {
    try {
      const response = await fetch('/ver-registro');
      const registros = await response.json();

      registrosTableBody.innerHTML = '';

      let totalCalorias = 0;

      registros.forEach(registro => {
        const caloryTotal = parseFloat(registro.calory_total);
        totalCalorias += caloryTotal;

        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${registro.aliment_description}</td>
          <td>
            <input type="number" value="${registro.quantity}" min="0" step="0.01" data-id="${registro.id}" class="cantidad-input">
          </td>
          <td>${caloryTotal.toFixed(2)}</td>
          <td>
            <button class="actualizar-btn btn btn-sm btn-warning" data-id="${registro.id}">Actualizar</button>
          </td>
        `;
        registrosTableBody.appendChild(row);
      });

      // Agregar fila final de total
      const totalRow = document.createElement('tr');
      totalRow.innerHTML = `
        <td colspan="3" class="text-end fw-bold">Total de calorías hoy:</td>
        <td class="fw-bold">${totalCalorias.toFixed(2)}</td>
        <td></td>
      `;
      registrosTableBody.appendChild(totalRow);

    } catch (error) {
      console.error('Error al cargar registros:', error);
    }
  }

  // Manejar actualización
  document.getElementById('registrosBody').addEventListener('click', async (e) => {
    if (e.target.classList.contains('actualizar-btn')) {
      const id = e.target.getAttribute('data-id');
      const input = document.querySelector(`input[data-id="${id}"]`);
      const nuevaCantidad = parseFloat(input.value);

      try {
        const res = await fetch('/ver-registro', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, quantity: nuevaCantidad })
        });

        if (res.ok) {
          cargarRegistros(); // Refrescar la tabla
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
