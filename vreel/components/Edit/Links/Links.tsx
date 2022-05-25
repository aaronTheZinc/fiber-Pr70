import React from "react";
import { Col, Container, Row } from "reactstrap";
interface Link {
  thumbnail: string;
  url: string;
  category: string;
}
interface LinkElementProps {
  links: Link[];
}
const Links = ({ links }: LinkElementProps): JSX.Element => {
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
          links.map(({ thumbnail, url }, idx) => (
            <Col key={idx} md={3} xs={6}>
              <a href={url} className="vreel-links__content-wrapper">
                <img
                  src={thumbnail}
                  alt="Vreel Link Image"
                  className="vreel-links__img"
                />
                {/* <p className="vreel-links__text">Alicia Simone</p> */}
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
