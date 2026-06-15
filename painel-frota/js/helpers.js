export function parseGviz(txt){

    return JSON.parse(
        txt.substring(
            txt.indexOf("{"),
            txt.lastIndexOf("}") + 1
        )
    );
}

export function getCell(c){

    return c?.f ?? c?.v ?? "";
}

export function formatarData(valor){

    if(!valor) return "";

    if(valor instanceof Date){

        return valor.toLocaleDateString("pt-BR");
    }

    return String(valor);
}
