# School Management System - Complete Analysis Report

## Executive Summary

This report documents a comprehensive analysis of the backend (Spring Boot/Java) and frontend (React/TypeScript) of the school management system, identifying mismatches, missing implementations, and required fixes before production use.

---

## PART 1: BACKEND ANALYSIS

### Stack Information

- **Framework**: Spring Boot 3.5.6
- **Java Version**: 21
- **Database**: PostgreSQL (localhost:5432, schema: school_db)
- **Authentication**: JWT with Bearer tokens
- **Port**: 8080

### Security & Authentication

#### JWT Implementation

- **Secret Key**: `myVerySecretKeyForJwtAuthenticationInSchoolManagementSystem123456`
- **Token Expiration**: 1 hour (3600000ms)
- **Algorithm**: HS256
- **Roles Supported**: ADMIN, TEACHER, STUDENT, PARENT (4 roles)
- **Token Structure**: Claims include `username` and `role`

#### Security Configuration

- CORS enabled with defaults
- CSRF disabled
- Stateless session management
- Authorization filter: JWT filter added before UsernamePasswordAuthenticationFilter
- Public endpoints: `/auth/**`, `/swagger-ui/**`, `/v3/api-docs/**`
- All other endpoints require authentication and role-based authorization

#### Authentication Flow

```
1. User sends POST /auth/login with LoginRequest(username, password)
2. Backend validates credentials against User entity
3. JWT token generated with username and role claims
4. LoginResponse returns token
5. Frontend stores token in localStorage as JSON: {user, token}
6. All subsequent requests include Bearer token in Authorization header
```

---

### REST API Endpoints Summary

#### 1. **Authentication API** (`/auth`)

| Method | Endpoint      | Request                          | Response             | Auth | Role   |
| ------ | ------------- | -------------------------------- | -------------------- | ---- | ------ |
| POST   | `/auth/login` | LoginRequest(username, password) | LoginResponse(token) | No   | Public |

**Issues Found**:

- ❌ Missing `/auth/refresh` endpoint (frontend expects this at line 101)
- ❌ Missing `/auth/logout` endpoint
- ❌ Missing endpoint to fetch current user details

---

#### 2. **Student API** (`/students`)

| Method | Endpoint                                                 | Request      | Response                 | Auth | Role           |
| ------ | -------------------------------------------------------- | ------------ | ------------------------ | ---- | -------------- |
| POST   | `/students`                                              | StudentDTO   | StudentDTO               | Yes  | ADMIN          |
| GET    | `/students`                                              | -            | List<StudentResponseDTO> | Yes  | ADMIN, TEACHER |
| GET    | `/students/{id}`                                         | -            | StudentResponseDTO       | Yes  | ADMIN, TEACHER |
| PUT    | `/students/{id}`                                         | StudentDTO   | StudentDTO               | Yes  | ADMIN          |
| DELETE | `/students/{id}`                                         | -            | -                        | Yes  | ADMIN          |
| GET    | `/students/name/{name}`                                  | -            | List<Student>            | Yes  | ADMIN, TEACHER |
| GET    | `/students/age/{age}`                                    | -            | List<Student>            | Yes  | ADMIN, TEACHER |
| GET    | `/students/search/{name}`                                | -            | List<Student>            | Yes  | ADMIN, TEACHER |
| GET    | `/students/{name}/{age}`                                 | -            | List<Student>            | Yes  | ADMIN, TEACHER |
| GET    | `/students/query/{age}`                                  | -            | List<Student>            | Yes  | ADMIN, TEACHER |
| GET    | `/students/page?page=X&size=Y`                           | Query params | Page<Student>            | Yes  | ADMIN, TEACHER |
| GET    | `/students/page-sort?page=X&size=Y&sortBy=X&direction=X` | Query params | Page<Student>            | Yes  | ADMIN, TEACHER |

**StudentDTO Structure**:

```java
{
  "name": "string (required, not blank)",
  "age": "int (required, > 0)",
  "departmentId": "Long (required)"
}
```

**StudentResponseDTO Structure**: (Returns full Student entity with relationships)

```java
{
  "id": "Long",
  "name": "string",
  "age": "int",
  "department": "Department object",
  "attendanceRecords": "List<Attendance>",
  "courses": "List<Course>",
  "results": "List<Result>"
}
```

---

#### 3. **Teacher API** (`/teachers`)

