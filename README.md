# Gesso Alfa Reparos Goiânia

Landing page institucional de página única para serviços de gesso, forro, drywall, sancas e divisórias em Goiânia e região metropolitana.

## Estrutura

```
index.html                  Página única (11 seções)
assets/
  css/base.css              Tokens, reset, tipografia, header, hero, botões
  css/components.css        Seções, cards, galeria, FAQ, rodapé, lightbox
  js/main.js                Nav mobile, contadores, acordeão, lightbox, reveal
  img/logo/                 Logos (fundo claro e escuro)
  img/antes-depois/         Registros de antes e depois
  img/galeria/              Fotos de projetos
  img/projetos/             Fotos adicionais de obra
```

## Stack

HTML, CSS e JavaScript puros. Sem build, sem dependências. Basta abrir o `index.html` ou servir a pasta como estática.

```bash
python -m http.server 8000
```

## Identidade

Paleta extraída do logo:

| Cor | Hex |
|-----|-----|
| Navy escuro | `#071634` |
| Navy | `#0F3B7C` |
| Vermelho | `#C8102E` |
| Prata | `#C9D0DA` |

Tipografia: Barlow Condensed (títulos) e Inter (texto), via Google Fonts.

## Contato configurado

- Endereço: Alameda Ricardo Paranhos, 136 - St. Marista, Goiânia - GO, 74180-050
- Telefone / WhatsApp: (62) 99950-7538
- Horário: Seg a Sex 07h-18h, Sáb 08h-12h

Os dados aparecem no header, na seção de contato, no rodapé e no JSON-LD (`HomeAndConstructionBusiness`). Ao alterar, atualize os quatro pontos.

## Antes de publicar

- Comprimir as imagens de `antes-depois/` (1,6 a 2,4 MB cada) para WebP.
- Ajustar as URLs absolutas de `og:url`, `canonical` e do JSON-LD para o domínio final.
