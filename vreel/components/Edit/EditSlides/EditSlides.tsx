import { useRouter } from "next/router";
import React, { useEffect, useRef, useState, createContext } from "react";
import { useCookies } from "react-cookie";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Collapse } from "reactstrap";
import { createSlide, deleteSlide, saveSlide } from "../../../graphql/mutations";
import { getUserByToken, getUserByUsername } from "../../../graphql/query";
import { Content, Slide, User, SaveSlideType, DeleteSlide } from "../../../types";
import { CheckboxInput, EditInput } from "../../Shared/Input/Input";
import { UppyModal } from "../../Shared/UppyModal/UppyModal";
import SlideEditor from "./SlideEditor";
import toast, { Toaster } from "react-hot-toast"



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
    desktop: Content,
    mobile: Content

    cta: {
      link_header: string,
      link_type: string,
      link_url: string
    },
    advanced: {
      info: string,
      link_header: string,
      link_type: string
    },

  }

  position: number
}



const EditSlides = (): JSX.Element => {
  const [cookies, _, removeCookies] = useCookies(["userAuthToken"]);
  const [user, setUser] = useState<User>(null);
  const [editAccordionIsOpen, setEditAccordionIsOpen] = useState(false);
  const [editSlideIsOpen, setEditSlideIsOpen] = useState(false);
  const [editTitleIsOpen, setEditTitleIsOpen] = useState(false);
  const [editMediaIsOpen, setEditMediaIsOpen] = useState(false);
  const [editCtaIsOpen, setEditCtaIsOpen] = useState(false);
  const [editAdvancedIsOpen, setEditAdvancedIsOpen] = useState(false);
  const [isLaoding, setIsLoading] = useState<boolean>(false);
  const [slidesState, setSlidesState] = useState<any>([]);

  //handle slide rerender
  const [refresh, setRefresh] = useState([])

  function ChangeState(slideId: string, field: string, value: boolean) {
    const v = { ...slidesState, [slideId]: { ...slidesState[slideId], [field]: value } }
    setSlidesState(v);
  }
  function Refresh() {
    setRefresh([0]);
  }
  async function CreateSlide() {
    // toast("creating slide...")
    setIsLoading(true);
    createSlide(cookies.userAuthToken).
      then((response) => {
        toast.success("New Slide Created")
        console.log("[Slide Creation]: ", response);
        setIsLoading(false);
        Refresh()

      })
      .catch((e) => {
        toast.error('Failed To Create Slide');

        setIsLoading(false);
      });

  }
  async function SaveSlide(id: string, slide: Slide) {
    console.log("[saved slide: ]", slide)
    //set loading and errors
    setIsLoading(true);


    saveSlide({ id, token: cookies.userAuthToken, slide: slide }).
      then((response) => {
        console.log("[Slide Update]: ", response);
        setIsLoading(false);
        Refresh()

      })
      .catch((e) => {
        console.log("[Slide Update Error]: ", e)
        setIsLoading(false);
      });


  }

  async function DeleteSlide(id: string) {
    setIsLoading(true);
    deleteSlide({ token: cookies.userAuthToken, slideId: id }).
      then((response) => {
        const newState = slidesState
        delete newState[id]
        setSlidesState(newState)
        console.log("[Slide Deletion]: ", response);
        setIsLoading(false);
        Refresh()

      })
      .catch((e) => {
        console.log("[Slide Deletion Error]: ", e)
        setIsLoading(false);
      });
  }

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const promise = getUserByToken(cookies.userAuthToken)
        toast.promise(promise, {
          loading: 'Loading',
          success: (data: User) => {
            setUser(data)
            return 'Done!'
          },
          error: (err: Error) => {
            return "Failed To Get Content"
          }
        });
        if (user) {

          setIsLoading(false);
          setUser(user)
        }
      } catch (e) {
        console.log(e)
      }


    })()
  }, [refresh]);



  useEffect(() => {
    let slidesInitialState = {} as [key: SlidesStateType];
    if (user) {
      const { slides } = user?.vreel;
      slides?.forEach((slide) => {
        console.log("slide ->", slide)
        //add new state if it doesnt exits. Keeps State From Refreshing When the Data Does.
        if (!slidesInitialState[slide.id]) {
          slidesInitialState[slide.id] = {
            isOpen: false,
            editAccordionIsOpen: false,
            editSlideIsOpen: false,
            editTitleIsOpen: false,
            editMediaIsOpen: false,
            editCtaIsOpen: false,
            editAdvancedIsOpen: false,
            position: slide.slide_location,
            values: {
              title: slide.title,
              mobile: slide.mobile,
              desktop: slide.desktop,

              cta: slide.cta,
              advanced: slide.advanced as any


            }
          } as SlidesStateType;
        }
      })
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
              <button onClick={CreateSlide} className="vreel-edit-menu__button green">Add New</button>
            </div>

            {user ? (
              user.vreel.slides.map((slide, idx) => (
                <>
                  <SlideEditor
                    key={slide.id}
                    slide={slide}
                    idx={idx}
                    state={{ ...slidesState[slide.id] }}
                    setState={ChangeState}
                    saveSlide={SaveSlide}
                    deleteSlide={DeleteSlide}
                  />
                </>
              ))
            ) : (
              <label>No Slides!</label>
            )}
          </div>
        </div>
      </Collapse>
      <Toaster />
    </li>
  );
};

export default EditSlides;
