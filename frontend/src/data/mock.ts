import type {
  Student,
  Teacher,
  Department,
  Course,
  Exam,
  Result,
  AttendanceRow,
  User,
} from '../types';
import { img } from '../lib/images';

export const stats = [
  { label: 'Students', value: 1000, suffix: '+' },
  { label: 'Teachers', value: 100, suffix: '+' },
  { label: 'Years Experience', value: 20, suffix: '+' },
  { label: 'Awards', value: 50, suffix: '+' },
];

export const whyChoose = [
  { icon: 'Monitor', title: 'Smart Classrooms', desc: 'AI-enabled interactive boards in every classroom.' },
  { icon: 'Users', title: 'Experienced Faculty', desc: 'Highly qualified teachers with global exposure.' },
  { icon: 'Trophy', title: 'Sports Facilities', desc: 'Olympic-size pool, courts, and athletic tracks.' },
  { icon: 'Cpu', title: 'Computer Labs', desc: 'High-end labs with the latest software.' },
  { icon: 'FlaskConical', title: 'Science Labs', desc: 'Modern physics, chemistry & biology labs.' },
  { icon: 'Music', title: 'Music', desc: 'Trained instructors for vocal & instrumental.' },
  { icon: 'Footprints', title: 'Dance', desc: 'Classical and contemporary dance studios.' },
  { icon: 'Bot', title: 'Robotics Lab', desc: 'STEM-focused robotics & AI learning.' },
  { icon: 'BookOpen', title: 'Library', desc: '20,000+ books and digital archives.' },
  { icon: 'Bus', title: 'Transport', desc: 'GPS-enabled safe bus routes across the city.' },
  { icon: 'BedDouble', title: 'Hostel', desc: 'Comfortable, secure residential facilities.' },
  { icon: 'Stethoscope', title: 'Medical Facility', desc: 'On-campus infirmary with full-time doctor.' },
];

export const academics = [
  { icon: 'Backpack', title: 'Primary School', desc: 'Grades 1–5 — activity-based foundational learning.', color: 'from-sky-400 to-blue-600' },
  { icon: 'Pencil', title: 'Middle School', desc: 'Grades 6–8 — concept-driven skill building.', color: 'from-emerald-400 to-teal-600' },
  { icon: 'BookMarked', title: 'High School', desc: 'Grades 9–10 — board exam focused curriculum.', color: 'from-amber-400 to-orange-600' },
  { icon: 'GraduationCap', title: 'Senior Secondary', desc: 'Grades 11–12 — Science, Commerce & Humanities streams.', color: 'from-rose-400 to-pink-600' },
];

export const departments = [
  { icon: 'Atom', name: 'Science', desc: 'Physics, Chemistry, Biology & Mathematics.' },
  { icon: 'Calculator', name: 'Commerce', desc: 'Accountancy, Business Studies & Economics.' },
  { icon: 'Languages', name: 'Humanities', desc: 'History, Political Science & Psychology.' },
  { icon: 'Globe2', name: 'Languages', desc: 'English, Hindi, French & Sanskrit.' },
  { icon: 'Palette', name: 'Arts & Music', desc: 'Visual arts, vocal & instrumental music.' },
  { icon: 'Dumbbell', name: 'Physical Education', desc: 'Sports, athletics & wellness programs.' },
];

export const achievements = [
  { name: 'Ananya Sharma', class: 'Class XII', percentage: '98.8%', achievement: 'CBSE Topper', year: '2026', image: img.student1 },
  { name: 'Rohan Verma', class: 'Class XII', percentage: '98.2%', achievement: 'Board Topper', year: '2026', image: img.student2 },
  { name: 'Ishita Gupta', class: 'Class XI', percentage: '97.5%', achievement: 'Olympiad Winner', year: '2025', image: img.student3 },
  { name: 'Kabir Singh', class: 'Class X', percentage: '96.4%', achievement: 'Sports Champion', year: '2025', image: img.student4 },
  { name: 'Sara Khan', class: 'Class IX', percentage: '95.9%', achievement: 'Science Fair Winner', year: '2025', image: img.student1 },
  { name: 'Aditya Rao', class: 'Class XII', percentage: '95.1%', achievement: 'Olympiad Gold', year: '2024', image: img.student2 },
];

