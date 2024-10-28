import http from "./axiosContext";

const create = (data) => {
  return http.post(`/devis`, data);
};
const GetAll = () => {
  return http.get(`/devis`);
};
const GetOne = (id) => {
  return http.get(`/devis/${id}`);
};
const update = (id, Data) => {
  return http.put(`/devis/${id}`, Data);
};
const remove = (id) => {
  return http.delete(`/devis/${id}`);
};
export default { GetAll, create, GetOne, update, remove };
