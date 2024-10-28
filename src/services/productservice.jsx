import http from "./axiosContext";

const create = (data) => {
return http.post("/articles", data, {
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
};
const GetAll = () => {
  return http.get(`/articles`);
};
const GetOne = (id) => {
  return http.get(`/articles/${id}`);
};
const update = (id, Data) => {
  return http.put(`/articles/${id}`, Data);
};
const remove = (id) => {
  return http.delete(`/articles/${id}`);
};
export default { create,GetAll, GetOne, update, remove };
