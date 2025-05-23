export default function ManageUsers({ users, onDelete, onEdit }) {
  return (
    <div className="manage-users">
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th><th>Email</th><th>Category</th><th>Email Verified</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.email}>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.category}</td>
                <td>{user.emailVerified ? 'Yes' : 'No'}</td>
                <td>
                  <button onClick={() => onEdit(user)}>Edit</button>
                  <button onClick={() => onDelete(user.email)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