| Method | Endpoint                              | Request    | Response      | Auth | Role           |
| ------ | ------------------------------------- | ---------- | ------------- | ---- | -------------- |
| POST   | `/teachers`                           | TeacherDTO | TeacherDTO    | Yes  | ADMIN          |
| GET    | `/teachers`                           | -          | List<Teacher> | Yes  | ADMIN, TEACHER |
| GET    | `/teachers/{id}`                      | -          | Teacher       | Yes  | ADMIN, TEACHER |
| PUT    | `/teachers/{id}`                      | TeacherDTO | TeacherDTO    | Yes  | ADMIN          |
| DELETE | `/teachers/{id}`                      | -          | String msg    | Yes  | ADMIN          |
| GET    | `/teachers/name/{name}`               | -          | List<Teacher> | Yes  | ADMIN, TEACHER |
| GET    | `/teachers/subject/{subject}`         | -          | List<Teacher> | Yes  | ADMIN, TEACHER |
| GET    | `/teachers/salary/{salary}`           | -          | List<Teacher> | Yes  | ADMIN, TEACHER |
| GET    | `/teachers/search/{name}`             | -          | List<Teacher> | Yes  | ADMIN, TEACHER |
| GET    | `/teachers/department/{departmentId}` | -          | List<Teacher> | Yes  | ADMIN, TEACHER |

**TeacherDTO Fields**: name, email, phone, subject, salary, qualification, departmentId

---

#### 4. **Department API** (`/departments`)

| Method | Endpoint            | Request       | Response         | Auth | Role           |
| ------ | ------------------- | ------------- | ---------------- | ---- | -------------- |
| POST   | `/departments`      | DepartmentDTO | DepartmentDTO    | Yes  | ADMIN          |
| GET    | `/departments`      | -             | List<Department> | Yes  | ADMIN, TEACHER |
| GET    | `/departments/{id}` | -             | Department       | Yes  | ADMIN, TEACHER |
| PUT    | `/departments/{id}` | DepartmentDTO | DepartmentDTO    | Yes  | ADMIN          |
| DELETE | `/departments/{id}` | -             | String msg       | Yes  | ADMIN          |

**DepartmentDTO Fields**: name, code, headOfDepartment

---

#### 5. **Course API** (`/courses`)

| Method | Endpoint                                   | Request   | Response     | Auth | Role           |
| ------ | ------------------------------------------ | --------- | ------------ | ---- | -------------- |
| POST   | `/courses`                                 | CourseDTO | CourseDTO    | Yes  | ADMIN          |
| GET    | `/courses`                                 | -         | List<Course> | Yes  | ADMIN, TEACHER |
| GET    | `/courses/{id}`                            | -         | Course       | Yes  | ADMIN, TEACHER |
| PUT    | `/courses/{id}`                            | CourseDTO | CourseDTO    | Yes  | ADMIN          |
| DELETE | `/courses/{id}`                            | -         | String msg   | Yes  | ADMIN          |
| GET    | `/courses/name/{name}`                     | -         | List<Course> | Yes  | ADMIN, TEACHER |
| GET    | `/courses/search/{name}`                   | -         | List<Course> | Yes  | ADMIN, TEACHER |
| POST   | `/courses/students/{studentId}/{courseId}` | -         | Student      | Yes  | ADMIN          |
| DELETE | `/courses/students/{studentId}/{courseId}` | -         | Student      | Yes  | ADMIN          |

**CourseDTO Fields**: name, code, credits, department

---

#### 6. **Exam API** (`/exams`)

| Method | Endpoint                      | Request | Response   | Auth | Role           |
| ------ | ----------------------------- | ------- | ---------- | ---- | -------------- |
| POST   | `/exams`                      | ExamDTO | ExamDTO    | Yes  | ADMIN          |
| GET    | `/exams`                      | -       | List<Exam> | Yes  | ADMIN, TEACHER |
| GET    | `/exams/{id}`                 | -       | Exam       | Yes  | ADMIN, TEACHER |
| PUT    | `/exams/{id}`                 | ExamDTO | ExamDTO    | Yes  | ADMIN          |
| DELETE | `/exams/{id}`                 | -       | String msg | Yes  | ADMIN          |
| GET    | `/exams/subject/{subject}`    | -       | List<Exam> | Yes  | ADMIN, TEACHER |
| GET    | `/exams/search/{subject}`     | -       | List<Exam> | Yes  | ADMIN, TEACHER |
| GET    | `/exams/max-marks/{maxMarks}` | -       | List<Exam> | Yes  | ADMIN, TEACHER |

**ExamDTO Fields**: name, subject, date, maxMarks

---

#### 7. **Attendance API** (`/attendance`)

