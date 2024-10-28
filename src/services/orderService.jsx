import http from "./axiosContext";

const create = (data) => {
  return http.post(`/api/orders`, data);
};
const GetAll = () => {
  return http.get(`/api/orders`);
};
const GetOne = (id) => {
  return http.get(`/api/orders/${id}`);
};
const update = (id, Data) => {
  return http.put(`/api/orders/${id}`, Data);
};
const remove = (id) => {
  return http.delete(`/api/orders/${id}`);
};
export default { GetAll, create, GetOne, update, remove };
