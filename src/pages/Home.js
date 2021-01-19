import React from "react";
import { Link } from "react-router-dom";

import Banner from "../components/Banner";
import Features from "../components/Features";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SpecialMenu from "../components/SpecialMenu";
import Title from "../components/Title";
import TopBar from "../components/TopBar";

function Home() {
  return (
    <>
      <TopBar />
      <Header>
        <Banner
          title="Happy to serve You!"
          subtitle="Healthy, Fresh, Yum, Awesome Food"
        >
          <Link to="/menulist" className="banner-btn-primary">
            view our menu
          </Link>
        </Banner>
      </Header>
      <Title title="Features" />
      <Features />
      <Title title="Special Menu" />
      <SpecialMenu />
      <Footer />
    </>
  );
}

export default Home;
