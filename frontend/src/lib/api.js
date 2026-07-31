import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const startCheckout = async (lookup_key, quantity = 1, email = "") => {
  const { data } = await axios.post(`${API}/payments/checkout`, {
    lookup_key,
    quantity,
    email,
    origin_url: window.location.origin,
  });
  return data;
};

export const getPaymentStatus = async (sessionId) => {
  const { data } = await axios.get(`${API}/payments/status/${sessionId}`);
  return data;
};

export const submitContact = (payload) => axios.post(`${API}/contact`, payload);
export const subscribeNewsletter = (email) => axios.post(`${API}/newsletter`, { email });
