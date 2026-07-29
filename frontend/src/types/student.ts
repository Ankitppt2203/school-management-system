export interface DepartmentOption {
  id: number;
  name: string;
}

/** The request body accepted by POST /students and PUT /students/{id}. */
export interface StudentPayload {
  admissionNumber: string;
  rollNumber: string;
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  academicSession: string;
  admissionDate: string;
  status: "PENDING" | "ACTIVE" | "INACTIVE" | "SUSPENDED" | "GRADUATED";
  departmentId: number;
  courseIds: number[];
  password?: string;
  username?: string;
  admissionDetails: Record<string, string>;
}

/** The student shape returned by the backend. */
export interface StudentRow extends StudentPayload {
  id: number;
  fullName: string;
  departmentName: string;
  courseNames?: string[];
}

export interface StudentPageResponse {
  content: StudentRow[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
}
