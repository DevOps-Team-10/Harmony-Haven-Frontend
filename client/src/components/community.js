import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Community.css';
import comm1 from '../assets/Community/team1.jpg';
import comm2 from '../assets/Community/team2.jpg';
import comm3 from '../assets/Community/team3.jpg';
import comm4 from '../assets/Community/team4.jpg';

const images = [comm1, comm2, comm3, comm4];

const Community = () => {
  const [communities, setCommunities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCommunities = async () => {
      const token = localStorage.getItem('authToken');
  
      try {
        const response = await fetch('/api/community', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const responseData = await response.json();
        setCommunities(responseData.data);
      } catch (error) {
        console.error('Error fetching communities:', error);
      }
    };
  
    fetchCommunities();
  }, []);

  const handleJoinCommunity = (communityId) => {
    navigate(`/community/${communityId}/chat`);
  };

  return (
    <div className="community-container">
      <h1>Community</h1>
      <div className="community-list">
        {communities.map((community, index) => (
          <div key={community._id} className="community-card">
            <img src={images[index % images.length]} alt={community.communityName} />
            <h2>{community.communityName}</h2>
            <button onClick={() => handleJoinCommunity(community._id)} className="join-button">Join</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;
