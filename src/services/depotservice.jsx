import http from "./axiosContext";

const create = (data) => {
  return http.post(`/Depots`, data);
};
const GetAll = () => {
  return http.get(`/Depots`);
};
const GetOne = (id) => {
  return http.get(`/Depots/${id}`);
};
const update = (id, Data) => {
  return http.put(`/Depots/${id}`, Data);
};
const remove = (id) => {
  return http.delete(`/Depots/${id}`);
};
export default { GetAll, create, GetOne, update, remove };
