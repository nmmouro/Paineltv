async function loadAll(){

  const app = document.getElementById("app");

  const results = await Promise.all(TABS.map(t=>fetchSheet(t.sheet)));

  app.innerHTML = "";

  const painelIndex = TABS.findIndex(t=>t.id==="painel");
  const painelRows = results[painelIndex].table.rows || [];

  results.forEach((data,index)=>{

    const tab = TABS[index];

    const section = document.createElement("section");
    section.className = "card";

    section.innerHTML = `
      <h2>${tab.title}</h2>
      ${renderTable(tab.headers, data.table.rows)}
    `;

    app.appendChild(section);
  });
}

loadAll();
setInterval(loadAll,30000);
