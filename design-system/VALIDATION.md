# Validação — redesign 2026-09-20

- Build de produção Next.js e TypeScript passaram com `NEXT_PUBLIC_PARTYKIT_HOST=slide-sync.thiavila.partykit.dev`.
- Todas as chaves do site presentes nos 8 idiomas; placeholders conferidos. Novas chaves da extensão presentes nos 9 catálogos (incluindo aliases pt/pt_BR).
- Idiomas en, pt-BR, es, fr, de, ja, zh-CN e hi renderizados no build estático usando fixtures locais que simulam o idioma do navegador. Sem overflow horizontal detectado no desktop; alemão também conferido a 390px.
- Home, entrada e envio conferidos visualmente. Campo de código remove letras e bloqueia envio incompleto.
- Envio conferido com uma ponte de extensão simulada; transmissão real não testada nesta etapa.
- Popup ativo/inativo e painel renderizados a partir dos arquivos reais da extensão em fixtures locais. Cópia de código do popup conferida. Sintaxe JavaScript validada.
- ZIP 2.7.0 inclui manifest na raiz, scripts, recursos, ícones e catálogos. Nenhuma publicação na Chrome Web Store nesta etapa.
- Sala, visualizador, anotações, exportação, servidor PartyKit e worker de rotas não tiveram alteração funcional. Novo formulário de entrada usa envio explícito (Enter/botão) em vez de enviar ao digitar o sexto dígito.
- ESLint dos arquivos TS/TSX alterados passou sem erros, com dois avisos de uso de img para PNGs estáticos. O lint geral ainda acusa regras preexistentes nos módulos de sala/anotações e no link da página de privacidade; esses módulos não foram refatorados.
- Fontes externas Geist não eram usadas pelo body Arial; removidas do layout para eliminar download desnecessário no build. A sala mantém Arial e os campos monoespaçados usam a fonte do sistema.

## Publicação

Projeto Cloudflare Pages: `slide-sync`, branch de produção `main`, conta thiavila. Deploy anterior: `2b1d1a8c-e287-402f-9eaa-30c6d743317c` (commit f9b6f87), disponível para rollback no painel Cloudflare. O novo deploy é identificado pelo commit desta branch.

## Validação manual pendente

Carregar o ZIP da extensão no Chrome e testar uma sessão real de Google Slides e uma de Reveal.js, com recepção no celular, anotação e exportação PDF. A aprovação do Thiago precede publicação da extensão na loja.
