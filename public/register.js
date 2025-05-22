document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const name = document.getElementById('name').value;
    const last_name = document.getElementById('last_name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    const res = await fetch('/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, last_name, email, password })
    });
  
    const msg = await res.text();
    const div = document.getElementById('message');
    div.textContent = msg;
    div.style.color = res.ok ? 'green' : 'red';
  
    if (res.ok) document.getElementById('registerForm').reset();
  });
  