| Method | Endpoint                                      | Request       | Response         | Auth | Role           |
| ------ | --------------------------------------------- | ------------- | ---------------- | ---- | -------------- |
| POST   | `/attendance`                                 | AttendanceDTO | AttendanceDTO    | Yes  | ADMIN          |
| GET    | `/attendance`                                 | -             | List<Attendance> | Yes  | ADMIN, TEACHER |
| GET    | `/attendance/{id}`                            | -             | Attendance       | Yes  | ADMIN, TEACHER |
| PUT    | `/attendance/{id}`                            | AttendanceDTO | AttendanceDTO    | Yes  | ADMIN          |
| DELETE | `/attendance/{id}`                            | -             | String msg       | Yes  | ADMIN          |
| GET    | `/attendance/student/{studentId}`             | -             | List<Attendance> | Yes  | ADMIN, TEACHER |
| GET    | `/attendance/date/{date}`                     | -             | List<Attendance> | Yes  | ADMIN, TEACHER |
| GET    | `/attendance/status/{status}`                 | -             | List<Attendance> | Yes  | ADMIN, TEACHER |
| GET    | `/attendance/student/{studentId}/date/{date}` | -             | List<Attendance> | Yes  | ADMIN, TEACHER |

**AttendanceDTO Fields**: studentId, date, status (enum: PRESENT, ABSENT, LEAVE)

**Attendance Entity**:

```java
{
  "id": "Long",
  "student": "Student object",
  "date": "LocalDate",
  "status": "AttendanceStatus enum"
}
```

---

#### 8. **Result API** (`/results`)

| Method | Endpoint                                  | Request   | Response      | Auth | Role           |
| ------ | ----------------------------------------- | --------- | ------------- | ---- | -------------- |
| POST   | `/results`                                | ResultDTO | Result        | Yes  | ADMIN          |
| GET    | `/results`                                | -         | List<Result>  | Yes  | ADMIN, TEACHER |
| GET    | `/results/{id}`                           | -         | Result        | Yes  | ADMIN, TEACHER |
| DELETE | `/results/{id}`                           | -         | String msg    | Yes  | ADMIN          |
| GET    | `/results/student/{studentId}`            | -         | List<Result>  | Yes  | ADMIN, TEACHER |
| GET    | `/results/exam/{examId}`                  | -         | List<Result>  | Yes  | ADMIN, TEACHER |
| GET    | `/results/grade/{grade}`                  | -         | List<Result>  | Yes  | ADMIN, TEACHER |
| GET    | `/results/student/{studentId}/percentage` | -         | double        | Yes  | ADMIN, TEACHER |
| GET    | `/results/student/{studentId}/report`     | -         | ReportCardDTO | Yes  | ADMIN, TEACHER |

**ResultDTO Fields**: studentId, examId, marksObtained, grade

---

---

## PART 2: FRONTEND ANALYSIS

### Stack Information

- **Framework**: React + TypeScript + Vite
- **Development Server**: http://localhost:5173 (default)
- **API Base URL**: http://localhost:8080 (via VITE_API_URL env or hardcoded)
- **State Management**: React Context (AuthContext, ThemeContext)
- **UI Framework**: Tailwind CSS + custom components
- **Charts**: Recharts
- **Animations**: Framer Motion

### Routes Architecture

```
/                           → SiteLayout
├── /                       → Home (public)
├── /about                  → About (public)
├── /academics              → Academics (public)
├── /admissions             → Admissions (public)
├── /achievements           → Achievements (public)
├── /gallery                → Gallery (public)
├── /events                 → Events (public)
├── /faculty                → Faculty (public)
├── /contact                → Contact (public)

/login                      → Login (public)

/app                        → ErpLayout (protected)
├── /                       → Dashboard (default)
├── /students               → Students CRUD
├── /teachers               → Teachers CRUD
├── /departments            → Departments CRUD
├── /courses                → Courses CRUD
├── /attendance             → Attendance Marking
├── /exams                  → Exams Management
├── /results                → Results View
├── /profile                → User Profile
├── /settings               → Settings
```

### Frontend Data Types