export const testimonials = [
  { name: 'Ananya Sharma', class: 'Class XII', role: 'Student', photo: img.student1, review: 'Greenwood shaped me into a confident learner. The faculty pushed me to top the boards.' },
  { name: 'Rohan Verma', class: 'Class XII', role: 'Student', photo: img.student2, review: 'The robotics lab and mentorship here are unmatched. I got into my dream college.' },
  { name: 'Mr. & Mrs. Gupta', class: 'Parents of Ishita', role: 'Parent', photo: img.parent1, review: 'The teachers genuinely care. Communication through the ERP is seamless.' },
  { name: 'Mr. Khan', class: 'Parent of Sara', role: 'Parent', photo: img.parent2, review: 'A safe, nurturing campus. Sara loves the arts and music programs.' },
];

export const events = [
  { date: 'Jul 15, 2026', title: 'Annual Function', desc: 'Grand cultural evening with performances by students across all grades.', icon: 'Sparkles' },
  { date: 'Aug 08, 2026', title: 'Sports Day', desc: 'Track & field events, team sports and the inter-house championship.', icon: 'Trophy' },
  { date: 'Aug 22, 2026', title: 'Science Exhibition', desc: 'Student-led innovation showcase with industry judges.', icon: 'FlaskConical' },
  { date: 'Sep 05, 2026', title: 'Parent Teacher Meeting', desc: 'Term progress review and one-on-one mentorship sessions.', icon: 'Users' },
  { date: 'Oct 02, 2026', title: 'Holiday Calendar', desc: 'Gandhi Jayanti — campus closed. Resume on Oct 03.', icon: 'Calendar' },
];

export const news = [
  { tag: 'Admissions', text: 'Admissions open for 2026–27 — limited seats available across all grades.' },
  { tag: 'Results', text: 'Greenwood students achieve 100% pass rate in CBSE Class XII board exams.' },
  { tag: 'Announcement', text: 'New Robotics & AI lab inaugurated by the Honorable Education Minister.' },
  { tag: 'Circular', text: 'Parent-Teacher Meeting scheduled for September 5, 2026.' },
  { tag: 'News', text: 'Three Greenwood students selected for the National Science Olympiad camp.' },
];

export const faculty = [
  { name: 'Dr. Meera Nair', role: 'Principal', qualification: 'Ph.D. in Education', experience: 25, subject: 'Educational Leadership', photo: img.principal },
  { name: 'Mr. Arvind Krishnan', role: 'Vice Principal', qualification: 'M.Sc., B.Ed.', experience: 18, subject: 'Mathematics', photo: img.teacher1 },
  { name: 'Ms. Priya Menon', role: 'Department Head — Science', qualification: 'M.Sc. Physics', experience: 15, subject: 'Physics', photo: img.teacher2 },
  { name: 'Mr. Samuel Thomas', role: 'Department Head — Commerce', qualification: 'M.Com, MBA', experience: 12, subject: 'Accountancy', photo: img.teacher3 },
  { name: 'Ms. Fatima Sheikh', role: 'Department Head — Humanities', qualification: 'M.A. History', experience: 14, subject: 'History', photo: img.teacher4 },
  { name: 'Mr. Vikram Joshi', role: 'Senior Teacher', qualification: 'M.Sc. Chemistry, B.Ed.', experience: 10, subject: 'Chemistry', photo: img.teacher1 },
];

export const admissionProcess = [
  { step: 1, title: 'Online Inquiry', desc: 'Submit the online admission inquiry form.' },
  { step: 2, title: 'Campus Visit', desc: 'Schedule a guided campus tour and interaction.' },
  { step: 3, title: 'Assessment', desc: 'Age-appropriate assessment and interaction with the child.' },
  { step: 4, title: 'Admission Offer', desc: 'Receive the admission offer and complete fee payment.' },
  { step: 5, title: 'Enrollment', desc: 'Submit documents and complete the enrollment.' },
];

