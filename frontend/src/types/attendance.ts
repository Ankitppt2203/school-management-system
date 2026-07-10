export type AttendanceStatus = 'PRESENT' | 'ABSENT';

export interface AttendanceRecord {
  id: number;
  date: string;
  status: AttendanceStatus;
  student?: {
    id: number;
    name?: string;
  } | null;
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
}