import axios from "axios";
import client from "../api/client";

;

export const adminLogin = (data: { email: string; password: string }) =>
  client.post(`/login`, data);

export const register = (data: { email: string; password: string }) =>
  client.post(`/register`, data);``