// Mock data for the application

// Mock Events
export const mockEvents = [
  {
    id: 'event-1',
    title: 'Tech Symposium 2025',
    description: 'Annual technical symposium featuring paper presentations, coding competitions, and technical workshops.',
    date: '2025-03-15',
    time: '09:00 AM - 05:00 PM',
    venue: 'Main Auditorium',
    organizer: 'Department of Computer Science',
    type: 'technical',
    registrationOpen: true,
    registeredUsers: ['STU001', 'STU003'],
    createdBy: 'FAC001'
  },
  {
    id: 'event-2',
    title: 'Cultural Fest - Sathyabama Rhythms',
    description: 'Annual cultural festival featuring music, dance, and theatrical performances from students across departments.',
    date: '2025-04-10',
    time: '10:00 AM - 08:00 PM',
    venue: 'Open Air Theatre',
    organizer: 'Student Cultural Committee',
    type: 'cultural',
    registrationOpen: true,
    registeredUsers: [],
    createdBy: 'ADM001'
  },
  {
    id: 'event-3',
    title: 'Workshop on AI and Machine Learning',
    description: 'Hands-on workshop on artificial intelligence and machine learning fundamentals with industry experts.',
    date: '2025-02-28',
    time: '10:00 AM - 04:00 PM',
    venue: 'CS Lab Complex',
    organizer: 'Department of Computer Science',
    type: 'workshop',
    registrationOpen: true,
    registeredUsers: ['STU001'],
    createdBy: 'FAC001'
  },
  {
    id: 'event-4',
    title: 'Sports Meet 2025',
    description: 'Annual sports competition featuring track and field events, team sports, and indoor games.',
    date: '2025-01-20',
    time: '08:00 AM - 06:00 PM',
    venue: 'University Sports Complex',
    organizer: 'Department of Physical Education',
    type: 'sports',
    registrationOpen: false,
    registeredUsers: ['STU002', 'STU003'],
    createdBy: 'ADM001'
  },
  {
    id: 'event-5',
    title: 'Industry Expert Talk: Future of Robotics',
    description: 'Guest lecture by industry experts on the future of robotics and automation in various sectors.',
    date: '2025-03-05',
    time: '02:00 PM - 04:00 PM',
    venue: 'Seminar Hall 2',
    organizer: 'Department of Robotics',
    type: 'seminar',
    registrationOpen: true,
    registeredUsers: [],
    createdBy: 'FAC002'
  }
];

// Mock Certificates
export const mockCertificates = [
  {
    id: 'CERT-001',
    title: 'Certificate of Participation',
    eventName: 'Tech Symposium 2024',
    issueDate: '2024-03-20',
    type: 'participation',
    studentId: 'STU001',
    studentName: 'John Doe',
    department: 'Computer Science',
    registrationNumber: 'SIST2022CS001'
  },
  {
    id: 'CERT-002',
    title: 'Certificate of Achievement - First Prize',
    eventName: 'Coding Competition 2024',
    issueDate: '2024-02-15',
    type: 'achievement',
    studentId: 'STU001',
    studentName: 'John Doe',
    department: 'Computer Science',
    registrationNumber: 'SIST2022CS001'
  },
  {
    id: 'CERT-003',
    title: 'Certificate of Participation',
    eventName: 'Workshop on Cloud Computing',
    issueDate: '2024-01-10',
    type: 'participation',
    studentId: 'STU001',
    studentName: 'John Doe',
    department: 'Computer Science',
    registrationNumber: 'SIST2022CS001'
  },
  {
    id: 'CERT-004',
    title: 'Certificate of Achievement - Best Paper',
    eventName: 'International Conference on AI',
    issueDate: '2023-12-05',
    type: 'achievement',
    studentId: 'STU002',
    studentName: 'Jane Smith',
    department: 'Computer Science',
    registrationNumber: 'SIST2022CS002'
  },
  {
    id: 'CERT-005',
    title: 'Certificate of Participation',
    eventName: 'Cultural Fest 2023',
    issueDate: '2023-11-20',
    type: 'participation',
    studentId: 'STU003',
    studentName: 'Robert Johnson',
    department: 'Mechanical Engineering',
    registrationNumber: 'SIST2022ME001'
  }
];

// Mock On-Duty Requests
export const mockOnDutyRequests = [
  {
    id: 'OD-001',
    studentId: 'STU001',
    studentName: 'John Doe',
    registrationNumber: 'SIST2022CS001',
    department: 'Computer Science',
    reason: 'Event Participation',
    eventName: 'National Level Hackathon',
    fromDate: '2025-02-10',
    toDate: '2025-02-12',
    fromTime: '09:00',
    toTime: '17:00',
    description: 'Participating in a 48-hour hackathon organized by Microsoft at IIT Madras.',
    submittedAt: '2025-02-01',
    status: 'approved',
    approvedBy: 'Dr. Sarah Williams',
    approvedAt: '2025-02-03'
  },
  {
    id: 'OD-002',
    studentId: 'STU001',
    studentName: 'John Doe',
    registrationNumber: 'SIST2022CS001',
    department: 'Computer Science',
    reason: 'Workshop',
    eventName: 'AI Workshop at Anna University',
    fromDate: '2025-03-05',
    toDate: '2025-03-05',
    fromTime: '10:00',
    toTime: '16:00',
    description: 'Attending a one-day workshop on advanced AI techniques at Anna University.',
    submittedAt: '2025-02-25',
    status: 'pending'
  },
  {
    id: 'OD-003',
    studentId: 'STU002',
    studentName: 'Jane Smith',
    registrationNumber: 'SIST2022CS002',
    department: 'Computer Science',
    reason: 'Internship',
    eventName: 'Internship at TCS',
    fromDate: '2025-04-01',
    toDate: '2025-04-30',
    fromTime: '09:00',
    toTime: '17:00',
    description: 'One-month internship at TCS for project work related to my final year project.',
    submittedAt: '2025-03-15',
    status: 'approved',
    approvedBy: 'Dr. Sarah Williams',
    approvedAt: '2025-03-18'
  },
  {
    id: 'OD-004',
    studentId: 'STU003',
    studentName: 'Robert Johnson',
    registrationNumber: 'SIST2022ME001',
    department: 'Mechanical Engineering',
    reason: 'Competition',
    eventName: 'National Robotics Competition',
    fromDate: '2025-03-20',
    toDate: '2025-03-22',
    fromTime: '08:00',
    toTime: '18:00',
    description: 'Representing the university in the National Robotics Competition at IIT Bombay.',
    submittedAt: '2025-03-10',
    status: 'rejected',
    rejectedBy: 'Dr. Michael Brown',
    rejectedAt: '2025-03-12',
    rejectionReason: 'Insufficient supporting documents provided.'
  },
  {
    id: 'OD-005',
    studentId: 'STU001',
    studentName: 'John Doe',
    registrationNumber: 'SIST2022CS001',
    department: 'Computer Science',
    reason: 'Project Work',
    eventName: 'Industry Visit to Infosys',
    fromDate: '2025-05-15',
    toDate: '2025-05-15',
    fromTime: '09:00',
    toTime: '17:00',
    description: 'Visiting Infosys campus for project discussion and data collection for final year project.',
    submittedAt: '2025-05-10',
    status: 'pending'
  }
];