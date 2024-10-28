import React, { useEffect, useState } from "react";
import Sidebar from "../dashbord/sidebar";
import productService from "../services/productservice";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function ListProduct() {
  //declaration du state
  const [product, setProduct] = useState([]);
  const [affiche, setAffiche] = useState(false);

  // Pagination state
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(product.length / itemsPerPage);

  //Affichage
  const getAllProduct = () => {
    productService
      .GetAll()
      .then((res) => {
        console.log(res);
        setProduct(res.data.data);
        setAffiche(true);
      })
      .catch((erreur) => {
        console.log(erreur);
      });
  };

  useEffect(() => {
    getAllProduct();
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
        productService
          .remove(id)
          .then((res) => {
            console.log(res);
            getAllProduct(); // suppression sans refresh
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

  const filteredData = product.filter((el) => {
    if (inputText === "") {
      return el;
    } else {
      // Check if el.code is not null or undefined
      return el.nomP.toLowerCase().includes(inputText);
    }
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="app">
      <Sidebar></Sidebar>

      <div className="app-wrapper">
        <div className="app-content pt-3 p-md-3 p-lg-4">
          <div className="container-xl">
            <div className="row g-3 mb-4 align-items-center justify-content-between">
              <div className="col-auto">
                <Link to={`/dashbord/addproduct`}>
                <button type="submit" className="btn app-btn-primary">
                  + Ajouter un produit 
                 
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
                            <th className="cell">Price</th>
                            <th className="cell" width={50}>
                              {" "}
                              Pictures
                            </th>
                            <th className="cell">Quantity</th>
                            <th className="cell">Category</th>
                            <th className="cell">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentData.map((item) => {
                            return (
                              <tr id="trow_3" key={item.id}>
                                <td className="cell">{item.id}</td>
                                <td>
                                  <span className="cell">{item.nomP}</span>
                                </td>
                                <td>
                                  <span className="cell">{item.prix}DT</span>
                                </td>
                                <td>
                                  <span className="cell">
                                    <tr>
                                      <img
                                        style={{
                                          width: "80px",
                                          height: "80px",
                                        }}
                                        src={`http://localhost:5000/file/articles/${item.image.replace(
                                          /"/g,
                                          ""
                                        )}`}
                                        alt=""
                                      />
                                    </tr>
                                  </span>
                                </td>
                                <td>
                                  <span className="cell">{item.qte}</span>
                                </td>
                                <td>
                                  <span className="cell">
                                    {item.subcategoryId}
                                  </span>
                                </td>
                                <td>
                                  <Link
                                    to={`/dashbord/updateProduct/${item.id}`}
                                  >
                                    <button className="btn btn-default btn-rounded btn-sm">
                                      <span className="fa fa-pencil" />
                                    </button>
                                  </Link>
                                  <button
                                    className="btn btn-danger btn-rounded btn-sm"
                                    onClick={() => supprimer(item.id)}
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
                    <li
                      className={`page-item ${
                        currentPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>
                    </li>
                    {[...Array(totalPages).keys()].map((number) => (
                      <li
                        key={number + 1}
                        className={`page-item ${
                          currentPage === number + 1 ? "active" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(number + 1)}
                        >
                          {number + 1}
                        </button>
                      </li>
                    ))}
                    <li
                      className={`page-item ${
                        currentPage === totalPages ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
                {/*//app-pagination*/}
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

export default ListProduct;
