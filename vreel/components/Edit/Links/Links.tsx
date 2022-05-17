import React from "react";
import { Col, Container, Row } from "reactstrap";

const Links = (): JSX.Element => {
  let links = new Array("a", "b", "c", "d", "e", "f", "h", "l", "r", "j", "x");
  return (
    <Container className="vreel-links">
      <h1>Explore Featured VReels</h1>
      <nav>
        <ul>
          <li>All</li>
          <li>Business</li>
          <li>Artist</li>
        </ul>
      </nav>
      <Row className="vreel-links__wrapper">
        {links.length > 0 ? (
          links.map((link, idx) => (
            <Col key={idx} md={3} xs={6}>
              <a className="vreel-links__content-wrapper">
                <img
                  src="https://vreel.page/users/vreel/images/20210422_051802.jpg"
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
