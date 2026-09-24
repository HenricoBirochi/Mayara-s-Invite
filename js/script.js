/* ═══════════════════════════════════════════════════════════
   Convite XV Anos — Mayara Vaz Siqueira

   ►► EDITE APENAS O BLOCO "CONFIG" ABAIXO. ◄◄
      Todo o resto do site (datas por extenso, contagem
      regressiva, link do mapa, mensagem do WhatsApp) é
      gerado automaticamente a partir daqui.
   ═══════════════════════════════════════════════════════════ */

const CONFIG = {

  /* ---- A ANIVERSARIANTE ---- */
  nome:        'Mayara',
  nomeCompleto:'Mayara Vaz Siqueira',

  /* ---- DATA E HORA DA FESTA ----
     dataHora = início, no formato 'AAAA-MM-DDTHH:MM:SS' (24h)
     horaFim  = término ('01:00' = madrugada do dia seguinte)   */
  dataHora:    '2027-03-07T19:00:00',
  horaFim:     '01:00',

  /* ---- LOCAL ---- */
  local: {
    nome:     'Palacete Rosa',
    endereco: 'Rua Bom Pastor, 801 - Ipiranga, São Paulo - SP'
  },

  /* ---- CONFIRMAÇÃO DE PRESENÇA ----
     whatsapp: só números, com DDI 55.   ⚠ PLACEHOLDER */
  rsvp: {
    whatsapp: '5511999999999',
    prazo:    '20 de fevereiro'          /* ⚠ PLACEHOLDER */
  },

  /* ---- PRESENTES ----
     lista: use <b>...</b> para destacar tamanhos e números.
     pix:   deixe '' para esconder o cartão do Pix.          */
  presentes: {
    lista: [
      'Blusa/vestidos <b>tam. PP</b>',
      'Calças <b>tam. 38</b>',
      'Moleton <b>tam. P</b>',
      'Calçados <b>nº 37</b>',
      'Acessórios ou berloques <b>Prata / Dourado</b>',
      'Livros',
      'Maquiagens',
      'Perfumes e body splash'
    ],
    pix: ''
  },

  /* ---- MANUAL DO CONVIDADO ---- */
  manual: [
    'Chegue com <b>30 minutos de antecedência</b>. A entrada da debutante é o momento mais esperado da noite — e ninguém quer perder.',
    'O <b>convite é individual e intransferível</b>. Confirme no site quantas pessoas virão com você.',
    'Traje <b>esporte fino</b>. Venha bonito(a), mas confortável: a festa vai até <b>01h00</b>.',
    'Fotografe à vontade, mas <b>sem flash</b> durante a valsa e a entrada.',
    'Marque as fotos com <b>#Mayara15Anos</b> — quero ver a festa pelos seus olhos.',
    'Cuidado com as crianças na pista e perto da mesa do bolo.',
    'Acima de tudo: <b>dance muito</b>. A festa só acaba quando a última música tocar.'
  ],

  /* ---- MÚSICA DE FUNDO ----
     caminho do arquivo de áudio. A música NUNCA toca sozinha:
     só começa se a pessoa clicar no botão de play.
     Deixe '' para esconder o botão.                          */
  musica: {
    arquivo: 'audios/Beauty_and_the_Beast_Instrumental.mp3',
    volume:  45               /* 0 a 100 */
  },

  /* ---- FOTOS (opcional) ----
     Coloque as fotos em assets/fotos/ e liste os caminhos.
     Deixe [] para exibir molduras decorativas vazias.     */
  fotos: []
};

