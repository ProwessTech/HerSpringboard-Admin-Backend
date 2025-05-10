import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ManageUsers from './ManageUsers';
import CreateUserForm from './CreateUserForm';
import './style.css';

export default function App() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3001/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
    //  const adminUsers = data.filter((user) => user.createdBy === 'admin_ui');
     // setUsers(adminUsers);
      setError(null);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError(error.message);
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Router>
      <div className="admin-dashboard">
        <header className="admin-header">
          <h2>Admin Login</h2>
        </header>

        <nav className="admin-nav">
          <Link to="/manage-users">
            <button>Manage Users</button>
          </Link>
        </nav>

        {isLoading ? (
          <div className="loading-state">Loading users...</div>
        ) : error ? (
          <div className="error-state">
            <p>Error: {error}</p>
            <button onClick={fetchUsers}>Try Again</button>
          </div>
        ) : (
          <Routes>
            <Route
              path="/manage-users"
              element={
                <ManageUsers
                  users={users}
                  fetchUsers={fetchUsers}
                />
              }
            />
          </Routes>
        )}

        <CreateUserForm />
      </div>
    </Router>
  );
}