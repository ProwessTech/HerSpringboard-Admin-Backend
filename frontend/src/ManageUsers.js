import { useState } from 'react';
import CreateUserForm from './CreateUserForm';
import UserList from './UserList';
import EditUserForm from './EditUserForm';
import './style.css';

export default function ManageUsers({ users, fetchUsers }) {
  const [editingUser, setEditingUser] = useState(null);
  const [view, setView] = useState('list');

  return (
    <div className="manage-users">
      <h2>Manage Users</h2>
      
      <div className="view-buttons">
        <button onClick={() => {
          setEditingUser(null);
          setView('create');
        }}>
          Create User
        </button>
        <button onClick={() => {
          setEditingUser(null);
          setView('list');
        }}>
          User List
        </button>
      </div>

      {view === 'create' && (
        <CreateUserForm
          onUserCreated={() => {
            fetchUsers();  // Refresh user list after creating a new user
            setView('list');
          }}
        />
      )}

      {view === 'edit' && editingUser && (
        <EditUserForm
          user={editingUser}
          onUserUpdated={() => {
            fetchUsers();  // Refresh user list after editing a user
            setEditingUser(null);
            setView('list');
          }}
          onCancel={() => {
            setEditingUser(null);
            setView('list');
          }}
        />
      )}

      {view === 'list' && (
        <div className="user-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Category</th>
                <th>Email Verified</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.userId}>
                  <td>{user.firstName} {user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.category}</td>
                  <td>{user.emailVerified ? 'Yes' : 'No'}</td>
                  <td>
                    <button onClick={() => {
                      setEditingUser(user);
                      setView('edit');
                    }}>Edit</button>
                    <button onClick={async () => {
                      await fetch(`http://localhost:3001/users/${user.userId}`, {
                        method: 'DELETE',
                      });
                      fetchUsers();  // Refresh user list after deletion
                    }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
