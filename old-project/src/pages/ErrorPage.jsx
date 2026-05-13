import React from "react";
import Lottie from "lottie-react";
import gardenAnimation from "../assets/Animation - 1747747263220.json";
import { Link } from "react-router";
import { Helmet } from "react-helmet";

const ErrorPage = () => {
  return (
    <div className="md:w-xl mx-auto py-12">
      <Helmet>
        <title>404 Page Not Found</title>
      </Helmet>
      <Lottie animationData={gardenAnimation} />
      <div className="text-center space-y-5">
        <h1 className="md:text-6xl text-3xl font-bold">404 Page Not Found</h1>
        <Link to={"/"}>
          <button className="btn btn-secondary">Back To Home</button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
