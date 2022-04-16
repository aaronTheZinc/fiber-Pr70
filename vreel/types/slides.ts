enum ContentType {
    image,
    video
}
export interface Content {
    start_time?: number;
    stop_time?: number;
    background_audio_uri?: string
    content_type: ContentType
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
    cta: {
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