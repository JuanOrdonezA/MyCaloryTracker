document.addEventListener('DOMContentLoaded', async () => {
    const registrosTableBody = document.getElementById('tabla-actividades');

    res= await fetch('/actividadfisica') 
    .then(res => res.json())
    .then(data => {
    const tbody = document.getElementById('tabla-actividades');
    data.forEach(act => {
      const row = `<tr>
        <td>${act.create_date}</td>
        <td>${act.act_type}</td>
        <td>${act.duration}</td>
        <td>${act.caloriesbur}</td>
      </tr>`;
      tbody.innerHTML += row;
    });
  });

});


document.querySelector('.form-spacing').addEventListener('submit', async function(e){
    e.preventDefault();

    const date = document.getElementById('fechaActividad').value;
    const type = document.getElementById('tipoActividad').value;
    const duration = document.getElementById('duracionActividad').value;
    const caloriesburned = document.getElementById('caloriasQuemadas').value;
    
    
    const datos = {date, type, duration, caloriesburned};

    try {
        const res = await fetch('/actividadfisica', {
            method: 'POST',
            credentials : 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        });

    const result = await res.text();
    alert(result); // Mostrar mensaje del servidor

    } catch (error) {
        console.error('Error al enviar datos:', error);
        alert('Hubo un error al guardar la información.');
    }
 
});