```typescript
type Role = "admin" | "teacher" | "student";

interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string;
  phone?: string;
  designation?: string;
}

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  class: string; // e.g., "Class XII"
  section: string; // e.g., "A", "B"
  rollNo: string;
  gender: "Male" | "Female";
  guardian: string;
  avatar: string;
  attendance: number; // percentage
  gpa: number;
  status: "Active" | "Inactive";
  admittedOn: string; // YYYY-MM-DD
}

interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  department: string;
  qualification: string;
  experience: number; // years
  avatar: string;
  status: "Active" | "Inactive";
}

interface Department {
  id: string;
  name: string;
  hod: string; // Head of Department
  teachers: number;
  subjects: number;
  established: string; // year
  icon: string; // lucide icon name
}

interface Course {
  id: string;
  name: string;
  code: string;
  department: string;
  credits: number;
  teacher: string;
  students: number;
  duration: string;
}

interface Exam {
  id: string;
  name: string;
  class: string;
  subject: string;
  date: string;
  time: string;
  room: string;
  totalMarks: number;
  status: "Scheduled" | "Ongoing" | "Completed";
}

interface Result {
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

interface AttendanceRow {
  id: string;
  student: string;
  class: string;
  date: string;
  status: "Present" | "Absent" | "Leave";
}
```

### Frontend API Calls (Actual)

Currently, the frontend only implements API calls in:

1. **Login**: `POST /auth/login` ✅ Works
2. **Students List**: `GET /students` ⚠️ Partially implemented

**Services/index.ts**:

```typescript
export const authApi = {
  login: (email, password) => api.post('/auth/login', {email, password})
  refresh: (refreshToken) => api.post('/auth/refresh', {refreshToken})  // ❌ NOT IN BACKEND
}

export const studentApi = {
  list: () => api.get('/students')                                       // ✅ Works but data mapping needed
  // ... CRUD methods defined but never called
}

export const teacherApi = crud('teachers')
export const departmentApi = crud('departments')
export const courseApi = crud('courses')
export const examApi = crud('exams')
export const resultApi = crud('results')
export const attendanceApi = {
  list: () => api.get('/attendance')
  mark: (data) => api.post('/attendance', data)
}
```

---

## PART 3: CRITICAL ISSUES & MISMATCHES

### 🔴 CRITICAL ISSUES (Must Fix Before Production)

#### 1. Missing Refresh Token Endpoint

**Severity**: HIGH  
**Location**: Frontend `services/index.ts` line 101  
**Issue**: Frontend calls `authApi.refresh()` → `POST /auth/refresh` but backend doesn't have this endpoint.

```typescript
// Frontend expects:
authApi.refresh(refreshToken) → POST /auth/refresh

// Backend has no such endpoint!
```

**Fix Required**:

- [ ] Implement `POST /auth/refresh` endpoint in backend
- [ ] Add refresh token logic to JWT service
- [ ] Update frontend to handle token refresh on 401

---

#### 2. Role Value Mismatch

**Severity**: HIGH  
**Location**: Multiple places  
**Issue**: Frontend uses lowercase roles ('admin', 'teacher', 'student') but backend uses uppercase Role enum (ADMIN, TEACHER, STUDENT).

```typescript
// Frontend stores:
{ role: 'admin' }    // lowercase

// Backend JWT contains:
"role": "ADMIN"      // uppercase

// Backend checks:
@PreAuthorize("hasRole('ADMIN')")  // needs "ROLE_" prefix in Spring
```

**Fix Required**:

- [ ] Standardize role format (recommend uppercase in backend)
- [ ] Update frontend login to map received role to correct format
- [ ] Verify Spring Security role prefix handling

---

#### 3. Data Structure Mismatch - Students

**Severity**: HIGH  
**Location**: Frontend expects many fields backend doesn't provide

**Frontend Student expects**:

```typescript
{
  class: "Class XII",
  section: "A",
  rollNo: "string",
  gender: "Male|Female",
  guardian: "string",
  avatar: "url",
  attendance: 95,           // percentage
  gpa: 8.5,
  status: "Active|Inactive",
  admittedOn: "2026-01-01"
}
```

**Backend Student provides**:

```java
{
  id: Long,
  name: string,
  age: int,
  department: Department,
  attendanceRecords: List<Attendance>,
  courses: List<Course>,
  results: List<Result>
}
```

**Fix Required**:

- [ ] Create comprehensive StudentResponseDTO with all frontend-required fields
- [ ] Backend needs to calculate/track: class, section, rollNo, gender, guardian, avatar, gpa, status, admittedOn
- [ ] Or frontend needs to normalize data to match actual backend response

---

#### 4. CORS Configuration Not Verified

**Severity**: HIGH  
**Location**: Backend `config/CorsConfig.java`  
**Issue**: CORS is enabled but frontend at `http://localhost:5173` might not be allowed.

**Fix Required**:

- [ ] Verify CorsConfig allows `http://localhost:5173` (and `http://localhost:3000` if Vite changes)
- [ ] Ensure credentials are allowed for cookies if needed

---

