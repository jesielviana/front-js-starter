const usuarioAutenticado = localStorage.getItem('usuario')
  ? JSON.parse(localStorage.getItem('usuario'))
  : null;

function verificaUsuarioAutenticado() {
  const avatar = document.querySelector('#avatar');

  if (!usuarioAutenticado) {
    window.location.href = 'index.html';
  } else {
    avatar.title = usuarioAutenticado.nome;
  }
}

function logout() {
  const btnSair = document.querySelector('#btnSair');
  btnSair.addEventListener('click', () => {
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    window.location.href = 'index.html';
  });
}

async function carregarUsuarios() {
  if (!usuarioAutenticado) {
    return;
  }
  try {
    const resposta = await fetch('http://localhost:3000/usuarios', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const usuarios = await resposta.json();
    const tbody = document.querySelector('tbody');
    usuarios.forEach((usuario) => {
      const tr = `<tr>
    <td>${usuario.nome}</td>
    <td>${usuario.email}</td>
    <td><a href="#">alterar</a></td>
  </tr>`;
      tbody.innerHTML += tr;
    });
  } catch (erro) {
    console.error(erro);
    alert('Erro ao carregar usuários!');
  }
}

export default { verificaUsuarioAutenticado, logout, carregarUsuarios };
