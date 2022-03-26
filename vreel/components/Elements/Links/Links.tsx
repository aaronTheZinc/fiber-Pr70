import React, { useEffect, useRef } from "react";
import { Col, Container, Row } from "reactstrap";

const Links = (): JSX.Element => {
  let navs = new Array("All", "Business", "artist");
  let links = new Array("a", "b", "c", "d", "e", "f", "h", "l", "r", "j", "x");
  
  const linkEl = useRef(null);
  const filterRes = links.filter((link) => console.log("link", link));

  return (
    <Container className="vreel-links">
      <h1>Explore Featured VReels</h1>
      <nav>
        <ul
          onClick={() => {
            console.log("res", linkEl);
          }}
        >
          <li>All</li>
          <li>Business</li>
          <li>Artist</li>
        </ul>
      </nav>
      <Row className="vreel-links__wrapper">
        {links.length > 0 ? (
          links.map((link, idx) => (
            <Col key={idx} md={3} xs={6}>
              <a
                ref={linkEl}
                filter={idx % 2 ? "Business" : "Artist"}
                className="vreel-links__content-wrapper"
              >
                <img
                  src={
                    idx % 2
                      ? "https://vreel.page/users/vreel/images/416BC787-6F56-431B-898B-3DB1C6BC018C.jpeg"
                      : "https://vreel.page/users/vreel/images/20210422_051802.jpg"
                  }
                  alt="Vreel Link Image"
                  className="vreel-links__img"
                />
                <p className="vreel-links__text">Alicia Simone</p>
              </a>
            </Col>
          ))
        ) : (
          <p>You Have no Links Added </p>
        )}
      </Row>
    </Container>
  );
};

export default Links;
