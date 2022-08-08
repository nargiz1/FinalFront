import React, { useState } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Tabs from "../../components/Tabs/Tabs";
import TabPanel from "../../components/Tabs/TabPanel";


const Layout = ({ showIcon = true, collapseSidebar = false, children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [value, setValue] = useState(0);
  const [search, setSearch] = useState(false);
  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleScrollToTop =  () => {
    
    window.scrollTo(0, 0)
  };

  return (
    <div className="container-fluid" style={{ paddingTop: "64px" }}>
      <div className="row">
        <div className="col-12">
          <Header showIcon={showIcon} setIsOpen={setIsOpen} isOpen={isOpen} handleShow={handleShow} />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-2 d-sm-none d-md-none d-lg-block sidebar-desktop">
          <Sidebar isOpen={isOpen && !collapseSidebar} />
        </div>

       <div className="d-lg-none d-md-block d-sm-block">
        <Offcanvas show={show} onHide={handleClose} className="sidebar-transform">
        <Offcanvas.Header closeButton>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <Sidebar isOpen={isOpen && !collapseSidebar} />
        </Offcanvas.Body>
      </Offcanvas>
       </div>
       
        <div className="col-lg-10 p-0 col-md-12">
         {children}
          <div>
            {
              console.log(window.innerHeight)
            }
            {
              showIcon?(
            <button
              className="chat-button"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight"
              onClick={handleScrollToTop}
            >
              <AiOutlineArrowUp />
            </button>

              ):(null)
            }
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
