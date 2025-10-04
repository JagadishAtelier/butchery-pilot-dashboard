// src/api/pilotAuthApi.js
const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/pilot`;


const buildHeaders = (token) => {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
};


const safeJson = async (res) => {
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch (err) {
    // not JSON
    return { _raw: text };
  }
};


export const registerPilot = async (payload) => {
  try {
    const res = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: buildHeaders(),
      body: JSON.stringify(payload),
    });

    const data = await safeJson(res);
    if (!res.ok) throw new Error(data?.message || data?._raw || 'Pilot registration failed');
    return data;
  } catch (err) {
    throw new Error(err.message || 'Network error');
  }
};


export const loginPilot = async ({ email, password }) => {
  try {
    const res = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: buildHeaders(),
      body: JSON.stringify({ email, password }),
    });

    const data = await safeJson(res);
    if (!res.ok) throw new Error(data?.message || data?._raw || 'Login failed');
    return data;
  } catch (err) {
    throw new Error(err.message || 'Network error');
  }
};


export const sendPilotOtp = async (email) => {
  try {
    const res = await fetch(`${BASE_URL}/forgot-password`, {
      method: 'POST',
      headers: buildHeaders(),
      body: JSON.stringify({ email }),
    });

    const data = await safeJson(res);
    if (!res.ok) throw new Error(data?.message || data?._raw || 'Failed to send OTP');
    return data;
  } catch (err) {
    throw new Error(err.message || 'Network error');
  }
};


export const resetPilotPassword = async ({ email, otp, newPassword }) => {
  try {
    const res = await fetch(`${BASE_URL}/reset-password`, {
      method: 'POST',
      headers: buildHeaders(),
      body: JSON.stringify({ email, otp, newPassword }),
    });

    const data = await safeJson(res);
    if (!res.ok) throw new Error(data?.message || data?._raw || 'Reset password failed');
    return data;
  } catch (err) {
    throw new Error(err.message || 'Network error');
  }
};

/**
 * GET PROFILE (protected)
 * token: Bearer token string
 */
export const getPilotProfile = async (token) => {
  try {
    const res = await fetch(`${BASE_URL}/profile`, {
      method: 'GET',
      headers: buildHeaders(token),
    });

    const data = await safeJson(res);
    if (!res.ok) throw new Error(data?.message || data?._raw || 'Failed to fetch profile');
    return data;
  } catch (err) {
    throw new Error(err.message || 'Network error');
  }
};

/**
 * UPDATE PROFILE (protected)
 * token: Bearer token string
 * payload: { name?, email?, phone?, addresses?, aadhaarNumber?, licenceNumber? }
 */
export const updatePilotProfile = async (token, payload) => {
  try {
    const res = await fetch(`${BASE_URL}/profile`, {
      method: 'PUT',
      headers: buildHeaders(token),
      body: JSON.stringify(payload),
    });

    const data = await safeJson(res);
    if (!res.ok) throw new Error(data?.message || data?._raw || 'Failed to update profile');
    return data;
  } catch (err) {
    throw new Error(err.message || 'Network error');
  }
};

/**
 * CHANGE PASSWORD (protected)
 * token: Bearer token string
 * payload: { oldPassword, newPassword }
 */
export const changePilotPassword = async (token, { oldPassword, newPassword }) => {
  try {
    const res = await fetch(`${BASE_URL}/change-password`, {
      method: 'POST',
      headers: buildHeaders(token),
      body: JSON.stringify({ oldPassword, newPassword }),
    });

    const data = await safeJson(res);
    if (!res.ok) throw new Error(data?.message || data?._raw || 'Failed to change password');
    return data;
  } catch (err) {
    throw new Error(err.message || 'Network error');
  }
};

/**
 * GET PILOT BY ID (public/admin)
 * id: pilot id
 * token optional (if admin or protected route)
 */
export const getPilotById = async (id, token = null) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/pilot/${encodeURIComponent(id)}`, {
      method: 'GET',
      headers: buildHeaders(token),
    });

    const data = await safeJson(res);
    if (!res.ok) throw new Error(data?.message || data?._raw || 'Failed to fetch pilot');
    return data;
  } catch (err) {
    throw new Error(err.message || 'Network error');
  }
};
