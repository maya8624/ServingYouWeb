import React from "react";
import img from "../images/sushi1.jpg";

function MenuDetails({ menu }) {
  return (
    <div className="container">
      <div className="row py-4">
        <div className="col-lg-4 mb-4 my-lg-auto">
          <h1 className="text-dark font-weight-bold mb-3">Tempura</h1>
          <p className="mb-4">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English. Many desktop publishing
            packages and web page editors now use Lorem Ipsum as their default
            model text, and a search for 'lorem ipsum' will uncover many web
            sites still in their infancy. Various versions have evolved over the
            years, sometimes by accident, sometimes on purpose (injected humour
            and the like).
          </p>
        </div>
        <div className="col-lg-8">
          <img src={img} className="w-75" />
        </div>
      </div>
      <div>
        Category:
        <select name="category" id="category" disabled>
          <option>Japanese</option>
          <option>Korean</option>
          <option>Italian</option>
        </select>
      </div>
      <div>Price: $20</div>
      <div>
        <a href="#" className="btn btn-danger btn-lg mr-2">
          Order
        </a>
        <a href="#" className="btn btn-primary btn-lg ml-2">
          Menu List
        </a>
      </div>
    </div>
  );
}

export default MenuDetails;
