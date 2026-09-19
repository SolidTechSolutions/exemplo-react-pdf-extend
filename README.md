# 🇧🇷 SolidSign API - Front-end de Exemplo: Extensão de Nível PDF (React)

## Como funciona

"Via example backend" (padrão) chama `POST /api/pdf/extend/form` no back-end de exemplo (`http://localhost:8097`), que repassa pra `POST /solidsign/dsig/extending/pdf/extend` da SolidSign API. "Direct to SolidSign API" (opcional) chama a API direto do navegador — só pra teste manual, expõe o token no navegador.

## Requisitos

Rode este back-end de exemplo localmente:

- **Java**: [`exemplo-integracao-pdf-extend`](https://github.com/SolidTechSolutions/exemplo-integracao-pdf-extend)

- Um token JWT válido (`POST /solidsign/auth/token`)

## Como rodar

```bash
npm install
npm run dev
```

Abra `http://localhost:5173`, preencha o formulário e envie.

## Variáveis do formulário

| Campo | Significado | Default |
|---|---|---|
| `mode` | Via backend de exemplo (padrão) ou direto à API | `backend` |
| `backendUrl` | URL do back-end de exemplo | `http://localhost:8097` |
| `authorization` | Token JWT (Bearer) | (vazio) |
| `documents` | Documento(s) já assinado(s) a estender | (vazio) |
| `targetLevel` | Nível-alvo da extensão | `PAdES_BASELINE_LT` |
| `signatureIndex` | Índice da assinatura a estender (opcional) | (vazio) |

---

# 🇬🇧 SolidSign API - Example Front-end: PDF Signature Extension (React)

## How it works

"Via example backend" (default) calls `POST /api/pdf/extend/form` on the example backend (`http://localhost:8097`), which forwards to `POST /solidsign/dsig/extending/pdf/extend` on the SolidSign API. "Direct to SolidSign API" (optional) calls the API straight from the browser — for quick manual testing only, exposes the token in the browser.

## Requirements

Run this example backend locally:

- **Java**: [`exemplo-integracao-pdf-extend`](https://github.com/SolidTechSolutions/exemplo-integracao-pdf-extend)

- A valid JWT token (`POST /solidsign/auth/token`)

## Running

```bash
npm install
npm run dev
```

Open `http://localhost:5173`, fill in the form and submit.

## Form fields

| Field | Meaning | Default |
|---|---|---|
| `mode` | Via example backend (default) or direct to API | `backend` |
| `backendUrl` | Example backend URL | `http://localhost:8097` |
| `authorization` | JWT (Bearer) token | (empty) |
| `documents` | Already-signed document(s) to extend | (empty) |
| `targetLevel` | Extension target level | `PAdES_BASELINE_LT` |
| `signatureIndex` | Signature index to extend (optional) | (empty) |
