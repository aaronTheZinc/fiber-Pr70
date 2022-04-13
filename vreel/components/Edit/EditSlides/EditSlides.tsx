import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Collapse } from "reactstrap";
import { getUserByUsername } from "../../../graphql/query";
import { CheckboxInput, EditInput } from "../../Shared/Input/Input";
import { UppyModal } from "../../Shared/UppyModal/UppyModal";

type SlidesStateType = {
  isOpen: boolean,
  editAccordionIsOpen: boolean,
  editSlideIsOpen: boolean,
  editTitleIsOpen: boolean,
  editMediaIsOpen: boolean,
  editCtaIsOpen: boolean,
  editAdvancedIsOpen: boolean,
  values: {
    position: number
  }
}

const SlideEditor = ({ slide, idx, state, setState }) => {
  const { id } = slide;
  const { isOpen } = state;

  useEffect(() => {
    console.log("[current slide state]: ", state);
    console.log("[slide]", isOpen);
  }, [state]);
  return (
    <div
      onClick={() => {}}
      className="vreel-edit-slides__new-slide__slide-wrapper"
    >
      <div className="vreel-edit-slides__new-slide__toggle-btn">
        <p>
          Slide {idx + 1} - id number {slide.id}
        </p>
        s
        {isOpen ? (
          <AiOutlineMinusCircle
            onClick={() => setState(id, "isOpen", !isOpen)}
          />
        ) : (
          <IoMdAddCircleOutline onClick={() => () => {}} />
        )}
      </div>

      <Collapse isOpen={slide}>
        <EditInput
          type="text"
          label="Position"
          style={{ marginBottom: "30px" }}
        />
        <button
          className="vreel-edit-menu__accordion white"
          type="button"
          onClick={() => {}}
        >
          <span>
            <p>Title</p>
            {true ? <AiOutlineMinusCircle /> : <IoMdAddCircleOutline />}
          </span>
        </button>
        <Collapse isOpen={true}>
          <EditInput type="text" label="Header" style={{}} />
          <EditInput
            type="textarea"
            label="Description"
            style={{
              marginBottom: "30px",
              height: "12rem",
            }}
          />
        </Collapse>
      </Collapse>
      <Collapse isOpen={true}>
        <button
          className="vreel-edit-menu__accordion white"
          type="button"
          onClick={() => {}}
        >
          <span>
            <p>Media</p>
            {true ? <AiOutlineMinusCircle /> : <IoMdAddCircleOutline />}
          </span>
        </button>
        <Collapse isOpen={true}>
          <div className="vreel-edit-slides__new-slide__media-wrapper">
            <p>Mobile Options:</p>
           <UppyModal />
            <div className="vreel-edit-slides__new-slide__video-times-wrapper">
              <div className="vreel-edit-slides__new-slide__time-wrapper">
                <p>Start Time:</p>
                <div>
                  <label htmlFor="min">min</label>
                  <input type="text" name="min" id="min" />
                  <label htmlFor="sec">sec</label>
                  <input type="text" name="sec" id="sec" />
                </div>
              </div>
              <div className="vreel-edit-slides__new-slide__time-wrapper">
                <p>Stop Time:</p>
                <div>
                  <label htmlFor="min">min</label>
                  <input type="text" name="min" id="min" />
                  <label htmlFor="sec">sec</label>
                  <input type="text" name="sec" id="sec" />
                </div>
              </div>
            </div>
          </div>
          <div className="vreel-edit-slides__new-slide__media-wrapper">
            <p>Desktop Options:</p>
            <UppyModal />
            <div className="vreel-edit-slides__new-slide__video-times-wrapper"></div>
          </div>
        </Collapse>
      </Collapse>
      <Collapse isOpen={true}>
        <button
          className="vreel-edit-menu__accordion white"
          type="button"
          onClick={() => {}}
        >
          <span>
            <p>Call To Action</p>
            {true ? <AiOutlineMinusCircle /> : <IoMdAddCircleOutline />}
          </span>
        </button>
        <Collapse isOpen={true}>
          <EditInput type="text" label="Link Header" />
          <EditInput type="text" label="Link Type" />
          <EditInput type="text" label="Link URL" />
        </Collapse>
      </Collapse>
      <Collapse isOpen={true}>
        <button
          className="vreel-edit-menu__accordion white"
          type="button"
          onClick={() => {}}
        >
          <span>
            <p>Advanced</p>
            {true ? <AiOutlineMinusCircle /> : <IoMdAddCircleOutline />}
          </span>
        </button>
        <Collapse isOpen={true}>
          <EditInput
            type="textarea"
            label="Info"
            style={{
              marginBottom: "30px",
              height: "12rem",
            }}
          />
          <EditInput type="text" label="Link Header" />
          <EditInput type="text" label="Link Type" />
          <div className="vreel-edit-slides__new-slide__advanced-btn-wrapper">
            <button className="vreel-edit-menu__button blue">
              {" "}
              + Add Credits
            </button>
            <CheckboxInput type="checkbox" label="Invert Group Filter" />
          </div>
        </Collapse>
        <div className="vreel-edit-slides__new-slide__btn-wrapper">
          <button type="button" className="vreel-edit-menu__button red">
            Delete Slide
          </button>
          <button type="button" className="vreel-edit-menu__button green">
            Save Slide
          </button>
        </div>
      </Collapse>
    </div>
  );
};