#### 5. No Authentication for Most Frontend Pages

**Severity**: CRITICAL  
**Location**: Teachers, Departments, Courses, Exams, Attendance, Results pages  
**Issue**: These pages use mock data and never call backend API.

```typescript
// Exams.tsx line 1
import { exams as initial } from "../../data/mock";

// Teachers.tsx line 7
import { teachers as initial } from "../../data/mock";

// Courses.tsx line 6
import { courses as initial } from "../../data/mock";

// All use local state, no API calls!
```

**Fix Required**:

- [ ] Implement API calls for all CRUD pages
- [ ] Call backend endpoints instead of using mock data
- [ ] Handle loading and error states

---

#### 6. No Create/Update/Delete Handlers in Frontend

**Severity**: CRITICAL  
**Location**: All CRUD pages  
**Issue**: Add/Edit/Delete operations only update local state, never hit backend.

```typescript
// Students.tsx line 87-101
const save = () => {
  if (modal?.mode === 'add') {
    setRows([...])  // ❌ Only local state, no API call!
  }
}

const confirmDelete = () => {
  setRows(rows.filter(...))  // ❌ Only local state, no API call!
}
```

**Fix Required**:

- [ ] Call backend CRUD endpoints before updating local state
- [ ] Handle API errors appropriately
- [ ] Add loading states during API calls

---

#### 7. Missing User Profile Endpoints

**Severity**: MEDIUM  
**Location**: Frontend Profile & Settings pages  
**Issue**: Frontend has profile update UI but no backend endpoints to support it.

**Frontend expects**:

- PUT user profile (name, email, phone, designation)
- PUT password change endpoint
- GET current user details

**Backend has**: None of these

**Fix Required**:

- [ ] Create `PUT /user/profile` endpoint
- [ ] Create `PUT /user/password` endpoint
- [ ] Create `GET /user/me` or similar to get current user
- [ ] Implement in frontend

---

#### 8. AttendanceStatus Enum vs String

**Severity**: MEDIUM  
**Location**: Attendance API  
**Issue**: Backend uses `AttendanceStatus` enum but frontend sends/expects strings.

```java
// Backend
@Enumerated(EnumType.STRING)
private AttendanceStatus status;  // PRESENT, ABSENT, LEAVE

// Frontend
status: 'Present' | 'Absent' | 'Leave'  // Different casing!
```

**Fix Required**:

- [ ] Standardize casing (recommend UPPERCASE)
- [ ] Update frontend to use correct enum values
- [ ] Add validation

---

### 🟡 MAJOR ISSUES (Should Fix Before Full Deployment)

#### 9. Authorization Header Configuration

**Severity**: MEDIUM  
**Location**: Frontend API interceptor  
**Issue**: Token is attached, but need to verify backend JWT filter processes it correctly.

```typescript
// Frontend adds header correctly
config.headers.Authorization = `Bearer ${token}`;

// Backend JWT filter must extract from "Authorization" header
// and extract token after "Bearer " prefix
```

**Status**: Likely working but untested. Verify JwtFilter implementation.

---

#### 10. Pagination Not Fully Implemented

**Severity**: MEDIUM  
**Location**: Frontend pages, backend endpoints  
**Issue**: Backend has pagination endpoints but frontend pages don't use them (except partial in Students).

**Backend provides**:

- GET /students/page?page=0&size=8&sortBy=name&direction=asc
- GET /teachers with potential pagination
- GET /courses with potential pagination

**Frontend implements**:

- Client-side pagination only (slice)

**Fix Required**:

- [ ] Implement server-side pagination in frontend for large datasets
- [ ] Use backend page parameters

---

#### 11. Search & Filter Not Connected

**Severity**: MEDIUM  
**Location**: Multiple pages  
**Issue**: Frontend has search UI but doesn't call backend search endpoints.

**Backend provides**:

- GET /students/search/{name} - search like
- GET /teachers/search/{name}
- GET /courses/search/{name}
- GET /exams/search/{subject}

**Frontend does**: Client-side filtering only

**Fix Required**:

- [ ] Implement backend search endpoints
- [ ] Call with user input
- [ ] Debounce to avoid too many requests

---

#### 12. Login Credentials Hardcoded

**Severity**: MEDIUM  
**Location**: Frontend `pages/erp/Login.tsx` line 28-41  
**Issue**: Default credentials are hardcoded and hardcoded in Login UI.

```typescript
// Frontend hardcodes:
const [email, setEmail] = useState("admin"); // Default: admin
const [password, setPassword] = useState("admin123");

// Hardcoded test credentials for role buttons:
if (r.id === "admin") {
  setEmail("admin");
  setPassword("admin123");
}
```

