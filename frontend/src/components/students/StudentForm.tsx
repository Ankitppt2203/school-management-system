import { useEffect, useState } from "react";
import axios from "axios";
import api from "../../api/axios";
import type { DepartmentOption, StudentPayload, StudentRow } from "../../types/student";

interface StudentFormProps {
  onClose?: () => void;
  onSuccess: (student: StudentRow) => void | Promise<void>;
  student?: StudentRow | null;
}

const initialForm: StudentPayload = {
  admissionNumber: "",
  rollNumber: "",
  firstName: "",
  middleName: "",
  lastName: "",
  gender: "",
  dateOfBirth: "",
  academicSession: "",
  admissionDate: "",
  status: "ACTIVE",
  departmentId: 0,
  courseIds: [],
  password: "",
  username: "",
  admissionDetails: {},
};

const getErrorMessage = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data;
    if (typeof data === "string") return data;
    if (data && typeof data === "object") {
      const messages = Object.values(data as Record<string, unknown>)
        .filter((value): value is string => typeof value === "string");
      if (messages.length) return messages.join(", ");
    }
  }
  return "Unable to add the student. Please try again.";
};

export default function StudentForm({ onClose, onSuccess, student }: StudentFormProps) {
  const [formData, setFormData] = useState<StudentPayload>(initialForm);
  const [departments, setDepartments] = useState<DepartmentOption[]>([]);
  const [courses, setCourses] = useState<DepartmentOption[]>([]);
  const [loadingDepartments, setLoadingDepartments] = useState(true);
  const [saving, setSaving] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const isEditing = Boolean(student);

  useEffect(() => {
    if (student) {
      setFormData({ ...student, password: "", admissionDetails: student.admissionDetails ?? {} });
      setConfirmPassword("");
      setError("");
      return;
    }

    setFormData(initialForm);
    setConfirmPassword("");
    setError("");

    const loadNextAdmissionNumber = async () => {
      try {
        const nextAdmissionNumber = await api.get<string>("/students/next-admission-number");
        setFormData((current) => current.admissionNumber ? current : { ...current, admissionNumber: nextAdmissionNumber.data });
      } catch {
        setFormData((current) => current.admissionNumber ? current : { ...current, admissionNumber: "GPS01" });
      }
    };

    void loadNextAdmissionNumber();
  }, [student]);

  useEffect(() => {
    const loadDepartments = async () => {
      try {
        const [departmentResponse, courseResponse] = await Promise.all([
          api.get<DepartmentOption[]>("/departments"),
          api.get<DepartmentOption[]>("/courses"),
        ]);
        setDepartments(departmentResponse.data);
        setCourses(courseResponse.data);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoadingDepartments(false);
      }
    };
    void loadDepartments();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: name === "departmentId" ? Number(value) : value,
    }));
  };

  const toggleCourse = (courseId: number) => setFormData((current) => ({ ...current, courseIds: current.courseIds.includes(courseId) ? current.courseIds.filter((id) => id !== courseId) : [...current.courseIds, courseId] }));

  const handleDetailChange = (key: string, value: string) => {
    setFormData((current) => ({ ...current, admissionDetails: { ...current.admissionDetails, [key]: value } }));
  };
  const selectProfilePhoto = (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) { setError("Please select an image file."); return; }
    if (file.size > 300 * 1024) { setError("Profile photo must be 300 KB or smaller."); return; }
    const reader = new FileReader();
    reader.onload = () => handleDetailChange("profilePhotoUrl", String(reader.result));
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    if (!formData.departmentId) {
      setError("Please select a department.");
      return;
    }
    if (!isEditing && formData.password !== confirmPassword) {
      setError("Password and confirm password do not match.");
      return;
    }

    try {
      setSaving(true);
      const payload = isEditing ? { ...formData, password: undefined, username: undefined } : formData;
      const response = isEditing
        ? await api.put<StudentRow>(`/students/${student!.id}`, payload)
        : await api.post<StudentRow>("/students", payload);
      await onSuccess(response.data);
      onClose?.();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && <div role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input label="Admission Number" name="admissionNumber" placeholder="GPS01" value={formData.admissionNumber} onChange={handleChange} required readOnly={!isEditing} />
        <Input label="Roll Number" name="rollNumber" value={formData.rollNumber} onChange={handleChange} />
        <Input label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required />
        <Input label="Middle Name" name="middleName" value={formData.middleName} onChange={handleChange} />
        <Input label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required />
        <label><span className="label">Gender</span><select name="gender" value={formData.gender} onChange={handleChange} className="input"><option value="">Select gender</option><option value="MALE">Male</option><option value="FEMALE">Female</option><option value="OTHER">Other</option></select></label>
        <Input label="Date of Birth" name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} />
        <Input label="Admission Date" name="admissionDate" type="date" value={formData.admissionDate} onChange={handleChange} required />
        <Input label="Academic Session" name="academicSession" placeholder="2026-27" value={formData.academicSession} onChange={handleChange} required />
        <label><span className="label">Department</span><select name="departmentId" value={formData.departmentId || ""} onChange={handleChange} className="input" required disabled={loadingDepartments}><option value="">{loadingDepartments ? "Loading departments..." : "Select department"}</option>{departments.map((department) => <option key={department.id} value={department.id}>{department.name}</option>)}</select></label>
        <div className="md:col-span-2"><span className="label">Courses</span><div className="grid grid-cols-1 gap-2 rounded-lg border p-3 sm:grid-cols-2">{courses.length ? courses.map((course) => <label key={course.id} className="flex cursor-pointer items-center gap-2 rounded px-2 py-1 hover:bg-blue-50"><input type="checkbox" checked={formData.courseIds.includes(course.id)} onChange={() => toggleCourse(course.id)} /><span>{course.name}</span></label>) : <span className="text-sm text-gray-500">No courses available. Add courses first.</span>}</div></div>
        {!isEditing && <><Input label="Student Account Password" name="password" type="password" minLength={6} value={formData.password ?? ""} onChange={handleChange} required /><Input label="Login Username" name="username" value={formData.username ?? ""} onChange={handleChange} required /><Input label="Confirm Password" type="password" minLength={6} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} required /></>}
        <label><span className="label">Admission Status</span><select name="status" value={formData.status} onChange={handleChange} className="input"><option value="PENDING">Pending</option><option value="ACTIVE">Active</option><option value="SUSPENDED">Suspended</option><option value="GRADUATED">Graduated</option><option value="INACTIVE">Inactive</option></select></label>
      </div>
      <AdmissionDetails details={formData.admissionDetails} onChange={handleDetailChange} />
      <div><span className="label">Student Profile Photo</span><input type="file" accept="image/*" onChange={(event) => selectProfilePhoto(event.target.files?.[0])} className="input" />{formData.admissionDetails.profilePhotoUrl && <img src={formData.admissionDetails.profilePhotoUrl} alt="Student profile preview" className="mt-3 h-20 w-20 rounded-xl object-cover" />}</div>
      <div className="flex justify-end gap-3 pt-2">
        {onClose && <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>}
        <button type="submit" className="btn-primary" disabled={saving || loadingDepartments}>{saving ? "Saving..." : isEditing ? "Save Changes" : "Create Student Account & Add"}</button>
      </div>
    </form>
  );
}

