import React, { useState, useEffect } from 'react';
import { Award, Download, Search, FileText, Eye, Upload, Send, AlertCircle, CheckCircle, X } from 'lucide-react';
import { mockCertificates } from '../data/mockData';

const CertificatePortal = ({ userRole, userData }) => {
  const [certificates, setCertificates] = useState([]);
  const [filteredCertificates, setFilteredCertificates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showIssuanceModal, setShowIssuanceModal] = useState(false);
  const [csvFile, setCsvFile] = useState(null);
  const [zipFile, setZipFile] = useState(null);
  const [issuanceStatus, setIssuanceStatus] = useState('idle'); // idle, processing, success, error
  const [issuanceMessage, setIssuanceMessage] = useState('');
  const [previewData, setPreviewData] = useState([]);

  useEffect(() => {
    // In a real app, this would be an API call
    let userCertificates;
    
    if (userRole === 'student') {
      // Filter certificates for this student
      userCertificates = mockCertificates.filter(cert => cert.studentId === userData.id);
    } else {
      // Admin and faculty can see all certificates
      userCertificates = mockCertificates;
    }
    
    setCertificates(userCertificates);
    setFilteredCertificates(userCertificates);
  }, [userRole, userData]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = certificates.filter(cert => 
        cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cert.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cert.issueDate.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCertificates(filtered);
    } else {
      setFilteredCertificates(certificates);
    }
  }, [searchTerm, certificates]);

  const handleViewCertificate = (certificate) => {
    setSelectedCertificate(certificate);
    setShowModal(true);
  };

  const handleDownload = (certificate) => {
    // In a real app, this would trigger a download
    alert(`Certificate "${certificate.title}" would be downloaded in a real application.`);
  };

  const handleCsvUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCsvFile(file);
      // In a real app, we would parse the CSV here
      // For demo purposes, we'll simulate parsing with mock data
      simulateCsvParsing(file);
    }
  };

  const handleZipUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setZipFile(file);
    }
  };

  const simulateCsvParsing = (file) => {
    // This is a mock function to simulate parsing a CSV file
    // In a real app, we would use a library like Papa Parse
    
    // Simulate preview data
    setPreviewData([
      { id: 'STU004', name: 'Alice Johnson', email: 'alice.j@student.sathyabama.edu', event: 'Tech Symposium 2025', type: 'participation' },
      { id: 'STU005', name: 'Bob Williams', email: 'bob.w@student.sathyabama.edu', event: 'Tech Symposium 2025', type: 'achievement' },
      { id: 'STU006', name: 'Carol Davis', email: 'carol.d@student.sathyabama.edu', event: 'Tech Symposium 2025', type: 'participation' },
    ]);
  };

  const handleIssueCertificates = () => {
    if (!csvFile || !zipFile) {
      setIssuanceStatus('error');
      setIssuanceMessage('Please upload both CSV and ZIP files');
      return;
    }

    setIssuanceStatus('processing');
    setIssuanceMessage('Processing certificates...');

    // Simulate processing time
    setTimeout(() => {
      // In a real app, this would be an API call to process the files and issue certificates
      
      // Add the new certificates to our mock data
      const newCertificates = previewData.map((student, index) => ({
        id: `CERT-${100 + index}`,
        title: student.type === 'participation' ? 'Certificate of Participation' : 'Certificate of Achievement',
        eventName: student.event,
        issueDate: new Date().toISOString().split('T')[0],
        type: student.type,
        studentId: student.id,
        studentName: student.name,
        department: 'Computer Science', // In a real app, this would come from the CSV
        registrationNumber: `SIST2022CS${student.id.replace('STU', '')}`
      }));
      
      setCertificates([...certificates, ...newCertificates]);
      
      setIssuanceStatus('success');
      setIssuanceMessage(`Successfully issued ${previewData.length} certificates`);
      
      // Reset after 3 seconds
      setTimeout(() => {
        setIssuanceStatus('idle');
        setIssuanceMessage('');
        setCsvFile(null);
        setZipFile(null);
        setPreviewData([]);
        setShowIssuanceModal(false);
      }, 3000);
    }, 2000);
  };

  return (
    <div className="certificate-portal">
      <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 className="section-title">Certificate Portal</h2>
          <p>Access and download your certificates</p>
        </div>
        
        {(userRole === 'admin' || userRole === 'faculty') && (
          <button 
            className="btn btn-primary"
            onClick={() => setShowIssuanceModal(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <Upload size={18} />
            Issue Certificates
          </button>
        )}
      </div>
      
      <div className="filter-bar">
        <div className="search-container" style={{ display: 'flex', flex: 1 }}>
          <Search size={20} style={{ marginRight: '0.5rem' }} />
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search certificates..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {filteredCertificates.length === 0 ? (
        <div className="empty-state">
          <Award size={48} className="empty-state-icon" />
          <h3>No certificates found</h3>
          <p>{userRole === 'student' ? "You haven't received any certificates yet" : "No certificates match your search"}</p>
        </div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Certificate Title</th>
                <th>Event/Achievement</th>
                <th>Issue Date</th>
                <th>Type</th>
                {userRole !== 'student' && <th>Student</th>}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCertificates.map(certificate => (
                <tr key={certificate.id}>
                  <td>{certificate.title}</td>
                  <td>{certificate.eventName}</td>
                  <td>{certificate.issueDate}</td>
                  <td>
                    <span className={`badge badge-${certificate.type === 'participation' ? 'primary' : 'success'}`}>
                      {certificate.type === 'participation' ? 'Participation' : 'Achievement'}
                    </span>
                  </td>
                  {userRole !== 'student' && (
                    <td>{certificate.studentName}</td>
                  )}
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button 
                        className="btn btn-secondary"
                        onClick={() => handleViewCertificate(certificate)}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                      >
                        <Eye size={16} />
                        View
                      </button>
                      <button 
                        className="btn btn-primary"
                        onClick={() => handleDownload(certificate)}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                      >
                        <Download size={16} />
                        Download
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Certificate View Modal */}
      {showModal && selectedCertificate && (
        <div className="modal-backdrop">
          <div className="modal" style={{ width: '700px', maxWidth: '95%' }}>
            <div className="modal-header">
              <h3 className="modal-title">Certificate Preview</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            
            <div className="modal-body">
              <div className="certificate-preview" style={{ 
                border: '10px solid #003366', 
                padding: '2rem', 
                textAlign: 'center',
                background: 'linear-gradient(to bottom, #f9f9f9, #f0f0f0)',
                position: 'relative',
                marginBottom: '1.5rem'
              }}>
                <div style={{ position: 'absolute', top: '10px', right: '10px', opacity: '0.1' }}>
                  <Award size={100} />
                </div>
                
                <div style={{ marginBottom: '1.5rem' }}>
                  <h2 style={{ color: '#003366', fontSize: '1.75rem', marginBottom: '0.5rem' }}>Sathyabama Institute of Science and Technology</h2>
                  <p style={{ color: '#555' }}>Certificate of {selectedCertificate.type === 'participation' ? 'Participation' : 'Achievement'}</p>
                </div>
                
                <div style={{ margin: '2rem 0' }}>
                  <h1 style={{ color: '#002855', fontSize: '2rem', marginBottom: '1rem' }}>{selectedCertificate.title}</h1>
                  <p style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>This is to certify that</p>
                  <h3 style={{ color: '#003366', fontSize: '1.5rem', marginBottom: '1rem' }}>{selectedCertificate.studentName}</h3>
                  <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
                    has {selectedCertificate.type === 'participation' ? 'participated in' : 'achieved excellence in'} <br />
                    <strong>{selectedCertificate.eventName}</strong>
                  </p>
                  <p style={{ fontSize: '1rem', marginTop: '2rem' }}>Issued on: {selectedCertificate.issueDate}</p>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3rem' }}>
                  <div style={{ textAlign: 'center', borderTop: '1px solid #003366', paddingTop: '0.5rem', width: '200px' }}>
                    <p>Event Coordinator</p>
                  </div>
                  <div style={{ textAlign: 'center', borderTop: '1px solid #003366', paddingTop: '0.5rem', width: '200px' }}>
                    <p>Director</p>
                  </div>
                </div>
                
                <div style={{ marginTop: '2rem' }}>
                  <p style={{ fontSize: '0.8rem', color: '#777' }}>Certificate ID: {selectedCertificate.id}</p>
                </div>
              </div>
              
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                <button 
                  className="btn btn-primary"
                  onClick={() => handleDownload(selectedCertificate)}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  <Download size={18} />
                  Download Certificate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Certificate Issuance Modal */}
      {showIssuanceModal && (
        <div className="modal-backdrop">
          <div className="modal" style={{ width: '700px', maxWidth: '95%' }}>
            <div className="modal-header">
              <h3 className="modal-title">Issue Certificates</h3>
              <button className="modal-close" onClick={() => {
                if (issuanceStatus !== 'processing') {
                  setShowIssuanceModal(false);
                  setIssuanceStatus('idle');
                  setIssuanceMessage('');
                  setCsvFile(null);
                  setZipFile(null);
                  setPreviewData([]);
                }
              }}>×</button>
            </div>
            
            <div className="modal-body">
              {issuanceStatus === 'processing' ? (
                <div className="issuance-status" style={{ textAlign: 'center', padding: '2rem' }}>
                  <div className="spinner" style={{ 
                    border: '4px solid #f3f3f3',
                    borderTop: '4px solid #003366',
                    borderRadius: '50%',
                    width: '50px',
                    height: '50px',
                    animation: 'spin 2s linear infinite',
                    margin: '0 auto 1rem'
                  }}></div>
                  <p>{issuanceMessage}</p>
                  <style>{`
                    @keyframes spin {
                      0% { transform: rotate(0deg); }
                      100% { transform: rotate(360deg); }
                    }
                  `}</style>
                </div>
              ) : issuanceStatus === 'success' ? (
                <div className="issuance-status" style={{ textAlign: 'center', padding: '2rem' }}>
                  <CheckCircle size={50} color="#28a745" style={{ margin: '0 auto 1rem' }} />
                  <p>{issuanceMessage}</p>
                </div>
              ) : issuanceStatus === 'error' ? (
                <div className="issuance-status" style={{ textAlign: 'center', padding: '2rem' }}>
                  <AlertCircle size={50} color="#dc3545" style={{ margin: '0 auto 1rem' }} />
                  <p>{issuanceMessage}</p>
                </div>
              ) : (
                <>
                  <p style={{ marginBottom: '1.5rem' }}>Upload a CSV file with participant details and a ZIP file containing certificates to issue them to students.</p>
                  
                  <div className="form">
                    <div className="form-group">
                      <label htmlFor="csvFile">Participant Data (CSV)</label>
                      <div className="file-upload-container" style={{ 
                        border: '2px dashed #ddd', 
                        padding: '1.5rem', 
                        borderRadius: '4px',
                        textAlign: 'center',
                        marginTop: '0.5rem',
                        backgroundColor: csvFile ? '#f8f9fa' : 'white'
                      }}>
                        {csvFile ? (
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <FileText size={24} />
                              <span>{csvFile.name}</span>
                            </div>
                            <button 
                              className="btn btn-secondary" 
                              onClick={() => {
                                setCsvFile(null);
                                setPreviewData([]);
                              }}
                              style={{ display: 'flex', alignItems: 'center' }}
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ) : (
                          <>
                            <Upload size={32} style={{ marginBottom: '0.5rem', opacity: 0.5 }} />
                            <p>Drag & drop a CSV file or click to browse</p>
                            <input 
                              type="file" 
                              id="csvFile" 
                              accept=".csv" 
                              onChange={handleCsvUpload}
                              style={{ 
                                position: 'absolute', 
                                top: 0, 
                                left: 0, 
                                width: '100%', 
                                height: '100%', 
                                opacity: 0,
                                cursor: 'pointer'
                              }} 
                            />
                          </>
                        )}
                      </div>
                      <small style={{ color: '#777', marginTop: '0.5rem', display: 'block' }}>
                        CSV should include: Student ID, Name, Email, Event Name, Certificate Type
                      </small>
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="zipFile">Certificates (ZIP)</label>
                      <div className="file-upload-container" style={{ 
                        border: '2px dashed #ddd', 
                        padding: '1.5rem', 
                        borderRadius: '4px',
                        textAlign: 'center',
                        marginTop: '0.5rem',
                        backgroundColor: zipFile ? '#f8f9fa' : 'white'
                      }}>
                        {zipFile ? (
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <FileText size={24} />
                              <span>{zipFile.name}</span>
                            </div>
                            <button 
                              className="btn btn-secondary" 
                              onClick={() => setZipFile(null)}
                              style={{ display: 'flex', alignItems: 'center' }}
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ) : (
                          <>
                            <Upload size={32} style={{ marginBottom: '0.5rem', opacity: 0.5 }} />
                            <p>Drag & drop a ZIP file or click to browse</p>
                            <input 
                              type="file" 
                              id="zipFile" 
                              accept=".zip" 
                              onChange={handleZipUpload}
                              style={{ 
                                position: 'absolute', 
                                top: 0, 
                                left: 0, 
                                width: '100%', 
                                height: '100%', 
                                opacity: 0,
                                cursor: 'pointer'
                              }} 
                            />
                          </>
                        )}
                      </div>
                      <small style={{ color: '#777', marginTop: '0.5rem', display: 'block' }}>
                        ZIP should contain PDF certificates named with Student IDs
                      </small>
                    </div>
                    
                    {previewData.length > 0 && (
                      <div className="preview-section" style={{ marginTop: '1.5rem' }}>
                        <h4 style={{ marginBottom: '1rem' }}>Data Preview</h4>
                        <div className="table-container" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                          <table>
                            <thead>
                              <tr>
                                <th>Student ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Event</th>
                                <th>Type</th>
                              </tr>
                            </thead>
                            <tbody>
                              {previewData.map((row, index) => (
                                <tr key={index}>
                                  <td>{row.id}</td>
                                  <td>{row.name}</td>
                                  <td>{row.email}</td>
                                  <td>{row.event}</td>
                                  <td>
                                    <span className={`badge badge-${row.type === 'participation' ? 'primary' : 'success'}`}>
                                      {row.type === 'participation' ? 'Participation' : 'Achievement'}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
              
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => {
                    if (issuanceStatus !== 'processing') {
                      setShowIssuanceModal(false);
                      setIssuanceStatus('idle');
                      setIssuanceMessage('');
                      setCsvFile(null);
                      setZipFile(null);
                      setPreviewData([]);
                    }
                  }}
                  disabled={issuanceStatus === 'processing'}
                >
                  Cancel
                </button>
                
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={handleIssueCertificates}
                  disabled={!csvFile || !zipFile || issuanceStatus === 'processing'}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  <Send size={18} />
                  Issue Certificates
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificatePortal;