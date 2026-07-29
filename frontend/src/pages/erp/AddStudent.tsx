import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import StudentForm from "../../components/students/StudentForm";
import type { StudentRow } from "../../types/student";

export default function AddStudent() {
  const navigate = useNavigate();

  const handleSuccess = (student: StudentRow) => {
    // The list reloads from the backend, so the saved student is displayed there.
    navigate("/app/students", { state: { addedStudent: student } });
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <button onClick={() => navigate("/app/students")} className="mb-3 flex items-center gap-2 text-blue-600 hover:text-blue-700">
          <ArrowLeft size={18} /> Back to Students
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Add New Student</h1>
        <p className="mt-1 text-gray-500">Complete the required student information below.</p>
      </div>
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <StudentForm onSuccess={handleSuccess} onClose={() => navigate("/app/students")} />
      </div>
    </div>
  );
}
