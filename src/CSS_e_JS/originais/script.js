// OBSERVERS
const configMap = [
    {
        //---- Scroll-Reveal
        // Detecta quando elementos com a classe 'hidden' entram na viewport e aplica a classe 'show'
        threshold: 0,
        selector: '.hidden',
        callback: (entry) => {
            entry.target.classList.toggle('show', entry.isIntersecting);
        }
    },
    {
        // Aplica classe ao header quando ele deixa de estar visível (usado para sticky effect)
        threshold: 1,
        selector: 'header',
        callback: (entry) => {
            entry.target.classList.toggle('show', !entry.isIntersecting);
        }
    },
    {
        // Aplica classe 'show' ao link do header correspondente à section atualmente visível
        threshold: 0.5,
        selector: 'section',
        callback: (entry) => {
            const section = document.querySelector(`header a[name='${entry.target.id}']`);
            section.classList.toggle('show', entry.isIntersecting);
        }
    }
];


configMap.forEach(({ threshold, selector, callback }) => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(callback);
    }, { threshold });

    document.querySelectorAll(selector).forEach(el => observer.observe(el));
});



/* 
// ------------------------------------- Exibição de imagens (Wordpress)

var exibicao;
let container_exibicao = document.getElementById('container_exibicao');

const section_exibicao = document.getElementById('exibicao_imagens'),
    botoes_container = document.getElementById('botoes_container'),
    container_wordpress = document.querySelector('.biblioteca-wordpress');

// Quantidade de imagens que o projeto tem a mostrar
var quantidadeImagens = 0;

function renderizandoWordpress(projeto) {
    // Reseta o container_exibicao para ele ficar limpo
    const reset = container_exibicao.cloneNode(false);

    container_exibicao.replaceWith(reset);

    container_exibicao = document.getElementById('container_exibicao');

    // Renderiza as imagens do projeto
    for (let i = 1; i <= quantidadeImagens; i++) {
        const img = document.createElement('img');
        img.src = `src/previews/wordpress-${projeto}-preview-${i}.webp`;

        container_exibicao.appendChild(img);
    }
}

// Prepara a visualização dos projetos
container_wordpress.addEventListener('click', (click) => {
    const cardWP = click.target.closest('.projeto');

    if (cardWP) {
        // Pega a quantidade de imagem que o projeto tem
        quantidadeImagens = +document.getElementById(cardWP.id).getAttribute('quantidadeDeImagem');

        section_exibicao.style.display = 'flex';
        botoes_container.style.display = 'flex';

        document.getElementById('exibicao_imagens').scrollIntoView({});

        renderizandoWordpress(cardWP.id);

        // Se a quantidade de imagens for maior que 1, então mostra os botões para movimentar o carrossel, se não, deixa escondido
        botoes_container.querySelectorAll('button').forEach((btn) => { btn.style.display = `${(quantidadeImagens > 1 ? 'flex' : 'none')}` });

        botoes_container.querySelector('#fechar').style.opacity = '1';
    }
});

botoes_container.addEventListener('click', (click) => {
    const seta = click.target.closest('button');

    if (seta) {
        if (seta.id === 'fechar') {
            section_exibicao.style.display = 'none';
            botoes_container.style.display = 'none';
        }
        else {
            const tamanho_rolagem = container_exibicao.clientWidth;
            const limite = container_exibicao.offsetWidth * (quantidadeImagens - 1);
            const div = container_exibicao;

            // Se o scroll atingir o limite, ele volta para o início ou fim, criando um efeito de looping
            if(div.scrollLeft >= limite || div.scrollLeft <= 0) div.scrollLeft = (div.scrollLeft >= limite ? -1 : 1) * (tamanho_rolagem * quantidadeImagens);
            // Se o botão apertado for "seta_esquerda" ele volta o scroll, se não for, continua normalmente
            else div.scrollLeft += (seta.id === 'seta_esquerda' ? -1 : 1) * tamanho_rolagem;

            container_exibicao.scrollIntoView({});
        }
    };
});


//------------------------------------ Troca de galeria

const categ = document.getElementById('categoria_projetos_btns');

function troca(tipo) {
    categ.querySelectorAll('button').forEach((btn) => { btn.classList.toggle('categoria_selecionada') });

    // Alterna entre os projetos HTML e WordPress, exibindo apenas a galeria selecionada
    const esconder = document.querySelector(`.biblioteca-${tipo === 'html' ? 'wordpress' : 'html'}`);
    const mostrar = document.querySelector(`.biblioteca-${tipo}`);

    esconder.style.display = 'none';
    mostrar.style.display = 'flex';

    if (tipo === 'html') {
        section_exibicao.style.display = 'none';
        botoes_container.style.display = 'none';
    }
}

categ.addEventListener('click', (click) => {
    const btn = click.target.closest('button');

    if (btn) troca(btn.id);
});
*/



// Esconde o header ao focar em um projeto e o exibe novamente após 10 segundos
const section_habilidades = document.getElementById('projetos'),
    header = document.querySelector('header');

let mostrarHeader;

// Ao focar em um 'a' esconde o header para não atrapalhar a visualização
section_habilidades.addEventListener('focusin', (focus) => {
    if (focus.target.closest('a')) {

        clearTimeout(mostrarHeader);

        header.style.top = '-100px';

        mostrarHeader = setTimeout(() => { header.style.top = '-1px' }, 10000);
    }
})