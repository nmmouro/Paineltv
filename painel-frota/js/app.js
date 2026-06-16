import { Table } from "./components/Table.js";
import { Card } from "./components/Card.js";

function renderPainel(rows){

  return Card({
    title: "PAINEL",
    content: Table({
      headers:[
        "Data","Hora","Empregado","Veículo",
        "Motivo","Itinerário","Status"
      ],
      rows
    })
  });
}

function renderAgenda(rows){

  return Card({
    title: "AGENDA DO DIA",
    actions: `
      <span onclick="window.open('agenda.html')"
        style="position:absolute; right:10px; cursor:pointer;">
        📅
      </span>
    `,
    content: Table({
      headers:[
        "Data","Hora","Passageiro","Setor",
        "Motivo","Itinerário","Status"
      ],
      rows
    })
  });
}
