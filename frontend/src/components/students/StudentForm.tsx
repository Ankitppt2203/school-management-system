import { useState } from "react";
import api from "../../api/axios";
import { StudentPayload } from "../../types/student";

interface StudentFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

const StudentForm = ({ onClose, onSuccess }: StudentFormProps) => {
  const [formData, setFormData] = useState<StudentPayload>({
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
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.name === "departmentId"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post("/students", formData);

      alert("Student added successfully");

      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to add student");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      <div className="grid grid-cols-2 gap-4">

        <input
          name="admissionNumber"
          placeholder="Admission Number"
          className="border rounded p-2"
          onChange={handleChange}
        />

        <input
          name="rollNumber"
          placeholder="Roll Number"
          className="border rounded p-2"
          onChange={handleChange}
        />

        <input
          name="firstName"
          placeholder="First Name"
          className="border rounded p-2"
          onChange={handleChange}
        />

        <input
          name="middleName"
          placeholder="Middle Name"
          className="border rounded p-2"
          onChange={handleChange}
        />

        <input
          name="lastName"
          placeholder="Last Name"
          className="border rounded p-2"
          onChange={handleChange}
        />

        <select
          name="gender"
          className="border rounded p-2"
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option>MALE</option>
          <option>FEMALE</option>
          <option>OTHER</option>
        </select>

        <input
          type="date"
          name="dateOfBirth"
          className="border rounded p-2"
          onChange={handleChange}
        />

        <input
          type="date"
          name="admissionDate"
          className="border rounded p-2"
          onChange={handleChange}
        />

        <input
          name="academicSession"
          placeholder="Academic Session"
          className="border rounded p-2"
          onChange={handleChange}
        />

        <input
          type="number"
          name="departmentId"
          placeholder="Department ID"
          className="border rounded p-2"
          onChange={handleChange}
        />

        <select
          name="status"
          className="border rounded p-2"
          onChange={handleChange}
          defaultValue="ACTIVE"
        >
          <option>ACTIVE</option>
          <option>INACTIVE</option>
        </select>

      </div>

      <div className="flex justify-end gap-3">

        <button
          type="button"
          onClick={onClose}
          className="border px-4 py-2 rounded"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded"
        >
          Save Student
        </button>

      </div>

    </form>
  );
};

export default StudentForm;