import { PDFDownloadLink } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import GenerateInvoice from "../Invoice/GenerateInvoice";
import Swal from "sweetalert2";
import orderService from "../../services/orderService";

const OrderDetails = () => {
  const [order, setOrder] = useState();
    const [user, setuser] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  const [updateFormData, setUpdateFormData] = useState({
    status: "",
  });

  const getOrderById = () => {
    orderService
      .GetOne(id)
      .then((res) => {
        console.log(res.data.data); // Log the response data
        setOrder(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getOrderById();
  }, []);

  useEffect(() => {
    if (order) {
      setUpdateFormData({
        status: order.status,
      });
    }
  }, [order]);

  const onChangeHandler = (e) => {
    setUpdateFormData({
      ...updateFormData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        orderService
          .update(updateFormData, id)
          .then((res) => {
            navigate("/dashbord/orders");
          })
          .catch((erreur) => {
            console.log(erreur);
          });

        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  return (
    <div>
      <div className="app">
        <div className="app-wrapper">
          <div className="app-content pt-3 p-md-3 p-lg-4">
            <div className="container-xl">
              <h1 className="app-page-title">Order Details :</h1>
              <hr className="mb-4" />
              <div className="row g-4 settings-section">
                <div className="col-12 col-md-8">
                  <div className="app-card app-card-settings shadow-sm p-4">
                    <div className="app-card-body">
                      <form
                        className="settings-form"
                        onSubmit={onSubmitHandler}
                      >
                        <div className="mb-1">
                          <label
                            htmlFor="setting-input-2"
                            className="form-label"
                          >
                            {" "}
                            Full Name :
                          </label>

                          <div className="mb-1">
                            <label
                              htmlFor="setting-input-2"
                              className="form-label"
                            >
                             
                            </label>
                            <label>
                              {order?.user?.firstName
                                ? `${order.user.firstName} ${order.user.lastName}`
                                : "boukdida intissar"}
                            </label>
                          </div>
                        </div>
                        <div className="mb-1">
                          <label
                            htmlFor="setting-input-2"
                            className="form-label"
                          >
                            Total Amount :
                          </label>
                          <label>{order?.totalAmount} TND</label>
                        </div>

                        <div className="mb-1">
                          <label
                            htmlFor="setting-input-2"
                            className="form-label"
                          >
                            Shipping Address :
                          </label>
                          <label>
                            {order?.location +
                              " " +
                              order?.city +
                              " " +
                              order?.address}
                          </label>
                        </div>

                        <div className="app-card app-card-orders-table shadow-sm mb-5">
                          <div className="app-card-body">
                            <div className="table-responsive">
                              <table className="table app-table-hover mb-0 text-left">
                                <thead>
                                  <tr>
                                    <th className="cell">Index</th>
                                    <th className="cell">Image</th>
                                    <th className="cell">designation</th>
                                    <th className="cell">quantity</th>
                                    <th className="cell">price</th>
                                    <th className="cell">Total price</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {order?.cartItems.map((item, index) => (
                                    <tr key={index}>
                                      <td className="cell">{index + 1}</td>
                                      <td className="cell">
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
                                      </td>
                                      <td className="cell">{item.nomP}</td>
                                      <td className="cell">{item.qte}</td>
                                      <td className="cell">{item.prix} TND</td>
                                      <td className="cell">
                                        {item.prix * item.qte} TND
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>

                        <div className="mb-3">
                          <label
                            htmlFor="setting-input-2"
                            className="form-label"
                          >
                            Status
                          </label>
                          <select
                            className="form-control"
                            onChange={onChangeHandler}
                            name="status"
                            value={updateFormData.status}
                          >
                            <option value="En cours">En cours</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Canceled">Canceled</option>
                          </select>
                        </div>

                        {order && (
                          <button type="button">
                            <PDFDownloadLink
                              document={<GenerateInvoice orders={order} />}
                              fileName="order.pdf"
                            >
                              {({ loading }) =>
                                loading
                                  ? "Generating PDF..."
                                  : "Télécharger facture"
                              }
                            </PDFDownloadLink>
                          </button>
                        )}

                        <button type="submit" className="btn app-btn-primary">
                          Save
                        </button>
                      </form>
                    </div>
                    {/* //app-card-body */}
                  </div>
                  {/* //app-card */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
