//------------------------------------ Scroll-Reveal

const myObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show')
        } else {
            entry.target.classList.remove('show')
        }
    })
})

const elements = document.querySelectorAll(".hidden")

elements.forEach((el) => {
    myObserver.observe(el)
})



//------------------------------------ Troca de galeria

const categ_btns = document.querySelectorAll('.categoria_projetos_btns a'),
    categ = document.querySelector('.categoria_projetos_btns');

categ_btns.forEach((btn) => {
    btn.addEventListener('click', () => { troca(btn.id) })
    btn.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            troca(btn.id)
        }
    })
})

function troca(tipo) {
    categ_btns.forEach((btn) => {
        btn.classList.remove('categoria_selecionada')
    })

    document.querySelectorAll('.container-projetos').forEach((li) => { li.style.display = 'none' })

    document.getElementById(tipo).classList.add('categoria_selecionada')

    document.querySelector(`.biblioteca-${tipo}`).style.display = 'flex'

    section_exibicao.style.display = 'none'
    botoes_container.style.display = 'none'
}

// ------------------------------------- Exibição de imagens (Wordpress)

var exibicao = document.querySelectorAll('.container_exibicao img');

const section_exibicao = document.querySelector('.exibicao_imagens'),
    container_exibicao = document.querySelector('.container_exibicao'),
    seta_esquerda = document.querySelector('.seta_esquerda'),
    seta_direita = document.querySelector('.seta_direita'),
    fechar_btn = document.querySelector('.fechar'),
    botoes_container = document.querySelector('.botoes_container'),
    projetos_wordpress_container = document.querySelector('.biblioteca-wordpress');

var imagem = 0
var quantidadeImagem = 0

projetos_wordpress_container.addEventListener('click', (click) => {
    const cardWP = click.target.closest('.biblioteca-wordpress .projeto')

    if (cardWP) {
        section_exibicao.style.display = 'flex'
        botoes_container.style.display = 'flex'

        document.querySelector('.exibicao_imagens').scrollIntoView({});

        quantidadeImagem = +document.getElementById(cardWP.id).getAttribute('quantidadeDeImagem')
        renderizandoWordpress(cardWP.id)

        if (quantidadeImagem === 1) {
            seta_direita.style.display = 'none'
            seta_esquerda.style.display = 'none'
        } else {
    seta_direita.style.display = 'flex'
    seta_esquerda.style.display = 'flex'
            botoes_container.style.display = 'flex'
        }
    }
})

seta_direita.addEventListener('click', () => {

    if (imagem > `-${(quantidadeImagem - 1) * 100}`) {
        imagem = imagem - 100

        document.querySelector('.exibicao_imagens').scrollIntoView({});

        exibicao.forEach((img) => {
            img.style.transform = `translateX(${imagem}%)`
        })
    }

})

seta_esquerda.addEventListener('click', () => {
    if (imagem < 0) {
        imagem = imagem + 100

        document.querySelector('.exibicao_imagens').scrollIntoView({});

        // 
        exibicao.forEach((img) => {
            img.style.transform = `translateX(${imagem}%)`
        })
    }

})


function renderizandoWordpress(projeto) {

    container_exibicao.innerHTML = ``

    for (let i = 0; i < quantidadeImagem; i++) {
        container_exibicao.innerHTML += `
    <img src="src/previews/wordpress-${projeto}-preview-${i + 1}.webp" alt="">
    `
    }

    exibicao = document.querySelectorAll('.container_exibicao img');
    exibicao.forEach((img) => {
        img.style.transform = `translateX(${0}%)`
    })
}

fechar_btn.addEventListener('click', () => {
    section_exibicao.style.display = 'none'
    botoes_container.style.display = 'none'
})



// ------------------------------------- Esconde a header caso cubra o TAB Focus

const section_habilidades = document.getElementById('projetos'),
    section_habilidades_btns = document.querySelectorAll('#projetos a'),
    header = document.querySelector('header');

var emFocus = false

section_habilidades.addEventListener('focus', () => {
    emFocus = true
    esconde()
    setTimeout(() => { emFocus = false }, 1000)
})

section_habilidades_btns.forEach((btn) => {
    btn.addEventListener('focus', () => {
        emFocus = true
        esconde()
        setTimeout(() => { emFocus = false }, 1000)
    })

})

function esconde() {
    header.style.top = '-100px'
    setTimeout(() => {
        if (emFocus === false) {
            header.style.top = '0'
        }
    }, 10000)
}