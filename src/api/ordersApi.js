// src/api/orderApi.js
const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/orders`;

/* Helpers */
const buildHeaders = (token) => {
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
};

const safeJson = async (res) => {
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch (err) {
    return { _raw: text };
  }
};

/* Orders API */

/**
 * Create an order (public route in your router)
 * payload: order object (see your controller for fields)
 * token: optional (if you want to attach auth)
 */
export const createOrder = async (payload, token = null) => {
  try {
    const res = await fetch(`${BASE_URL}`, {
      method: "POST",
      headers: buildHeaders(token),
      body: JSON.stringify(payload),
    });
    const data = await safeJson(res);
    if (!res.ok) throw new Error(data?.message || data?._raw || "Create order failed");
    return data;
  } catch (err) {
    throw new Error(err.message || "Network error");
  }
};

/** Get all orders (admin/public depending on your backend) */
export const getOrders = async (token = null) => {
  try {
    const res = await fetch(`${BASE_URL}`, {
      method: "GET",
      headers: buildHeaders(token),
    });
    const data = await safeJson(res);
    if (!res.ok) throw new Error(data?.message || data?._raw || "Fetch orders failed");
    return data;
  } catch (err) {
    throw new Error(err.message || "Network error");
  }
};

/** Get single order by id */
export const getOrderById = async (id, token = null) => {
  try {
    const res = await fetch(`${BASE_URL}/${encodeURIComponent(id)}`, {
      method: "GET",
      headers: buildHeaders(token),
    });
    const data = await safeJson(res);
    if (!res.ok) throw new Error(data?.message || data?._raw || "Fetch order failed");
    return data;
  } catch (err) {
    throw new Error(err.message || "Network error");
  }
};

/** Get orders by user id (protected in your router: /order/:userId) */
export const getOrdersByUser = async (userId, token) => {
  try {
    const res = await fetch(`${BASE_URL}/order/${encodeURIComponent(userId)}`, {
      method: "GET",
      headers: buildHeaders(token),
    });
    const data = await safeJson(res);
    if (!res.ok) throw new Error(data?.message || data?._raw || "Fetch user orders failed");
    return data;
  } catch (err) {
    throw new Error(err.message || "Network error");
  }
};

/** Get all unclaimed orders (route: GET /unclaimed) — protected in router */
export const getUnclaimedOrders = async (token) => {
  try {
    const res = await fetch(`${BASE_URL}/unclaimed`, {
      method: "GET",
      headers: buildHeaders(token),
    });
    const data = await safeJson(res);
    if (!res.ok) throw new Error(data?.message || data?._raw || "Fetch unclaimed orders failed");
    return data;
  } catch (err) {
    throw new Error(err.message || "Network error");
  }
};

/** Claim an order (pilot) — PUT /:id/claim */
export const claimOrder = async (orderId, token) => {
  try {
    const res = await fetch(`${BASE_URL}/${encodeURIComponent(orderId)}/claim`, {
      method: "PUT",
      headers: buildHeaders(token),
    });
    const data = await safeJson(res);
    if (!res.ok) throw new Error(data?.message || data?._raw || "Claim order failed");
    return data;
  } catch (err) {
    throw new Error(err.message || "Network error");
  }
};

/** Update order status (pilot) — PUT /:id/status payload: { status } */
export const updateOrderStatus = async (orderId, statusPayload, token) => {
  try {
    const res = await fetch(`${BASE_URL}/${encodeURIComponent(orderId)}/status`, {
      method: "PUT",
      headers: buildHeaders(token),
      body: JSON.stringify(statusPayload),
    });
    const data = await safeJson(res);
    if (!res.ok) throw new Error(data?.message || data?._raw || "Update status failed");
    return data;
  } catch (err) {
    throw new Error(err.message || "Network error");
  }
};

/** Get pilot's order history — GET /pilot/history (protected by protectPilot) */
export const getPilotHistory = async (token) => {
  try {
    const res = await fetch(`${BASE_URL}/pilot/history`, {
      method: "GET",
      headers: buildHeaders(token),
    });
    const data = await safeJson(res);
    if (!res.ok) throw new Error(data?.message || data?._raw || "Fetch pilot history failed");
    return data;
  } catch (err) {
    throw new Error(err.message || "Network error");
  }
};

/** Update order (admin) — PUT /:id */
export const updateOrder = async (orderId, payload, token = null) => {
  try {
    const res = await fetch(`${BASE_URL}/${encodeURIComponent(orderId)}`, {
      method: "PUT",
      headers: buildHeaders(token),
      body: JSON.stringify(payload),
    });
    const data = await safeJson(res);
    if (!res.ok) throw new Error(data?.message || data?._raw || "Update order failed");
    return data;
  } catch (err) {
    throw new Error(err.message || "Network error");
  }
};

/** Delete order (admin) — DELETE /:id */
export const deleteOrder = async (orderId, token = null) => {
  try {
    const res = await fetch(`${BASE_URL}/${encodeURIComponent(orderId)}`, {
      method: "DELETE",
      headers: buildHeaders(token),
    });
    const data = await safeJson(res);
    if (!res.ok) throw new Error(data?.message || data?._raw || "Delete order failed");
    return data;
  } catch (err) {
    throw new Error(err.message || "Network error");
  }
};
