const form = document.getElementById('loginForm');
const messageDiv = document.getElementById('loginMessage');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const res = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const text = await res.text();
    messageDiv.textContent = text;
    messageDiv.style.color = res.ok ? 'green' : 'red';

    // ✅ Redirigir si el login fue exitoso
    if (res.ok) {
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1000); // pequeño delay para mostrar el mensaje
    }

  } catch (error) {
    messageDiv.textContent = 'Error al conectar con el servidor.';
    messageDiv.style.color = 'red';
  }
});
