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

export function searchUsers(name, token) {
	const config = createConfig(token);
	const promise = axios.get(`${BASE_URL}/user/search?name=${name}`, config);
	return promise;
}

export function follow(userId, token) {
	const config = createConfig(token);
	const promise = axios.get(`${BASE_URL}/user/${userId}/follow`, config);
	return promise;
}

export function unfollow(userId, token) {
	const config = createConfig(token);
	const promise = axios.get(`${BASE_URL}/user/${userId}/unfollow`, config);
	return promise;
}