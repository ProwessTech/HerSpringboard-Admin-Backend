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
            fetchUsers();
            setView('list');
          }}
        />
      )}

      {view === 'edit' && editingUser && (
        <EditUserForm
          user={editingUser}
          onUserUpdated={() => {
            fetchUsers();
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
        <UserList
          users={users}
          onEdit={(user) => {
            setEditingUser(user);
            setView('edit');
          }}
          onDelete={async (userId) => {
            await fetch(`http://localhost:3001/users/${userId}`, {
              method: 'DELETE',
            });
            fetchUsers();
          }}
        />
      )}
    </div>
  );
}