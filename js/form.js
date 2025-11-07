

const SUPABASE_URL = 'https://twvdyjgafeouxhjyuykr.supabase.co/rest/v1/Leads';
const SUPABASE_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR3dmR5amdhZmVvdXhoanl1eWtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk4NTkyODEsImV4cCI6MjA3NTQzNTI4MX0.HKScLfMoi6jcQlpaHGV0x_cg0QI-t90iCxZ8zgBu9R0';

const form = document.getElementById('leadForm');
const messageDiv = document.getElementById('message');
const submitBtn = document.getElementById('submitBtn');

function showMessage(text, type) {
  messageDiv.textContent = text;
  messageDiv.className = `message show ${type}`;

  setTimeout(() => {
    messageDiv.classList.remove('show');
  }, 5000);
}

function formatPhoneNumber(ddd, numero) {
  return `(${ddd}) ${numero}`;
}

async function submitLead(nome, telefone, email) {
  try {
    const response = await fetch(SUPABASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_API_KEY,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        nome: nome,
        telefone: telefone,
        email: email 
      })
    });

    if (!response.ok) {
      throw new Error('Erro ao cadastrar lead');
    }

    return true;
  } catch (error) {
    console.error('Erro:', error);
    throw error;
  }
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const ddd = document.getElementById('ddd').value.trim();
  const numero = document.getElementById('numero').value.trim();
  const email = document.getElementById('email').value.trim();

  if (!nome || !ddd || !numero || !email) {
    showMessage('Por favor, preencha todos os campos', 'error');
    return;
  }

  if (ddd.length !== 2) {
    showMessage('DDD deve ter 2 dígitos', 'error');
    return;
  }

  if (numero.length < 8 || numero.length > 9) {
    showMessage('Número deve ter 8 ou 9 dígitos', 'error');
    return;
  }

  if (!email.includes("@") || !email.includes(".")) {
    showMessage('Digite um e-mail válido', 'error');
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Cadastrando...';

  try {
    const telefone = formatPhoneNumber(ddd, numero);
    await submitLead(nome, telefone, email);

    showMessage('Lead cadastrado com sucesso!', 'success');
    form.reset();
  } catch (error) {
    showMessage('Erro ao cadastrar lead. Tente novamente.', 'error');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Cadastrar';
  }
});

document.getElementById('ddd').addEventListener('input', (e) => {
  e.target.value = e.target.value.replace(/\D/g, '');
});

document.getElementById('numero').addEventListener('input', (e) => {
  e.target.value = e.target.value.replace(/\D/g, '');
});

// === MENU RESPONSIVO ===
const navbarTogglerIcon = document.getElementById("navbar-toggler-icon");
const navLink = document.querySelector(".nav-link");

navbarTogglerIcon.addEventListener("click", () => {
  navbarTogglerIcon.classList.toggle("active");
  navLink.classList.toggle("active");
});
