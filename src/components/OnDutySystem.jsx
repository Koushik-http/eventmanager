import React, { useState, useEffect } from 'react';
import { FileCheck, Search, Plus, Calendar, Clock, User, FileText, CheckCircle, XCircle } from 'lucide-react';
import { mockOnDutyRequests } from '../data/mockData';

const OnDutySystem = ({ userRole, userData }) => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [newRequest, setNewRequest] = useState({
    reason: '',
    eventName: '',
    fromDate: '',
    toDate: '',
    fromTime: '',
    toTime: '',
    description: '',
    attachmentUrl: ''
  });

  useEffect(() => {
    // In a real app, this would be an API call
    let userRequests;
    
    if (userRole === 'student') {
      // Filter requests for this student
      userRequests = mockOnDutyRequests.filter(req => req.studentId === userData.id);
    } else if (userRole === 'faculty') {
      // Faculty can see requests from their department
      userRequests = mockOnDutyRequests.filter(req => req.department === userData.department);
    } else {
      // Admin can see all requests
      userRequests = mockOnDutyRequests;
    }
    
    setRequests(userRequests);
    setFilteredRequests(userRequests);
  }, [userRole, userData]);

  useEffect(() => {
    let result = requests;
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(req => 
        req.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.studentName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    if (filter !== 'all') {
      result = result.filter(req => req.status === filter);
    }
    
    setFilteredRequests(result);
  }, [searchTerm, filter, requests]);

  const handleApprove = (requestId) => {
    // In a real app, this would be an API call
    setRequests(requests.map(req => {
      if (req.id === requestId) {
        return {
          ...req,
          status: 'approved',
          approvedBy: userData.name,
          approvedAt: new Date().toISOString().split('T')[0]
        };
      }
      return req;
    }));
  };

  const handleReject = (requestId) => {
    // In a real app, this would be an API call
    setRequests(requests.map(req => {
      if (req.id === requestId) {
        return {
          ...req,
          status: 'rejected',
          rejectedBy: userData.name,
          rejectedAt: new Date().toISOString().split('T')[0]
        };
      }
      return req;
    }));
  };

  const handleAddRequest = (e) => {
    e.preventDefault();
    
    // In a real app, this would be an API call
    const newRequestData = {
      id: `req-${requests.length + 1}`,
      ...newRequest,
      studentId: userData.id,
      studentName: userData.name,
      department: userData.department,
      registrationNumber: userData.registrationNumber,
      submittedAt: new Date().toISOString().split('T')[0],
      status: 'pending'
    };
    
    setRequests([...requests, newRequestData]);
    setShowModal(false);
    setNewRequest({
      reason: '',
      eventName: '',
      fromDate: '',
      toDate: '',
      fromTime: '',
      toTime: '',
      description: '',
      attachmentUrl: ''
    });
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'approved': return 'badge-success';
      case 'rejected': return 'badge-danger';
      default: return 'badge-warning';
    }
  };

  return (
    <div className="onduty-system">
      <div className="section-header">
        <h2 className="section-title">On-Duty Management</h2>
        <p>{userRole === 'student' ? 'Apply and track your on-duty requests' : 'Manage on-duty requests from students'}</p>
      </div>
      
      <div className="filter-bar">
        <div className="search-container" style={{ display: 'flex', flex: 1 }}>
          <Search size={20} style={{ marginRight: '0.5rem' }} />
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search requests..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-container" style={{ display: 'flex', alignItems: 'center' }}>
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{ padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        
        {userRole === 'student' && (
          <button 
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <Plus size={18} />
            New Request
          </button>
        )}
      </div>
      
      {filteredRequests.length === 0 ? (
        <div className="empty-state">
          <FileCheck size={48} className="empty-state-icon" />
          <h3>No on-duty requests found</h3>
          <p>{userRole === 'student' ? "You haven't submitted any on-duty requests yet" : "No requests match your search criteria"}</p>
        </div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Request ID</th>
                {(userRole === 'faculty' || userRole === 'admin') && <th>Student</th>}
                <th>Reason</th>
                <th>Event/Activity</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map(request => (
                <tr key={request.id}>
                  <td>{request.id}</td>
                  {(userRole === 'faculty' || userRole === 'admin') && (
                    <td>{request.studentName}<br /><small>{request.registrationNumber}</small></td>
                  )}
                  <td>{request.reason}</td>
                  <td>{request.eventName}</td>
                  <td>
                    {request.fromDate === request.toDate 
                      ? request.fromDate 
                      : `${request.fromDate} to ${request.toDate}`}
                  </td>
                  <td>
                    <span className={`badge ${getStatusBadgeClass(request.status)}`}>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {(userRole === 'faculty' || userRole === 'admin') && request.status === 'pending' && (
                        <>
                          <button 
                            className="btn btn-success"
                            onClick={() => handleApprove(request.id)}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                          >
                            <CheckCircle size={16} />
                            Approve
                          </button>
                          <button 
                            className="btn btn-danger"
                            onClick={() => handleReject(request.id)}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                          >
                            <XCircle size={16} />
                            Reject
                          </button>
                        </>
                      )}
                      <button 
                        className="btn btn-secondary"
                        onClick={() => alert(`Viewing details for request ${request.id}`)}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                      >
                        <FileText size={16} />
                        Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {/* New Request Modal */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title">New On-Duty Request</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            
            <div className="modal-body">
              <form className="form" onSubmit={handleAddRequest}>
                <div className="form-group">
                  <label htmlFor="reason">Reason for On-Duty</label>
                  <select 
                    id="reason" 
                    value={newRequest.reason}
                    onChange={(e) => setNewRequest({...newRequest, reason: e.target.value})}
                    required
                  >
                    <option value="">Select a reason</option>
                    <option value="Event Participation">Event Participation</option>
                    <option value="Competition">Competition</option>
                    <option value="Workshop">Workshop/Seminar</option>
                    <option value="Internship">Internship</option>
                    <option value="Project Work">Project Work</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="eventName">Event/Activity Name</label>
                  <input 
                    type="text" 
                    id="eventName" 
                    value={newRequest.eventName}
                    onChange={(e) => setNewRequest({...newRequest, eventName: e.target.value})}
                    required
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="fromDate">From Date</label>
                    <input 
                      type="date" 
                      id="fromDate" 
                      value={newRequest.fromDate}
                      onChange={(e) => setNewRequest({...newRequest, fromDate: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="toDate">To Date</label>
                    <input 
                      type="date" 
                      id="toDate" 
                      value={newRequest.toDate}
                      onChange={(e) => setNewRequest({...newRequest, toDate: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="fromTime">From Time</label>
                    <input 
                      type="time" 
                      id="fromTime" 
                      value={newRequest.fromTime}
                      onChange={(e) => setNewRequest({...newRequest, fromTime: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="toTime">To Time</label>
                    <input 
                      type="time" 
                      id="toTime" 
                      value={newRequest.toTime}
                      onChange={(e) => setNewRequest({...newRequest, toTime: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea 
                    id="description" 
                    value={newRequest.description}
                    onChange={(e) => setNewRequest({...newRequest, description: e.target.value})}
                    rows="3"
                    required
                    style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', resize: 'vertical' }}
                  ></textarea>
                </div>
                
                <div className="form-group">
                  <label htmlFor="attachment">Attachment (Optional)</label>
                  <input 
                    type="file" 
                    id="attachment"
                    style={{ padding: '0.5rem 0' }}
                  />
                  <small style={{ color: '#777' }}>Upload invitation letter, event details, or other supporting documents</small>
                </div>
                
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Submit Request</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OnDutySystem;