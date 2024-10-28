import React, { useEffect, useState } from "react";
import Sidebar from "../dashbord/sidebar";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import userservice  from "../services/userservice";

function ListUser() {
 // const [data, setData] = useState([]);
  //declaration du state
  const [user, setUser] = useState([]);
  const [affiche, setAffiche] = useState(false);
  //Affichage

  const GetAllUsers= () => {
    userservice
      .GetAll()
      .then((res) => {
        console.log(res);
        setUser(res.data);
        setAffiche(true);
      })
      .catch((erreur) => {
        console.log(erreur);
      });
  };
  //pagination
  const items = 5;
  const { current, setCurrent } = useState(1);
 // const NbPage = Math.ceil(data.lenght / items); // 4 pages
  const startIndex = (current - 1) * items;
  const endIndex = startIndex + items;
 // const DataPerPage = data.slice(startIndex, endIndex);
  useEffect(() => {
    GetAllUsers();
  }, []);

  //Fonction Delete
  const supprimer = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        userservice
          .remove(id)
          .then((res) => {
            console.log(res);
            GetAllUsers(); // supression sans refresh
          })
          .catch((error) => {
            console.log(error);
          });
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };
  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };
  const filteredData = user?.filter((el) => {
    if (inputText === "") {
      return el;
    } else {
      return el.name.toLowerCase().includes(inputText);
    }
  });
 
    return (
      <div className="app">
        <Sidebar></Sidebar>

        <div className="app-wrapper">
          <div className="app-content pt-3 p-md-3 p-lg-4">
            <div className="container-xl">
              <div className="row g-3 mb-4 align-items-center justify-content-between">
                <div className="col-auto">
                  <h1 className="app-page-title mb-0">All Users</h1>
                </div>
                <div className="col-auto">
                  <div className="page-utilities">
                    <div className="row g-2 justify-content-start justify-content-md-end align-items-center">
                      <div className="col-auto">
                        <form className="table-search-form row gx-1 align-items-center">
                          <div className="col-auto">
                            <input
                              type="text"
                              id="search-orders"
                              name="searchorders"
                              className="form-control search-orders"
                              placeholder="Search"
                              onChange={inputHandler}
                            />
                          </div>
                          <div className="col-auto">
                            <button
                              type="submit"
                              className="btn app-btn-secondary"
                            >
                              Search
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                    {/*//row*/}
                  </div>
                  {/*//table-utilities*/}
                </div>
                {/*//col-auto*/}
              </div>
              {/*//row*/}
              <nav
                id="orders-table-tab"
                className="orders-table-tab app-nav-tabs nav shadow-sm flex-column flex-sm-row mb-4"
              >
                <a
                  className="flex-sm-fill text-sm-center nav-link active"
                  id="orders-all-tab"
                  data-bs-toggle="tab"
                  href="#orders-all"
                  role="tab"
                  aria-controls="orders-all"
                  aria-selected="true"
                >
                  All
                </a>
              </nav>
              <div className="tab-content" id="orders-table-tab-content">
                <div
                  className="tab-pane fade show active"
                  id="orders-all"
                  role="tabpanel"
                  aria-labelledby="orders-all-tab"
                >
                  <div className="app-card app-card-orders-table shadow-sm mb-5">
                    <div className="app-card-body">
                      <div className="table-responsive">
                        <table className="table app-table-hover mb-0 text-left">
                          <thead>
                            <tr>
                              <th className="cell">ID</th>
                              <th className="cell">firstName</th>
                              <th className="cell">lastName</th>
                              <th className="cell">email</th>
                              <th className="cell">role</th>
                              <th className="cell">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredData?.map((item) => {
                              console.log(filteredData);
                              return (
                                <tr id="trow_3">
                                  <td className="text-center">{item.id}</td>
                                  <td>
                                    <strong>{item.firstName}</strong>
                                  </td>
                                  <td>
                                    <span className="label label-info">
                                      {item.lastName}
                                    </span>
                                  </td>
                                  <td>
                                    <span className="label label-info">
                                      {item.email}
                                    </span>
                                  </td>
                                  <td>
                                    <span className="label label-info">
                                      {item.role}
                                    </span>
                                  </td>

                                  <td>
                                    <Link
                                      to={`/dashbord/updateUser/${item.id}`}
                                    >
                                      <button className="btn btn-default btn-rounded btn-sm">
                                        <span className="fa fa-pencil" />
                                      </button>
                                    </Link>
                                    <button
                                      className="btn btn-danger btn-rounded btn-sm"
                                      onClick={(e) => supprimer(item.id)}
                                    >
                                      <span className="fa fa-times" />
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                      {/*//table-responsive*/}
                    </div>
                    {/*//app-card-body*/}
                  </div>
                  <div>{/* Display current page data */}</div>
                  <nav className="app-pagination">
                    <ul className="pagination justify-content-center">
                      <li className="page-item disabled">
                        <a
                          className="page-link"
                          href="#"
                          tabIndex={-1}
                          aria-disabled="true"
                        >
                          Previous
                        </a>
                      </li>
                      <li className="page-item active">
                        <a className="page-link" href="#">
                          1
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          2
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          3
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          Next
                        </a>
                      </li>
                    </ul>
                  </nav>
                  {/*//app-pagination*/}
                </div>
                {/*//tab-pane*/}

                <div
                  className="tab-pane fade"
                  id="orders-pending"
                  role="tabpanel"
                  aria-labelledby="orders-pending-tab"
                ></div>
                {/*//tab-pane*/}
                <div
                  className="tab-pane fade"
                  id="orders-cancelled"
                  role="tabpanel"
                  aria-labelledby="orders-cancelled-tab"
                >
                  {/*//app-card*/}
                </div>
                {/*//tab-pane*/}
              </div>
              {/*//tab-content*/}
            </div>
            {/*//container-fluid*/}
          </div>
          {/*//app-content*/}
          <footer className="app-footer">
            <div className="container text-center py-3">
              {/*/* This template is free as long as you keep the footer attribution link. If you'd like to use the template without the attribution link, you can buy the commercial license via our website: themes.3rdwavemedia.com Thank you for your support. :) * /*/}
              <small className="copyright">
                Designed with <span className="sr-only">love</span>
                <i
                  className="fas fa-heart"
                  style={{ color: "#fb866a" }}
                /> by{" "}
                <a
                  className="app-link"
                  href="http://themes.3rdwavemedia.com"
                  target="_blank"
                >
                  Xiaoying Riley
                </a>{" "}
                for developers
              </small>
            </div>
          </footer>
          {/*//app-footer*/}
        </div>
        {/*//app-wrapper*/}
      </div>
    );
  }


export default ListUser;
