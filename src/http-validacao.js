import chalk from "chalk";

function extraiLinks(arrLinks){
    return arrLinks.map((objLink) => Object.values(objLink).join())
}

async function checaStatus(listraURLs){
    const arrStatus = await Promise
    .all(
        listraURLs.map(async (url) => {
            try{
                const response = await fetch(url)
                return response.status;
            } catch (erro) {
               return manejaErros(erro);
            }
        })
    )
    return arrStatus;
}

function manejaErros (erro) {
   if (erro.cause.code === 'ENOTFOUND'){
    return 'link não econtrado';
   } else {
    return 'ocorreu algum erro';
   }
}

export default async function listaValidada(listaDeLinks){
    const links = extraiLinks(listaDeLinks);
    const status = await checaStatus(links);
    
    return listaDeLinks.map((objeto, indice) => ({
        ...objeto,
        status: status[indice]
    }))
}


