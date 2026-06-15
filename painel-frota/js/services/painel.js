import { fetchSheet } from "../api.js";
import { getCell } from "../helpers.js";
import { renderTable } from "../render/tables.js";
import { TABS } from "../config.js";

let painelRows = [];

export function getPainelRows(){
    return painelRows;
}

export async function loadPainel(){

    const tab =
        TABS.find(t => t.id === "painel");

    const result =
        await fetchSheet(
            tab.sheet,
            "select B,C,D,E,F,G,X"
        );

    painelRows =
        (result.table.rows || [])
        .filter(row => {

            const v =
                (row.c || []).map(getCell);

            const status =
                String(v[6] || "")
                .toUpperCase();

            return (
                status.includes("AGENDADO") ||
                status.includes("EM ANDAMENTO") ||
                status.includes("VIAGEM") ||
                status.includes("MANUTENÇÃO") ||
                status.includes("MANUTENCAO")
            );

        });

    painelRows.sort((a,b)=>{

        const va =
            (a.c || []).map(getCell);

        const vb =
            (b.c || []).map(getCell);

        return new Date(
            `${va[0]} ${va[1]}`
        ) - new Date(
            `${vb[0]} ${vb[1]}`
        );

    });

    renderPainel(tab);
}

function renderPainel(tab){

    const app =
        document.getElementById("app");

    let section =
        document.getElementById("card-painel");

    if(!section){

        section =
            document.createElement("section");

        section.id =
            "card-painel";

        section.className =
            "card painel";

        app.appendChild(section);
    }

    section.innerHTML = `
        <h2>${tab.title}</h2>
        ${renderTable(
            tab.headers,
            painelRows
        )}
    `;
}
