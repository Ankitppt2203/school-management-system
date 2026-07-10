export type Role = 'admin' | 'teacher' | 'student' | 'parent';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string;
  phone?: string;
  designation?: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  class: string;
  section: string;
  rollNo: string;
  gender: 'Male' | 'Female';
  guardian: string;
  avatar: string;
  attendance: number;
  gpa: number;
  status: 'Active' | 'Inactive';
  admittedOn: string;
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  department: string;
  qualification: string;
  experience: number;
  avatar: string;
  status: 'Active' | 'Inactive';
}

export interface Department {
  id: string;
  name: string;
  hod: string;
  teachers: number;
  subjects: number;
  established: string;
  icon: string;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  department: string;
  credits: number;
  teacher: string;
  students: number;
  duration: string;
}

export interface Exam {
  id: string;
  name: string;
  class: string;
  subject: string;
  date: string;
  time: string;
  room: string;
  totalMarks: number;
  status: 'Scheduled' | 'Ongoing' | 'Completed';
}

export interface Result {
  id: string;
  student: string;
  class: string;
  exam: string;
  marks: number;
  total: number;
  percentage: number;
  grade: string;
  rank: number;
}

export interface AttendanceRow {
  id: string;
  student: string;
  class: string;
  date: string;
  status: 'Present' | 'Absent' | 'Leave';
}