export const feeStructure = [
  { grade: 'Primary (1–5)', admission: '₹25,000', tuition: '₹8,000/mo', total: '₹1,21,000' },
  { grade: 'Middle (6–8)', admission: '₹30,000', tuition: '₹9,500/mo', total: '₹1,44,000' },
  { grade: 'High (9–10)', admission: '₹35,000', tuition: '₹11,000/mo', total: '₹1,67,000' },
  { grade: 'Senior (11–12)', admission: '₹40,000', tuition: '₹13,000/mo', total: '₹1,96,000' },
];

export const faqs = [
  { q: 'What is the age criterion for admission?', a: 'Age criteria vary by grade. For Grade 1, the child must be 6 years old as of March 31 of the academic year.' },
  { q: 'Is there an entrance test?', a: 'For Grades 1–5, admission is interaction-based. For Grades 6 and above, a written assessment is conducted.' },
  { q: 'Do you provide transport facilities?', a: 'Yes, GPS-enabled bus services cover all major routes across the city.' },
  { q: 'What is the student-teacher ratio?', a: 'We maintain a healthy ratio of 15:1 to ensure personalized attention.' },
  { q: 'Are scholarships available?', a: 'Yes, merit-based and need-based scholarships are available. Contact the admissions office for details.' },
];

// ERP mock data
export const mockUser: User = {
  id: 'u1',
  name: 'Dr. Meera Nair',
  email: 'admin@greenwood.edu',
  role: 'admin',
  avatar: img.avatar('Meera Nair'),
  phone: '+91 98765 43210',
  designation: 'Principal',
};

export const students: Student[] = Array.from({ length: 24 }).map((_, i) => {
  const names = ['Aarav Patel', 'Diya Shah', 'Vivaan Reddy', 'Ananya Iyer', 'Reyansh Nair', 'Saanvi Rao', 'Arjun Mehta', 'Myra Kapoor', 'Advay Gupta', 'Aadhya Jain', 'Kabir Malhotra', 'Kiara Bose', 'Vihaan Chopra', 'Pari Sinha', 'Shaurya Pillai', 'Riya Banerjee', 'Atharv Menon', 'Tara Saxena', 'Dhruv Agarwal', 'Ira Krishnan', 'Ayaan Verma', 'Navya Bhat', 'Rudra Trivedi', 'Sara Khan'];
  const classes = ['Class IX', 'Class X', 'Class XI', 'Class XII'];
  const sections = ['A', 'B', 'C'];
  return {
    id: `S${1000 + i}`,
    name: names[i % names.length],
    email: `${names[i % names.length].toLowerCase().replace(/[^a-z]/g, '.')}@greenwood.edu`,
    phone: `+91 9${Math.floor(100000000 + Math.random() * 899999999)}`,
    class: classes[i % classes.length],
    section: sections[i % sections.length],
    rollNo: `${i + 1}`,
    gender: i % 2 === 0 ? 'Male' : 'Female',
    guardian: `Mr. ${names[i % names.length].split(' ')[1]}`,
    avatar: img.avatar(names[i % names.length]),
    attendance: 80 + Math.floor(Math.random() * 20),
    gpa: Math.round((6 + Math.random() * 4) * 10) / 10,
    status: i % 7 === 0 ? 'Inactive' : 'Active',
    admittedOn: `202${i % 4}-0${(i % 9) + 1}-1${i % 9}`,
  };
});

export const teachers: Teacher[] = Array.from({ length: 12 }).map((_, i) => {
  const names = ['Priya Menon', 'Samuel Thomas', 'Fatima Sheikh', 'Vikram Joshi', 'Anil Kumar', 'Neha Sharma', 'Rahul Desai', 'Lakshmi Iyer', 'Joseph Mathew', 'Kavita Rao', 'Suresh Pillai', 'Deepa Nair'];
  const subjects = ['Physics', 'Mathematics', 'English', 'Chemistry', 'Biology', 'History', 'Economics', 'Computer Science', 'Commerce', 'Hindi', 'Physical Education', 'Geography'];
  const depts = ['Science', 'Science', 'Humanities', 'Science', 'Science', 'Humanities', 'Commerce', 'Science', 'Commerce', 'Languages', 'Physical Education', 'Humanities'];
  return {
    id: `T${200 + i}`,
    name: names[i],
    email: `${names[i].toLowerCase().replace(/[^a-z]/g, '.')}@greenwood.edu`,
    phone: `+91 9${Math.floor(100000000 + Math.random() * 899999999)}`,
    subject: subjects[i],
    department: depts[i],
    qualification: ['M.Sc., B.Ed.', 'M.A., M.Ed.', 'M.Com, MBA', 'M.Sc. Physics', 'M.A. English'][i % 5],
    experience: 5 + (i % 20),
    avatar: img.avatar(names[i]),
    status: i % 6 === 0 ? 'Inactive' : 'Active',
  };
});

