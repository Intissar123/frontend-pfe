
import fournisseurservice from "../services/fournisseurservice";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../dashbord/sidebar";

import Swal from "sweetalert2";
function Listfournisseur() {
  const [data, setData] = useState([]);
  const [affiche, setAffiche] = useState(false);
  const getAlldata = () => {
    fournisseurservice
      .GetAll()
      .then((res) => {
        setData(res.data.data);
        setAffiche(true);
      })
      .catch((erreur) => {
        console.log();
      });
  };
  useEffect(() => {
    getAlldata();
  }, []);
  //Delete {$id}
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
        fournisseurservice
          .remove(id)
          .then((res) => {
            getAlldata(); // supression sans refresh
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
  const filteredData = data?.filter((el) => {
    if (inputText === "") {
      return el;
    } else {
      return el.email.toLowerCase().includes(inputText);
    }
  });

  if (affiche) {
    return (
      <div>
        <Sidebar></Sidebar>
        <div class="app">
          <div className="app-wrapper">
            <div className="app-content pt-3 p-md-3 p-lg-4">
              <div className="container-xl">
                <div className="row g-3 mb-4 align-items-center justify-content-between">
                  <div className="col-auto">
                    <Link to={`/dashbord/addprovider`}>
                      <button type="submit" className="btn app-btn-primary">
                        + Ajouter fournisseur
                      </button>
                    </Link>
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
                                name="search"
                                className="form-control search-orders"
                                placeholder="Search ..."
                                onChange={inputHandler}
                              />
                            </div>
                          </form>
                        </div>
                        {/*//col*/}
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
                                <th className="cell">index</th>
                                <th className="cell">réference Fournisseur</th>
                                <th className="cell">Name</th>

                                <th className="cell">Phone</th>
                                <th className="cell">Address</th>

                                <th className="cell">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredData?.map((item) => {
                                return (
                                  <tr>
                                    {" "}
                                    <td className="cell">{item.id}</td>
                                    <td className="cell">{item.refF}</td>
                                    <td className="cell">{item.nomF}</td>
                                    <td className="cell">{item.numTlp}</td>
                                    <td className="cell">
                                      <span className="truncate">
                                        {item.adresse}
                                      </span>
                                    </td>
                                    <td className="cell">
                                      <Link
                                        to={`/dashbord/updateprovider/${item.id}`}
                                      >
                                        <button className="btn btn-default btn-rounded btn-sm">
                                          <span className="fa fa-pencil" />
                                        </button>
                                      </Link>{" "}
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
                    {/* <nav className="app-pagination">
                <ul className="pagination justify-content-center">
                  <li className="page-item disabled">
                    <a className="page-link" href="#" tabIndex={-1} aria-disabled="true">Previous</a>
                  </li>
                  <li className="page-item active"><a className="page-link" href="#">1</a></li>
                  <li className="page-item"><a className="page-link" href="#">2</a></li>
                  <li className="page-item"><a className="page-link" href="#">3</a></li>
                  <li className="page-item">
                    <a className="page-link" href="#">Next</a>
                  </li>
                </ul>
              </nav> */}
                  </div>
                  {/*//tab-pane*/}
                </div>
                {/*//tab-content*/}
              </div>
              {/*//container-fluid*/}
            </div>
            {/*//app-content*/}
          </div>
        </div>
      </div>
    );
  }
}

export default Listfournisseur;
