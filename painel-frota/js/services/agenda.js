import { fetchSheet } from "../api.js";
import { getCell } from "../helpers.js";
import { renderTable } from "../render/tables.js";
import { TABS } from "../config.js";

export async function loadAgenda(){

    await Promise.all([
        carregarAgendaDia(),
        carregarAgendaSocial()
    ]);
}


async function carregarAgendaDia(){

    const tab =
        TABS.find(
            t => t.id === "agenda"
        );

    const result =
        await fetchSheet(
            tab.sheet,
            "select B,C,D,E,F,G,H"
        );

    const hoje =
        new Date()
        .toLocaleDateString("pt-BR");

    const rows =
        (result.table.rows || [])
        .filter(row => {

            const v =
                (row.c || []).map(getCell);

            return String(v[0])
                .trim() === hoje;
        });

    rows.sort((a,b)=>{

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

    renderAgenda(tab,rows);
}


async function carregarAgendaSocial(){

    const tab =
        TABS.find(
            t => t.id === "social"
        );

    const result =
        await fetchSheet(
            tab.sheet,
            "select B,C,D,F,G,H"
        );

    const hoje =
        new Date()
        .toLocaleDateString("pt-BR");

    const rows =
        (result.table.rows || [])
        .filter(row => {

            const v =
                (row.c || []).map(getCell);

            return String(v[0])
                .trim() === hoje;
        });

    renderAgenda(tab,rows);
}


function renderAgenda(tab,rows){

    const app =
        document.getElementById("app");

    let section =
        document.getElementById(
            `card-${tab.id}`
        );

    if(!section){

        section =
            document.createElement("section");

        section.id =
            `card-${tab.id}`;

        section.className =
            `card ${tab.id}`;

        app.appendChild(section);
    }

    section.innerHTML = `

        <h2>

            ${tab.title}

            ${
                tab.id === "agenda"
                ? `
                <span
                  onclick="window.open('agenda.html','_blank')"
                  style="
                    float:right;
                    cursor:pointer;
                  "
                >
                  📅
                </span>
                `
                : ""
            }

        </h2>

        ${renderTable(
            tab.headers,
            rows
        )}
    `;
}
