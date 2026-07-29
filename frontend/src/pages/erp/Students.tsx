import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react";
import { StudentRow, StudentPageResponse } from "../../types/student";
import StudentForm from "../../components/students/StudentForm";

const Students = () => {
  // ==========================
  // State
  // ==========================

  const [students, setStudents] = useState<StudentRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<StudentRow | null>(null);
  const [viewingStudent, setViewingStudent] = useState<StudentRow | null>(null);

  // ==========================
  // Load Students
  // ==========================

  useEffect(() => {
    loadStudents();
  }, [page]);

  const loadStudents = async () => {
    try {
      setLoading(true);

      const response = await api.get<StudentPageResponse>("/students", {
        params: {
          page,
          size,
          // New admissions are kept at the top so a saved student is visible immediately.
          sortBy: "admissionDate",
          direction: "desc",
        },
      });

      setStudents(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error(error);
      alert("Failed to load students.");
    } finally {
      setLoading(false);
    }
  };

  const handleStudentAdded = async (student: StudentRow) => {
    // Put the newly created student in the visible list immediately, then
    // reload so pagination and sorting remain correct.
    setStudents((current) => [student, ...current.filter((item) => item.id !== student.id)].slice(0, size));
    setOpenModal(false);
    if (page !== 0) {
      setPage(0);
    } else {
      await loadStudents();
    }
  };

  const removeStudent = async (student: StudentRow) => {
    if (!window.confirm(`Delete ${student.fullName}? This cannot be undone.`)) return;
    try {
      await api.delete(`/students/${student.id}`);
      await loadStudents();
    } catch (error) {
      console.error(error);
      alert("Failed to delete student.");
    }
  };

  // ==========================
  // UI
  // ==========================

  return (
    <div className="p-6 space-y-6">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Students
          </h1>

          <p className="text-gray-500 mt-1">
            Manage all students in your school.
          </p>
        </div>

        <button
  onClick={() => { setEditingStudent(null); setOpenModal(true); }}
  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
>
  <Plus size={18} />
  Add Student
</button>

      </div>

      {/* Search */}

      <div className="bg-white rounded-lg shadow p-4">

        <div className="relative w-full md:w-96">

          <Search
            size={18}
            className="absolute left-3 top-3 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search Student..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />

        </div>

      </div>

      {/* Student Table */}

      <div className="bg-white rounded-lg shadow overflow-hidden">

        {loading ? (

          <div className="p-10 text-center">
            Loading...
          </div>

        ) : (

          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="p-3 text-left">Admission No</th>
                <th className="p-3 text-left">Roll No</th>
                <th className="p-3 text-left">Student</th>
                <th className="p-3 text-left">Department</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-center">Actions</th>

              </tr>

            </thead>

            <tbody>

              {students.map((student) => (

                <tr
                  key={student.id}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="p-3">
                    {student.admissionNumber}
                  </td>

                  <td className="p-3">
                    {student.rollNumber}
                  </td>

                  <td className="p-3">
                    <div className="font-medium">
                      {student.fullName}
                    </div>
                  </td>

                  <td className="p-3">
                    {student.departmentName}
                  </td>

                  <td className="p-3">
                    <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-sm">
                      {student.status}
                    </span>
                  </td>

                  <td className="p-3">

                    <div className="flex justify-center gap-2">

                      <button onClick={() => setViewingStudent(student)} className="p-2 rounded hover:bg-gray-200" title="View student">
                        <Eye size={18} />
                      </button>

                      <button onClick={() => { setEditingStudent(student); setOpenModal(true); }} className="p-2 rounded hover:bg-blue-100 text-blue-600" title="Edit student">
                        <Edit size={18} />
                      </button>

                      <button onClick={() => void removeStudent(student)} className="p-2 rounded hover:bg-red-100 text-red-600" title="Delete student">
                        <Trash2 size={18} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

              {students.length === 0 && (

                <tr>

                  <td
                    colSpan={6}
                    className="text-center py-10 text-gray-500"
                  >
                    No students found.
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        )}

      </div>

      {/* Pagination */}

      <div className="flex justify-end items-center gap-2">

        <button
          disabled={page === 0}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span>
          Page {page + 1} of {totalPages}
        </span>

        <button
          disabled={page + 1 >= totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Next
        </button>

      </div>

      {/* Add Student Modal */}

{openModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

    <div className="bg-white rounded-xl w-full max-w-4xl p-6 max-h-[90vh] overflow-y-auto">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold">
          {editingStudent ? "Edit Student" : "Add Student"}
        </h2>

        <button
          onClick={() => { setOpenModal(false); setEditingStudent(null); }}
          className="text-2xl hover:text-red-500"
        >
          ×
        </button>

      </div>

      <p className="text-gray-500 mb-6">
        Fill in the student details below.
      </p>

      {/* Student Form */}

<StudentForm
  student={editingStudent}
  onClose={() => { setOpenModal(false); setEditingStudent(null); }}
  onSuccess={handleStudentAdded}
/>

    </div>

  </div>
)}

      {viewingStudent && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"><div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white p-6"><div className="flex items-start justify-between"><div><h2 className="text-2xl font-bold">{viewingStudent.fullName}</h2><p className="text-gray-500">Admission No. {viewingStudent.admissionNumber} · Username: {viewingStudent.username}</p></div><button onClick={() => setViewingStudent(null)} className="text-2xl">×</button></div><div className="mt-5 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">{[["Department", viewingStudent.departmentName], ["Courses", viewingStudent.courseNames?.join(", ") || "None"], ["Roll Number", viewingStudent.rollNumber || "—"], ["Date of Birth", viewingStudent.dateOfBirth || "—"], ["Gender", viewingStudent.gender || "—"], ["Academic Year", viewingStudent.academicSession], ["Admission Date", viewingStudent.admissionDate], ["Status", viewingStudent.status], ...Object.entries(viewingStudent.admissionDetails ?? {}).map(([key, value]) => [key.replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase()), value || "—"] as [string, string])].map(([label, value]) => <div key={label} className="rounded bg-gray-50 p-3"><div className="text-gray-500">{label}</div><div className="font-medium">{value}</div></div>)}</div></div></div>}

    </div>
  );
};

export default Students;
