import http from "./axiosContext";

const singup = (data) => {
  return http.post(`/api/auth/signup`, data);
};
const signeIn = (data) => {
  return http.post(`/api/auth/login`, data);
};
const logout = () => {
  return http.get(`/auth/logout`);
};
const GetAll = () => {
  return http.get(`/api/users`);
};
const GetOne = (id) => {
  return http.get(`/api/users/${id}`);
};
const update = (id, Data) => {
  return http.put(`/api/users/${id}`, Data);
};
export default { singup, signeIn, logout, GetAll, GetOne, update };