**Issue**: These users must exist in backend database, but no seed data provided.

**Fix Required**:

- [ ] Create seed script to populate test users
- [ ] Or remove hardcoded credentials and provide separate test account documentation
- [ ] Add proper credential input validation

---

#### 13. No Error Boundary or Global Error Handler

**Severity**: MEDIUM  
**Location**: Frontend components  
**Issue**: 401 errors trigger redirect but other errors not consistently handled.

```typescript
// API interceptor handles 401
if (status === 401 && !isRefreshing) {
  localStorage.removeItem("greenwood_auth");
  window.location.href = "/login"; // ✅ Handles 401
}

// But other errors just rejected without specific handling
return Promise.reject(error);
```

**Fix Required**:

- [ ] Add global error handler for all error types
- [ ] Implement error boundary
- [ ] Show user-friendly error messages

---

#### 14. No Input Validation on Forms

**Severity**: MEDIUM  
**Location**: All CRUD modals  
**Issue**: Frontend validates only basic required fields, backend validates with annotations.

```typescript
// Frontend only checks presence
if (!form.name || !form.email) {
  toast("Name and email are required", "error");
  return;
}

// No validation for:
// - Email format
// - Age constraints
// - Duplicates
// - Custom business rules
```

**Fix Required**:

- [ ] Add frontend validation matching backend
- [ ] Show specific validation errors
- [ ] Prevent form submission until valid

---

### 🟢 MINOR ISSUES (Nice to Have Fixes)

#### 15. LocalStorage Without Expiration Check

**Severity**: LOW  
**Location**: AuthContext.tsx  
**Issue**: Frontend stores JWT but doesn't check expiration on app load.

```typescript
// On app load, frontend retrieves token but doesn't check if it's expired
const raw = localStorage.getItem("greenwood_auth");
if (raw) {
  const parsed = JSON.parse(raw);
  setUser(parsed.user);
  setToken(parsed.token); // Could be expired!
}
```

**Fix**: Check token expiration time before setting.

---

#### 16. No Dark Mode API Support

**Severity**: LOW  
**Location**: Settings page  
**Issue**: Dark mode preference not persisted to backend.

```typescript
// Frontend has:
const { theme, setTheme } = useTheme();
setTheme("dark"); // Only in localStorage

// No backend API to save preference
```

**Fix**: Create `PUT /user/preferences` endpoint.

---

#### 17. Avatar Generation vs Backend URL

**Severity**: LOW  
**Location**: Multiple pages  
**Issue**: Frontend generates avatars via DiceBear API, backend might have different avatar handling.

```typescript
// Frontend generates:
avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${name}`;

