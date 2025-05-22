document.querySelector('.activity-form').addEventListener('submit', async function(e){
    e.preventDefault();

    const date = document.getElementById('fechaActividad').value;
    const type = document.getElementById('tipoActividad').value;
    const duration = document.getElementById('duracionActividad').value;
    const caloriesburned = document.getElementById('caloriasQuemadas').value;
    const user_id = document.getElementById('user_id').value;
    
    const datos = {date, type, duration, caloriesburned, user_id };

    try {
        const res = await fetch('/actividadfisica', {
            method: 'POST',
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