/* ═══════════════════════════════════════════════════════════
   Daqui para baixo não é necessário mexer.
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  const $  = (s, ctx) => (ctx || document).querySelector(s);
  const $$ = (s, ctx) => Array.from((ctx || document).querySelectorAll(s));

  const DATA_FESTA = new Date(CONFIG.dataHora);
  const semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const MESES = ['janeiro','fevereiro','março','abril','maio','junho',
                 'julho','agosto','setembro','outubro','novembro','dezembro'];
  const DIAS  = ['domingo','segunda-feira','terça-feira','quarta-feira',
                 'quinta-feira','sexta-feira','sábado'];

  const pad = n => String(n).padStart(2, '0');

  /* ───── 1. Preenche os textos vindos do CONFIG ───── */
  function preencher() {
    const d = DATA_FESTA;
    const valida = !isNaN(d.getTime());

    const textos = {
      dia:     valida ? pad(d.getDate())  : '--',
      mes:     valida ? pad(d.getMonth() + 1) : '--',
      hora:    valida ? `${pad(d.getHours())}h${pad(d.getMinutes())}` : '--',
      horaFim: CONFIG.horaFim ? CONFIG.horaFim.replace(':', 'h') : '',
      extenso: valida
        ? `${DIAS[d.getDay()]}, ${d.getDate()} de ${MESES[d.getMonth()]} de ${d.getFullYear()}`
        : 'data a confirmar',
      curta:   valida ? `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}` : '',
      prazo:   CONFIG.rsvp.prazo
    };

    $$('[data-date]').forEach(el => {
      const chave = el.dataset.date;
      if (textos[chave] !== undefined) el.textContent = textos[chave];
    });

    $$('[data-venue]').forEach(el => {
      el.textContent = CONFIG.local[el.dataset.venue] || '';
    });

    // Nomes
    $$('.hero-name, .convite-sign').forEach(el => el.textContent = CONFIG.nome);
    $$('.hero-full, .rodape-name').forEach(el => el.textContent = CONFIG.nomeCompleto);
    $('.env-letter-script').textContent = CONFIG.nome;
    $('.seal-letter').textContent = CONFIG.nome.charAt(0).toUpperCase();
    document.title = `${CONFIG.nome} · XV Anos`;

    // Mapa
    const mapa = $('#mapaLink');
    if (mapa) {
      mapa.href = 'https://www.google.com/maps/search/?api=1&query=' +
                  encodeURIComponent(`${CONFIG.local.nome}, ${CONFIG.local.endereco}`);
    }

    // Sugestões de presentes
    $('#presentesLista').innerHTML =
      CONFIG.presentes.lista.map(i => `<li>${i}</li>`).join('');

    // Pix (opcional — some se a chave estiver vazia)
    const temPix = !!(CONFIG.presentes.pix || '').trim();
    $('#pixCard').hidden = !temPix;
    if (temPix) $('#pixValor').textContent = CONFIG.presentes.pix;

    // Manual
    $('#manualLista').innerHTML =
      CONFIG.manual.map(t => `<li>${t}</li>`).join('');

    // Galeria
    const grid = $('#galeriaGrid');
    const fotos = CONFIG.fotos.length ? CONFIG.fotos : [null, null, null];
    grid.innerHTML = fotos.map((src, i) => src
      ? `<div class="foto reveal" data-delay="${i % 4}"><img src="${src}" alt="Foto de ${CONFIG.nome}" loading="lazy"></div>`
      : `<div class="foto foto-vazia reveal" data-delay="${i % 4}" aria-hidden="true">${CONFIG.nome.charAt(0)}</div>`
    ).join('');

    if (valida) gerarICS();
  }

  /* ───── 2. Arquivo .ics para "salvar na agenda" ───── */
  function gerarICS() {
    const fmt = dt => dt.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    // Término: mesmo dia; se for menor que o início, é na madrugada seguinte.
    const fim = new Date(DATA_FESTA);
    const [hF, mF] = (CONFIG.horaFim || '').split(':').map(Number);
    if (!isNaN(hF)) {
      fim.setHours(hF, mF || 0, 0, 0);
      if (fim <= DATA_FESTA) fim.setDate(fim.getDate() + 1);
    } else {
      fim.setTime(DATA_FESTA.getTime() + 5 * 3600 * 1000);
    }

    const ics = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Convite XV//PT-BR',
      'BEGIN:VEVENT',
      `UID:xv-${Date.now()}@convite`,
      `DTSTAMP:${fmt(new Date())}`,
      `DTSTART:${fmt(DATA_FESTA)}`,
      `DTEND:${fmt(fim)}`,
      `SUMMARY:15 anos de ${CONFIG.nomeCompleto}`,
      `LOCATION:${CONFIG.local.nome}\\, ${CONFIG.local.endereco.replace(/,/g, '\\,')}`,
      'DESCRIPTION:Traje esporte fino.',
      'END:VEVENT', 'END:VCALENDAR'
    ].join('\r\n');

    const link = $('#agendaLink');
    if (link) link.href = 'data:text/calendar;charset=utf-8,' + encodeURIComponent(ics);
  }

  /* ───── 3. Pétalas caindo ───── */
  function petalas(container, qtd) {
    if (semMovimento || !container) return;
    const frag = document.createDocumentFragment();
    for (let i = 0; i < qtd; i++) {
      const p = document.createElement('span');
      const tam = 6 + Math.random() * 11;
      p.className = 'petala';
      p.style.cssText =
        `left:${Math.random() * 100}%;` +
        `width:${tam}px;height:${tam}px;` +
        `--dx:${(Math.random() * 160 - 80).toFixed(0)}px;` +
        `animation-duration:${(9 + Math.random() * 9).toFixed(1)}s;` +
        `animation-delay:${(-Math.random() * 14).toFixed(1)}s;` +
        `opacity:${(0.35 + Math.random() * 0.4).toFixed(2)};`;
      frag.appendChild(p);
    }
    container.appendChild(frag);
  }

  /* ───── 4. Contagem regressiva ───── */
  function contagem() {
    const els = {
      d: $('#cdDias'), h: $('#cdHoras'),
      m: $('#cdMin'),  s: $('#cdSeg')
    };
    const grid = $('#countdown');
    const done = $('#countDone');
    if (!els.d || isNaN(DATA_FESTA.getTime())) return;

    const tick = () => {
      let resto = DATA_FESTA.getTime() - Date.now();

      if (resto <= 0) {
        grid.hidden = true;
        done.hidden = false;
        clearInterval(timer);
        return;
      }

      const seg = Math.floor(resto / 1000);
      els.d.textContent = pad(Math.floor(seg / 86400));
      els.h.textContent = pad(Math.floor(seg / 3600) % 24);
      els.m.textContent = pad(Math.floor(seg / 60) % 60);
      els.s.textContent = pad(seg % 60);
    };

    tick();
    const timer = setInterval(tick, 1000);
  }

  /* ───── 5. Reveal no scroll ───── */
  function revelar() {
    const alvos = $$('.reveal');
    if (!('IntersectionObserver' in window) || semMovimento) {
      alvos.forEach(el => el.classList.add('is-in'));
      return;
    }
    const obs = new IntersectionObserver((entradas) => {
      entradas.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    alvos.forEach(el => obs.observe(el));
  }

  /* ───── 6. Envelope de abertura ───── */
  function envelope() {
    const tela = $('#envelopeScreen');
    const btn  = $('#envelopeBtn');
    const site = $('#site');
    let aberto = false;

    petalas($('#envPetals'), 14);

    const abrir = () => {
      if (aberto) return;
      aberto = true;

      btn.classList.add('is-open');
      $('.env-hint').style.opacity = '0';

      setTimeout(() => {
        tela.classList.add('is-gone');
        document.body.classList.remove('is-locked');
        site.classList.add('is-in');
        revelar();
      }, semMovimento ? 100 : 950);

      setTimeout(() => { tela.hidden = true; }, 2200);
    };

    btn.addEventListener('click', abrir);
  }

  /* ───── 7. Música de fundo (arquivo local) ─────
     A música nunca começa sozinha: só toca se a pessoa
     clicar no botão. Nada de autoplay.                     */
  const btnMusica = $('#musicBtn');
  const audioMusica = $('#musicAudio');
  let tocando = false;

  function prepararMusica() {
    const arquivo = CONFIG.musica && CONFIG.musica.arquivo;
    if (!audioMusica || !arquivo) { indisponivel(); return; }

    audioMusica.src = arquivo;
    audioMusica.load();
    audioMusica.volume = (CONFIG.musica.volume ?? 45) / 100;
    audioMusica.addEventListener('canplay', () => {
      btnMusica.hidden = false;
      requestAnimationFrame(() => btnMusica.classList.add('is-in'));
    }, { once: true });
    audioMusica.addEventListener('play', () => {
      tocando = true;
      pintarBotao();
    });
    audioMusica.addEventListener('pause', () => {
      tocando = false;
      pintarBotao();
    });
    audioMusica.addEventListener('ended', () => {
      tocando = false;
      audioMusica.currentTime = 0;
      pintarBotao();
    });
    audioMusica.addEventListener('error', indisponivel, { once: true });

    btnMusica.addEventListener('click', () => {
      if (!audioMusica) return;
      if (tocando) {
        audioMusica.pause();
      } else {
        audioMusica.play().catch(indisponivel);
      }
    });
  }

  function indisponivel() {
    btnMusica.hidden = false;
    btnMusica.classList.add('is-in');
    btnMusica.classList.add('is-error');
    btnMusica.setAttribute('aria-label', 'Tentar tocar música novamente');
    $('.music-label', btnMusica).textContent = 'Toque para tentar novamente';
  }

  function pintarBotao() {
    btnMusica.classList.remove('is-error');
    btnMusica.classList.toggle('is-playing', tocando);
    btnMusica.setAttribute('aria-label', tocando ? 'Pausar música' : 'Tocar música');
    $('.music-label', btnMusica).textContent = tocando ? 'Tocando' : 'Clique para ouvir';
  }

  /* ───── 8. Modais ───── */
  function modais() {
    const root = $('#modalRoot');
    let ativo = null;
    let ultimoFoco = null;

    const abrir = (id) => {
      const m = $('#modal-' + id);
      if (!m) return;
      ultimoFoco = document.activeElement;
      ativo = m;

      root.hidden = false;
      m.hidden = false;
      document.body.classList.add('is-locked');

      requestAnimationFrame(() => {
        root.classList.add('is-in');
        m.classList.add('is-in');
      });

      const foco = m.querySelector('input, textarea, a, button:not(.modal-x)') || $('.modal-x', m);
      setTimeout(() => foco && foco.focus({ preventScroll: true }), 220);
    };

    const fechar = () => {
      if (!ativo) return;
      const m = ativo;
      ativo = null;

      m.classList.remove('is-in');
      root.classList.remove('is-in');
      document.body.classList.remove('is-locked');

      setTimeout(() => {
        m.hidden = true;
        root.hidden = true;
        if (ultimoFoco) ultimoFoco.focus({ preventScroll: true });
      }, 400);
    };

    $$('[data-modal]').forEach(b =>
      b.addEventListener('click', () => abrir(b.dataset.modal)));

    root.addEventListener('click', (e) => {
      if (e.target.closest('[data-close]')) fechar();
    });

    document.addEventListener('keydown', (e) => {
      if (!ativo) return;
      if (e.key === 'Escape') { fechar(); return; }
      if (e.key !== 'Tab') return;

      // Mantém o foco dentro do modal
      const focaveis = $$('a[href], button, input, textarea, select', ativo)
        .filter(el => !el.disabled && el.offsetParent !== null);
      if (!focaveis.length) return;

      const primeiro = focaveis[0];
      const ultimo   = focaveis[focaveis.length - 1];

      if (e.shiftKey && document.activeElement === primeiro) {
        e.preventDefault(); ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault(); primeiro.focus();
      }
    });
  }

  /* ───── 9. Formulário de RSVP → WhatsApp ───── */
  function rsvp() {
    const form   = $('#rsvpForm');
    const erro   = $('#rsvpErro');
    const campoQ = $('#campoQtd');

    // Esconde "quantas pessoas" se a resposta for "não"
    $$('input[name="presenca"]', form).forEach(r =>
      r.addEventListener('change', () => {
        campoQ.classList.toggle('is-oculto', r.value === 'nao' && r.checked);
      }));

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nome = $('#rsvpNome').value.trim();
      if (nome.length < 2) {
        erro.textContent = 'Por favor, escreva seu nome para eu saber quem é. ♥';
        erro.hidden = false;
        $('#rsvpNome').focus();
        return;
      }
      erro.hidden = true;

      const vai    = form.presenca.value === 'sim';
      const qtd    = Math.max(1, parseInt($('#rsvpQtd').value, 10) || 1);
      const recado = $('#rsvpRecado').value.trim();

      const linhas = [
        `Olá! Confirmando presença nos 15 anos da ${CONFIG.nome}.`,
        '',
        `*Nome:* ${nome}`,
        `*Presença:* ${vai ? 'Sim, vou!' : 'Infelizmente não poderei ir'}`
      ];
      if (vai) linhas.push(`*Pessoas:* ${qtd}`);
      if (recado) linhas.push('', `*Recado:* ${recado}`);

      const url = `https://wa.me/${CONFIG.rsvp.whatsapp}?text=` +
                  encodeURIComponent(linhas.join('\n'));
      window.open(url, '_blank', 'noopener');
    });
  }

  /* ───── 10. Copiar chave Pix ───── */
  function pix() {
    const btn = $('#pixCopiar');
    const txt = $('#pixCopiarTxt');
    if (!btn) return;

    btn.addEventListener('click', async () => {
      const chave = CONFIG.presentes.pix;
      try {
        await navigator.clipboard.writeText(chave);
      } catch (_) {
        const tmp = document.createElement('textarea');
        tmp.value = chave;
        tmp.style.cssText = 'position:fixed;opacity:0';
        document.body.appendChild(tmp);
        tmp.select();
        try { document.execCommand('copy'); } catch (__) {}
        tmp.remove();
      }
      txt.textContent = 'Chave copiada! ♥';
      setTimeout(() => { txt.textContent = 'Copiar chave'; }, 2200);
    });
  }

  /* ───── Inicialização ───── */
  document.addEventListener('DOMContentLoaded', () => {
    preencher();
    envelope();
    petalas($('#heroPetals'), 12);
    contagem();
    modais();
    rsvp();
    pix();
    prepararMusica();
  });
})();
