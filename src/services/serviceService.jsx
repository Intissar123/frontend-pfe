import http from "./axiosContext";

const create = (data) => {
  return http.post(`/services`, data);
};
const GetAll = () => {
  return http.get(`/services`);
};
const GetOne = (id) => {
  return http.get(`/services/${id}`);
};
const update = (id, Data) => {
  return http.put(`/services/${id}`, Data);
};
const remove = (id) => {
  return http.delete(`/services/${id}`);
};
export default { GetAll, create, GetOne, update, remove };
