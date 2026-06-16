function renderTable(headers, rows){

  return `
  <table>
    <thead>
      <tr>${headers.map(h=>`<th>${h}</th>`).join("")}</tr>
    </thead>
    <tbody>
      ${rows.map(row=>{
        const values = (row.c||[]).map(getCell);
        const status = values.at(-1);

        return `
        <tr class="${getStatusClass(status)}">
          ${values.map((v,i)=>`
            <td class="${i===values.length-1?'status-icon':''}">
              ${i===values.length-1 ? getStatusIcon(status) : v}
            </td>
          `).join("")}
        </tr>`;
      }).join("")}
    </tbody>
  </table>`;
}
