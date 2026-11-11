
/* ==============================
   🌙 MODO ESCURO
============================== */

const temaBtn = document.getElementById("temaBtn");

function atualizarTema() {
    const escuro = document.body.classList.contains("dark-mode");

    temaBtn.textContent = escuro
        ? "☀️ Modo claro"
        : "🌙 Modo escuro";
}

if (localStorage.getItem("tema") === "escuro") {
    document.body.classList.add("dark-mode");
}

atualizarTema();

temaBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    const tema = document.body.classList.contains("dark-mode")
        ? "escuro"
        : "claro";

    localStorage.setItem("tema", tema);
    atualizarTema();
});


/* ==============================
   🔎 PESQUISA DE RAÇAS
============================== */

const pesquisaRaca = document.getElementById("pesquisaRaca");
const resultadoPesquisa = document.getElementById("resultadoPesquisa");

pesquisaRaca.addEventListener("input", () => {

    const busca = pesquisaRaca.value.toLowerCase().trim();

    const racas = document.querySelectorAll("#listaRacas .card");

    let encontrados = 0;

    racas.forEach(card => {

        const conteudo = card.textContent.toLowerCase();

        const corresponde = conteudo.includes(busca);

        card.style.display = corresponde ? "" : "none";

        if (corresponde) {
            encontrados++;
        }
    });

    if (busca) {
        resultadoPesquisa.textContent =
            encontrados + " raça(s) encontrada(s).";
    } else {
        resultadoPesquisa.textContent = "";
    }
});


/* ==============================
   🛡️ PROTEÇÃO DE COMENTÁRIOS
============================== */

const palavrasProibidas = [
    "idiota",
    "imbecil",
    "retardado",
    "desgraçado",
    "desgracado",
    "vagabundo",
    "vagabunda",
    "otario",
    "babaca",
    "fdp",
    "filho da puta",
    "vai se ferrar",
    "vai tomar no cu"
];

function normalizar(texto) {

    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\p{L}\p{N}\s]/gu, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function comentarioOfensivo(texto) {

    const comentario = normalizar(texto);

    return palavrasProibidas.some(palavra => {

        const termo = normalizar(palavra);

        return (
            (" " + comentario + " ")
            .includes(" " + termo + " ")
        );
    });
}


/* ==============================
   💬 SISTEMA DE COMENTÁRIOS
============================== */

function criarComentarios(card) {

    const area = document.createElement("div");
    area.className = "comentarios";

    const titulo = document.createElement("h4");
    titulo.textContent = "💬 Comentários";

    const lista = document.createElement("div");

    const formulario = document.createElement("form");

    const campo = document.createElement("input");

    campo.type = "text";
    campo.placeholder = "Escreva um comentário...";
    campo.maxLength = 300;
    campo.required = true;

    const botao = document.createElement("button");

    botao.type = "submit";
    botao.textContent = "Comentar 💗";

    const aviso = document.createElement("p");

    aviso.className = "aviso";

    aviso.textContent =
        "Respeite todos! Comentários ofensivos não são permitidos.";

    formulario.append(campo, botao);

    formulario.addEventListener("submit", event => {

        event.preventDefault();

        const texto = campo.value.trim();

        if (!texto) return;

        if (comentarioOfensivo(texto)) {

            alert(
                "🚫 Comentário bloqueado!\n" +
                "Use palavras respeitosas para participar."
            );

            campo.value = "";
            return;
        }

        const comentario = document.createElement("div");

        comentario.className = "comentario";

        const textoComentario = document.createElement("p");

        textoComentario.textContent = "🐾 Visitante: " + texto;

        const excluir = document.createElement("button");

        excluir.type = "button";
        excluir.textContent = "Excluir comentário";
        excluir.style.marginTop = "8px";
        excluir.style.padding = "7px";

        excluir.addEventListener("click", () => {
            comentario.remove();
        });

        comentario.append(textoComentario, excluir);

        lista.appendChild(comentario);

        campo.value = "";
    });

    area.append(titulo, aviso, lista, formulario);

    card.appendChild(area);
}


/* ==============================
   📸 PUBLICAR FOTOS DOS GATOS
============================== */

const postForm = document.getElementById("postForm");

const galeria = document.getElementById("galeria");

postForm.addEventListener("submit", event => {

    event.preventDefault();

    const nome = document.getElementById("nomeGato").value.trim();

    const raca = document.getElementById("racaGato").value.trim();

    const descricao = document.getElementById("descricao").value.trim();

    const arquivo = document.getElementById("fotoGato").files[0];

    if (!arquivo || !arquivo.type.startsWith("image/")) {

        alert("Escolha uma imagem válida!");
        return;
    }

    if (arquivo.size > 5 * 1024 * 1024) {

        alert("A imagem deve ter no máximo 5 MB.");
        return;
    }

    const leitor = new FileReader();

    leitor.onload = () => {

        const card = document.createElement("div");

        card.className = "card";

        const imagem = document.createElement("img");

        imagem.src = leitor.result;
        imagem.alt = "Foto de " + nome;

        const titulo = document.createElement("h3");

        titulo.textContent = "🐱 " + nome;

        const racaTexto = document.createElement("p");

        racaTexto.textContent =
            "Raça: " + (raca || "Não informada");

        const texto = document.createElement("p");

        texto.textContent = descricao;

        const curtidas = document.createElement("button");

        let quantidade = 0;

        curtidas.textContent = "♡ Curtir (0)";

        curtidas.addEventListener("click", () => {

            quantidade++;

            curtidas.textContent =
                "♥ Curtir (" + quantidade + ")";
        });

        card.append(
            imagem,
            titulo,
            racaTexto,
            texto,
            curtidas
        );

        criarComentarios(card);

        galeria.prepend(card);

        postForm.reset();
    };

    leitor.onerror = () => {
        alert("Não foi possível carregar a imagem.");
    };

    leitor.readAsDataURL(arquivo);
});


/* ==============================
   👤 CADASTRO DEMONSTRATIVO
============================== */

const cadastroForm = document.getElementById("cadastroForm");

cadastroForm.addEventListener("submit", event => {

    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();

    const email = document.getElementById("email").value.trim();

    const senha = document.getElementById("senha").value;

    if (senha.length < 6) {

        alert("A senha precisa ter pelo menos 6 caracteres.");
        return;
    }

    document.getElementById("mensagem").textContent =
        "💗 Bem-vindo ao CatLovers, " + nome + "!";

    console.log("Cadastro demonstrativo:", email);

    cadastroForm.reset();
});
