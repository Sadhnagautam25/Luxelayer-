import axios from "axios";

const authApi = axios.create({
  baseURL: "/api/auth",
  withCredentials: true,
});

// register
export async function register(formData) {
  try {
    const response = await authApi.post("/register", formData);
    return response.data;
  } catch (error) {
    throw (
      error?.response?.data || {
        message: "Something went wrong",
      }
    );
  }
}

// Login
export async function login(formData) {
  try {
    const response = await authApi.post("/login", formData);
    return response.data;
  } catch (error) {
    throw (
      error?.response?.data || {
        message: "Something went wrong",
      }
    );
  }
}

// Get current user
export async function getMe() {
  try {
    const response = await authApi.get("/get-me");
    return response.data;
  } catch (error) {
    throw (
      error?.response?.data || {
        message: "Something went wrong",
      }
    );
  }
}

// Update profile
export async function updateProfile(formData) {
  try {
    const response = await authApi.put("/update-profile", formData);
    return response.data;
  } catch (error) {
    throw (
      error?.response?.data || {
        message: "Something went wrong",
      }
    );
  }
}

// Logout
export async function logout() {
  try {
    const response = await authApi.get("/logout");
    return response.data;
  } catch (error) {
    throw (
      error?.response?.data || {
        message: "Something went wrong",
      }
    );
  }
}

// resend verification mail
export async function resendVerification(email) {
  try {
    const response = await authApi.post("/resend-verification", {
      email,
    });

    return response.data;
  } catch (error) {
    throw (
      error?.response?.data || {
        message: "Something went wrong",
      }
    );
  }
}
