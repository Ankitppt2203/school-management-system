export interface DepartmentRecord {
  id: number;
  name: string;
  students?: unknown[] | null;
  teachers?: unknown[] | null;
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
}