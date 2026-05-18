import axios from "axios";
import client from "../api/client";

export const adminLogin = (data: { email: string; password: string }) =>
  client.post(`/admin/login`, data);

export const register = (data: { email: string; password: string }) =>
  client.post(`/admin/register`, data);

// ✅ Save profile text fields payload using PUT matching Laravel's new route schema
export const updateAdminProfileService = (data: any) => client.put("/admin/profile", data);

// ✅ Target the customized sub-route path for binary uploads
export const updateAdminAvatarService = (formData: FormData) => {
  return client.post("/admin/profile/avatar", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
};

// ✅ Target the password sub-route path using PUT
export const updateAdminPasswordService = (data: any) => client.put("/admin/profile/password", data);