import publicClient from "../api/publicClient";

// Target the password sub-route using PUT for standard shoppers
// Append this to the bottom of your existing src/services/AuthServices.js
export const updateCustomerPasswordService = (data, token) => {
  return publicClient.put("/account/profile/password", data, {
    headers: { Authorization: `Bearer ${token}` }
  });
};