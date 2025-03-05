import React from "react";

const SignupForm = ({ user, setUser, createAccountHandler }) => {
  return (
    <>
      <form
        onSubmit={createAccountHandler}
        action=""
        autoComplete="on"
        class="max-w-md w-full bg-white p-6 rounded-lg shadow-lg space-y-4"
      >
        <div>
          <h3>Sign Up</h3>
          <hr className="mt-4" />
        </div>
        <div>
          <label
            htmlFor="full-name"
            class="block text-sm font-medium text-gray-700"
          >
            Full Name
          </label>
          <input
            value={user.name}
            type="text"
            id="full-name"
            class="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your full name"
            onChange={(e) => {
              setUser({ ...user, name: e.target.value });
            }}
            required
          />
        </div>
        <div>
          <label
            htmlFor="email"
            class="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={user.email}
            class="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your email"
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            class="block text-sm font-medium text-gray-700"
          >
            Create Password
          </label>
          <input
            type="password"
            id="password"
            class="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your password"
            value={user.password}
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
            required
          />
        </div>
        <div>
          <label
            htmlFor="confirm-password"
            class="block text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <input
            value={user.confirmPassword}
            type="password"
            id="confirm-password"
            class="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Confirm your password"
            onChange={(e) => {
              setUser({ ...user, confirmPassword: e.target.value });
            }}
            required
          />
        </div>

        <div>
          <button
            type="submit"
            class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Create Account
          </button>
        </div>
        <div class="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" class="text-blue-600 hover:underline">
            Login
          </a>
        </div>
      </form>
    </>
  );
};

export default SignupForm;
