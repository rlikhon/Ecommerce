import publicClient from "../api/publicClient";

// Fetch complete saved catalog arrays based on token validation parameters
export const getCustomerWishlistService = (token) => {
  return publicClient.get("/account/wishlist", {
    headers: { Authorization: `Bearer ${token}` }
  });
};

// Remove a single saved item block registry trace
export const removeWishlistItemService = (productId, token) => {
  return publicClient.delete(`/account/wishlist/${productId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};
