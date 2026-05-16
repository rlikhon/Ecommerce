import axios from "axios";
import client from "../api/client";

export const adminLogin = (data: { email: string; password: string }) =>
  client.post(`/admin/login`, data);

export const register = (data: { email: string; password: string }) =>
  client.post(`/admin/register`, data);
``;
