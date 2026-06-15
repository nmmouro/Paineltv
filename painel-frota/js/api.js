import { SHEET_ID } from "./config.js";
import { parseGviz } from "./helpers.js";

export async function fetchSheet(sheet, query){

    const url =
    `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq`+
    `?sheet=${encodeURIComponent(sheet)}`+
    `&tq=${encodeURIComponent(query)}`+
    `&tqx=out:json`;

    const res = await fetch(url);

    return parseGviz(
        await res.text()
    );
}