// Backend: No avatar field in entities
```

**Fix**: Standardize avatar handling.

---

## PART 4: MISSING API ENDPOINTS

### Must Implement

```
❌ POST   /auth/refresh              - Refresh expired token
❌ POST   /auth/logout               - Logout user
❌ GET    /user/me                   - Get current user profile
❌ PUT    /user/profile              - Update user profile
❌ PUT    /user/password             - Change password
❌ GET    /results/student/{id}/report/pdf  - PDF report download
❌ POST   /exams/{id}/marks          - Bulk upload exam marks
❌ GET    /attendance/report         - Attendance summary/report
```

### Partially Implemented / Issues

```
⚠️  StudentDTO needs more fields (class, section, gender, avatar, etc.)
⚠️  Need consistent Response DTOs
⚠️  POST /results should return ResultDTO not Result entity
⚠️  DELETE endpoints return String message (inconsistent REST)
```

---

## PART 5: IMPLEMENTATION CHECKLIST

### Backend Fixes Required

- [ ] **Security**
  - [ ] Verify CORS allows frontend localhost:5173
  - [ ] Review JWT secret (should be in environment variables, not hardcoded)
  - [ ] Implement token refresh endpoint
  - [ ] Add logout functionality (if needed)
  - [ ] Verify role prefix handling in Spring Security

- [ ] **Missing Endpoints**
  - [ ] GET /user/me - Current user profile
  - [ ] PUT /user/profile - Update profile
  - [ ] PUT /user/password - Change password
  - [ ] POST /auth/refresh - Token refresh
  - [ ] POST /auth/logout - (Optional)

- [ ] **DTOs & Response Consistency**
  - [ ] Create comprehensive StudentResponseDTO with all fields
  - [ ] Ensure all DELETE endpoints return consistent format (not String message)
  - [ ] Create ResultResponseDTO
  - [ ] Document all DTO structures clearly

- [ ] **Data Structure**
  - [ ] Add missing Student fields: class, section, rollNo, gender, guardian, avatar
  - [ ] Add Teacher avatar field
  - [ ] Add Course teacher object reference
  - [ ] Add Exam room and totalMarks if missing
  - [ ] Ensure Result includes all needed fields

- [ ] **Testing**
  - [ ] Create seed data script with test users (admin, teacher, student)
  - [ ] Test all endpoints with correct role authorization
  - [ ] Test with frontend token format

---

### Frontend Fixes Required

- [ ] **Authentication**
  - [ ] Fix role value mapping (lowercase to uppercase)
  - [ ] Implement token refresh on 401
  - [ ] Add user profile fetch on app load
  - [ ] Verify CORS headers sent correctly

- [ ] **Data Fetching**
  - [ ] Implement API calls for Teachers page
  - [ ] Implement API calls for Departments page
  - [ ] Implement API calls for Courses page
  - [ ] Implement API calls for Exams page
  - [ ] Implement API calls for Attendance page
  - [ ] Implement API calls for Results page

- [ ] **CRUD Operations**
  - [ ] Implement POST/PUT/DELETE for all pages
  - [ ] Call backend before updating local state
  - [ ] Handle API errors gracefully
  - [ ] Show loading states

- [ ] **User Profile**
  - [ ] Implement profile update API calls
  - [ ] Implement password change API calls
  - [ ] Fetch current user details on login

- [ ] **Search & Filtering**
  - [ ] Connect search inputs to backend search endpoints
  - [ ] Debounce search requests
  - [ ] Display results from backend

- [ ] **Validation**
  - [ ] Add email format validation
  - [ ] Add age constraints validation
  - [ ] Add matching password validation
  - [ ] Display specific validation errors

- [ ] **Error Handling**
  - [ ] Implement error boundary
  - [ ] Add global error handler
  - [ ] Show user-friendly error messages
  - [ ] Handle network timeouts

- [ ] **Performance**
  - [ ] Implement server-side pagination
  - [ ] Add loading skeletons
  - [ ] Implement request cancellation
  - [ ] Cache where appropriate

---

### Database/Seeding

- [ ] Create seed script with:
  - [ ] Test Users: admin, teacher, student
  - [ ] Test Departments
  - [ ] Test Students
  - [ ] Test Teachers
  - [ ] Test Courses
  - [ ] Test Exams
  - [ ] Test Results

---

## PART 6: API USAGE EXAMPLES

### Working Example: Login

```typescript
// Frontend
const response = await authApi.login("admin", "admin123");
// Expected response: { token: "eyJ0eXAi..." }

// Backend processes:
// 1. Find User with username='admin' and password='admin123'
// 2. Extract role (e.g., 'ADMIN')
// 3. Generate JWT with claims: { sub: 'admin', role: 'ADMIN' }
// 4. Return token in LoginResponse

// Frontend stores:
localStorage.setItem(
  "greenwood_auth",
  JSON.stringify({
    user: {
      id: "admin",
      name: "Administrator",
      email: "admin",
      role: "admin",
      avatar: "...",
    },
    token: "eyJ0eXAi...",
  }),
);

// All subsequent requests include:
headers: {
  Authorization: "Bearer eyJ0eXAi...";
}
```

### Broken Example: Students

```typescript
// Frontend attempts:
const students = await studentApi.list();  // GET /students

// Backend returns:
[
  {
    id: 1,
    name: "Aarav",
    age: 16,
    department: { ... },
    attendanceRecords: [...],
    courses: [...],
    results: [...]
  }
]

// Frontend expects:
[
  {
    id: "1",
    name: "Aarav",
    email: "",              // ❌ MISSING
    phone: "",              // ❌ MISSING
    class: "Class XII",     // ❌ MISSING
    section: "A",           // ❌ MISSING
    rollNo: "",             // ❌ MISSING
    gender: "Male",         // ❌ MISSING
    guardian: "",           // ❌ MISSING
    avatar: "...",          // ❌ MISSING
    attendance: 95,         // ❌ MISSING
    gpa: 8.5,               // ❌ MISSING
    status: "Active",       // ❌ MISSING
    admittedOn: "2026-01-01" // ❌ MISSING
  }
]

// Frontend code tries to map (services/index.ts line 35-48):
return response.data.map((student: any) => ({
  id: student.id.toString(),
  name: student.name,
  email: '',                  // Defaults to empty!
  phone: '',                  // Defaults to empty!
  class: 'Class XII',         // Hardcoded!
  // ... more hardcoded values
}));