function Input({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return <label><span className="label">{label}{props.required ? " *" : ""}</span><input {...props} className={`input ${props.readOnly ? "bg-gray-50 text-gray-600" : ""}`} /></label>;
}

function AdmissionDetails({ details, onChange }: { details: Record<string, string>; onChange: (key: string, value: string) => void }) {
  const fields = [
    ["Personal & academic", "bloodGroup", "Blood Group"], ["Personal & academic", "nationality", "Nationality"], ["Personal & academic", "category", "Category"], ["Personal & academic", "religion", "Religion"], ["Personal & academic", "aadhaarNumber", "Aadhaar Number"], ["Personal & academic", "className", "Class"], ["Personal & academic", "section", "Section"], ["Personal & academic", "previousSchool", "Previous School"], ["Personal & academic", "previousClass", "Previous Class"], ["Personal & academic", "previousGrade", "Previous Percentage / Grade"],
    ["Parent / guardian", "fatherName", "Father Name"], ["Parent / guardian", "fatherPhone", "Father Phone"], ["Parent / guardian", "fatherEmail", "Father Email"], ["Parent / guardian", "fatherOccupation", "Father Occupation"], ["Parent / guardian", "motherName", "Mother Name"], ["Parent / guardian", "motherPhone", "Mother Phone"], ["Parent / guardian", "motherEmail", "Mother Email"], ["Parent / guardian", "motherOccupation", "Mother Occupation"], ["Parent / guardian", "guardianName", "Guardian Name"], ["Parent / guardian", "guardianRelationship", "Guardian Relationship"], ["Parent / guardian", "guardianPhone", "Guardian Phone"],
    ["Contact & emergency", "addressLine1", "Address Line 1"], ["Contact & emergency", "addressLine2", "Address Line 2"], ["Contact & emergency", "city", "City"], ["Contact & emergency", "state", "State"], ["Contact & emergency", "country", "Country"], ["Contact & emergency", "pinCode", "PIN Code"], ["Contact & emergency", "emergencyName", "Emergency Contact Name"], ["Contact & emergency", "emergencyRelationship", "Emergency Relationship"], ["Contact & emergency", "emergencyPhone", "Emergency Phone"],
    ["Medical, transport & hostel", "allergies", "Allergies"], ["Medical, transport & hostel", "medicalConditions", "Medical Conditions"], ["Medical, transport & hostel", "usesTransport", "Uses School Transport (Yes/No)"], ["Medical, transport & hostel", "pickupLocation", "Pickup Location"], ["Medical, transport & hostel", "routeNumber", "Route Number"], ["Medical, transport & hostel", "hostelRequired", "Hostel Required (Yes/No)"], ["Medical, transport & hostel", "hostelName", "Hostel Name"], ["Medical, transport & hostel", "roomNumber", "Room Number"], ["Medical, transport & hostel", "profilePhotoUrl", "Profile Photo URL"], ["Medical, transport & hostel", "idCardPhotoUrl", "Student ID Card Photo URL"],
  ] as const;
  const groups = [...new Set(fields.map(([group]) => group))];
  return <div className="space-y-6">{groups.map((group) => <fieldset key={group} className="rounded-xl border p-4"><legend className="px-2 font-semibold">{group}</legend><div className="grid grid-cols-1 gap-4 md:grid-cols-2">{fields.filter(([fieldGroup]) => fieldGroup === group).map(([, key, label]) => <label key={key}><span className="label">{label}</span><input value={details[key] ?? ""} onChange={(event) => onChange(key, event.target.value)} className="input" /></label>)}</div></fieldset>)}</div>;
}
