import { getCell, getStatusKey } from "../utils.js";
import { STATUS } from "../config.js";
import { StatusBadge } from "./StatusBadge.js";

export function DataTable({
  id = "table",
  headers = [],
  rows = [],
  searchable = true,
  filterStatus = true
}){

  const tableId = `dt-${id}`;

  return `
    <div class="datatable" id="${tableId}">

      <!-- CONTROLS -->
      <div class="dt-controls">

        ${
          searchable ? `
          <input
            type="text"
            placeholder="Buscar..."
            class="dt-search"
          >` : ""
        }

        ${
          filterStatus ? `
          <select class="dt-filter">
            <option value="">Todos Status</option>
            ${Object.keys(STATUS).map(k => `
              <option value="${k}">${k.toUpperCase()}</option>
            `).join("")}
          </select>` : ""
        }

      </div>

      <!-- TABLE -->
      <table>

        <thead>
          <tr>
            ${headers.map((h,i)=>`
              <th data-index="${i}" class="dt-sort">
                ${h} ⬍
              </th>
            `).join("")}
          </tr>
        </thead>

        <tbody>
          ${renderRows(rows)}
        </tbody>

      </table>

    </div>
  `;
}

/* ================= RENDER ROWS ================= */

function renderRows(rows){

  return rows.map(row => {

    const values = (row.c || []).map(getCell);
    const status = values.at(-1) || "";
    const key = getStatusKey(status);

    return `
      <tr data-status="${key || ""}">

        ${values.map((v,i)=>{

          const isLast = i === values.length -1;

          return `
            <td>
              ${isLast ? StatusBadge(v) : v}
            </td>
          `;
        }).join("")}

      </tr>
    `;
  }).join("");
}

/* ================= INIT ================= */

export function initDataTable(containerId){

  const container =
    document.getElementById(containerId);

  if(!container) return;

  const searchInput =
    container.querySelector(".dt-search");

  const filter =
    container.querySelector(".dt-filter");

  const tbody =
    container.querySelector("tbody");

  const rows =
    Array.from(tbody.querySelectorAll("tr"));

  /* ================= SEARCH ================= */

  if(searchInput){

    searchInput.addEventListener("input", () => {

      const val =
        searchInput.value.toLowerCase();

      rows.forEach(row => {

        const text =
          row.innerText.toLowerCase();

        const match =
          text.includes(val);

        row.style.display =
          match ? "" : "none";

        highlight(row, val);
      });
    });

  }

  /* ================= FILTER ================= */

  if(filter){

    filter.addEventListener("change", () => {

      const val = filter.value;

      rows.forEach(row => {

        const status =
          row.dataset.status;

        const show =
          !val || val === status;

        row.style.display =
          show ? "" : "none";
      });
    });

  }

  /* ================= SORT ================= */

  const headers =
    container.querySelectorAll(".dt-sort");

  headers.forEach((th,index)=>{

    let asc = true;

    th.addEventListener("click", () => {

      const sorted = rows.sort((a,b)=>{

        const A =
          a.cells[index].innerText.trim();

        const B =
          b.cells[index].innerText.trim();

        return asc
          ? A.localeCompare(B)
          : B.localeCompare(A);
      });

      asc = !asc;

      sorted.forEach(tr =>
        tbody.appendChild(tr)
      );

    });

  });

}

/* ================= HIGHLIGHT ================= */

function highlight(row, term){

  const cells = row.querySelectorAll("td");

  cells.forEach(td => {

    const text = td.innerText;

    if(!term){
      td.innerHTML = text;
      return;
    }

    const regex =
      new RegExp(`(${term})`, "gi");

    td.innerHTML =
      text.replace(regex, `<mark>$1</mark>`);
  });
}
