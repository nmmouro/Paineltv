export const parseGviz = txt =>
  JSON.parse(txt.substring(txt.indexOf("{"), txt.lastIndexOf("}") + 1));

export const getCell = c => c?.f ?? c?.v ?? "";

export function getStatusKey(status=""){
  const s = status.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
  if(s.includes("manutencao")) return "manutenção";
  if(s.includes("viagem")) return "viagem";
  if(s.includes("andamento")) return "andamento";
  if(s.includes("atendido")) return "atendido";
  if(s.includes("concluido")) return "concluido";
  if(s.includes("cancelado")) return "cancelado";
}

export function formatBRDate(d){
  return new Date(d).toLocaleDateString("pt-BR");
}
