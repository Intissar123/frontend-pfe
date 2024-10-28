import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import Sidebar from "../dashbord/sidebar";

function AccountAdmin() {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const userId = decoded.sub;
  const [dataInfo, setDataInfos] = useState();

  useEffect(() => {
    fetch(`http://localhost:5000/api/users/${userId}`)
      .then((response) => response.json())
      .then((data) => setDataInfos(data));
  }, [userId]);
  
  return (
    <div className="app">
      <Sidebar></Sidebar>
      <div className="app-wrapper">
        <div className="app-content pt-3 p-md-3 p-lg-4">
          <div className="container-xl">
            <h1 className="app-page-title">My account</h1>
            <div className="row gy-4">
              <div className="col-12 col-lg-6">
                <div className="app-card app-card-account shadow-sm d-flex flex-column align-items-start">
                  <div className="app-card-header p-3 border-bottom-0">
                    <div className="row align-items-center gx-3">
                      <div className="col-auto">
                        <div className="app-icon-holder">
                          <svg
                            width="1em"
                            height="1em"
                            viewBox="0 0 16 16"
                            className="bi bi-person"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"
                            />
                          </svg>
                        </div>
                        {/*//icon-holder*/}
                      </div>
                      {/*//col*/}
                      <div className="col-auto">
                        <h4 className="app-card-title">Profil</h4>
                      </div>
                      {/*//col*/}
                    </div>
                    {/*//row*/}
                  </div>
                  {/*//app-card-header*/}
                  <div className="app-card-body px-4 w-100">
                    <div className="item border-bottom py-3"></div>
                    {/*//item*/}
                    <div className="item border-bottom py-3">
                      <div className="row justify-content-between align-items-center">
                        <div className="col-auto">
                          <div className="item-label">
                            <strong>FirstName</strong>
                          </div>
                          <div className="item-data">
                            {dataInfo && dataInfo.firstName}
                          </div>
                        </div>
                        {/*//col*/}
                        <div className="col text-end"></div>
                        {/*//col*/}
                      </div>
                      {/*//row*/}
                    </div>
                    {/*//item*/}
                    <div className="item border-bottom py-3">
                      <div className="row justify-content-between align-items-center">
                        <div className="col-auto">
                          <div className="item-label">
                            <strong>LastName</strong>
                          </div>
                          <div className="item-data">
                            {dataInfo && dataInfo.lastName}
                          </div>
                        </div>
                        {/*//col*/}
                        <div className="col text-end"></div>
                        {/*//col*/}
                      </div>
                      {/*//row*/}
                    </div>
                    {/*//item*/}

                    <div className="item border-bottom py-3">
                      <div className="row justify-content-between align-items-center">
                        <div className="col-6">
                          <div className="item-label">
                            <strong>Email</strong>
                          </div>
                          <div className="item-data">
                            {dataInfo && dataInfo.email}
                          </div>
                        </div>
                        {/*//col*/}
                        <div className="col text-end"></div>
                        {/*//col*/}
                      </div>
                      {/*//row*/}
                    </div>
                    {/*//item*/}
                    <div className="item border-bottom py-3">
                      <div className="row justify-content-between align-items-center">
                        <div className="col-6">
                          <div className="item-label">
                            <strong>Password</strong>
                          </div>
                          <div className="item-data">
                            {dataInfo && dataInfo.password}
                          </div>
                        </div>
                        {/*//col*/}
                        <div className="col text-end"></div>
                        {/*//col*/}
                      </div>
                      {/*//row*/}
                    </div>
                    {/*//item*/}
                    <div className="item border-bottom py-3">
                      <div className="row justify-content-between align-items-center">
                        <div className="col-auto">
                          <div className="item-label">
                            <strong>Role</strong>
                          </div>
                          <div className="item-data">
                            {dataInfo && dataInfo.role}
                          </div>
                        </div>
                        {/*//col*/}
                        <div className="col text-end"></div>
                        {/*//col*/}
                      </div>
                      {/*//row*/}
                    </div>
                    {/*//item*/}
                    <div className="item border-bottom py-3">
                      <div className="row justify-content-between align-items-center">
                        <div className="col-auto">
                          <div className="item-label">
                            <strong>Location</strong>
                          </div>
                          <div className="item-data">Tunisie</div>
                        </div>
                        {/*//col*/}
                        <div className="col text-end"></div>
                        {/*//col*/}
                      </div>
                      {/*//row*/}
                    </div>

                    {/*//item*/}
                  </div>
                  <Link to={`/dashbord/account/${userId}`}>
                    <button type="submit" className="btn app-btn-primary">
                      Edit profil
                    </button>
                  </Link>
                  {/*//app-card-body*/}

                  {/*//app-card-footer*/}
                </div>
                {/*//app-card*/}
              </div>
              {/*//col*/}
            </div>
            {/*//row*/}
          </div>
          {/*//container-fluid*/}
        </div>
        {/*//app-content*/}
      </div>
      {/*//app-wrapper*/}
    </div>
  );
}

export default AccountAdmin;