export const departmentsData: Department[] = [
  { id: 'D1', name: 'Science', hod: 'Ms. Priya Menon', teachers: 18, subjects: 6, established: '2005', icon: 'Atom' },
  { id: 'D2', name: 'Commerce', hod: 'Mr. Samuel Thomas', teachers: 10, subjects: 4, established: '2008', icon: 'Calculator' },
  { id: 'D3', name: 'Humanities', hod: 'Ms. Fatima Sheikh', teachers: 12, subjects: 5, established: '2010', icon: 'Languages' },
  { id: 'D4', name: 'Languages', hod: 'Mr. Anil Kumar', teachers: 8, subjects: 4, established: '2006', icon: 'Globe2' },
  { id: 'D5', name: 'Arts & Music', hod: 'Ms. Neha Sharma', teachers: 6, subjects: 3, established: '2012', icon: 'Palette' },
  { id: 'D6', name: 'Physical Education', hod: 'Mr. Suresh Pillai', teachers: 5, subjects: 2, established: '2007', icon: 'Dumbbell' },
];

export const courses: Course[] = [
  { id: 'C1', name: 'Advanced Mathematics', code: 'MATH301', department: 'Science', credits: 4, teacher: 'Mr. Arvind Krishnan', students: 42, duration: '1 Year' },
  { id: 'C2', name: 'Physics — Mechanics', code: 'PHY201', department: 'Science', credits: 4, teacher: 'Ms. Priya Menon', students: 38, duration: '1 Year' },
  { id: 'C3', name: 'Organic Chemistry', code: 'CHE202', department: 'Science', credits: 3, teacher: 'Mr. Vikram Joshi', students: 35, duration: '6 Months' },
  { id: 'C4', name: 'Accountancy', code: 'ACC101', department: 'Commerce', credits: 4, teacher: 'Mr. Samuel Thomas', students: 40, duration: '1 Year' },
  { id: 'C5', name: 'Modern History', code: 'HIS101', department: 'Humanities', credits: 3, teacher: 'Ms. Fatima Sheikh', students: 28, duration: '1 Year' },
  { id: 'C6', name: 'English Literature', code: 'ENG101', department: 'Languages', credits: 3, teacher: 'Mr. Anil Kumar', students: 50, duration: '1 Year' },
  { id: 'C7', name: 'Computer Science', code: 'CSC201', department: 'Science', credits: 4, teacher: 'Mr. Rahul Desai', students: 45, duration: '1 Year' },
  { id: 'C8', name: 'Economics', code: 'ECO101', department: 'Commerce', credits: 3, teacher: 'Mr. Joseph Mathew', students: 33, duration: '1 Year' },
];

export const exams: Exam[] = [
  { id: 'E1', name: 'Unit Test 1', class: 'Class X', subject: 'Mathematics', date: '2026-07-10', time: '09:00 AM', room: 'A-101', totalMarks: 50, status: 'Scheduled' },
  { id: 'E2', name: 'Mid-Term', class: 'Class XII', subject: 'Physics', date: '2026-07-12', time: '10:00 AM', room: 'B-204', totalMarks: 100, status: 'Scheduled' },
  { id: 'E3', name: 'Unit Test 1', class: 'Class IX', subject: 'English', date: '2026-07-08', time: '11:00 AM', room: 'A-102', totalMarks: 50, status: 'Ongoing' },
  { id: 'E4', name: 'Quiz', class: 'Class XI', subject: 'Chemistry', date: '2026-07-05', time: '09:30 AM', room: 'C-301', totalMarks: 25, status: 'Completed' },
  { id: 'E5', name: 'Mid-Term', class: 'Class X', subject: 'Science', date: '2026-07-15', time: '09:00 AM', room: 'A-103', totalMarks: 100, status: 'Scheduled' },
];

