import React, { useState } from 'react';
import { Calendar, Award, FileCheck, LogOut, Radius } from 'lucide-react';
import Login from './components/Login';
import EventDashboard from './components/EventDashboard';
import CertificatePortal from './components/CertificatePortal';
import OnDutySystem from './components/OnDutySystem';
import SathyabamaLogo from './Sathyabama_logo.jpg';

import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('events');
  const [userRole, setUserRole] = useState('');
  const [userData, setUserData] = useState(null);

  const handleLogin = (role, user) => {
    setIsLoggedIn(true);
    setUserRole(role);
    setUserData(user);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('');
    setUserData(null);
    setActiveTab('events');
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo-container">
        <img 
  src={SathyabamaLogo} 
  alt="Sathyabama Institute Logo"
  style={{ width: "60px", height: "60px", marginRight: "10px", borderRadius: "10px" }} 
/>

          <h1>Sathyabama Institute Portal</h1>
        </div>
        <div className="user-info">
          <span>{userData?.name} ({userRole})</span>
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </header>

      <div className="main-content">
        <nav className="sidebar">
          <ul>
            <li 
              className={activeTab === 'events' ? 'active' : ''} 
              onClick={() => setActiveTab('events')}
            >
              <Calendar size={20} />
              <span>Events</span>
            </li>
            <li 
              className={activeTab === 'certificates' ? 'active' : ''} 
              onClick={() => setActiveTab('certificates')}
            >
              <Award size={20} />
              <span>Certificates</span>
            </li>
            <li 
              className={activeTab === 'onduty' ? 'active' : ''} 
              onClick={() => setActiveTab('onduty')}
            >
              <FileCheck size={20} />
              <span>On-Duty</span>
            </li>
          </ul>
        </nav>

        <main className="content">
          {activeTab === 'events' && <EventDashboard userRole={userRole} userData={userData} />}
          {activeTab === 'certificates' && <CertificatePortal userRole={userRole} userData={userData} />}
          {activeTab === 'onduty' && <OnDutySystem userRole={userRole} userData={userData} />}
        </main>
      </div>
    </div>
  );
}

export default App;
