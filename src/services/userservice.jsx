import http from "./axiosContext";

const token = localStorage.getItem("token")
const create = (data) => {
  
  return http.post(`/api/users`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer Token ${token}`,
    },
  });
};
const GetAll = () => {
  return http.get(`/api/users`, {
    headers: {
       
      "Authorization": `Bearer ${token}`,
    },
  });
};
const GetOne = (id) => {
  return http.get(`/api/users/${id}`);
};
const update = (id, Data) => {
  return http.put(`/api/users/${id}`, Data);
};
const remove = (id) => {
  return http.delete(`/api/users/${id}`);
};
export default { GetAll, create, GetOne, update, remove };
