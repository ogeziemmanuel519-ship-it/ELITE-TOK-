import React, { useState } from 'react';
import { api, setAuthToken } from '../api';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [referrer, setReferrer] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const res = await api.post('/api/auth/signup', { username, email, password, referrer });
      localStorage.setItem('token', res.data.token);
      setAuthToken(res.data.token);
      alert(`Signup successful! You start with ${res.data.user.points} points`);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.msg || 'Error signing up');
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <input placeholder="Referral ID (optional)" value={referrer} onChange={e => setReferrer(e.target.value)} />
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
}

export default Signup;