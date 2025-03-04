import React, { useState, useEffect } from 'react';
import { Calendar, Users, Clock, MapPin, Plus, Search, Filter, X } from 'lucide-react';
import { mockEvents } from '../data/mockData';

const EventDashboard = ({ userRole, userData }) => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    venue: '',
    organizer: '',
    type: 'technical',
    registrationOpen: true
  });

  useEffect(() => {
    // In a real app, this would be an API call
    setEvents(mockEvents);
    setFilteredEvents(mockEvents);
  }, []);

  useEffect(() => {
    let result = events;
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(event => 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.organizer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (filter !== 'all') {
      result = result.filter(event => event.type === filter);
    }
    
    setFilteredEvents(result);
  }, [searchTerm, filter, events]);

  const handleRegister = (eventId) => {
    // In a real app, this would be an API call to register the user
    setEvents(events.map(event => {
      if (event.id === eventId) {
        return {
          ...event,
          registeredUsers: [...event.registeredUsers, userData.id],
          isRegistered: true
        };
      }
      return event;
    }));
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    
    // In a real app, this would be an API call
    const newEventData = {
      id: `event-${events.length + 1}`,
      ...newEvent,
      registeredUsers: [],
      createdBy: userData.id
    };
    
    setEvents([...events, newEventData]);
    setShowModal(false);
    setNewEvent({
      title: '',
      description: '',
      date: '',
      time: '',
      venue: '',
      organizer: '',
      type: 'technical',
      registrationOpen: true
    });
  };

  return (
    <div className="event-dashboard">
      <div className="section-header">
        <h2 className="section-title">Event Dashboard</h2>
        <p>Discover and register for upcoming events at Sathyabama Institute</p>
      </div>
      
      <div className="filter-bar">
        <div className="search-container" style={{ display: 'flex', flex: 1 }}>
          <Search size={20} style={{ marginRight: '0.5rem' }} />
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search events..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-container" style={{ display: 'flex', alignItems: 'center' }}>
          <Filter size={20} style={{ marginRight: '0.5rem' }} />
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{ padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
          >
            <option value="all">All Categories</option>
            <option value="technical">Technical</option>
            <option value="cultural">Cultural</option>
            <option value="sports">Sports</option>
            <option value="workshop">Workshop</option>
            <option value="seminar">Seminar</option>
          </select>
        </div>
        
        {(userRole === 'admin' || userRole === 'faculty') && (
          <button 
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <Plus size={18} />
            Add Event
          </button>
        )}
      </div>
      
      {filteredEvents.length === 0 ? (
        <div className="empty-state">
          <Calendar size={48} className="empty-state-icon" />
          <h3>No events found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      ) : (
        <div className="events-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {filteredEvents.map(event => (
            <div key={event.id} className="card">
              <div className="card-header">
                <h3 className="card-title">{event.title}</h3>
                <span className={`badge badge-${event.type === 'technical' ? 'primary' : event.type === 'cultural' ? 'success' : 'warning'}`}>
                  {event.type}
                </span>
              </div>
              
              <div className="event-details" style={{ marginBottom: '1rem' }}>
                <p>{event.description}</p>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0.75rem 0' }}>
                  <Calendar size={16} />
                  <span>{event.date}</span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0.75rem 0' }}>
                  <Clock size={16} />
                  <span>{event.time}</span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0.75rem 0' }}>
                  <MapPin size={16} />
                  <span>{event.venue}</span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0.75rem 0' }}>
                  <Users size={16} />
                  <span>Organized by: {event.organizer}</span>
                </div>
              </div>
              
              <div className="card-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #eee' }}>
                <span>
                  {event.registrationOpen ? (
                    <span className="badge badge-success">Registration Open</span>
                  ) : (
                    <span className="badge badge-danger">Registration Closed</span>
                  )}
                </span>
                
                {userRole === 'student' && event.registrationOpen && !event.registeredUsers.includes(userData.id) && (
                  <button 
                    className="btn btn-primary"
                    onClick={() => handleRegister(event.id)}
                  >
                    Register
                  </button>
                )}
                
                {userRole === 'student' && event.registeredUsers.includes(userData.id) && (
                  <span className="badge badge-primary">Registered</span>
                )}
                
                {(userRole === 'admin' || userRole === 'faculty') && (
                  <span>{event.registeredUsers.length} Registrations</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Add Event Modal */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title">Add New Event</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            
            <div className="modal-body">
              <form className="form" onSubmit={handleAddEvent}>
                <div className="form-group">
                  <label htmlFor="title">Event Title</label>
                  <input 
                    type="text" 
                    id="title" 
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea 
                    id="description" 
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                    rows="3"
                    required
                    style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', resize: 'vertical' }}
                  ></textarea>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input 
                      type="date" 
                      id="date" 
                      value={newEvent.date}
                      onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="time">Time</label>
                    <input 
                      type="time" 
                      id="time" 
                      value={newEvent.time}
                      onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="venue">Venue</label>
                  <input 
                    type="text" 
                    id="venue" 
                    value={newEvent.venue}
                    onChange={(e) => setNewEvent({...newEvent, venue: e.target.value})}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="organizer">Organizer</label>
                  <input 
                    type="text" 
                    id="organizer" 
                    value={newEvent.organizer}
                    onChange={(e) => setNewEvent({...newEvent, organizer: e.target.value})}
                    required
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="type">Event Type</label>
                    <select 
                      id="type" 
                      value={newEvent.type}
                      onChange={(e) => setNewEvent({...newEvent, type: e.target.value})}
                    >
                      <option value="technical">Technical</option>
                      <option value="cultural">Cultural</option>
                      <option value="sports">Sports</option>
                      <option value="workshop">Workshop</option>
                      <option value="seminar">Seminar</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="registrationOpen">Registration Status</label>
                    <select 
                      id="registrationOpen" 
                      value={newEvent.registrationOpen}
                      onChange={(e) => setNewEvent({...newEvent, registrationOpen: e.target.value === 'true'})}
                    >
                      <option value="true">Open</option>
                      <option value="false">Closed</option>
                    </select>
                  </div>
                </div>
                
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Create Event</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDashboard;