import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Collapse } from "reactstrap";
import { PrimaryInput } from "../../Shared/Input/Input";

const EditSlides = (): JSX.Element => {
  const [editAccordionIsOpen, setEditAccordionIsOpen] = useState(false);
  const [editSlideIsOpen, setEditSlideIsOpen] = useState(false);
  const [editTitleIsOpen, setEditTitleIsOpen] = useState(false);
  const [editMediaIsOpen, setEditMediaIsOpen] = useState(false);
  const [editCtaIsOpen, setEditCtaIsOpen] = useState(false);
  const [editAdvancedIsOpen, setEditAdvancedIsOpen] = useState(false);

  const router = useRouter();
  const { username } = router.query;

  return (
    <li className="vreel-edit-slides">
      <button
        className="vreel-edit-menu__accordion"
        type="button"
        onClick={() => setEditAccordionIsOpen(!editAccordionIsOpen)}
      >
        <span>
          <p>Slides</p>
          {editAccordionIsOpen ? (
            <AiOutlineMinusCircle />
          ) : (
            <IoMdAddCircleOutline />
          )}
        </span>
      </button>
      <Collapse isOpen={editAccordionIsOpen}>
        <div className="vreel-edit-slides__wrapper">
          <div className="vreel-edit-slides__bg-audio__wrapper">
            <p>VReel Background Audio</p>
            <button className="vreel-edit-menu__button">Add New</button>
          </div>
          <div className="vreel-edit-slides__new-slide__wrapper">
            <div className="vreel-edit-slides__new-slide">
              <p>Slides</p>
              <button className="vreel-edit-menu__button green">Add New</button>
            </div>
            <div className="vreel-edit-slides__new-slide__slide-wrapper">
              <div className="vreel-edit-slides__new-slide__toggle-btn">
                <p>Slide 1</p>
                {editSlideIsOpen ? (
                  <AiOutlineMinusCircle
                    onClick={() => setEditSlideIsOpen(!editSlideIsOpen)}
                  />
                ) : (
                  <IoMdAddCircleOutline
                    onClick={() => setEditSlideIsOpen(!editSlideIsOpen)}
                  />
                )}
              </div>
              <Collapse isOpen={editSlideIsOpen}>
                <button
                  className="vreel-edit-menu__accordion white"
                  type="button"
                  onClick={() => setEditTitleIsOpen(!editTitleIsOpen)}
                >
                  <span>
                    <p>Title</p>
                    {editTitleIsOpen ? (
                      <AiOutlineMinusCircle />
                    ) : (
                      <IoMdAddCircleOutline />
                    )}
                  </span>
                </button>
                <Collapse isOpen={editTitleIsOpen}>
                  <PrimaryInput />
                  <PrimaryInput />
                </Collapse>
              </Collapse>
              <Collapse isOpen={editSlideIsOpen}>
                <button
                  className="vreel-edit-menu__accordion white"
                  type="button"
                  onClick={() => setEditMediaIsOpen(!editMediaIsOpen)}
                >
                  <span>
                    <p>Media</p>
                    {editMediaIsOpen ? (
                      <AiOutlineMinusCircle />
                    ) : (
                      <IoMdAddCircleOutline />
                    )}
                  </span>
                </button>
                <Collapse isOpen={editMediaIsOpen}>
                  <PrimaryInput />
                  <PrimaryInput />
                </Collapse>
              </Collapse>
              <Collapse isOpen={editSlideIsOpen}>
                <button
                  className="vreel-edit-menu__accordion white"
                  type="button"
                  onClick={() => setEditCtaIsOpen(!editCtaIsOpen)}
                >
                  <span>
                    <p>Call To Action</p>
                    {editCtaIsOpen ? (
                      <AiOutlineMinusCircle />
                    ) : (
                      <IoMdAddCircleOutline />
                    )}
                  </span>
                </button>
                <Collapse isOpen={editCtaIsOpen}>
                  <PrimaryInput />
                  <PrimaryInput />
                </Collapse>
              </Collapse>
              <Collapse isOpen={editSlideIsOpen}>
                <button
                  className="vreel-edit-menu__accordion white"
                  type="button"
                  onClick={() => setEditAdvancedIsOpen(!editAdvancedIsOpen)}
                >
                  <span>
                    <p>Advanced</p>
                    {editAdvancedIsOpen ? (
                      <AiOutlineMinusCircle />
                    ) : (
                      <IoMdAddCircleOutline />
                    )}
                  </span>
                </button>
                <Collapse isOpen={editAdvancedIsOpen}>
                  <PrimaryInput />
                  <PrimaryInput />
                </Collapse>
              </Collapse>
            </div>
          </div>
        </div>
      </Collapse>
    </li>
  );
};

export default EditSlides;
