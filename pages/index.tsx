import PageContainer from "../src/components/container/PageContainer";
import FullLayout from "../src/layouts/full/FullLayout";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import withSessionCheck from "../src/base/utils/WithAuth";
import { Card } from "primereact/card";
import "@fortawesome/fontawesome-free/css/all.min.css";
function Home() {
  const router = useRouter();
  const [user, setUser] = useState({ role: "" });

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("sessionAuth") || "{}")?.data?.user);
  }, []);
  console.log(user);

  return (
    <FullLayout>
      <PageContainer title="Dashboard" description="this is Dashboard">
        <>
          <div className="p-card-title">
            <div className="col-md-4 mb-3">
              <Card
                title="Beranda"
                style={{ backgroundColor: "#1E1E2D", color: "white" }}
              >
                <p className="m-0" style={{ color: "white" }}>
                  Selamat Datang di Halaman Menu {user?.role}
                </p>
              </Card>
            </div>
          </div>

          <Card>
            <div className="row">
              <div className="col-md-6">
                <img
                  src="/images/rentokil.png"
                  alt="Business Image"
                  className="img-fluid"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6">
                <div className="panel panel-default">
                  <div className="panel-body d-flex">
                    <img
                      src="/images/rentokil4.png"
                      alt="Business Image"
                      className="img-fluid"
                      style={{ width: "50%", height: "auto" }}
                    />
                    <img
                      src="/images/rentokil3.png"
                      alt="Business Image"
                      className="img-fluid"
                      style={{ width: "50%", height: "auto" }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12">
                <div className="panel panel-default">
                  <div className="panel-body">
                    <h2>Rentokil Indonesia (Malang Branch)</h2>
                    <p>Jasa pest control untuk rumah & bisnis di Indonesia</p>
                    <p>
                      Jl. Indragiri, Kavling Gg. I A, Parwantoro, Kec. Blimbing,
                      Kota Malang, Jawa Timur 65122
                    </p>
                    <p>(0341) 488765</p>
                    <p>www.rentokil.com</p>
                    <p>Ikuti kami di:</p>
                    <p>
                      <a
                        href="https://www.facebook.com/rentokilindonesia"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i
                          className="fab fa-facebook-square fa-lg"
                          style={{ color: "#3b5998" }}
                        ></i>
                      </a>
                      &nbsp;&nbsp;&nbsp;
                      <span>Facebook</span>
                      &nbsp;&nbsp;&nbsp;
                      <a
                        href="https://www.instagram.com/rentokil.id/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i
                          className="fab fa-instagram fa-lg"
                          style={{ color: "#e1306c" }}
                        ></i>
                      </a>
                      &nbsp;&nbsp;&nbsp;
                      <span>Instagram</span>
                      &nbsp;&nbsp;&nbsp;
                      <a
                        href="https://www.linkedin.com/company/rentokil-indonesia/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i
                          className="fab fa-linkedin fa-lg"
                          style={{ color: "#0072b1" }}
                        ></i>
                      </a>
                      &nbsp;&nbsp;&nbsp;
                      <span>LinkedIn</span>
                      &nbsp;&nbsp;&nbsp;
                      <a
                        href="https://www.rentokil.com/id/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i
                          className="fas fa-globe fa-lg"
                          style={{ color: "#4285F4" }}
                        ></i>
                      </a>
                      &nbsp;&nbsp;&nbsp;
                      <span>Website</span>
                      &nbsp;&nbsp;&nbsp;
                      <a
                        href="https://www.google.com/maps/place/Rentokil+Indonesia+(Malang+Branch)/@-7.9584962,112.6386857,18z/data=!4m14!1m7!3m6!1s0x2dd62832d2f9dadb:0x5cdf1efb4e40975d!2sRentokil+Indonesia+(Malang+Branch)!8m2!3d-7.9582468!4d112.6394547!16s%2Fg%2F11c1wrwd2z!3m5!1s0x2dd62832d2f9dadb:0x5cdf1efb4e40975d!8m2!3d-7.9582468!4d112.6394547!16s%2Fg%2F11c1wrwd2z?entry=ttu"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i
                          className="fas fa-map-marker-alt fa-lg"
                          aria-hidden="true"
                          style={{ color: "#4285F4" }}
                        ></i>
                      </a>
                      &nbsp;&nbsp;&nbsp;
                      <span>Lokasi</span>
                      &nbsp;&nbsp;&nbsp;
                      <a
                        href="https://www.youtube.com/channel/UCVONOjMOy2ZKUJ8k6I-1M0g"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i
                          className="fab fa-youtube fa-lg"
                          style={{ color: "#ff0000" }}
                        ></i>
                      </a>
                      &nbsp;&nbsp;&nbsp;
                      <span>Youtube</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </>
      </PageContainer>
    </FullLayout>
  );
}

export default withSessionCheck(Home);
