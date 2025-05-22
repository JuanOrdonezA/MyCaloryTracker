//Obtencion de alimentos
document.addEventListener('DOMContentLoaded', async () => {
    const select = document.getElementById('alimentSelect');
    const form = document.getElementById('registroForm');
    const cantidadInput = document.getElementById('cantidad');
    const mensaje = document.getElementById('mensaje');
  
    try {
      const response = await fetch('/registro-alimento');
      const alimentos = await response.json();
  
      alimentos.forEach(alimento => {
        const option = document.createElement('option');
        option.value = alimento.id;
        option.textContent = alimento.description;
        select.appendChild(option);
      });
    } catch (error) {
      console.error('Error al cargar alimentos:', error);
    }
  
    // Registro de alimento
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const aliment_id = select.value;
      const quantity = cantidadInput.value;
      const user_id = 1; // Asegúrate de que el formulario tenga un atributo data-user-id con el ID del usuario
  
      try {
        const res = await fetch('/registro-alimento', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ aliment_id, quantity, user_id })
        });
  
        const text = await res.text();
        mensaje.textContent = text;
        mensaje.style.color = res.ok ? 'green' : 'red';
      } catch (error) {
        mensaje.textContent = 'Error al registrar alimento.';
        mensaje.style.color = 'red';
      }
    });
  });

 