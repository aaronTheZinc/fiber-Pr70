
export enum FileType {
    video = "video",
    image = "image"
}
export interface Content {
    background_audio_uri?: string
    content_type: FileType
    uri: string
}
export interface Slide {
    id: string;
    author: string;
    content_type: string;
    uri: string;
    slide_location: number;
    title: {
        header: string;
        description: string;
    }
    cta1: {
        link_header: string;
        link_type: string;
        link_url: string
    }
    cta2: {
        link_header: string;
        link_type: string;
        link_url: string
    }
    advanced: {
        info: string;
        link_type: string;
        link_url: string
    }
    mobile: Content
    desktop: Content

}