import React, { useState, useEffect } from 'react';
import { db } from '../../Firebase/firebase-config';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { useAuth } from '../../Context/AuthContext';

function AdminUsers({ users, changeUserRoles }) {
  const rolesList = ['user', 'admin', 'aichat', 'contributor','movie'];  // Define all possible roles

  return (
    <div>
      <h2>User Permissions</h2>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Email</th>
            <th>Current Roles</th>
            <th>Change Roles</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.roles?.join(', ') || 'user'}</td>
              <td>
                {rolesList.map(role => (
                  <label key={role}>
                    <input 
                      type="checkbox" 
                      checked={user.roles?.includes(role) || false}
                      onChange={(e) => changeUserRoles(user.id, role, e.target.checked)} 
                    />
                    {role}
                  </label>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AdminMovies() {
  return (
    <div>
      <h2>Movie Editor</h2>
      {/* Add movie editing functionality here */}
    </div>
  );
}

function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('users');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userRoles } = useAuth();  // Note the plural, reflecting multiple roles

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, 'users');
        const userSnapshot = await getDocs(usersCollection);
        const userList = userSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setUsers(userList);
      } catch (err) {
        setError('Failed to fetch users. Please try again later.');
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const changeUserRoles = async (userId, role, isChecked) => {
    try {
      const userRef = doc(db, 'users', userId);
      const user = users.find(user => user.id === userId);
      const updatedRoles = isChecked
        ? [...(user.roles || []), role]  // Add role if checked
        : (user.roles || []).filter(r => r !== role);  // Remove role if unchecked

      await updateDoc(userRef, { role: updatedRoles });
      setUsers(users.map(user => 
        user.id === userId ? { ...user, roles: updatedRoles } : user
      ));
    } catch (err) {
      setError('Failed to update user roles. Please try again later.');
      console.error('Error updating user roles:', err);
    }
  };

  if (!userRoles.includes('admin')) {
    return <div>Access Denied. Admin privileges required.</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="admin-panel">
      <div className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li>
            <button 
              onClick={() => setActiveTab('users')}
              className={activeTab === 'users' ? 'active' : ''}
            >
              User Permissions
            </button>
          </li>
          <li>
            <button 
              onClick={() => setActiveTab('movies')}
              className={activeTab === 'movies' ? 'active' : ''}
            >
              Movie Editor
            </button>
          </li>
        </ul>
      </div>
      <div className="content">
        {activeTab === 'users' && <AdminUsers users={users} changeUserRoles={changeUserRoles} />}
        {activeTab === 'movies' && <AdminMovies />}
      </div>
    </div>
  );
}

export default AdminPanel;
