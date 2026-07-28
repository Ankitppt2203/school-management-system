import { ArrowLeft, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AddStudent() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <button
            onClick={() => navigate("/app/students")}
            className="mb-3 flex items-center gap-2 text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft size={18} />
            Back to Students
          </button>

          <h1 className="text-3xl font-bold text-gray-900">
            Add New Student
          </h1>

          <p className="mt-1 text-gray-500">
            Complete all required student information.
          </p>
        </div>
      </div>

      {/* Form */}
      <form className="space-y-6">

        {/* Basic Information */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm">

          <h2 className="mb-6 text-xl font-semibold">
            Basic Information
          </h2>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">

            <div>
              <label className="label">
                Admission Number *
              </label>

              <input
                className="input"
                placeholder="ADM0001"
              />
            </div>

            <div>
              <label className="label">
                Roll Number *
              </label>

              <input
                className="input"
                placeholder="101"
              />
            </div>

            <div>
              <label className="label">
                First Name *
              </label>

              <input
                className="input"
                placeholder="Rahul"
              />
            </div>

            <div>
              <label className="label">
                Middle Name
              </label>

              <input
                className="input"
              />
            </div>

            <div>
              <label className="label">
                Last Name *
              </label>

              <input
                className="input"
              />
            </div>

            <div>
              <label className="label">
                Gender
              </label>

              <select className="input">
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

          </div>

        </div>

        {/* Save Button */}

        <div className="sticky bottom-0 rounded-2xl border bg-white p-5 shadow-lg">

          <div className="flex justify-end gap-4">

            <button
              type="button"
              onClick={() => navigate("/app/students")}
              className="btn-secondary"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn-primary"
            >
              <Save className="mr-2 h-4 w-4" />
              Save Student
            </button>

          </div>

        </div>

      </form>

    </div>
  );
}