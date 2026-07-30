export type AttendanceStatus = 'PRESENT' | 'ABSENT';

export interface AttendanceRecord {
  id: number;
  date: string;
  status: AttendanceStatus;
  studentId: number;
  firstName: string;
  lastName: string;
  rollNumber?: string | null;
  userId?: string | null;
  departmentId: number;
  departmentName: string;
}

export interface AttendanceStudent {
  id: number;
  firstName: string;
  lastName: string;
  rollNumber?: string | null;
  userId?: string | null;
  departmentId: number;
  departmentName: string;
}

export interface AttendanceFormValues {
  date: string;
  status: AttendanceStatus;
  studentId: string;
}

export interface AttendancePayload {
  date: string;
  status: AttendanceStatus;
  studentId: number;
}

export interface AttendanceRow {
  id: string;
  date: string;
  status: AttendanceStatus;
  studentId: string;
  studentLabel: string;
  rollNumber: string;
  userId: string;
  departmentId: string;
  departmentName: string;
}
