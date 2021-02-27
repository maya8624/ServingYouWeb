import React from "react";
import { Link } from "react-router-dom";

import Banner from "./Banner";
import Features from "./Features";
import Footer from "./Footer";
import Header from "./Header";
import SpecialMenu from "./SpecialMenu";
import Title from "./common/Title";
import TopBar from "./TopBar";

function Home() {
  return (
    <>
      <TopBar />
      <Header>
        <Banner
          title="Happy to serve You!"
          subtitle="Healthy, Fresh, Yum, Awesome Food"
        >
          <Link to="/menus" className="banner-btn-primary">
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
