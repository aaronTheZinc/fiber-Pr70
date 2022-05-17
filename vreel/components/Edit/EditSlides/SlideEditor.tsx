import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { Row, Col } from "reactstrap";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import { TiDevicePhone, TiDeviceDesktop } from "react-icons/ti";
import { Collapse } from "reactstrap";
import { DeleteSlide, SaveSlideType, Slide, User } from "../../../types";
import {
  CheckboxInput,
  EditInput,
  LinkButtons,
} from "../../Shared/Input/Input";
import { UppyModal } from "../../Shared/UppyModal/UppyModal";
import { SlidesStateType } from "./EditSlides";
interface SlideEditorProps {
  slide: Slide;
  idx: number;
  state: SlidesStateType;
  setState: (id: string, key: string, value: any) => void;
  saveSlide: (i: string, slide: Slide) => void;
  deleteSlide: (id: string) => void;
}

function MediaPreview({ url }: any): JSX.Element {
  return (
    <div>
      <iframe src={url} title=""></iframe>
    </div>
  );
}

export default function SlideEditor({
  slide,
  idx,
  state,
  setState,
  saveSlide,
  deleteSlide,
}: SlideEditorProps) {
  const [editedSlide, setEditedSlide] = useState<Slide>(slide);
  const [fileUrl, setFileUrl] = useState<string>(state.values?.mobile?.uri);
  const [uppyIsOpen, setUppyIsOpen] = useState<boolean>(false);

  const { values } = state;
  useEffect(() => {
    const edited = {
      ...slide,
      ...values,
    };
    setFileUrl(state.values?.mobile?.uri);
    setEditedSlide(edited as any);
  }, [values]);

  const { id } = slide;

  //mutate slide values
  function updateValue(parent: string, key: string, value: any) {
    const v = {
      ...state.values,
      [parent]: { ...state.values[parent], [key]: value },
    };
    console.log("new slide state ->" + key, v);
    setState(id, "values", {
      ...state.values,
      [parent]: { ...state.values[parent], [key]: value },
    });
  }

  // device can be either mobile or desktop
  function updateMedia(url: string, fileType: string) {
    setUppyIsOpen(false);
    setFileUrl(url);
    setState(id, "values", {
      ...state.values,
      mobile: { uri: url, content_type: fileType },
    });
  }

  return (
    <div
      onClick={() => {}}
      className="vreel-edit-slides__new-slide__slide-wrapper"
    >
      <div
        onClick={() => setState(id, "isOpen", !state.isOpen)}
        className="vreel-edit-slides__new-slide__toggle-btn"
      >
        <p>Slide {`${idx + 1} ~ [${slide.id}]`}</p>
        {state.isOpen ? (
          <AiOutlineMinusCircle
            onClick={() => setState(id, "isOpen", !state.isOpen)}
          />
        ) : (
          <IoMdAddCircleOutline
            onClick={() => setState(id, "isOpen", !state.isOpen)}
          />
        )}
      </div>

      <Collapse isOpen={state.isOpen}>
        <EditInput
          type="text"
          label="Position"
          style={{ marginBottom: "30px" }}
          setValue={(s: string) => setState(id, "position", s)}
          value={state?.position?.toString() || ""}
        />
        <button
          className="vreel-edit-menu__accordion white"
          type="button"
          onClick={() =>
            setState(id, "editTitleIsOpen", !state.editTitleIsOpen)
          }
          style={
            state.editTitleIsOpen
              ? {
                  border: "1px solid #fff",
                  borderBottom: "none",
                  borderRadius: "15px 15px 0 0",
                }
              : {
                  border: "1px solid #fff",
                  borderBottom: "1px solid #fff",
                  borderRadius: "15px",
                }
          }
        >
          <span>
            <p>Title</p>
            {state.editTitleIsOpen ? (
              <AiOutlineMinusCircle />
            ) : (
              <IoMdAddCircleOutline />
            )}
          </span>
        </button>
        <Collapse
          isOpen={state.editTitleIsOpen}
          style={{
            border: "1px solid #fff",
            borderTop: "none",
            borderRadius: "0 0 15px 15px",
            position: "relative",
            bottom: "15px",
            padding: "15px",
          }}
        >
          <EditInput
            type="text"
            label="Header"
            style={{}}
            setValue={(s: string) => updateValue("title", "header", s)}
            value={state.values?.title?.header}
          />
          <EditInput
            type="textarea"
            label="Description"
            style={{
              marginBottom: "30px",
              height: "12rem",
            }}
            value={state.values?.title?.description}
            setValue={(s: string) => updateValue("title", "description", s)}
          />
        </Collapse>

        <div>
          <button
            className="vreel-edit-menu__accordion white"
            type="button"
            onClick={() =>
              setState(id, "editMediaIsOpen", !state.editMediaIsOpen)
            }
            style={
              state.editMediaIsOpen
                ? {
                    border: "1px solid #fff",
                    borderBottom: "none",
                    borderRadius: "15px 15px 0 0",
                    marginTop: "1pc",
                  }
                : {
                    border: "1px solid #fff",
                    borderBottom: "1px solid #fff",
                    borderRadius: "15px",
                    marginTop: "1pc",
                  }
            }
          >
            <span>
              <p>Media</p>
              {state.editMediaIsOpen ? (
                <AiOutlineMinusCircle
                  onClick={() =>
                    setState(id, "editMediaIsOpen", !state.editMediaIsOpen)
                  }
                />
              ) : (
                <IoMdAddCircleOutline />
              )}
            </span>
          </button>
        </div>

        <Collapse
          isOpen={state.editMediaIsOpen}
          style={{
            border: "1px solid #fff",
            borderTop: "none",
            borderRadius: "0 0 15px 15px",
            position: "relative",
            bottom: "15px",
            padding: "15px",
          }}
        >
          <Row className="vreel-edit-slides__new-slide__device-row">
            <button
              className="vreel-edit-slides__new-slide__device-button"
              onClick={() => setUppyIsOpen(true)}
            >
              <UppyModal
                setUpload={updateMedia}
                basicFileType="music"
                isOpen={uppyIsOpen}
                toggleModal={(b) => setUppyIsOpen(b)}
              />
              <TiDevicePhone size={32} color="white" />
              <p>Upload Mobile File</p>
            </button>
            <button
              className="vreel-edit-slides__new-slide__device-button"
              onClick={() => setUppyIsOpen(true)}
            >
              <UppyModal
                setUpload={updateMedia}
                basicFileType="music"
                isOpen={uppyIsOpen}
                toggleModal={(b) => setUppyIsOpen(b)}
              />
              <TiDeviceDesktop size={32} color="white" />
              <p>Upload Desktop File</p>
            </button>
          </Row>
          <div className="vreel-edit-slides__new-slide__media-wrapper">
            <p>Upload Your File:</p>
            {/* <UppyModal setUpload={updateMedia} basicFileType="music"
                        /> */}
            {/* 
                    </div>
                    <div className="vreel-edit-slides__new-slide__media-wrapper">
                        <p>Desktop Options:</p>
                        <UppyModal />
                        <div className="vreel-edit-slides__new-slide__video-times-wrapper"></div> */}
          </div>
          <div>
            {fileUrl ? (
              <a style={{ fontSize: "15px" }} href={fileUrl}>
                File Availible Here
              </a>
            ) : (
              <></>
            )}
          </div>
        </Collapse>
        <button
          className="vreel-edit-menu__accordion white"
          type="button"
          onClick={() => setState(id, "editCta1IsOpen", !state.editCta1IsOpen)}
          style={
            state.editCta1IsOpen
              ? {
                  border: "1px solid #fff",
                  borderBottom: "none",
                  borderRadius: "15px 15px 0 0",
                  marginTop: "1pc",
                }
              : {
                  border: "1px solid #fff",
                  borderBottom: "1px solid #fff",
                  borderRadius: "15px",
                  marginTop: "1pc",
                }
          }
        >
          <span>
            <p>Call To Action Button #1</p>
            {state.editCta1IsOpen ? (
              <AiOutlineMinusCircle />
            ) : (
              <IoMdAddCircleOutline />
            )}
          </span>
        </button>
        <Collapse
          isOpen={state.editCta1IsOpen}
          style={{
            border: "1px solid #fff",
            borderTop: "none",
            borderRadius: "0 0 15px 15px",
            position: "relative",
            bottom: "15px",
            padding: "15px",
          }}
        >
          <Collapse isOpen={true}>
            <EditInput
              value={state?.values?.cta1?.link_header}
              setValue={(s: string) => updateValue("cta1", "link_header", s)}
              type="text"
              label="Link Header"
            />
            <LinkButtons
              value={state?.values?.cta1?.link_type}
              setValue={(s: string) => updateValue("cta1", "link_type", s)}
              type="text"
              label="Link Type"
            />
            <EditInput
              value={state?.values?.cta1?.link_url}
              setValue={(s: string) => updateValue("cta1", "link_url", s)}
              type="text"
              label="Link URL"
            />
          </Collapse>
        </Collapse>
        <button
          className="vreel-edit-menu__accordion white"
          type="button"
          onClick={() => setState(id, "editCta2IsOpen", !state.editCta2IsOpen)}
          style={
            state.editCta2IsOpen
              ? {
                  border: "1px solid #fff",
                  borderBottom: "none",
                  borderRadius: "15px 15px 0 0",
                  marginTop: "1pc",
                }
              : {
                  border: "1px solid #fff",
                  borderBottom: "1px solid #fff",
                  borderRadius: "15px",
                  marginTop: "1pc",
                }
          }
        >
          <span>
            <p>Call To Action Button #2</p>
            {state.editCta2IsOpen ? (
              <AiOutlineMinusCircle />
            ) : (
              <IoMdAddCircleOutline />
            )}
          </span>
        </button>
        <Collapse
          isOpen={state.editCta2IsOpen}
          style={{
            border: "1px solid #fff",
            borderTop: "none",
            borderRadius: "0 0 15px 15px",
            position: "relative",
            bottom: "15px",
            padding: "15px",
          }}
        >
          <Collapse isOpen={true}>
            <EditInput
              value={state?.values?.cta2?.link_header}
              setValue={(s: string) => updateValue("cta2", "link_header", s)}
              type="text"
              label="Link Header"
            />
            <LinkButtons
              value={state?.values?.cta2?.link_type}
              setValue={(s: string) => updateValue("cta2", "link_type", s)}
              type="text"
              label="Link Type"
            />
            <EditInput
              value={state?.values?.cta2?.link_url}
              setValue={(s: string) => updateValue("cta2", "link_url", s)}
              type="text"
              label="Link URL"
            />
          </Collapse>
        </Collapse>
        <button
          className="vreel-edit-menu__accordion white"
          type="button"
          onClick={() =>
            setState(id, "editAdvancedIsOpen", !state.editAdvancedIsOpen)
          }
          style={
            state.editAdvancedIsOpen
              ? {
                  border: "1px solid #fff",
                  borderBottom: "none",
                  borderRadius: "15px 15px 0 0",
                  marginTop: "1pc",
                }
              : {
                  border: "1px solid #fff",
                  borderBottom: "1px solid #fff",
                  borderRadius: "15px",
                  marginTop: "1pc",
                }
          }
        >
          <span>
            <p>Advanced</p>
            {state.editAdvancedIsOpen ? (
              <AiOutlineMinusCircle />
            ) : (
              <IoMdAddCircleOutline />
            )}
          </span>
        </button>
        <Collapse
          isOpen={state.editAdvancedIsOpen}
          style={{
            border: "1px solid #fff",
            borderTop: "none",
            borderRadius: "0 0 15px 15px",
            position: "relative",
            bottom: "15px",
            padding: "15px",
          }}
        >
          <Collapse isOpen={true}>
            <EditInput
              type="textarea"
              label="Info"
              value={state?.values?.advanced.info}
              setValue={(s: string) => updateValue("advanced", "info", s)}
              style={{
                marginBottom: "30px",
                height: "12rem",
              }}
            />
            <EditInput
              value={state?.values?.advanced?.link_header}
              type="text"
              label="Link Header"
              setValue={(s: string) =>
                updateValue("advanced", "link_header", s)
              }
            />
            <EditInput
              value={state?.values?.advanced?.link_type}
              type="text"
              label="Link Type"
              setValue={(s: string) => updateValue("advanced", "link_type", s)}
            />
          </Collapse>
          <div className="vreel-edit-slides__new-slide__advanced-btn-wrapper">
            <button className="vreel-edit-menu__button blue">
              {" "}
              + Add Credits
            </button>
            <CheckboxInput type="checkbox" label="Invert Group Filter" />
          </div>
        </Collapse>
        <div className="vreel-edit-slides__new-slide__btn-wrapper">
          <button
            onClick={() => deleteSlide(slide.id)}
            type="button"
            className="vreel-edit-menu__button red"
          >
            Delete Slide
          </button>
          <button
            onClick={() => saveSlide(slide.id, editedSlide)}
            type="button"
            className="vreel-edit-menu__button green"
          >
            Save Slide
          </button>
        </div>
      </Collapse>
    </div>
  );
}