export const results: Result[] = students.slice(0, 10).map((s, i) => {
  const marks = 70 + Math.floor(Math.random() * 30);
  return {
    id: `R${i + 1}`,
    student: s.name,
    class: s.class,
    exam: 'Mid-Term',
    marks,
    total: 100,
    percentage: marks,
    grade: marks >= 90 ? 'A+' : marks >= 80 ? 'A' : marks >= 70 ? 'B+' : 'B',
    rank: i + 1,
  };
});

export const attendance: AttendanceRow[] = students.slice(0, 15).map((s, i) => ({
  id: `A${i + 1}`,
  student: s.name,
  class: s.class,
  date: '2026-07-04',
  status: (['Present', 'Present', 'Present', 'Absent', 'Leave'] as const)[i % 5],
}));

export const dashboardStats = [
  { label: 'Total Students', value: 1000, icon: 'Users', trend: '+4.2%', color: 'from-blue-500 to-blue-600' },
  { label: 'Total Teachers', value: 100, icon: 'GraduationCap', trend: '+1.8%', color: 'from-emerald-500 to-teal-600' },
  { label: 'Total Courses', value: 48, icon: 'BookOpen', trend: '+2.1%', color: 'from-amber-500 to-orange-600' },
  { label: 'Departments', value: 6, icon: 'Building2', trend: '0%', color: 'from-rose-500 to-pink-600' },
  { label: 'Attendance %', value: 94, icon: 'CalendarCheck', trend: '+1.2%', color: 'from-violet-500 to-purple-600' },
  { label: 'Upcoming Exams', value: 5, icon: 'FileText', trend: '—', color: 'from-cyan-500 to-blue-600' },
  { label: 'Results Published', value: 12, icon: 'Award', trend: '+3', color: 'from-lime-500 to-green-600' },
  { label: 'Recent Activities', value: 28, icon: 'Activity', trend: '+8', color: 'from-fuchsia-500 to-pink-600' },
];

export const enrollmentTrend = [
  { month: 'Jan', students: 920, teachers: 95 },
  { month: 'Feb', students: 940, teachers: 96 },
  { month: 'Mar', students: 960, teachers: 97 },
  { month: 'Apr', students: 975, teachers: 98 },
  { month: 'May', students: 985, teachers: 99 },
  { month: 'Jun', students: 1000, teachers: 100 },
];

export const attendanceWeek = [
  { day: 'Mon', present: 940, absent: 60 },
  { day: 'Tue', present: 955, absent: 45 },
  { day: 'Wed', present: 970, absent: 30 },
  { day: 'Thu', present: 945, absent: 55 },
  { day: 'Fri', present: 960, absent: 40 },
  { day: 'Sat', present: 900, absent: 100 },
];

export const departmentDistribution = [
  { name: 'Science', value: 320, color: '#2563eb' },
  { name: 'Commerce', value: 220, color: '#0d9488' },
  { name: 'Humanities', value: 180, color: '#f97316' },
  { name: 'Languages', value: 150, color: '#e11d48' },
  { name: 'Arts', value: 80, color: '#7c3aed' },
  { name: 'Sports', value: 50, color: '#65a30d' },
];

export const recentActivities = [
  { text: 'New student Aarav Patel enrolled in Class X-A', time: '2 min ago', icon: 'UserPlus' },
  { text: 'Mid-Term results published for Class XII', time: '1 hr ago', icon: 'Award' },
  { text: 'Attendance marked for Class IX-B', time: '3 hrs ago', icon: 'CalendarCheck' },
  { text: 'New course "Robotics 101" added', time: '5 hrs ago', icon: 'BookPlus' },
  { text: 'Teacher Ms. Neha Sharma updated profile', time: '1 day ago', icon: 'UserCog' },
  { text: 'Fee payment received from 12 students', time: '2 days ago', icon: 'CreditCard' },
];

export const notifications = [
  { title: 'Board exam schedule released', time: '10 min ago', type: 'info' },
  { title: 'PTM reminder for September 5', time: '1 hr ago', type: 'reminder' },
  { title: 'New admission inquiry received', time: '3 hrs ago', type: 'success' },
  { title: 'Server maintenance tonight at 2 AM', time: '5 hrs ago', type: 'warning' },
];
