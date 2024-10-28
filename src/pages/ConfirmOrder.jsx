import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import orderService from '../services/orderService';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ConfirmOrder() {
  const [orders, setOrders] = useState();
  const { id } = useParams();

  const [updateFormData, setUpdateFormData] = useState({
    
  });

  const getOrderById = () => {
    orderService
      .GetOne(id)
      .then((res) => {
        setOrders(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getOrderById();
  }, [id]);

  const [data, setData] = useState({});

  const onChangeHandler = (e) => {
    setUpdateFormData({
      ...updateFormData,
      [e.target.name]: e.target.value,
    });
  };
  const navigate = useNavigate();
  const onSubmitHandler = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        //consomation d'API
        orderService
          .update(updateFormData, id)
          .then((res) => {
            //yarja3 lil liste ba3ed update
            navigate(`/Detailsorders/${item.id}`);
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
      <Header />
      {/* Start All Title Box */}
      <div className="all-title-box">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2>Confirm Cart</h2>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="#">Shop</Link>
                </li>
                <li className="breadcrumb-item active">Confirm Cart</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* End All Title Box */}
      <div className="app-card app-card-settings shadow-sm p-4">
        <div className="app-card-body">
          <form className="settings-form" onSubmit={onSubmitHandler}>
            <div className="app-card app-card-orders-table shadow-sm mb-5">
              <div className="app-card-body">
                <div className="table-responsive">
                  <table className="table app-table-hover mb-0 text-left">
                    <thead>
                      <tr>
                        <th className="cell">Image</th>
                        <th className="cell">Title</th>

                        <th className="cell">Total price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders?.cartItems.map((item) => (
                        <tr key={item.id}>
                          <td className="cell">{item.id}</td>
                          <span className="cell">
                            <tr>
                              {" "}
                              <img
                                style={{
                                  width: "80px",
                                  height: "80px",
                                }}
                                src={
                                  "http://localhost:4000/file/product/" +
                                  item.image
                                }
                              />
                            </tr>
                          </span>
                          <th className="cell">{item.nomP}</th>

                          <th className="cell">{item.total} TND</th>
                          <th className="cell">
                            {item.price * item.quantity} TND
                          </th>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="mb-1">
              <label htmlFor="setting-input-2" className="form-label">
                {" "}
                Full Name :
              </label>

              <label>
                {orders?.user?.firstName + " " + orders?.user?.lastName}
              </label>
            </div>

            <div className="mb-3">
              <label htmlFor="setting-input-2" className="form-label">
                {" "}
                Total Amount :
              </label>
              <label>{orders?.totalAmount} TND</label>
            </div>

            <div className="mb-3">
              <label htmlFor="setting-input-2" className="form-label">
                {" "}
                Adress :
              </label>
              <label>
                {orders?.country + " " + orders?.city + " " + orders?.address}
              </label>
            </div>
            <button type="submit" className="ml-auto btn hvr-hover">
              Confirmer
            </button>
          </form>
        </div>
        {/*//app-card-body*/}
      </div>
      {/*//app-card*/}
      <Footer />
    </div>
  );
}

export default ConfirmOrder