const EditSlides = (): JSX.Element => {
  const [cookies, _, removeCookies] = useCookies(["userAuthToken"]);
  const [user, setUser] = useState(null);
  // console.log("cookies:", cookies.userAuthToken);

  const [editAccordionIsOpen, setEditAccordionIsOpen] = useState(false);
  const [editSlideIsOpen, setEditSlideIsOpen] = useState(false);
  const [editTitleIsOpen, setEditTitleIsOpen] = useState(false);
  const [editMediaIsOpen, setEditMediaIsOpen] = useState(false);
  const [editCtaIsOpen, setEditCtaIsOpen] = useState(false);
  const [editAdvancedIsOpen, setEditAdvancedIsOpen] = useState(false);

  const [slidesState, setSlidesState] = useState<any>([]);

  function ChangeState(slideId: string, field: string, value: boolean) {
    setSlidesState({ ...slidesState, [slideId]: { [field]: value } });
  }

  useEffect(() => {
    console.log("id =>", username);
    // getUserByUsername(username as string).then((data) => setUser(data));
  }, []);

  useEffect(() => {
    let slidesInitialState = {};
    if (user) {
      const { slides } = user?.vreel;
      for (let i = 0; i < slides?.length; i++) {
        const slide = slides[i];
        slidesInitialState[slide.id] = {
          isOpen: false,
          editAccordionIsOpen: false,
          editSlideIsOpen: false,
          editTitleIsOpen: false,
          editMediaIsOpen: false,
          editCtaIsOpen: false,
          editAdvancedIsOpen: false,
          values: {

          }
        };
      }
      console.log("[-->]", slidesInitialState);
      setSlidesState(new Object(slidesInitialState));
    }
  }, [user]);

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

            {user ? (
              user.vreel.slides.map((slide, idx) => (
                <>
                  {console.log("current vals:", slidesState[slide.id])}
                  <SlideEditor
                    slide={slide}
                    idx={idx}
                    state={{ ...slidesState[slide.id] }}
                    setState={ChangeState}
                  />
                </>
              ))
            ) : (
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
                  <EditInput
                    type="text"
                    label="Position"
                    style={{ marginBottom: "30px" }}
                  />
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
                    <EditInput type="text" label="Header" style={{}} />
                    <EditInput
                      type="textarea"
                      label="Description"
                      style={{
                        marginBottom: "30px",
                        height: "12rem",
                      }}
                    />
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
                    <div className="vreel-edit-slides__new-slide__media-wrapper">
                      <p>Mobile Options:</p>
                      <UppyModal />
                      <div className="vreel-edit-slides__new-slide__video-times-wrapper">
                        <div className="vreel-edit-slides__new-slide__time-wrapper">
                          <p>Start Time:</p>
                          <div>
                            <label htmlFor="min">min</label>
                            <input type="text" name="min" id="min" />
                            <label htmlFor="sec">sec</label>
                            <input type="text" name="sec" id="sec" />
                          </div>
                        </div>
                        <div className="vreel-edit-slides__new-slide__time-wrapper">
                          <p>Stop Time:</p>
                          <div>
                            <label htmlFor="min">min</label>
                            <input type="text" name="min" id="min" />
                            <label htmlFor="sec">sec</label>
                            <input type="text" name="sec" id="sec" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="vreel-edit-slides__new-slide__media-wrapper">
                      <p>Desktop Options:</p>
                      <UppyModal />
                      <div className="vreel-edit-slides__new-slide__video-times-wrapper"></div>
                    </div>
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
                    <EditInput type="text" label="Link Header" />
                    <EditInput type="text" label="Link Type" />
                    <EditInput type="text" label="Link URL" />
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
                    <EditInput
                      type="textarea"
                      label="Info"
                      style={{
                        marginBottom: "30px",
                        height: "12rem",
                      }}
                    />
                    <EditInput type="text" label="Link Header" />
                    <EditInput type="text" label="Link Type" />
                    <div className="vreel-edit-slides__new-slide__advanced-btn-wrapper">
                      <button className="vreel-edit-menu__button blue">
                        {" "}
                        + Add Credits
                      </button>
                      <CheckboxInput
                        type="checkbox"
                        label="Invert Group Filter"
                      />
                    </div>
                  </Collapse>
                  <div className="vreel-edit-slides__new-slide__btn-wrapper">
                    <button
                      type="button"
                      className="vreel-edit-menu__button red"
                    >
                      Delete Slide
                    </button>
                    <button
                      type="button"
                      className="vreel-edit-menu__button green"
                    >
                      Save Slide
                    </button>
                  </div>
                </Collapse>
              </div>
            )}
          </div>
        </div>
      </Collapse>
    </li>
  );
};

export default EditSlides;
