import React from "react";
const LoginForm = ({ user, setUser, loginHandler }) => {
  return (
    <form
      autoComplete="on"
      onSubmit={loginHandler}
      className="bg-white p-6 rounded-lg shadow-lg w-80 space-y-4"
    >
      <h2 className="text-2xl font-bold text-center">Login</h2>

      <hr />
      {/* Role Selection */}
      <div>
        <label htmlFor="role" className="block text-sm font-bold text-gray-700">
          I'm {user.role}.
        </label>
        <div className="mt-1 flex space-x-4">
          {/* User Button */}
          <button
            type="button"
            onClick={() => setUser({ ...user, role: "user" })}
            className={`w-full p-2 border rounded-md ${
              user.role === "user"
                ? "bg-green-600 text-white"
                : "bg-white text-green-600 border-gray-300"
            } focus:ring-2 focus:ring-green-500`}
          >
            User
          </button>

          {/* Admin Button */}
          <button
            type="button"
            onClick={() => setUser({ ...user, role: "admin" })}
            className={`w-full p-2 border rounded-md ${
              user.role === "admin"
                ? "bg-black text-white"
                : "bg-white text-black border-gray-300"
            } focus:ring-2 focus:ring-black`}
          >
            Admin
          </button>
        </div>
      </div>

      {/* email */}
      <div>
        <label
          htmlFor="email"
          className="block font-bold text-sm text-gray-700"
        >
          Email
        </label>
        <input
          className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-0 focus:ring-blue-500"
          autoComplete="email"
          value={user.email}
          onChange={(e) => {
            setUser({ ...user, email: e.target.value });
          }}
          type="email"
          required
        />
      </div>

      {/* Password */}
      <div>
        <label
          htmlFor="password"
          className="block font-bold text-sm text-gray-700"
        >
          Password
        </label>
        <input
          autoComplete="on"
          className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-0 focus:ring-blue-500"
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => {
            setUser({ ...user, password: e.target.value });
          }}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
      >
        Login
      </button>
      <div class="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="/signup" class="text-blue-600 hover:underline">
            Create account
          </a>
        </div>
    </form>
  );
};

export default LoginForm;
