# SolidSign API - Example Front-end: PDF/PAdES Signature Extending (React)

Example front-end for upgrading an existing PDF/PAdES signature to a higher
baseline level (extend). By default it talks to the
[`exemplo-integracao-pdf-extend`](https://github.com/SolidTechSolutions/exemplo-integracao-pdf-extend)
example backend, which keeps the API credentials server-side — the
recommended integration pattern. An optional "Direct to SolidSign API" mode
lets you call the API straight from the browser, useful for a quick manual
check, but it exposes the token in the browser.

## How it works

- **Default mode (backend)**: `POST http://localhost:8097/api/pdf/extend/form`.
- **Optional mode (direct)**: `POST {baseUrl}/solidsign/dsig/extending/pdf/extend`, with the token entered in the form.

## Prerequisites

1. Run the [`exemplo-integracao-pdf-extend`](https://github.com/SolidTechSolutions/exemplo-integracao-pdf-extend) backend locally (`mvn spring-boot:run`, default port `8097`) — or, for direct mode, have a valid JWT token.
2. One or more signed (PAdES) PDFs to extend.

## Running

```bash
npm install
npm run dev
```

Open `http://localhost:5173`, upload the PDF(s), pick a target level and extend.
