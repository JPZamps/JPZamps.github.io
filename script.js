document.documentElement.classList.add('js');

const topo = document.getElementById('topo');
const menuBtn = document.querySelector('.menu-btn');
const nav = document.getElementById('nav');

addEventListener('scroll', () => topo.classList.toggle('rolou', scrollY > 8), { passive: true });

function alternarMenu(abrir) {
  nav.classList.toggle('aberto', abrir);
  menuBtn.setAttribute('aria-expanded', String(abrir));
  menuBtn.setAttribute('aria-label', abrir ? 'Fechar menu' : 'Abrir menu');
}
menuBtn.addEventListener('click', () => alternarMenu(!nav.classList.contains('aberto')));
nav.addEventListener('click', (e) => { if (e.target.closest('a')) alternarMenu(false); });

const observador = new IntersectionObserver((entradas) => {
  for (const entrada of entradas) {
    if (entrada.isIntersecting) {
      entrada.target.classList.add('visivel');
      observador.unobserve(entrada.target);
    }
  }
}, { threshold: 0.12 });
document.querySelectorAll('.rev').forEach((el) => observador.observe(el));

document.getElementById('ano').textContent = new Date().getFullYear();

// Cursor personalizado: ponto + anel que segue com leve atraso. Só em dispositivos com mouse.
if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
  const c1 = Object.assign(document.createElement('div'), { id: 'c1' });
  const c2 = Object.assign(document.createElement('div'), { id: 'c2' });
  document.body.append(c1, c2);
  document.documentElement.classList.add('cursor-on');

  let x = 0, y = 0, ax = 0, ay = 0, visivel = false;
  addEventListener('mousemove', (e) => {
    x = e.clientX; y = e.clientY;
    if (!visivel) { visivel = true; ax = x; ay = y; c1.style.opacity = c2.style.opacity = 1; }
    c1.style.left = x + 'px'; c1.style.top = y + 'px';
    c2.classList.toggle('ativo', !!e.target.closest('a, button, .card, .roteiro'));
  });
  document.addEventListener('mouseleave', () => { visivel = false; c1.style.opacity = c2.style.opacity = 0; });
  (function seguir() {
    ax += (x - ax) * 0.18; ay += (y - ay) * 0.18;
    c2.style.left = ax + 'px'; c2.style.top = ay + 'px';
    requestAnimationFrame(seguir);
  })();
}
