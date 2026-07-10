import api from './api';
import type { Teacher, Department, Exam, Result } from '../types';
import type { DepartmentOption, StudentPageResponse, StudentPayload, StudentRecord, StudentRow } from '../types/student';
import type { DepartmentOption as TeacherDepartmentOption, TeacherPayload, TeacherRecord, TeacherRow } from '../types/teacher';
import type { DepartmentFormValues, DepartmentPayload, DepartmentRecord, DepartmentRow } from '../types/department';
import type { CourseFormValues, CoursePayload, CourseRecord, CourseRow } from '../types/course';
import type { AttendanceFormValues, AttendancePayload, AttendanceRecord, AttendanceRow } from '../types/attendance';

// ===============================
// Generic CRUD Factory
// ===============================
function crud<T extends { id: string }>(endpoint: string) {
  return {
    list: () => api.get<T[]>(`/${endpoint}`).then((r) => r.data),

    get: (id: string) =>
      api.get<T>(`/${endpoint}/${id}`).then((r) => r.data),

    create: (data: Omit<T, 'id'>) =>
      api.post<T>(`/${endpoint}`, data).then((r) => r.data),

    update: (id: string, data: Partial<T>) =>
      api.put<T>(`/${endpoint}/${id}`, data).then((r) => r.data),

    remove: (id: string) =>
      api.delete(`/${endpoint}/${id}`).then((r) => r.data),
  };
}

export const studentApi = {
  listPage: async (page: number, size: number): Promise<StudentPageResponse> => {
    const response = await api.get('/students/page', {
      params: { page, size },
    });

    const data = response.data as StudentPageResponse;

    return {
      ...data,
      content: data.content.map(mapStudentRecord),
    };
  },

  listAll: async (): Promise<StudentRow[]> => {
    const response = await api.get('/students');

    return (response.data as StudentRecord[]).map(mapStudentRecord);
  },

  getById: async (id: string): Promise<StudentRow> => {
    const response = await api.get(`/students/${id}`);

    return mapStudentRecord(response.data as StudentRecord);
  },

  create: async (data: StudentPayload): Promise<StudentPayload> => {
    const response = await api.post('/students', data);

    return response.data as StudentPayload;
  },

  update: async (id: string, data: StudentPayload): Promise<StudentPayload> => {
    const response = await api.put(`/students/${id}`, data);

    return response.data as StudentPayload;
  },

  remove: async (id: string): Promise<void> => {
    await api.delete(`/students/${id}`);
  },

  listDepartments: async (): Promise<DepartmentOption[]> => {
    const response = await api.get('/departments');

    return (response.data as Array<{ id: number; name: string }>).map((department) => ({
      id: Number(department.id),
      name: department.name,
    }));
  },
};

function mapStudentRecord(student: StudentRecord): StudentRow {
  const departmentId = student.department?.id ?? 0;

  return {
    id: student.id.toString(),
    name: student.name,
    age: student.age,
    departmentId: departmentId ? departmentId.toString() : '',
    departmentName: student.department?.name ?? 'Unassigned',
  };
}

// ===============================
// Other APIs
// ===============================

export const teacherApi = {
  listAll: async (): Promise<TeacherRow[]> => {
    const response = await api.get('/teachers');

    return (response.data as TeacherRecord[]).map(mapTeacherRecord);
  },

  getById: async (id: string): Promise<TeacherRow> => {
    const response = await api.get(`/teachers/${id}`);

    return mapTeacherRecord(response.data as TeacherRecord);
  },

  create: async (data: TeacherPayload): Promise<TeacherPayload> => {
    const response = await api.post('/teachers', data);

    return response.data as TeacherPayload;
  },

  update: async (id: string, data: TeacherPayload): Promise<TeacherPayload> => {
    const response = await api.put(`/teachers/${id}`, data);

    return response.data as TeacherPayload;
  },

  remove: async (id: string): Promise<void> => {
    await api.delete(`/teachers/${id}`);
  },

  listDepartments: async (): Promise<TeacherDepartmentOption[]> => {
    const response = await api.get('/departments');

    return (response.data as Array<{ id: number; name: string }>).map((department) => ({
      id: Number(department.id),
      name: department.name,
    }));
  },
};

