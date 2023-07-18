import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchUserData();
  };

  const fetchUserData = () => {
    axios
      .get(`https://api.github.com/users/${username}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        setUser(null);
        console.error(error);
      });
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter GitHub Username"
          value={username}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>

      {user ? (
        <div className="user-info">
          <img src={user.avatar_url} alt="User Avatar" />
          <h2>{user.name}</h2>

          <table>
            <tbody>
              <tr>
                <td>Location:</td>
                <td>{user.location || '-'}</td>
              </tr>
              <tr>
                <td>Total Repos:</td>
                <td>{user.public_repos || '-'}</td>
              </tr>
              <tr>
                <td>Bio:</td>
                <td>{user.bio || '-'}</td>
              </tr>
              <tr>
                <td>Followers:</td>
                <td>{user.followers || '-'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p>No user found. Please enter a valid GitHub username.</p>
      )}
    </div>
  );
}

export default App;
