import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Collapse } from "reactstrap";
import { DeleteSlide, SaveSlideType, Slide, User } from "../../../types";
import { CheckboxInput, EditInput } from "../../Shared/Input/Input";
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
    )
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

    const { values } = state
    useEffect(() => {
        const edited = {
            ...slide,
            ...values
        }
        setFileUrl(state.values?.mobile?.uri)
        setEditedSlide(edited as any)
    }, [values])

    const { id } = slide;

    //mutate slide values
    function updateValue(parent: string, key: string, value: any) {
        const v = {
            ...state.values,
            [parent]: { ...state.values[parent], [key]: value },
        }
        console.log("new slide state ->" + key, v)
        setState(id, "values", {
            ...state.values,
            [parent]: { ...state.values[parent], [key]: value },
        });
    }
    function updateMedia(url: string, fileType: string) {
        setFileUrl(url);
        setState(id, "values", { ...state.values, "mobile": { uri: url, content_type: fileType } })

        alert("Doneeeeee")
    }

    return (
        <div
            onClick={() => { }}
            className="vreel-edit-slides__new-slide__slide-wrapper"
        >
            <div onClick={() => setState(id, "isOpen", !state.isOpen)} className="vreel-edit-slides__new-slide__toggle-btn">
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
                <Collapse isOpen={state.editTitleIsOpen}>
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
                        style={{ marginTop: "1pc" }}
                        className="vreel-edit-menu__accordion white"
                        type="button"
                        onClick={() =>
                            setState(id, "editMediaIsOpen", !state.editMediaIsOpen)
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

                <Collapse isOpen={state.editMediaIsOpen}>
                    <div className="vreel-edit-slides__new-slide__media-wrapper">
                        <p>Upload Your File:</p>
                        <UppyModal setUpload={updateMedia}
                        />
                        {/* 
                    </div>
                    <div className="vreel-edit-slides__new-slide__media-wrapper">
                        <p>Desktop Options:</p>
                        <UppyModal />
                        <div className="vreel-edit-slides__new-slide__video-times-wrapper"></div> */}
                    </div>
                    <div>
                        {
                            fileUrl ?
                                <a style={{ fontSize: "15px" }} href={fileUrl}>File Availible Here</a> : <></>
                        }
                    </div>
                </Collapse>
                <button
                    style={{ marginTop: "1pc" }}
                    className="vreel-edit-menu__accordion white"
                    type="button"
                    onClick={() => setState(id, "editCtaIsOpen", !state.editCtaIsOpen)}
                >
                    <span>
                        <p>Call To Action</p>
                        {state.editCtaIsOpen ? (
                            <AiOutlineMinusCircle />
                        ) : (
                            <IoMdAddCircleOutline />
                        )}
                    </span>
                </button>
                <Collapse isOpen={state.editCtaIsOpen}>
                    <Collapse isOpen={true}>
                        <EditInput
                            value={state?.values?.cta?.link_header}
                            setValue={(s: string) => updateValue("cta", "link_header", s)}
                            type="text"
                            label="Link Header"
                        />
                        <EditInput
                            value={state?.values?.cta?.link_type}
                            setValue={(s: string) => updateValue("cta", "link_type", s)}
                            type="text"
                            label="Link Type"
                        />
                        <EditInput
                            value={state?.values?.cta?.link_url}
                            setValue={(s: string) => updateValue("cta", "link_url", s)}
                            type="text"
                            label="Link URL"
                        />
                    </Collapse>
                </Collapse>
                <button
                    className="vreel-edit-menu__accordion white"
                    type="button"
                    style={{ marginTop: "1pc" }}
                    onClick={() =>
                        setState(id, "editAdvancedIsOpen", !state.editAdvancedIsOpen)
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
                <Collapse isOpen={state.editAdvancedIsOpen}>
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
