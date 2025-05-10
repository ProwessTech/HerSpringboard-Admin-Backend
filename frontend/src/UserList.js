import React from 'react';
function UserList({ users, onEdit, onDelete }) {
  const adminUsers = users.filter(user => user.createdBy === 'admin_ui');
  return (
    <div>
      <ul>
        {adminUsers.map((user) => (
          <li key={user.userId}>
            <span>{user.firstName} {user.lastName}</span>
            <button onClick={() => onEdit(user)}>Edit</button>
            <button onClick={() => onDelete(user.userId)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default UserList;
