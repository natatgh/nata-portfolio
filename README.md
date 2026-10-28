# Natã Alexandre — Portfólio

Portfólio de desenvolvimento de software, com projetos, capturas das aplicações, detalhes técnicos e um notebook 3D interativo.

## Projetos apresentados

- **Lumen** — compartilhamento de tela P2P com WebRTC, web e desktop.
- **GitHub Profile Finder** — consulta de perfis públicos com a API REST do GitHub.
- **Spider-Man Multiverse** — estudo de frontend, composição visual e interatividade.
- **Writings.dev** — implementação de uma referência editorial do roadmap.sh.
- **Second Brain** — demonstração independente de um workspace de produtividade, com dados fictícios. A demonstração não acessa contas de produção nem contém o código-fonte do produto.

Cada projeto tem links para sua aplicação e para o código público, quando disponível. O Second Brain oferece uma demonstração local e o link público das versões desktop.

## Tecnologias do portfólio

HTML, CSS, JavaScript e Three.js. Site estático, sem backend, analytics, cadastro ou chaves de API. Bibliotecas, fontes e imagens são servidas localmente.

- Notebook 3D com rotação por mouse e teclado e troca de projetos.
- Layout responsivo, diálogos acessíveis e preferência de movimento reduzido.
- Previews reais dos projetos e uma demonstração identificada do Second Brain.

## Desenvolvimento local

Requisito: Node.js 22 ou superior.

```sh
npm install
npm run dev
```

Abra `http://127.0.0.1:3000`. Para conferir os arquivos:

```sh
npm run check
```

## Estrutura

- `dist/index.html` — apresentação, projetos, sobre e contato.
- `dist/app.js` — detalhes dos projetos, controles e diálogos.
- `dist/notebook.js` — modelo 3D e texturas.
- `dist/styles.css` — estilos e responsividade.
- `dist/second-brain-demo.html` e `.js` — demonstração com dados fictícios, mantidos apenas na sessão da página.
- `dist/assets/` — capturas, fotografia e fontes.
- `dist/vendor/` — Three.js e licenças de terceiros.

## Publicação

O projeto está preparado para a Vercel com `vercel.json`: o build verifica os arquivos e publica `dist/`. Atualizações na branch `main` são publicadas pela integração Git quando o repositório está conectado ao projeto da Vercel.

## Créditos

As licenças de Three.js e das fontes estão em `dist/vendor/`. Writings.dev segue uma referência de estudo do roadmap.sh. Personagens e materiais de filmes exibidos nas capturas do projeto Spider-Man pertencem aos seus respectivos titulares. A fotografia foi fornecida por Natã.
