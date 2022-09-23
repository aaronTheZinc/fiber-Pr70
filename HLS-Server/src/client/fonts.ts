import axios from "axios";
import { GoogleApiKey } from "../";
interface FontItem {
    familyName: string
    regularUri: string
}
const fonts = [] as FontItem[];

export default async function LoadFonts() {
    try {
        const { data } = await axios.get(`https://www.googleapis.com/webfonts/v1/webfonts?key=${GoogleApiKey}`);
        data?.items.forEach((_: any, idx: number) => {
            const type = data.items[idx];
            fonts.push({
                familyName: type.family?.toLowerCase(),
                regularUri: type.files.regular
            })

        });
        console.log(fonts)
    } catch (err) {
        console.error("[failed to load fonts] ", err.message)
    }
}

export function GetFonts(family: string, limit: number): FontItem[] {
    let count = 0;
    const result = fonts.filter(font => {
        if (count >= limit) return;
        return (font.familyName.includes(family.trim().toLowerCase()))
    });

    return result
} 