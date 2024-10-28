import {
  Bar,
  Pie,
} from "react-chartjs-2";
import React, { useEffect, useState } from "react";
import { Chart, registerables } from "chart.js/auto";
import orderService from "../services/orderService";
import serviceService from "../services/serviceService";

Chart.register(...registerables);

function Layout() {
  const [order, setOrder] = useState([]);
  const [service, setService] = useState([]);
  const orderLabels = order.map((x) => x.orderDate);
  const serviceLabels = service.map((x) => x.serviceDate);

  useEffect(() => {
    const getAllorder = () => {
      orderService
        .GetAll()
        .then((res) => {
          setOrder(res.data.data);
        })
        .catch((erreur) => {
          console.log(erreur);
        });
    };

    const getAllservice = () => {
      serviceService
        .GetAll()
        .then((res) => {
          setService(res.data.data);
        })
        .catch((erreur) => {
          console.log(erreur);
        });
    };

    getAllorder();
    getAllservice();
  }, []);

  const nbOrder = order.length;
  const nbService = service.length;

  const d = new Date();
  const date = `${d.getFullYear()} - ${d.getMonth() + 1} - ${d.getDate()}`;
  const hours = `${d.getHours()} : ${d.getMinutes()}`;

  return (
    <div>
      <div className="container-xl" style={{ marginLeft: "15%" }}>
        <h1 className="app-page-title">
          <div
            className="col-6 col-lg-3"
            style={{ marginLeft: "75%", marginTop: "10%" }}
          >
            <div className="app-card app-card-stat shadow-sm h-100">
              <h4 className="stats-type mb-1" style={{ size: "400px" }}>
                Time :
              </h4>
              <h4 className="stats-type mb-1">
                {hours} <br />
                {date}
              </h4>
              <a className="app-card-link-mask" href="#" />
            </div>
          </div>
        </h1>

        <div className="row g-4 mb-4">
          <div className="col-6 col-lg-3">
            <div className="app-card app-card-stat shadow-sm h-100">
              <div className="app-card-body p-3 p-lg-4">
                <h4 className="stats-type mb-1">Orders</h4>
                <div className="stats-figure">{nbOrder}</div>
              </div>
              <a className="app-card-link-mask" href="#" />
            </div>
          </div>

          <div className="col-6 col-lg-3">
            <div className="app-card app-card-stat shadow-sm h-100">
              <div className="app-card-body p-3 p-lg-4">
                <h4 className="stats-type mb-1">Services</h4>
                <div className="stats-figure">{nbService}</div>
                <div className="stats-meta text-success">
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    className="bi bi-arrow-down"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"
                    />
                  </svg>
                  5%
                </div>
              </div>
              <a className="app-card-link-mask" href="#" />
            </div>
          </div>
        </div>

        <div className="row g-4 mb-4">
          <div className="col-12 col-lg-6">
            <div className="app-card app-card-chart h-100 shadow-sm">
              <div className="app-card-header p-3">
                <div className="row justify-content-between align-items-center">
                  <div className="col-auto">
                    <h4 className="app-card-title">Order Service Chart</h4>
                  </div>
                </div>
              </div>
              <div className="app-card-body p-3 p-lg-4">
                <Pie
                  data={{
                    labels: [...new Set([...orderLabels, ...serviceLabels])], // Fusionner et supprimer les doublons
                    datasets: [
                      {
                        label: "Orders",
                        data: order.map((x) => x.totalAmount),
                        backgroundColor: [
                          "rgba(250, 10, 132, 0.8)",
                          "rgba(54, 162, 235, 0.5)",
                          "rgba(255, 206, 86, 0.8)",
                          "rgba(75, 192, 192, 0.7)",
                          "rgba(153, 102, 255, 0.8)",
                          "rgba(255, 159, 64, 0.7)",
                        ],
                        borderColor: [
                          "rgba(255, 99, 132, 1)",
                          "rgba(54, 162, 235, 1)",
                          "rgba(255, 206, 86, 1)",
                          "rgba(75, 192, 192, 1)",
                          "rgba(153, 102, 255, 1)",
                          "rgba(255, 159, 64, 1)",
                        ],
                        borderWidth: 1,
                      },
                      {
                        label: "Services",
                        data: service.map((x) => x.cost),
                        backgroundColor: [
                          "rgba(54, 162, 235, 0.5)",
                          "rgba(255, 206, 86, 0.8)",
                          "rgba(75, 192, 192, 0.7)",
                          "rgba(153, 102, 255, 0.8)",
                          "rgba(255, 159, 64, 0.7)",
                        ],
                        borderColor: [
                          "rgba(54, 162, 235, 1)",
                          "rgba(255, 206, 86, 1)",
                          "rgba(75, 192, 192, 1)",
                          "rgba(153, 102, 255, 1)",
                          "rgba(255, 159, 64, 1)",
                        ],
                        borderWidth: 1,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: "top",
                      },
                      tooltip: {
                        enabled: true,
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-6">
            <div className="app-card app-card-chart h-100 shadow-sm">
              <div className="app-card-header p-3">
                <div className="row justify-content-between align-items-center">
                  <div className="col-auto">
                    <h4 className="app-card-title">Bar Chart Example</h4>
                  </div>
                  <div className="col-auto"></div>
                </div>
              </div>
              <div className="app-card-body p-3 p-lg-4">
                <Bar
                  data={{
                    labels: service.map((x) => x.name),
                    datasets: [
                      {
                        label: "# of Services",
                        data: service.map((x) => x.cost),
                        backgroundColor: [
                          "rgba(54, 162, 235, 0.5)",
                          "rgba(255, 206, 86, 0.8)",
                          "rgba(75, 192, 192, 0.7)",
                          "rgba(153, 102, 255, 0.8)",
                          "rgba(255, 159, 64, 0.7)",
                        ],
                        borderColor: [
                          "rgba(54, 162, 235, 1)",
                          "rgba(255, 206, 86, 1)",
                          "rgba(75, 192, 192, 1)",
                          "rgba(153, 102, 255, 1)",
                          "rgba(255, 159, 64, 1)",
                        ],
                        borderWidth: 1,
                      },
                    ],
                  }}
                  options={{
                    scales: {
                      y: {
                        beginAtZero: true,
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
