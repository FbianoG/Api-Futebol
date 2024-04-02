const campeonato = `https://api.api-futebol.com.br/v1/campeonatos/10/tabela`;
const artilharia = `https://api.api-futebol.com.br/v1/campeonatos/10/artilharia`;
const tabela = document.querySelectorAll('tbody')[0]
const painelArt = document.querySelectorAll('.painelArt')[0]





async function getCamp() {
    const response = await fetch(campeonato, {
        method: "GET",
        headers: {
            "Authorization": "Bearer test_58412d5c162971c199bd17ab88dfd5"
        }
    })
    const data = await response.json()
    createTabela(data)
}

function createTabela(params) {
    params.forEach((element, index) => {
        const newClube = document.createElement("tr")
        newClube.innerHTML = createClubeHTML(element)
        tabela.appendChild(newClube)

        if (index < 4) {
            newClube.style.borderLeftColor = "#1e46b1"
        }
        if (index > 15) {
            newClube.style.borderLeftColor = "#e71a1a"
        }
    })
}

function createClubeHTML(params) {
    const HTML = `
        <td>${params.posicao}º</td>
        <td class="trImg"><img src="${params.time.escudo}" alt=""></td>
        <td class="trClube">${params.time.nome_popular}</td>
        <td class="trPts">${params.pontos}</td>
        <td>${params.jogos}</td>
        <td>${params.vitorias}</td>
        <td>${params.empates}</td>
        <td>${params.derrotas}</td>
        <td>${params.gols_pro}</td>
        <td>${params.gols_contra}</td>
        <td>${params.saldo_gols}</td>
        <td class="tdJogos">${checkJogos(params.ultimos_jogos)}</td>
    `
    return HTML
}

function checkJogos(params) {
    const result = params.map(element => {
        if (element === "v") {
            return '<i class="fa-solid fa-circle-check"></i>'
        } else if (element === "e") {
            return '<i class="fa-solid fa-circle-xmark"></i>'
        } else {
            return '<i class="fa-solid fa-circle-minus"></i>'
        }
    })
    return result.join("")
}

async function getArt() {
    const response = await fetch(artilharia, {
        method: "GET",
        headers: {
            "Authorization": "Bearer test_58412d5c162971c199bd17ab88dfd5"
        }
    })
    const data = await response.json()
    createArt(data)
}

function createArt(params) {
    params.forEach((element, index) => {
        const newArt = document.createElement("div")
        newArt.classList = "artCard"
        newArt.innerHTML = createArtHTML(element, index)
        painelArt.appendChild(newArt)
    });
}

function createArtHTML(params, index) {
    const HTML = `
        <span>${index + 1}º</span>
        <div class="dataArt">
            <span>${params.atleta.nome_popular}</span>
            <div class="dataArtClub">
                <img src="${params.time.escudo}" alt="">
                <span>${params.time.nome_popular}</span>
            </div>    
        </div>
        <span>${params.gols}</span>
    `
    return HTML
}


getCamp()
getArt()