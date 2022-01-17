// Importing Required Packages and Libraries

import axios from "axios";
import { MAIN_URL } from "./url";

//const token = localStorage.getItem("_token");

// Exporting axios Functios

export const getTopProd = () => {
	return axios.get(`${MAIN_URL}/top-product`);
};

export const getCategoryImage = () => {
	return axios.get(`${MAIN_URL}/category-images`);
};

export const getProdColor = () => {
	return axios.get(`${MAIN_URL}/product-colors`);
};

export const getCommonProduct = () => {
	return axios.get(`${MAIN_URL}/common-product`);
};

export const getFilterProduct = (data) => {
	return axios.post(`${MAIN_URL}/filter-product`, data);
};

export const postOrderDetail = (data) => {
	return axios.post(`${MAIN_URL}/order-detail`, data);
};

export const getOrderDetail = (email) => {
	return axios.get(`${MAIN_URL}/get-order/${email}`);
};

export const downInvoice = (data) => {
	return axios.post(`${MAIN_URL}/invoice`, data);
};

export const loadingInvoice = () => {
	return axios.get(`${MAIN_URL}/download`);
};
