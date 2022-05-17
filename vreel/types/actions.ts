import { Slide } from "./slides"

export interface SaveSlideType {
    id: string;
    token: string
    slide: Slide,
}
export interface DeleteSlide {
    slideId: string;
    token: string;

}

