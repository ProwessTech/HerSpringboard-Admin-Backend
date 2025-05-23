import { useEffect, useState } from 'react';
import ManageUsers from './ManageUsers';
import CreateUserForm from './CreateUserForm';
import EditUserForm from './EditUserForm';
import ManageCourses from './ManageCourses';
import CreateCourseForm from './CreateCourseForm';
import EditCourseForm from './EditCourseForm';
import './style.css';
export default function App() {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [userError, setUserError] = useState(null);
  const [courseError, setCourseError] = useState(null);
  const [isUsersLoading, setIsUsersLoading] = useState(false);
  const [isCoursesLoading, setIsCoursesLoading] = useState(false);
  const [mainView, setMainView] = useState('main'); 
  const [manageView, setManageView] = useState('');   
  const [editingUser, setEditingUser] = useState(null);
  const [editingCourse, setEditingCourse] = useState(null);
  const fetchUsers = async () => {
    setIsUsersLoading(true);
    try {
      const response = await fetch('http://localhost:3001/users');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setUsers(data);
      setUserError(null);
    } catch (err) {
      setUserError(err.message);
      setUsers([]);
    } finally {
      setIsUsersLoading(false);
    }
  };
  const fetchCourses = async () => {
    setIsCoursesLoading(true);
    try {
      const response = await fetch('http://localhost:3001/courses');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setCourses(data);
      setCourseError(null);
    } catch (err) {
      setCourseError(err.message);
      setCourses([]);
    } finally {
      setIsCoursesLoading(false);
    }
  };
  useEffect(() => {
    if (mainView === 'manageUsers' && manageView === 'list') {
      fetchUsers();
    }
    if (mainView === 'manageCourses' && manageView === 'list') {
      fetchCourses();
    }
  }, [mainView, manageView]);
  const handleEditUser = (user) => {
    setEditingUser(user);
    setManageView('edit');
  };
  const handleDeleteUser = async (email) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      const res = await fetch(`http://localhost:3001/users/${email}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete user');
      await fetchUsers();
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };
  const handleEditCourse = (course) => {
    setEditingCourse(course);
    setManageView('edit');
  };
  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    try {
      const res = await fetch(`http://localhost:3001/courses/${courseId}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete course');
      await fetchCourses();
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };
  const handleCancel = () => {
    setEditingUser(null);
    setEditingCourse(null);
    setManageView('list'); 
  };
  return (
    <div className="admin-dashboard" style={{ textAlign: 'center', padding: '20px' }}>
      {mainView === 'main' && (
        <>
          <header className="admin-header">
            <h2>Admin Dashboard</h2>
          </header>
          <button
            onClick={() => {
              setMainView('manageUsers');
              setManageView(''); 
            }}
            style={{ margin: '10px' }}
          >
            Manage Users
          </button>
          <button
            onClick={() => {
              setMainView('manageCourses');
              setManageView(''); 
            }}
            style={{ margin: '10px' }}
          >
            Manage Courses
          </button>
        </>
      )}
      {mainView === 'manageUsers' && (
        <div>
          <div style={{ margin: '20px 0' }}>
            <button
              onClick={() => {
                setManageView('create');
                setEditingUser(null);
              }}
              style={{ marginRight: '10px' }}
            >
              Create User
            </button>
            <button
              onClick={() => {
                setManageView('list');
                fetchUsers();
              }}
            >
              User List
            </button>
            <button
              onClick={() => setMainView('main')}
              style={{ marginLeft: 10 }}
            >
              Back to Dashboard
            </button>
          </div>

          {isUsersLoading ? (
            <p>Loading...</p>
          ) : userError ? (
            <p>Error: {userError}</p>
          ) : manageView === 'list' ? (
            <ManageUsers
              users={users}
              onDelete={handleDeleteUser}
              onEdit={handleEditUser}
              fetchUsers={fetchUsers}
            />
          ) : manageView === 'create' ? (
            <CreateUserForm
              onUserCreated={() => {
                fetchUsers();
                handleCancel();
              }}
              onCancel={handleCancel}
            />
          ) : manageView === 'edit' && editingUser ? (
            <EditUserForm
              user={editingUser}
              onUserUpdated={() => {
                fetchUsers();
                handleCancel();
              }}
              onCancel={handleCancel}
            />
          ) : null}
        </div>
      )}
      {mainView === 'manageCourses' && (
        <div>
          <div style={{ margin: '20px 0' }}>
            <button
              onClick={() => {
                setManageView('create');
                setEditingCourse(null);
              }}
              style={{ marginRight: '10px' }}
            >
              Create Course
            </button>
            <button
              onClick={() => {
                setManageView('list');
                fetchCourses();
              }}
            >
              Course List
            </button>
            <button
              onClick={() => setMainView('main')}
              style={{ marginLeft: 10 }}
            >
              Back to Dashboard
            </button>
          </div>

          {isCoursesLoading ? (
            <p>Loading...</p>
          ) : courseError ? (
            <p>Error: {courseError}</p>
          ) : manageView === 'list' ? (
            <ManageCourses
              courses={courses}
              onDelete={handleDeleteCourse}
              onEdit={handleEditCourse}
              fetchCourses={fetchCourses}
            />
          ) : manageView === 'create' ? (
            <CreateCourseForm
              onCourseCreated={() => {
                fetchCourses();
                handleCancel();
              }}
              onCancel={handleCancel}
            />
          ) : manageView === 'edit' && editingCourse ? (
            <EditCourseForm
              course={editingCourse}
              onCourseUpdated={() => {
                fetchCourses();
                handleCancel();
              }}
              onCancel={handleCancel}
            />
          ) : null}
        </div>
      )}
    </div>
  );
}
