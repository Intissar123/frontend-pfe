import React, { useEffect, useState } from "react";
import Sidebar from "../dashbord/sidebar";
import orderService from "../services/orderService";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import devisService from "../services/devisService";

function ListDevis() {
  //declaration du state
  const [devis, setdevis] = useState([]);
  const [affiche, setAffiche] = useState(false);
  //Affichage
  const getAllDevis = () => {
    devisService
      .GetAll()
      .then((res) => {
        console.log(res);
        setdevis(res.data.data);
        setAffiche(true);
      })
      .catch((erreur) => {
        console.log(erreur);
      });
  };
  useEffect(() => {
    getAllDevis();
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
        devisService
          .remove(id)
          .then((res) => {
            console.log(res);
            getAllDevis(); // supression sans refresh
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
  const filteredData = devis?.filter((el) => {
    if (inputText === "") {
      return el;
    } else {
      return el.email.toLowerCase().includes(inputText);
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
                <h1 className="app-page-title mb-0">List Devis</h1>
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

                            <th className="cell">email</th>
                            <th className="cell">message</th>
                            <th className="cell">ServiceId</th>
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
                                  <span className="label label-info">
                                    {item.email}
                                  </span>
                                </td>

                                <td>
                                  <span className="label label-info">
                                    {item.message}
                                  </span>
                                </td>
                                <td>
                                  <strong>{item?.serviceId}</strong>
                                </td>

                                <td>
                                  <Link to={`/dashbord/updateDevis/${item.id}`}>
                                    <button className="fa fa-eye">
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
                {/*//app-card*/}
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

        {/*//app-footer*/}
      </div>
      {/*//app-wrapper*/}
    </div>
  );
}

export default ListDevis;
