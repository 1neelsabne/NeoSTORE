// Importing Required Packages and Libraries

import axios from "axios";
import { MAIN_URL } from "./url";

// Exporting  axios functions

const token = localStorage.getItem("_token");

export const postLogin = (data) => {
	return axios.post(`${MAIN_URL}/log-in`, data);
};

export const postSignup = (data) => {
	return axios.post(`${MAIN_URL}/sign-up`, data);
};

export const postOtp = (data) => {
	return axios.post(`${MAIN_URL}/forgot-password`, data);
};

export const recoverPass = (data) => {
	return axios.post(`${MAIN_URL}/recover-password`, data);
};

export const postChangePass = (data) => {
	return axios.post(`${MAIN_URL}/change-password`, data, {
		headers: { authorization: `Bearer ${token}` },
	});
};

export const getProfile = (email) => {
	return axios.get(`${MAIN_URL}/profile-data/${email}`, {
		headers: { authorization: `Bearer ${token}` },
	});
};

export const postDetails = (data) => {
	return axios.post(`${MAIN_URL}/update-detail`, data, {
		headers: { authorization: `Bearer ${token}` },
	});
};

export const getAddress = (email) => {
	return axios.get(`${MAIN_URL}/address/${email}`, {
		headers: { authorization: `Bearer ${token}` },
	});
};

export const postAddress = (email, data) => {
	return axios.post(`${MAIN_URL}/add-address/${email}`, data, {
		headers: { authorization: `Bearer ${token}` },
	});
};

export const remAddress = (email, data) => {
	return axios.post(`${MAIN_URL}/del-address/${email}`, data, {
		headers: { authorization: `Bearer ${token}` },
	});
};

export const updateAddress = (email, data) => {
	return axios.post(`${MAIN_URL}/edit-address/${email}`, data, {
		headers: { authorization: `Bearer ${token}` },
	});
};

export const getCartData = (email) => {
	return axios.get(`${MAIN_URL}/cart-data/${email}`);
};

export const postCartData = (email, data) => {
	return axios.post(`${MAIN_URL}/insert-cartdata/${email}`, data);
};