function mapTeacherRecord(teacher: TeacherRecord): TeacherRow {
  const departmentId = teacher.department?.id ?? 0;

  return {
    id: teacher.id.toString(),
    name: teacher.name,
    subject: teacher.subject,
    salary: teacher.salary,
    departmentId: departmentId ? departmentId.toString() : '',
    departmentName: teacher.department?.name ?? 'Unassigned',
  };
}

export const departmentApi = {
  listAll: async (): Promise<DepartmentRow[]> => {
    const response = await api.get('/departments');

    return (response.data as DepartmentRecord[]).map(mapDepartmentRecord);
  },

  getById: async (id: string): Promise<DepartmentRow> => {
    const response = await api.get(`/departments/${id}`);

    return mapDepartmentRecord(response.data as DepartmentRecord);
  },

  create: async (data: DepartmentPayload): Promise<DepartmentPayload> => {
    const response = await api.post('/departments', data);

    return response.data as DepartmentPayload;
  },

  update: async (id: string, data: DepartmentPayload): Promise<DepartmentPayload> => {
    const response = await api.put(`/departments/${id}`, data);

    return response.data as DepartmentPayload;
  },

  remove: async (id: string): Promise<void> => {
    await api.delete(`/departments/${id}`);
  },
};

function mapDepartmentRecord(department: DepartmentRecord): DepartmentRow {
  return {
    id: department.id.toString(),
    name: department.name,
    studentCount: Array.isArray(department.students) ? department.students.length : 0,
    teacherCount: Array.isArray(department.teachers) ? department.teachers.length : 0,
  };
}

export const courseApi = {
  listAll: async (): Promise<CourseRow[]> => {
    const response = await api.get('/courses');

    return (response.data as CourseRecord[]).map(mapCourseRecord);
  },

  getById: async (id: string): Promise<CourseRow> => {
    const response = await api.get(`/courses/${id}`);

    return mapCourseRecord(response.data as CourseRecord);
  },

  create: async (data: CoursePayload): Promise<CoursePayload> => {
    const response = await api.post('/courses', data);

    return response.data as CoursePayload;
  },

  update: async (id: string, data: CoursePayload): Promise<CoursePayload> => {
    const response = await api.put(`/courses/${id}`, data);

    return response.data as CoursePayload;
  },

  remove: async (id: string): Promise<void> => {
    await api.delete(`/courses/${id}`);
  },
};

function mapCourseRecord(course: CourseRecord): CourseRow {
  return {
    id: course.id.toString(),
    name: course.name,
  };
}

export const examApi = crud<Exam>('exams');

export const resultApi = crud<Result>('results');

// ===============================
// Attendance
// ===============================

export const attendanceApi = {
  listAll: async (): Promise<AttendanceRow[]> => {
    const response = await api.get('/attendance');

    return (response.data as AttendanceRecord[]).map(mapAttendanceRecord);
  },

  getById: async (id: string): Promise<AttendanceRow> => {
    const response = await api.get(`/attendance/${id}`);

    return mapAttendanceRecord(response.data as AttendanceRecord);
  },

  create: async (data: AttendancePayload): Promise<AttendancePayload> => {
    const response = await api.post('/attendance', data);

    return response.data as AttendancePayload;
  },

  update: async (id: string, data: AttendancePayload): Promise<AttendancePayload> => {
    const response = await api.put(`/attendance/${id}`, data);

    return response.data as AttendancePayload;
  },

  remove: async (id: string): Promise<void> => {
    await api.delete(`/attendance/${id}`);
  },
};

function mapAttendanceRecord(attendance: AttendanceRecord): AttendanceRow {
  return {
    id: attendance.id.toString(),
    date: attendance.date,
    status: attendance.status,
    studentId: attendance.student?.id ? attendance.student.id.toString() : '',
    studentLabel: attendance.student?.name ?? 'Not returned by API',
  };
}

// ===============================
// Authentication
// ===============================

export interface LoginResponseData {
  token: string;
  expiresIn: number;
  tokenType: string;
}

export const authApi = {
  login: (username: string, password: string): Promise<LoginResponseData> =>
    api
      .post<LoginResponseData>('/auth/login', {
        username,
        password,
      })
      .then((r) => r.data),
};