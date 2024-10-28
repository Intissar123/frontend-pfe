import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import subcategoryService from "../services/subcategoryservice";
import Sidebar from "../dashbord/sidebar";


function Listsubcategory() {

   

  //declaration du state
  const [subcategory, setsubcategory] = useState([]);
  const [affiche, setAffiche] = useState(false);
  //Affichage
  const getAllSubcategory = () => {
    subcategoryService
      .GetAll()
      .then((res) => {
        console.log(res);
        setsubcategory(res.data.data);
        
        setAffiche(true);
        console.log(setsubcategory);
      })
      .catch((erreur) => {
        console.log(erreur);
      });
  };
  useEffect(() => {
    getAllSubcategory();
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
        subcategoryService
          .remove(id)
          .then((res) => {
            console.log(res);
            getAllSubcategory(); // supression sans refresh
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
  const filteredData = subcategory?.filter((el) => {
    if (inputText === '') {
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
                  <Link to={`/dashbord/addsubcategory`}>
                    <button type="submit" className="btn app-btn-primary">
                      + Ajouter subcategory
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
                              <th className="cell">Name</th>
                              <th className="cell">Description</th>
                              <th className="cell">category</th>
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
                                    <strong>{item.name}</strong>
                                  </td>
                                  <td>
                                    <span className="label label-info">
                                      {item.description}
                                    </span>
                                  </td>
                                  <td className="cell">{item.categoryId}</td>

                                  <td>
                                    <Link
                                      to={`/dashbord/updateSubcategory/${item.id}`}
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
          {/*//app-content*/}
        </div>
        {/*//app-wrapper*/}
      </div>
    );
  }


export default Listsubcategory;
