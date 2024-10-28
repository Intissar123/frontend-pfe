import http from "./axiosContext";

const create = (data) => {
  return http.post(`/sub-category`, data);
};
const GetAll = () => {
  return http.get(`/sub-category`);
};
const GetOne = (id) => {
  return http.get(`/sub-category/${id}`);
};
const update = (id, Data) => {
  return http.put(`/sub-category/${id}`, Data);
};
const remove = (id) => {
  return http.delete(`/sub-category/${id}`);
};
export default {create,GetAll, GetOne, update, remove };
