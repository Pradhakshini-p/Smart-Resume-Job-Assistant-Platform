const axios = require('axios');

(async () => {
  try {
    const res = await axios.post('http://localhost:5000/api/auth/signup', {
      name: 'Test User',
      email: 'testuser@example.com',
      password: 'password123'
    });
    console.log('Signup response:', res.data);
  } catch (err) {
    console.error('Signup error:', err.response ? err.response.data : err.message);
  }

  try {
    const loginRes = await axios.post('http://localhost:5000/api/auth/login', {
      email: 'testuser@example.com',
      password: 'password123'
    });
    console.log('Login response:', loginRes.data);
  } catch (err) {
    console.error('Login error:', err.response ? err.response.data : err.message);
  }
})();
