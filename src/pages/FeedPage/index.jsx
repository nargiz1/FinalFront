import React from "react";
import CreateStory from "../../components/CreateStory/CreateStory";
import Layout from "../../components/Layout";
import Feed from "./Feed/Feed";
import Wedget from "./Wedget/Wedget";

const Index = () => {
  return (
    <Layout>
      <div className="container">
        <div className="row d-flex justify-content-evenly pt-4">
          <div className="col-lg-8 col-md-8 col-sm-12">
            <CreateStory/>
            <Feed />
          </div>
          <div className="col-lg-3 col-md-3 col-sm-none">
            <Wedget />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
