import React, { useEffect, useState } from 'react';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return;
    const fetchMe = async () => {
      const res = await fetch('http://localhost:5000/api/auth/me', {
        headers: { Authorization: 'Bearer ' + token }
      });
      const data = await res.json();
      setUser(data);
    };
    const fetchUsers = async () => {
      const res = await fetch('http://localhost:5000/api/users', {
        headers: { Authorization: 'Bearer ' + token }
      });
      const data = await res.json();
      setUsers(data);
    };
    fetchMe();
    fetchUsers();
  }, [token]);

  if (!token) return <p>Please login first.</p>;

  return (
    <div>
      <h2>Dashboard</h2>
      {user && <p>Welcome, {user.name} ({user.email})</p>}
      <h3>All users</h3>
      <ul>{users.map(u => <li key={u._id}>{u.name} — {u.email}</li>)}</ul>
    </div>
  );
}
