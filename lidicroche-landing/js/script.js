// ===== Configuração: troque pelo número real (55 + DDD + número) =====
const NUMERO = '5511999999999';

// ===== Catálogo: [nome, categoria, descrição]. A foto é img/N.jpg (N = posição na lista) =====
// Medidas por categoria (exemplos: ajuste aqui)
const MEDIDAS = {
    banheiro: 'Tapete 50×80 cm · contorno 45×50 cm · tampa 40×45 cm',
    tapete: 'Oval 60×90 cm · caminho 40×120 cm',
    mesa: 'Sousplat 38 cm · caminho 35×110 cm'
};

const PROD = [
    ['Jogo de Banheiro Terra Rosada', 'banheiro', '3 peças em marrom e rosa'],
    ['Jogo de Banheiro Lilás Jardim', 'banheiro', '3 peças em cinza e lilás'],
    ['Jogo de Banheiro Vinho Felpudo', 'banheiro', '3 peças com centro felpudo'],
    ['Jogo de Banheiro Rosé Antigo', 'banheiro', '3 peças em rosa e taupe'],
    ['Jogo de Banheiro Amarelo Margarida', 'banheiro', '3 peças com florzinhas'],
    ['Jogo de Banheiro Azul Royal com Laço', 'banheiro', '3 peças felpudas com laço'],
    ['Mesa Posta Azul Noite e Dourado', 'mesa', 'Sousplat, caminho e porta-guardanapo'],
    ['Mesa Posta Vinho e Flores', 'mesa', 'Sousplat, caminho e porta-guardanapo'],
    ['Jogo de Tapete Oval Rosa Flor', 'tapete', 'Oval + caminho em rosa e cru'],
    ['Jogo de Tapete Café com Leite', 'tapete', '3 peças ovais em marrom e creme'],
    ['Jogo de Tapete Azul Square', 'tapete', 'Caminho + quadrado'],
    ['Tapete Rendado Rosa Grande', 'tapete', 'Peça única em renda'],
    ['Jogo de Tapete Amarelo Sol', 'tapete', '3 peças ovais em amarelo e cinza']
].map(([n, c, d], i) => ({ id: i + 1, n, c, d, m: MEDIDAS[c] }));

let categoria = 'todos';
const lista = document.getElementById('lista');
const busca = document.getElementById('busca');

const zap = texto => `https://wa.me/${NUMERO}?text=${encodeURIComponent(texto)}`;
// Remove acentos e maiúsculas: "lilas" encontra "Lilás"
const norm = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

// Desenha os cartões conforme a categoria e a busca. Cada cartão abre o WhatsApp
function mostrar() {
    const termo = norm(busca.value.trim());
    lista.innerHTML = PROD
        .filter(p => (categoria == 'todos' || p.c == categoria) && norm(`${p.n} ${p.c} ${p.d}`).includes(termo))
        .map(p => `
            <a class="card" target="_blank" rel="noopener" href="${zap('Olá! Gostaria de consultar o preço do ' + p.n + '.')}">
                <div class="foto"><img src="img/${p.id}.jpg" alt="${p.n}" loading="lazy"></div>
                <h3>${p.n}</h3>
                <p>${p.d}</p>
                <p>${p.m}</p>
                <span>Consultar preço no WhatsApp →</span>
            </a>`)
        .join('') || '<p>Nenhuma peça encontrada.</p>';
}

// Filtros por categoria: marca o botão ativo e redesenha
document.querySelectorAll('[data-cat]').forEach(botao => botao.onclick = () => {
    categoria = botao.dataset.cat;
    document.querySelectorAll('[data-cat]').forEach(b => b.classList.toggle('on', b == botao));
    mostrar();
});

busca.oninput = mostrar;
document.querySelectorAll('[data-wa]').forEach(a => a.href = zap('Olá! Vim pelo site da LidiCrochê.'));
mostrar();
