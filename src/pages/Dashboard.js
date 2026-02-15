import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.get('/api/auth/me')
        .then(res => setPoints(res.data.points))
        .catch(err => console.error(err));
    }
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Your Points: {points}</p>
      <Link to="/payment"><button>Pay Now £10</button></Link>
    </div>
  );
}

export default Dashboard;