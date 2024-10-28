import http from "./axiosContext";

const create = (data) => {
  return http.post(`/servicecategories`, data);
};
const GetAll = () => {
  return http.get(`/servicecategories`);
};
const GetOne = (id) => {
  return http.get(`/servicecategories/${id}`);
};
const update = (id, Data) => {
  return http.put(`/servicecategories/${id}`, Data);
};
const remove = (id) => {
  return http.delete(`/servicecategories/${id}`);
};
export default { GetAll, create, GetOne, update, remove };