// Result: Data mismatch, UI shows incorrect information!
```

---

## PART 7: TESTING SCENARIO

### Current State (What Works)

```
✅ User can visit http://localhost:5173
✅ User can see login page
✅ User can enter admin/admin123 credentials
✅ User can click login
❌ FAILS: Either gets 401 (credentials don't exist) or token validation fails
❌ Even if login works, most pages show only mock data
❌ Clicking "Add Student" → Save doesn't call backend
```

### What Should Work (After Fixes)

```
✅ User credentials exist in database
✅ Login validates and returns valid JWT
✅ Frontend extracts token and stores correctly
✅ Frontend redirects to /app/dashboard
✅ Dashboard loads and displays data from backend
✅ Users can CRUD students, teachers, courses, etc.
✅ Search and filters work against backend
✅ Profile and settings pages work
✅ Logout clears session properly
```

---

## PART 8: ENVIRONMENT SETUP

### Backend Environment Variables Needed

```bash
# .env or application.properties
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/school_db
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=Ramanujan@1729
JWT_SECRET=your-secret-key-min-32-chars
JWT_EXPIRATION=3600000  # 1 hour in milliseconds
```

### Frontend Environment Variables

```bash
# .env or .env.local
VITE_API_URL=http://localhost:8080
VITE_APP_NAME=Greenwood ERP
```

### Database Initialization

```bash
# Create database
createdb -U postgres school_db

# Run backend (auto-creates tables via spring.jpa.hibernate.ddl-auto=update)
cd backend/school-management
mvn spring-boot:run

# Seed data (needs to be created)
# Run seed script or SQL file
```

---

## SUMMARY TABLE

| Category             | Backend             | Frontend              | Status               |
| -------------------- | ------------------- | --------------------- | -------------------- |
| **Authentication**   | JWT implemented     | Uses JWT              | ✅ Mostly works      |
| **CORS**             | Enabled             | Needs frontend origin | ⚠️ Verify            |
| **Login**            | POST /auth/login ✅ | Calls API ✅          | ⚠️ No test users     |
| **Students CRUD**    | Implemented ✅      | Calls GET only ❌     | 🔴 Partial           |
| **Teachers CRUD**    | Implemented ✅      | Mock data only ❌     | 🔴 Broken            |
| **Departments CRUD** | Implemented ✅      | Mock data only ❌     | 🔴 Broken            |
| **Courses CRUD**     | Implemented ✅      | Mock data only ❌     | 🔴 Broken            |
| **Exams CRUD**       | Implemented ✅      | Mock data only ❌     | 🔴 Broken            |
| **Attendance**       | Implemented ✅      | Mock data only ❌     | 🔴 Broken            |
| **Results**          | Implemented ✅      | Mock data only ❌     | 🔴 Broken            |
| **Token Refresh**    | ❌ Missing          | Calls endpoint ❌     | 🔴 Critical          |
| **User Profile**     | ❌ Missing          | Has UI only ❌        | 🔴 Critical          |
| **Password Change**  | ❌ Missing          | Has UI only ❌        | 🔴 Critical          |
| **Pagination**       | Implemented ✅      | Client-side only ⚠️   | ⚠️ Partial           |
| **Search**           | Implemented ✅      | Client-side only ⚠️   | ⚠️ Partial           |
| **Error Handling**   | Basic ✅            | Basic ✅              | ⚠️ Needs improvement |
| **Data Validation**  | Backend ✅          | Frontend ⚠️           | ⚠️ Incomplete        |

---

## NEXT STEPS

1. **Immediate** (Must do before any testing):
   - [ ] Review JWT implementation in JwtFilter
   - [ ] Verify CORS configuration
   - [ ] Create seed data with test users
   - [ ] Test basic login flow

2. **High Priority** (Do before calling it "working"):
   - [ ] Implement missing /auth/refresh endpoint
   - [ ] Fix role value mapping
   - [ ] Implement API calls for all CRUD pages
   - [ ] Add delete/update operations to backend calls

3. **Medium Priority** (Do before beta):
   - [ ] Implement user profile endpoints
   - [ ] Add proper error handling
   - [ ] Add input validation
   - [ ] Add loading states

4. **Low Priority** (Polish):
   - [ ] Implement server-side pagination
   - [ ] Add search functionality
   - [ ] Add dark mode preferences
   - [ ] Add comprehensive logging

---

**Report Generated**: 2026-07-10  
**Status**: Analysis Complete - Ready for Implementation
