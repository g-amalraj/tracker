import React from "react";
const Home = () => {
  return (
    <div>
      <div
        id="carouselExampleAutoplaying"
        className="carousel slide"
        data-bs-ride="true"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="/image/f.png"
              className="d-block w-100 img-fluid"
              style={{ height: "400px", objectFit: "cover" }}
              alt="..."
            />
            <div className="carousel-caption d-none d-md-block">
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="/image/trackerimage.jpg"
              className="d-block w-100 img-fluid"
              style={{ height: "400px", objectFit: "cover" }}
              alt="First Slide"
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Trackr</h5>
              <p>Manage Employees in one place</p>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center card:hover">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <div>
            <h1 className="mt-4">Features</h1>
          </div>
          <div className="d-flex flex-wrap justify-content-around card:hover">
            <div className="card mb-3 mx-2" style={{ maxWidth: "18rem" }}>
              <img src="/image/das.jpg" className="card-img-top" alt="..." />
              <div className="card-body mb-3">
                <p className="card-text">
                 Contains user Time Management ,Information,Profile.
                </p>
              </div>
            </div>
            <div className="card mb-3 mx-2" style={{ maxWidth: "18rem" }}>
              <img src="/image/project.avif" className="card-img-top" alt="..." />
              <div className="card-body mb-3">
                <p className="card-text">
                  Admin can assign project to the employees & they can directly view that in their projects.
                </p>
              </div>
            </div>
            <div className="card mb-3 mx-2"  style={{ maxWidth: "18rem" }}>
              <img
                src="/image/user.jpg" className="card-img-top" alt="..."/>
              <div className="card-body mb-3">
                <p className="card-text">
                  We can Create,Add,Update,Delete users here.
                </p>
              </div>
            </div>
            <div className="card mb-3 mx-2" style={{ maxWidth: "18rem" }}>
              <img
                src="/image/imjkk.jpg"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body mb-3">
                <p className="card-text">
                  User can add their Personal details & Picture
                </p>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
  );
};
export default Home;