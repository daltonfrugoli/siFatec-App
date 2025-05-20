import api from './Api' // supondo que você salvou o create() em api.js

export async function login(email, password) {
  const formBody = new URLSearchParams({
    username: email,
    password: password,
  }).toString()

  try {
    const response = await api.post(
      '/token',
      formBody,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      }
    )

    setHeaderAuth(response.data.access_token);

    return response

  } catch (error) {
    return { error: true, message: error.data?.detail || 'Erro ao fazer login' }
  }
}

export function setHeaderAuth(token) {
    try {
        api.setHeader('Authorization', `Bearer ${token}`);
    } catch (err) {
        console.error('Erro ao configurar o header de autenticação:', err);
    }
}

export async function testAuthToken () {
    // Buscar escolas de uma cidade
    try {
        const response = await api.get('/users/me');    
        return response;
    } catch (err) {
        return err;
    }
}