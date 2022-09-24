import axios from "axios";
import http from "http"
import fs from "fs"
import { GoogleApiKey, rootDir, ServerEndpoint } from "../";
interface FontItem {
    familyName: string
    regularUri: string
}
const fonts = [] as FontItem[];
const fontStore = [] as FontItem[];

function createTempFile(fontName: string, callback: any) {
    fs.writeFile(`${rootDir}/fonts/${fontName}`, "", (err) => {
        if (err) console.log("failed to get: ", fontName);
        callback();
    });
}

export default async function LoadFonts() {
    const fonts = [] as FontItem[];
    try {
        const { data } = await axios.get(`https://www.googleapis.com/webfonts/v1/webfonts?key=${GoogleApiKey}`);
        data?.items.forEach((_: any, idx: number) => {
            const type = data.items[idx];
            fonts.push({
                familyName: type.family?.toLowerCase(),
                regularUri: type.files.regular
            })

        });
        // console.log("fonts length", fonts.length)
        for (let i = 0; i < fonts.length; i++) {
            const data = fonts[i];
            const fontName = `${data.familyName.split(" ").join("_")}.ttf`
            const dir = `${rootDir}/fonts/${fontName}`

            if (!data.regularUri) continue

            createTempFile(fontName, () => {
                axios({
                    method: "get",
                    url: data.regularUri,
                    responseType: "stream"
                }).then(function (response) {
                    response.data.pipe(fs.createWriteStream(dir));
                    fontStore.push({
                        familyName: data.familyName,
                        regularUri: `${ServerEndpoint}/fonts/${fontName}`
                    })
                }).catch((err) => {
                    console.error("[axios error]", err.message)
                });
            });

        }
        // setTimeout(() => {
        //     console.log("store", fontStore)
        // }, 10000)
    } catch (err) {
        console.error("[failed to load fonts] ", err.message)
    }
}

export function GetFonts(family: string, limit: number): FontItem[] {
    let count = 0;
    const result = fontStore.filter(font => {
        if (count >= limit) return;
        return (font.familyName.includes(family.trim().toLowerCase()))
    });

    return result
} 