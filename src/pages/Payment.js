import React, { useState, useEffect } from 'react';
import { api } from '../api';

function Payment() {
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.get('/api/auth/me')
        .then(res => setPoints(res.data.points))
        .catch(err => console.error(err));
    }
  }, []);

  const handleKoFiPayment = async () => {
    try {
      const res = await api.post('/api/payment/kofi');
      alert('Payment of £10 sent! You earned 100 points 🎉');
      setPoints(res.data.points);
    } catch (err) {
      alert(err.response?.data?.msg || 'Payment error');
    }
  };

  return (
    <div>
      <h2>Ko-fi Payment</h2>
      <p>Your Points: {points}</p>
      <button onClick={handleKoFiPayment}>Pay Now £10</button>
    </div>
  );
}

export default Payment;