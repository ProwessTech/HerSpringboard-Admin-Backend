import { useEffect, useState } from 'react';
import ManageUsers from './ManageUsers';
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
            setUsers(data);
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
        <div className="admin-dashboard">
            <header className="admin-header">
                <h2>Admin Login</h2>
            </header>
            {isLoading ? (
                <div className="loading-state">Loading users...</div>
            ) : error ? (
                <div className="error-state">
                    <p>Error: {error}</p>
                    <button onClick={fetchUsers}>Try Again</button>
                </div>
            ) : (
                <div className="user-list">
                    <h2>User List</h2>
                    <ManageUsers users={users} fetchUsers={fetchUsers} />
                </div>
            )}
        </div>
    );
}
