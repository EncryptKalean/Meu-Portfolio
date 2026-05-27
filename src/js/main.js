const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) atualizarMenu(entry.target);
    });
}, { threshold: 0.5 });

const menuBtns = document.querySelector('header nav');
const todasSections = document.querySelectorAll('main section');

const linksMenu = {
    home: menuBtns.querySelector('a[href="#"]'),
    sobre: menuBtns.querySelector('a[href="#sobre"]'),
    projetos: menuBtns.querySelector('a[href="#projetos"]'),
    habilidades: menuBtns.querySelector('a[href="#habilidades"]'),
}

todasSections.forEach((el) => { observer.observe(el) });

function atualizarMenu(section) {
    const sectionAntiga = menuBtns.querySelector('.section-atual');

    if (sectionAntiga) {
        sectionAntiga.removeAttribute('aria-current');
        sectionAntiga.classList.remove('section-atual');
    };

    const sectionAtual = linksMenu[section.id];

    if (!sectionAtual) return;

    sectionAtual.setAttribute('aria-current', 'page');
    sectionAtual.classList.add('section-atual');
};


navigator.serviceWorker.register("./sw.js").then((reg) => {

    // verifica atualização
    reg.update();

    reg.addEventListener("updatefound", () => {
        const newWorker = reg.installing;

        newWorker.addEventListener("statechange", () => {
            if (newWorker.state === "installed") {

                // já existia SW antigo
                if (navigator.serviceWorker.controller) {

                    // evita reload em background
                    if (document.visibilityState === "visible") {
                        window.location.reload();
                    }
                }
            }
        });
    });
});

// FALLBACK DO HEADER STICKY --------------------------------------------
const FORCE_FALLBACK = false;

if (
    FORCE_FALLBACK ||
    !CSS.supports("animation-timeline: view()")
) {
    console.log("fallback");

    const observerHeader = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            entry.target.classList.toggle('show', !entry.isIntersecting);
        });
    }, { threshold: 1 });

    observerHeader.observe(document.querySelector('header'));
}
