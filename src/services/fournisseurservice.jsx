import http from "./axiosContext";

const create = (data) => {
  return http.post(`/Fournisseurs`, data)
};
const GetAll = () => {
  return http.get(`/Fournisseurs`);
};
const GetOne = (id) => {
  return http.get(`/Fournisseurs/${id}`);
};
const update = (id, Data) => {
  return http.put(`/Fournisseurs/${id}`, Data);
};
const remove = (id) => {
  return http.delete(`/Fournisseurs/${id}`);
};
export default { GetAll, create, GetOne, update, remove };
