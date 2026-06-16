import { getCell } from "../utils.js";

export function getDisponibilidade(nome, painelRows, tipo){
  const target = String(nome).toUpperCase();

  for(const row of painelRows){
    const v = (row.c||[]).map(getCell);

    const veiculo = String(v[3]).toUpperCase();
    const motorista = String(v[2]).toUpperCase();
    const status = String(v[6]).toUpperCase();

    const match = tipo==="veiculo" ? veiculo===target : motorista===target;
    if(!match) continue;

    if(status.includes("MANUTEN"))
      return "🔧 MANUTENÇÃO";

    if(status.includes("VIAGEM"))
      return "✈️ VIAGEM";

    return "🔴 OCUPADO";
  }

  return "🟢 LIVRE";
}
