import React, { useRef, useState } from "react";
import { Modal, ModalBody } from "reactstrap";
import { VreelModal } from "../../Shared/VreelModal/VreelModal";

const Services = ({ isMobile }): JSX.Element => {
  let services = new Array("a", "b", "c", "d", "a", "b", "c", "d");

  const [open, setOpen] = useState(false);
  return (
    <div className="container vreel-services vreel-services__wrapper">
      <h1 className="mb-4">Services</h1>
      <div className="row vreel-services__grid-wrapper">
        {services.length > 0 &&
          services.map((service, idx) => (
            <div className="col-md-6 vreel-services__card-wrapper">
              <img
                style={idx % 2 && isMobile ? { order: 2 } : {}}
                src="/service-img.jpeg"
                alt="Service Image"
              />
              <div className="vreel-services__text-wrapper">
                <h1>Service Title</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Dolorum harum architecto necessitatibus esse optio eveniet in
                  soluta aliquid nemo. Molestiae deleniti aut praesentium ad
                  repudiandae obcaecati impedit temporibus fugiat quod.
                </p>
                <button onClick={() => setOpen(!open)} type="button">
                  Read More
                </button>
                <Modal
                  className="vreel-modal vreel-modal__wrapper"
                  isOpen={open}
                >
                  <>
                    <button
                      className="btn-close vreel-modal__close-btn"
                      aria-label="Close"
                      onClick={() => setOpen(!open)}
                    ></button>
                    <ModalBody>
                      <h1>Services info</h1>
                    </ModalBody>
                  </>
                </Modal>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Services;
