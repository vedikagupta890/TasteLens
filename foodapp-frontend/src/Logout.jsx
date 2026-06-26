export default function Logout() {
  const handleLogout = () => {
    alert("You have been logged out successfully!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold mb-4">Logout</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to log out?
        </p>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg"
        >
          Confirm Logout
        </button>
      </div>
    </div>
  );
}
