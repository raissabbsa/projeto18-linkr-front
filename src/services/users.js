import axios from "axios";
import { BASE_URL } from "../constants/urls";

export function createConfig(token) {
	const config = { headers: { Authorization: `Bearer ${token}` } };
	return config;
}

export function login(loginForm) {
	const promise = axios.post(`${BASE_URL}/signin`, loginForm);
	return promise;
}

export function register(registerForm) {
	const promise = axios.post(`${BASE_URL}/signup`, registerForm);
	return promise;
}
