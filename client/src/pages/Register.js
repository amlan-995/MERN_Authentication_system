import React, { useState } from 'react';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      setMessage(data.message || 'Registered');
    } catch (err) {
      setMessage('Error connecting to server');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div><input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" required/></div>
        <div><input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" type="email" required/></div>
        <div><input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" required/></div>
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
