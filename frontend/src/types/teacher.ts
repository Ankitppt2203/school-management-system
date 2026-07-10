export interface TeacherDepartmentSummary {
  id: number;
  name: string;
}

export interface TeacherRecord {
  id: number;
  name: string;
  subject: string;
  salary: number;
  department?: TeacherDepartmentSummary | null;
}

export interface TeacherFormValues {
  name: string;
  subject: string;
  salary: string;
  departmentId: string;
}

export interface TeacherPayload {
  name: string;
  subject: string;
  salary: number;
  departmentId: number;
}

export interface TeacherRow {
  id: string;
  name: string;
  subject: string;
  salary: number;
  departmentId: string;
  departmentName: string;
}

export interface DepartmentOption {
  id: number;
  name: string;
}