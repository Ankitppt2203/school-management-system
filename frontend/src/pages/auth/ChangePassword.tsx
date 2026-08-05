import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../services";
import { Eye, EyeOff } from "lucide-react";

export default function ChangePassword() {
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showPasswords, setShowPasswords] = useState({ current: false, next: false, confirm: false });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await authApi.changePassword({
        currentPassword,
        newPassword,
        confirmPassword,
      });

      setMessage("Password changed successfully.");

      setTimeout(() => {
        navigate("/app");
      }, 1000);
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Failed to change password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">

        <h2 className="text-2xl font-bold mb-6">
          Change Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <PasswordField placeholder="Current Password" value={currentPassword} visible={showPasswords.current} onChange={setCurrentPassword} onToggle={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })} />
          <PasswordField placeholder="New Password" value={newPassword} visible={showPasswords.next} onChange={setNewPassword} onToggle={() => setShowPasswords({ ...showPasswords, next: !showPasswords.next })} />
          <PasswordField placeholder="Confirm Password" value={confirmPassword} visible={showPasswords.confirm} onChange={setConfirmPassword} onToggle={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })} />

          {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}

          {message && (
            <p className="text-green-600 text-sm">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? "Updating..." : "Change Password"}
          </button>

        </form>
      </div>
    </div>
  );
}

function PasswordField({ placeholder, value, visible, onChange, onToggle }: { placeholder: string; value: string; visible: boolean; onChange: (value: string) => void; onToggle: () => void }) {
  return <div className="relative"><input required type={visible ? "text" : "password"} placeholder={placeholder} className="input w-full pr-10" value={value} onChange={(e) => onChange(e.target.value)} /><button type="button" aria-label={visible ? `Hide ${placeholder}` : `Show ${placeholder}`} onClick={onToggle} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-600">{visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></div>;
}
