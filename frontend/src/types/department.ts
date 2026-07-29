export interface DepartmentRecord {
  id: number;
  name: string;
  studentCount: number;
  teacherCount: number;
  studentNames?: string[];
  teacherNames?: string[];
}

export interface DepartmentFormValues {
  name: string;
}

export interface DepartmentPayload {
  name: string;
}

export interface DepartmentRow {
  id: string;
  name: string;
  studentCount: number;
  teacherCount: number;
  studentNames: string[];
  teacherNames: string[];
}
