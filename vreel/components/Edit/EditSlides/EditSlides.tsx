import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import {
  Collapse,
} from "reactstrap";

const EditSlides = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const { username } = router.query;

  return (
    <li className="vreel-edit-slides">
      <button
        className="vreel-edit-menu__accordion"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>
          <p>Slides</p>
          {isOpen ? <AiOutlineMinusCircle /> : <IoMdAddCircleOutline />}
        </span>
      </button>
      <Collapse isOpen={isOpen}>
        <div className="vreel-edit-slides__wrapper">
          <div className="vreel-edit-slides__bg-audio__wrapper">
            <p>VReel Background Audio</p>
            <button className="vreel-edit-menu__button">Add New</button>
          </div>
        </div>
      </Collapse>
    </li>
  );
};

export default EditSlides;
