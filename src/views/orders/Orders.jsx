import React, { useEffect, useState } from "react";
import Sidebar from "../../dashbord/sidebar";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import orderService from "../../services/orderService";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [affiche, setAffiche] = useState(false);

  const getAllOrders = () => {
    orderService
      .GetAll()
      .then((res) => {
        setOrders(res.data.data);
        setAffiche(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllOrders();
  }, []);

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
        orderService
          .remove(id)
          .then((res) => {
            getAllOrders(); // suppression sans refresh
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
  const inputHandler = (e) => {
    const lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  const filteredData = orders?.filter((el) => {
    if (inputText === "") {
      return el;
    } else {
      return el.status.toLowerCase().includes(inputText);
    }
  });

  return (
    <div>
      <div className="app">
        <Sidebar />
        <div className="app-wrapper">
          <div className="app-content pt-3 p-md-3 p-lg-4">
            <div className="container-xl">
              <div className="row g-3 mb-4 align-items-center justify-content-between">
                <div className="col-auto">
                  <h1 className="app-page-title mb-0">Orders</h1>
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
                              placeholder="Search"
                              onChange={inputHandler}
                            />
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
                              <th className="cell">Index</th>
                              <th className="cell">Location</th>
                              <th className="cell">Adress</th>
                              <th className="cell">City</th>
                              <th className="cell">Phone</th>
                              <th className="cell">Total Amount</th>
                          
                              <th className="cell">Status</th>
                              <th className="cell">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredData?.map((item) => (
                              <tr key={item.id}>
                                <td className="cell">{item.id}</td>
                                <th className="cell">{item.location}</th>
                                <th className="cell">{item.address}</th>
                                <th className="cell">{item.city}</th>
                                <th className="cell">{item.phoneNumber}</th>
                                <th className="cell">{item.totalAmount} DT</th>
                           
                                <th className="cell">{item.status}</th>
                                <td className="cell">
                                  <a href={`/dashbord/orders/${item.id}`}>
                                    <button className="fa fa-eye">
                                      <span  />
                                    </button>
                                  </a>
                                  <span style={{ marginRight: "10px" }}></span>
                                  <button
                                    className="btn btn-danger btn-rounded btn-sm"
                                    onClick={() => supprimer(item.id)}
                                  >
                                    <span className="fa fa-times" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
