function login() {
  const email = document.querySelector('#email');
  const senha = document.querySelector('#senha');
  const btnLogin = document.querySelector('#btnLogin');

  btnLogin.addEventListener('click', async (event) => {
    try {
      const usuario = {
        email: email.value,
        senha: senha.value,
      };
      const resposta = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
      });
      const dados = await resposta.json();
      localStorage.setItem('token', dados.token);
      localStorage.setItem('usuario', JSON.stringify(dados.usuario));
      window.location.href = 'usuarios.html';
    } catch (erro) {
      console.error(erro);
      alert('Erro ao fazer login!');
    }
  });
}

function verificaUsuarioAutenticado() {
  const usuarioAutenticado = localStorage.getItem('usuario')
    ? JSON.parse(localStorage.getItem('usuario'))
    : null;
  const avatar = document.querySelector('#avatar');

  if (usuarioAutenticado) {
    window.location.href = 'usuarios.html';
  }
}

export default { login, verificaUsuarioAutenticado };
