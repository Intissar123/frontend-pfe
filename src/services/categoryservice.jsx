import http from "./axiosContext";

const create = (data) => {
  return http.post(`/categories`, data);
};
const GetAll = () => {
  return http.get(`/categories`);
};
const GetOne = (id) => {
  return http.get(`/categories/${id}`);
};
const update = (id, Data) => {
  return http.put(`/categories/${id}`, Data);
};
const remove = (id) => {
  return http.delete(`/categories/${id}`);
};
export default { GetAll, create,GetOne, update, remove };
