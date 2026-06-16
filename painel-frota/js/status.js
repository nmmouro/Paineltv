const STATUS = {
  atendido:{ icon:'✔', class:"status-atendido" },
  concluido:{ icon:'✔', class:"status-concluido" },
  andamento:{ icon:'⏳', class:"status-andamento" },
  cancelado:{ icon:'✖', class:"status-cancelado" },
  manutenção:{ icon:'🔧', class:"status-manutencao" },
  viagem:{ icon:'✈️', class:"status-viagem" }
};

function getStatusKey(status=""){
  status = status.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");

  if(status.includes("manutencao")) return "manutenção";
  if(status.includes("viagem")) return "viagem";
  if(status.includes("andamento")) return "andamento";
  if(status.includes("atendido")) return "atendido";
  if(status.includes("concluido")) return "concluido";
  if(status.includes("cancelado")) return "cancelado";

  return null;
}

function getStatusClass(status){
  return STATUS[getStatusKey(status)]?.class || "";
}

function getStatusIcon(status){
  return STATUS[getStatusKey(status)]?.icon || "";
}
