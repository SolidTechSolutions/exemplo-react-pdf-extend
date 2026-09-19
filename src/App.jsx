import { useState } from 'react';
import './App.css';

// Example front-end for upgrading an existing PDF/PAdES signature to a higher
// baseline level (extend).
//
// Two modes:
// - "backend" (default): talks to the local example backend
//   (exemplo-integracao-pdf-extend, POST /api/pdf/extend/form). The API
//   token stays server-side, in the backend's own application.properties —
//   never exposed to the browser. This is the pattern customers should
//   actually use in production.
// - "direct" (optional): calls the SolidSign API directly from the browser.
//   Convenient for a quick manual check, but it exposes the Bearer token in
//   client-side JS — only use this with a short-lived/test token.

const DEFAULT_BACKEND_URL = 'http://localhost:8097';
const TARGET_LEVELS = ['PAdES_BASELINE_T', 'PAdES_BASELINE_LT', 'PAdES_BASELINE_LTA'];

export default function App() {
  const [mode, setMode] = useState('backend');
  const [backendUrl, setBackendUrl] = useState(DEFAULT_BACKEND_URL);
  const [baseUrl, setBaseUrl] = useState('https://www.solidsign.com.br');
  const [authorization, setAuthorization] = useState('');
  const [documents, setDocuments] = useState([]);
  const [targetLevel, setTargetLevel] = useState('PAdES_BASELINE_LT');
  const [signatureIndex, setSignatureIndex] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);

    if (documents.length === 0) { setError('Select at least one signed PDF.'); return; }
    if (mode === 'direct' && !authorization.trim()) { setError('Enter the Bearer token.'); return; }

    setLoading(true);
    try {
      const fd = new FormData();
      documents.forEach((f) => fd.append('document', f));
      fd.append('targetLevel', targetLevel);
      if (signatureIndex.trim()) fd.append('signatureIndex', signatureIndex.trim());

      let url;
      if (mode === 'backend') {
        url = `${backendUrl.replace(/\/$/, '')}/api/pdf/extend/form`;
      } else {
        fd.append('authorization', authorization.startsWith('Bearer ') ? authorization : `Bearer ${authorization}`);
        fd.append('baseUrl', baseUrl);
        url = `${baseUrl.replace(/\/$/, '')}/solidsign/dsig/extending/pdf/extend`;
      }

      const res = await fetch(url, { method: 'POST', body: fd });
      const text = await res.text();
      let json;
      try { json = JSON.parse(text); } catch { json = null; }

      if (!res.ok) {
        setError(json?.message || text || `HTTP error ${res.status}`);
        return;
      }
      setResult(json);
    } catch (err) {
      setError(`Request failed (${mode === 'backend' ? backendUrl : baseUrl}): ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h1>Extend PDF/PAdES signature (React example)</h1>
      <p className="subtitle">
        Example front-end for <code>exemplo-integracao-pdf-extend</code>. Upgrades an existing
        PDF signature to a higher baseline level (e.g. adds LT/LTA validation data). By default
        talks to that local backend, which holds the API credentials server-side.
      </p>

      <form onSubmit={submit} className="form">
        <fieldset>
          <legend>1. Connection</legend>
          <div className="mode-toggle">
            <label><input type="radio" checked={mode === 'backend'} onChange={() => setMode('backend')} /> Via example backend (default)</label>
            <label><input type="radio" checked={mode === 'direct'} onChange={() => setMode('direct')} /> Direct to SolidSign API (optional)</label>
          </div>
          {mode === 'backend' ? (
            <label>Backend URL
              <input value={backendUrl} onChange={(e) => setBackendUrl(e.target.value)} placeholder={DEFAULT_BACKEND_URL} />
            </label>
          ) : (
            <>
              <label>SolidSign API base URL
                <input value={baseUrl} onChange={(e) => setBaseUrl(e.target.value)} placeholder="https://www.solidsign.com.br" />
              </label>
              <label>Bearer token
                <input value={authorization} onChange={(e) => setAuthorization(e.target.value)} placeholder="eyJhbGciOi..." />
              </label>
            </>
          )}
        </fieldset>

        <fieldset>
          <legend>2. Document(s) and target level</legend>
          <label>Signed PDF(s)
            <input type="file" accept=".pdf,application/pdf" multiple onChange={(e) => setDocuments(Array.from(e.target.files))} />
          </label>
          <label>Target level
            <select value={targetLevel} onChange={(e) => setTargetLevel(e.target.value)}>
              {TARGET_LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
          </label>
          <label>Signature index (optional — leave blank to extend every signature)
            <input value={signatureIndex} onChange={(e) => setSignatureIndex(e.target.value)} placeholder="0" />
          </label>
        </fieldset>

        <button type="submit" disabled={loading}>{loading ? 'Extending…' : 'EXTEND'}</button>
      </form>

      {error && <div className="box error">{error}</div>}

      {result && (
        <div className="box success">
          <h3>Success!</h3>
          <p>{result.signatureCount} document(s) extended — identifier <code>{result.identifier}</code></p>
          <ul>
            {(result.documents || []).map((d, i) => {
              const href = d._links?.self?.href;
              return <li key={i}>Document {i + 1} — {href ? <a href={href} target="_blank" rel="noreferrer">download</a> : 'link unavailable'}</li>;
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
