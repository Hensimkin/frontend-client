/* eslint-disable */
import React, { useState, useEffect } from 'react';
import './cssFile.css';
import axios from 'axios';


function StatsInfo({ onClose }) {
  const [statsInfo, setStatsInfo] = useState({
    totalLikes: 0,
    followers: 0,
    following: 0,
    avgLikes: 0,
  });

  useEffect(() => {
    async function fetchStatistics() {
      try {
        const statsResponse = await axios.post('https://backend-server-qdnc.onrender.com/getStatistics',{statsInfo});
        setStatsInfo(statsResponse.data.stats);
      } catch (error) {
        console.log('Error fetching statistics:', error);
      }
    }
    fetchStatistics();
  }, []);

  return (
    <div className="popup">
      <div onClick={onClose} className="overlay" />
      <div className="popup-inner3">
        <span className="close-button" onClick={onClose}>
          x
        </span>
        <h1 className="head">Statistics</h1>
          <div className="fonts">
            <label >Followers: {statsInfo.followers}</label>
            <br/><br/>
            <label>Following: {statsInfo.following}</label>
            <br/><br/>
            <label >Total likes: {statsInfo.totalLikes}</label>
            <br/><br/>
            <label>Average likes : {statsInfo.avgLikes}</label>
            <br/>

          </div>
      </div>
    </div>
  );
}

export default StatsInfo;
