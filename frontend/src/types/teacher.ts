export interface TeacherRecord {
  id: number;
  name: string;
  subject: string;
  salary: number;
  departmentId: number;
  departmentName: string;
  username?: string;
  profileDetails?: Record<string, string>;
}

export interface TeacherFormValues {
  name: string;
  subject: string;
  salary: string;
  departmentId: string;
  username: string;
  password: string;
  profileDetails: Record<string, string>;
}

export interface TeacherPayload {
  name: string;
  subject: string;
  salary: number;
  departmentId: number;
  username?: string;
  password?: string;
  profileDetails: Record<string, string>;
}

export interface TeacherRow {
  id: string;
  name: string;
  subject: string;
  salary: number;
  departmentId: string;
  departmentName: string;
  username?: string;
  profileDetails: Record<string, string>;
}

export interface DepartmentOption {
  id: number;
  name: string;
}
