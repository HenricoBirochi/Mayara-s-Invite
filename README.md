# Convite XV Anos — Mayara Vaz Siqueira

Convite interativo de página única, no estilo dos convites digitais da Liebe Design.
HTML, CSS e JavaScript puros — sem build, sem dependências, sem backend.

**Paleta:** pergaminho envelhecido, bordô profundo e dourado — extraída dos
convites de referência (`#7b2423`, `#a83122`, `#917705`, `#fdf7ec`).

## Como ver

Abra o `index.html` no navegador, ou rode um servidor local:

```bash
python3 -m http.server 8000
# depois acesse http://localhost:8000
```

## Como editar

**Todos os dados ficam num único lugar:** o bloco `CONFIG` no topo de
[`js/script.js`](js/script.js). Não é preciso mexer no HTML.

```js
const CONFIG = {
  nome:         'Mayara',
  nomeCompleto: 'Mayara Vaz Siqueira',
  dataHora:     '2027-03-07T19:00:00',   // início
  horaFim:      '01:00',                 // término (madrugada seguinte)
  local:     { nome: 'Palacete Rosa', endereco: 'Rua Bom Pastor, 801 — ...' },
  rsvp:      { whatsapp: '5511999999999', prazo: '20 de fevereiro' },
  presentes: { lista: [...], pix: '' },
  manual:    [...],
  musica:    { arquivo: 'Beauty_and_the_Beast_Instrumental.mp3', volume: 45 },
  fotos:     []
};
```

A partir da `dataHora` o site calcula sozinho: o dia e o mês grandes, a data por
extenso ("sábado, 12 de dezembro de 2026"), o horário, a contagem regressiva e o
arquivo de calendário `.ics`.

### ⚠ Ainda são dados de exemplo

Troque antes de enviar o convite:

| Campo | Valor atual |
|---|---|
| `rsvp.whatsapp` | `5511999999999` — **número fictício** |
| `rsvp.prazo` | 20 de fevereiro — **data chutada** |

Data, horário, local, frase, presentes e traje já estão com os dados reais.

### Música

A trilha é o arquivo de áudio definido em `CONFIG.musica.arquivo`.

**A música nunca toca sozinha.** O player entra com `autoplay: 0` e só
começa quando a pessoa clica no botão no canto superior direito.

Para trocar a música, coloque outro arquivo de áudio na pasta do projeto e
troque o nome em `CONFIG.musica.arquivo`. Para tirar o botão, deixe `arquivo: ''`.

### Fotos

Coloque as imagens em `assets/fotos/` e liste os caminhos:

```js
fotos: ['assets/fotos/1.jpg', 'assets/fotos/2.jpg', 'assets/fotos/3.jpg']
```

Com a lista vazia, a galeria mostra molduras decorativas com o monograma.

## Estrutura

```
index.html        marcação das seções e dos modais
css/estilo.css    paleta, tipografia, animações, responsivo
js/script.js      CONFIG + toda a interação
assets/fotos/     suas fotos
```

## O que o convite faz

- **Envelope de abertura** com lacre e carta que sobe ao clicar
- **Capa** com o nome em manuscrito e pétalas de rosa caindo
- **Frase do Walt Disney** em destaque
- **Data e local** em destaque
- **Contagem regressiva** ao vivo, que vira uma mensagem no dia da festa
- **Quatro botões** que abrem modais: local do evento, confirmação de
  presença, sugestão de presentes e manual do convidado
- **Local** com link para o Google Maps e botão "salvar na agenda" (.ics)
- **RSVP** que monta a mensagem pronta e abre no WhatsApp
- **Sugestões de presentes** com tamanhos e números
- **Pix opcional** (aparece só se você preencher `presentes.pix`)
- **Dress code** e **galeria de fotos**

## Detalhes técnicos

- Responsivo, pensado primeiro para celular
- Acessível: navegação por teclado, foco preso dentro dos modais, `Esc` fecha
- Respeita `prefers-reduced-motion` (desliga pétalas e animações)
- Tem estilo de impressão — dá para imprimir o convite

## Publicar

É um site estático: sobe em GitHub Pages, Netlify, Vercel ou qualquer
hospedagem, arrastando a pasta inteira.
