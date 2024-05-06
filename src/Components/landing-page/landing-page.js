import './LandingPage.css';

import React, {useState, useEffect} from 'react';
import axios from 'axios';

function LandingPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/data');
        setData(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  })

  return (
    <div style={{ textAlign: 'center', margin: '50px' }}>
      <h1>Welcome!</h1>
      <div style={{ margin: 'auto', maxWidth: '600px' }}>
        <p>
          This is a landing page for the Velecela family
        </p>
      </div>
    </div>
  );
}

export default LandingPage;