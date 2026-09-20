# SlideSync Design System

Identidade aprovada em 20/09/2026. Referência reutilizável para o site e a extensão.

## Arquivos

- `preview.html`: catálogo visual aprovado, independente e com imagens incorporadas. Abra no navegador; as ações são demonstrativas.
- `tokens.json`: valores de referência legíveis por ferramentas.
- `assets/logo.png`: assinatura horizontal transparente, com margens externas removidas.
- `assets/symbol.png`: símbolo S transparente.
- `../web-app/src/app/brand.css`: estilos de componentes do site.
- `../web-app/src/components/brand.tsx`: assinatura acessível e link para o início.
- `../chrome-extension/popup/popup.css` e `content/content.css`: aplicação na extensão. Os seletores do painel são isolados para não afetar as apresentações.

## Cores

| Uso | Valor |
|---|---|
| Ação principal / marca | `#6750E8` |
| Hover principal | `#5039CC` |
| Texto principal | `#242134` |
| Texto secundário | `#777383` |
| Fundo suave | `#F6F4FC` |
| Destaque lavanda | `#EFEBFF` |
| Borda | `#E8E5EF` |
| Superfície | `#FFFFFF` |
| Sucesso | `#257456` sobre `#EFF9F3` |
| Ação de encerrar | `#B44949` sobre `#FFF5F5` |

Verde-lima `#DAFA9E` e lavanda `#C5B7FB` são acentos de ilustração, não cores de ações principais. Não usar texto secundário pequeno sobre superfícies escuras. Estados devem ter texto ou ícone além da cor.

## Tipografia e espaço

Site institucional: Avenir Next com fallback Arial/sans-serif; extensão: Avenir Next com fallback de sistema. Não depende de baixar fontes para a nova identidade. A sala mantém sua tipografia e estrutura atuais.

Títulos principais: 40–76px desktop, 36–44px mobile, peso 600 e entrelinha 1.07–1.12. Texto de apoio: 14–16px e entrelinha 1.65–1.8. Rótulos: 11–13px. Espaçamentos de referência: 4, 8, 12, 16, 24, 32, 48 e 64px. Cantos: 10px em botões, 14–20px em cartões, pill em estados.

## Componentes

- `.ds-button`: ação principal. `.secondary` para ação auxiliar e `.compact` para cabeçalhos. Desabilitado só durante ação indisponível/carregamento.
- `.ds-tag`: rótulo discreto. Estados de conexão conservam texto explícito.
- `.site-nav` + `Brand`: cabeçalho responsivo; não deformar a assinatura.
- `.join-card` + `RoomCodeInput`: código numérico de seis dígitos, rótulo, teclado numérico, envio por Enter/botão e estado de carregamento.
- `.upload-card`: envio HTML/Reveal.js; não anunciar PDF/PowerPoint enquanto não houver importação.
- Popup da extensão: status, código e slide atual. Painel: sessão, QR e ajustes existentes, sem alterar captura/transmissão.

## Regras de aplicação

1. Preservar proporções do logo, área livre equivalente a pelo menos metade da altura do símbolo e fundo que dê contraste. Os PNGs são raster; não tratar como vetores.
2. Uma ação principal por contexto; secundárias brancas com borda. Foco visível e alvos confortáveis no celular.
3. Textos de produto passam pelo i18n. Site: pt-BR, en, es, fr, de, ja, zh-CN, hi. Extensão usa seus catálogos `chrome.i18n` existentes.
4. O idioma do documento acompanha o navegador. Permitir quebra e expansão de textos, especialmente alemão, japonês, chinês e hindi.
5. A sala do participante conserva slides contínuos, comportamento de acompanhamento, exportação e ferramentas de anotação. Não aplicar o layout institucional sobre ela.
6. A página de envio usa navegação completa para a extensão injetar a ponte de captura. Não trocar esse link por navegação SPA.
7. Testar a extensão localmente antes de publicar na Chrome Web Store.

## Como testar a extensão

Descompacte o ZIP, abra `chrome://extensions`, ative o modo desenvolvedor e use “Carregar sem compactação” selecionando a pasta que contém `manifest.json`. Evite executar simultaneamente duas cópias da extensão no mesmo teste. Abra uma apresentação nova/recarregue a aba depois de carregar a extensão.

Verifique Google Slides e Reveal.js, início/fim de sessão, QR ligado/desligado e posições, popup ativo/inativo, atualização dos slides no celular, anotações e PDF. O ZIP é para validação local; esta entrega não publica a extensão na loja.

## Logos e camadas

No site, usar assets em `/brand/` com hash no nome. Trocar o conteúdo de `/logo.png` mantendo a mesma URL pode deixar usuários recorrentes com a imagem antiga no cache. A URL deve mudar junto com o arquivo. No drawer, o botão circular fica na camada 0 e o conteúdo em uma superfície branca opaca na camada 1. Verificar aberto e fechado, incluindo o painel avançado.

Crédito de interface: “Criado por Thiago Avila · Avila Ventures”, traduzido nos catálogos, com link `https://avila.ventures`. Avisos de licença de dependências continuam preservados.
