document.querySelector('.form-registro').addEventListener('submit', async function(e) {
    e.preventDefault(); // Evita que se recargue la página
  
    // Capturar los valores del formulario
    const weight = document.getElementById('weight').value;
    const height = document.getElementById('height').value;
    const age = document.getElementById('age').value;
    const daily_goal = document.getElementById('daily_goal').value;
    const user_id = document.getElementById('user_id').value;
  
    const datos = {
      weight,
      height,
      age,
      daily_goal,
      user_id
    };

     console.log(datos);
    
    try {
      const response = await fetch('/estado-fisico', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
      });
  
      const result = await response.text();
  
      alert(result); // Mostrar mensaje del servidor
  
    } catch (error) {
      console.error('Error al enviar datos:', error);
      alert('❌ Hubo un error al guardar la información.');
    }
  });
