import http from "./axiosContext";

const create = (data) => {
  return http.post(`/coupon`, data);
};
const GetAll = () => {
  return http.get(`/coupon`);
};
const GetOne = (id) => {
  return http.get(`/coupon/${id}`);
};
const update = (id, Data) => {
  return http.put(`/coupon/${id}`, Data);
};
const remove = (id) => {
  return http.delete(`/coupon/${id}`);
};
export default { GetAll, create, GetOne, update, remove };
