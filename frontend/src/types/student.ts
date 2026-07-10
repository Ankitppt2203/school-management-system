export interface StudentDepartmentSummary {
  id: number;
  name: string;
}

export interface StudentRecord {
  id: number;
  name: string;
  age: number;
  department?: StudentDepartmentSummary | null;
}

export interface StudentPageResponse {
  content: StudentRecord[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
}

export interface StudentFormValues {
  name: string;
  age: string;
  departmentId: string;
}

export interface StudentPayload {
  name: string;
  age: number;
  departmentId: number;
}

export interface DepartmentOption {
  id: number;
  name: string;
}

export interface StudentRow {
  id: string;
  name: string;
  age: number;
  departmentId: string;
  departmentName: string;
}