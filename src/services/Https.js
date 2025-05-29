import api from './Api' // supondo que você salvou o create() em api.js

export async function login(email, password) {
  console.log('chamando aqui')
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
    return error
  }
}

export function setHeaderAuth(token) {
    try {
        api.setHeader('Authorization', `Bearer ${token}`);
    } catch (err) {
        console.error('Erro ao configurar o header de autenticação:', err);
    }
}

export async function getProfile () {
    try {
        const response = await api.get('/profile');    
        return response;
    } catch (err) {
        return err;
    }
}

export async function getAbsences () {
  try {
      const response = await api.get('/students/absences');    
      return response;
  } catch (err) {
      return err;
  }
}

export async function getScores () {
  try {
      const response = await api.get('/students/scores');    
      return response;
  } catch (err) {
      return err;
  }
}

export async function getHistory () {
  try {
      const response = await api.get('/students/history');    
      return response;
  } catch (err) {
      return err;
  }
}

export async function getSchedule () {
  try {
      const response = await api.get('/students/schedule');    
      return response;
  } catch (err) {
      return err;
  }
}