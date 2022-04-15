import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Collapse } from "reactstrap";
import { createSlide } from "../../../graphql/mutations";
import { getUserByToken, getUserByUsername } from "../../../graphql/query";
import { Slide, User } from "../../../types";
import { CheckboxInput, EditInput } from "../../Shared/Input/Input";
import { UppyModal } from "../../Shared/UppyModal/UppyModal";
import SlideEditor from "./SlideEditor";
//call to actio: cta
//time stamp string 3:30
export type SlidesStateType = {
  isOpen: boolean,
  editAccordionIsOpen: boolean,
  editSlideIsOpen: boolean,
  editTitleIsOpen: boolean,
  editMediaIsOpen: boolean,
  editCtaIsOpen: boolean,
  editAdvancedIsOpen: boolean,
  values: {
    title: {
      header: string,
      description: string,
    },
    media: {
      mobileOptions: {

      },
      desktopOptions: {

      },
      start_time: string,
      stop_time: string
    }
    cta: {
      linkHeader: string,
      linkType: string,
      linkUrl: string
    },
    advanced: {
      info: string,
      linkHeader: string,
      linkType: string
    }
  }

  position: number
}

const EditSlides = (): JSX.Element => {
  const [cookies, _, removeCookies] = useCookies(["userAuthToken"]);
  const [user, setUser] = useState<User>(null);
  // console.log("cookies:", cookies.userAuthToken);

  const [editAccordionIsOpen, setEditAccordionIsOpen] = useState(false);
  const [editSlideIsOpen, setEditSlideIsOpen] = useState(false);
  const [editTitleIsOpen, setEditTitleIsOpen] = useState(false);
  const [editMediaIsOpen, setEditMediaIsOpen] = useState(false);
  const [editCtaIsOpen, setEditCtaIsOpen] = useState(false);
  const [editAdvancedIsOpen, setEditAdvancedIsOpen] = useState(false);

  const [slidesState, setSlidesState] = useState<any>([]);

  function ChangeState(slideId: string, field: string, value: boolean) {
    const v = { ...slidesState, [slideId]: { ...slidesState[slideId], [field]: value } }
    setSlidesState(v);
    console.log("[full state]: ", v)
  }

  useEffect(() => {
    console.log("id =>", username);
    // .then((data) => setUser(data));
    (async () => {
      try {
        const user = await getUserByToken(cookies.userAuthToken)
        if (user) {
          setUser(user)
        }
      } catch (e) {
        console.log(e)
      }


    })()
  }, []);

  useEffect(() => {
    let slidesInitialState = {} as [key: SlidesStateType];
    if (user) {
      const { slides } = user?.vreel;

      slides?.forEach(({ id, position }) => {
        slidesInitialState[id] = {
          isOpen: false,
          editAccordionIsOpen: false,
          editSlideIsOpen: false,
          editTitleIsOpen: false,
          editMediaIsOpen: false,
          editCtaIsOpen: false,
          editAdvancedIsOpen: false,
          position,
          values: {

          }
        } as SlidesStateType;

      })

      console.log("[-->]", slidesInitialState);
      setSlidesState(slidesInitialState);
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
              <button className="vreel-edit-menu__button green" onClick={e => {
               createSlide(cookies.userAuthToken, {
                    content_type: "image",
                    uri: "pic",
                    slide_location: 7,
                  }).then(data => console.log('data is', data));
              }}>Add New</button>
            </div>

            {user ? (
              user.vreel.slides.map((slide, idx) => (
                <>
                  {console.log("current vals:", slidesState[slide.id])}
                  <SlideEditor
                    key={slide.id}
                    slide={slide}
                    idx={idx}
                    state={{ ...slidesState[slide.id] }}
                    setState={ChangeState}
                  />
                </>
              ))
            ) : (
              <label>No Slides!</label>
            )}
          </div>
        </div>
      </Collapse>
    </li>
  );
};

export default EditSlides;
