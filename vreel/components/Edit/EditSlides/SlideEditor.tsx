import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Collapse } from "reactstrap";
import { Slide, User } from "../../../types";
import { CheckboxInput, EditInput } from "../../Shared/Input/Input";
import { UppyModal } from "../../Shared/UppyModal/UppyModal";
import { SlidesStateType } from "./EditSlides"
interface SlideEditorProps {
    slide: Slide,
    idx: number,
    state: SlidesStateType,
    setState: (id: string, key: string, value: any) => void
}
export default function SlideEditor({ slide, idx, state, setState }: SlideEditorProps) {
    const { id } = slide;


    //mutate slide values
    function updateValue(parent: string, key: string, value: any) {
        setState(id, "values", { ...state.values, [parent]: { ...state.values[parent], [key]: value } })
    }
    useEffect(() => {
        // console.log("[slide open]: ", state.isOpen)
        // console.log("[current slide state]: ", state);
        // console.log("[slide]", state.isOpen);
    }, [state]);
    return (
        <div
            onClick={() => { }}
            className="vreel-edit-slides__new-slide__slide-wrapper"
        >
            <div className="vreel-edit-slides__new-slide__toggle-btn">
                <p>
                    Slide {`${idx + 1} ~ [${slide.id}]`}
                </p>
                {state.isOpen ? (
                    <AiOutlineMinusCircle
                        onClick={() => setState(id, "isOpen", !state.isOpen)}
                    />
                ) : (
                    <IoMdAddCircleOutline onClick={() => setState(id, "isOpen", !state.isOpen)} />
                )}
            </div>

            <Collapse isOpen={state.isOpen}>
                <EditInput
                    type="text"
                    label="Position"
                    style={{ marginBottom: "30px" }}
                    setValue={(s: string) => setState(id, "position", s)}
                    value={state?.position?.toString() || "..."}
                />
                <button
                    className="vreel-edit-menu__accordion white"
                    type="button"
                    onClick={(() => setState(id, "editTitleIsOpen", !state.editTitleIsOpen))}
                >
                    <span>
                        <p>Title</p>
                        {state.editTitleIsOpen ? <AiOutlineMinusCircle /> : <IoMdAddCircleOutline />}
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
                        onClick={() => setState(id, "editMediaIsOpen", !state.editMediaIsOpen)}
                    >
                        <span>
                            <p>Media</p>
                            {state.editMediaIsOpen ? <AiOutlineMinusCircle onClick={() => setState(id, "editMediaIsOpen", !state.editMediaIsOpen)} /> : <IoMdAddCircleOutline />}
                        </span>
                    </button>
                </div>


                <Collapse isOpen={state.editMediaIsOpen}>
                    <div className="vreel-edit-slides__new-slide__media-wrapper">
                        <p>Mobile Options:</p>
                        <UppyModal />
                        <div className="vreel-edit-slides__new-slide__video-times-wrapper">
                            <div className="vreel-edit-slides__new-slide__time-wrapper">
                                <p>Start Time:</p>
                                <div>
                                    <label htmlFor="min">min</label>
                                    <input value={state?.values?.media?.mobile?.start_time} type="text" name="min" id="min" />
                                    <label htmlFor="sec">sec</label>
                                    <input value={state?.values?.media?.mobile?.start_time} type="text" name="sec" id="sec" />
                                </div>
                            </div>
                            <div className="vreel-edit-slides__new-slide__time-wrapper">
                                <p>Stop Time:</p>
                                <div>
                                    <label htmlFor="min">min</label>
                                    <input value={state?.values?.media?.mobile?.stop_time} type="text" name="min" id="min" />
                                    <label htmlFor="sec">sec</label>
                                    <input value={state?.values?.media?.mobile?.stop_time} type="text" name="sec" id="sec" />
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
                <button
                    style={{ marginTop: "1pc" }}
                    className="vreel-edit-menu__accordion white"
                    type="button"
                    onClick={() => setState(id, "editCtaIsOpen", !state.editCtaIsOpen)}
                >
                    <span>
                        <p>Call To Action</p>
                        {state.editCtaIsOpen ? <AiOutlineMinusCircle /> : <IoMdAddCircleOutline />}
                    </span>
                </button>
                <Collapse isOpen={state.editCtaIsOpen}>

                    <Collapse isOpen={true}>
                        <EditInput value={state?.values?.cta?.link_header} setValue={(s: string) => updateValue("cta", "link_header", s)} type="text" label="Link Header" />
                        <EditInput value={state?.values?.cta?.link_type} setValue={(s: string) => updateValue("cta", "link_type", s)} type="text" label="Link Type" />
                        <EditInput value={state?.values?.cta?.link_url} setValue={(s: string) => updateValue("cta", "link_url", s)} type="text" label="Link URL" />
                    </Collapse>
                </Collapse>
                <button
                    className="vreel-edit-menu__accordion white"
                    type="button"
                    style={{ marginTop: "1pc" }}
                    onClick={() => setState(id, "editAdvancedIsOpen", !state.editAdvancedIsOpen)}
                >
                    <span>
                        <p>Advanced</p>
                        {state.editAdvancedIsOpen ? <AiOutlineMinusCircle /> : <IoMdAddCircleOutline />}
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
            </Collapse>
        </div>
    );
};