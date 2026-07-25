:root {
  --bg: #edeee9;
  --paper: #ffffff;
  --ink: #23241f;
  --ink-soft: #5a5b53;
  --line: rgba(35, 36, 31, 0.14);
  --line-soft: rgba(35, 36, 31, 0.08);

  --concrete: #a6a299;
  --concrete-deep: #6e6b62;
  --membrane: #0e6b5c;
  --membrane-soft: #cfe6e1;
  --reinforce: #c6540e;
  --reinforce-soft: #f4dbc9;
  --primer: #e2a63f;
  --grout: #b9c4c2;

  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'IBM Plex Mono', ui-monospace, monospace;

  --radius: 10px;
}

* { box-sizing: border-box; }

body {
  margin: 0;
  background: var(--bg);
  background-image:
    linear-gradient(var(--line-soft) 1px, transparent 1px),
    linear-gradient(90deg, var(--line-soft) 1px, transparent 1px);
  background-size: 28px 28px;
  color: var(--ink);
  font-family: var(--font-sans);
}

.app {
  max-width: 980px;
  margin: 0 auto;
  padding: 32px 20px 64px;
}

.header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 28px;
  flex-wrap: wrap;
}

.header .brand {
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-soft);
}

.header h1 {
  font-size: 26px;
  font-weight: 700;
  margin: 4px 0 0;
  letter-spacing: -0.01em;
}

.print-btn {
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.04em;
  background: var(--ink);
  color: var(--paper);
  border: none;
  border-radius: var(--radius);
  padding: 10px 16px;
  cursor: pointer;
}
.print-btn:hover { background: #000; }

.card {
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 20px;
  margin-bottom: 20px;
}

.wall-type-row {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.wall-type-btn {
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.02em;
  background: var(--paper);
  border: 1.5px solid var(--line);
  border-radius: var(--radius);
  padding: 9px 14px;
  cursor: pointer;
  color: var(--ink-soft);
}
.wall-type-btn.active {
  border-color: var(--ink);
  color: var(--ink);
  background: #fbfbfa;
}

.step-nav {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-bottom: 20px;
}

.step-card {
  text-align: left;
  background: var(--paper);
  border: 1.5px solid var(--line);
  border-radius: var(--radius);
  padding: 14px 16px;
  cursor: pointer;
  font-family: var(--font-sans);
}

.step-card .code {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--ink-soft);
  letter-spacing: 0.06em;
  display: block;
  margin-bottom: 4px;
}

.step-card .name {
  font-size: 15px;
  font-weight: 600;
  display: block;
}

.step-card.active {
  border-color: var(--ink);
  background: #fbfbfa;
}
.step-card.active.s1 { border-color: var(--concrete-deep); }
.step-card.active.s2 { border-color: var(--primer); }
.step-card.active.s3 { border-color: var(--membrane); }
.step-card.active.s4 { border-color: var(--ink); }

.illustration-wrap {
  display: flex;
  justify-content: center;
}

.explain {
  font-size: 15px;
  line-height: 1.6;
  color: var(--ink);
  max-width: 640px;
}
.explain .code {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--ink-soft);
  letter-spacing: 0.06em;
  display: block;
  margin-bottom: 6px;
}

.settings-toggle {
  font-family: var(--font-mono);
  font-size: 12px;
  background: transparent;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 8px 14px;
  cursor: pointer;
  color: var(--ink-soft);
  margin-bottom: 14px;
}

.settings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 14px;
}

.field label {
  display: block;
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--ink-soft);
  letter-spacing: 0.04em;
  margin-bottom: 5px;
}

.field input {
  width: 100%;
  font-family: var(--font-mono);
  font-size: 14px;
  padding: 7px 9px;
  border: 1px solid var(--line);
  border-radius: 6px;
  background: var(--bg);
  color: var(--ink);
}
.field input:focus {
  outline: 2px solid var(--membrane);
  outline-offset: 1px;
}

.reveal-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 16px;
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--ink-soft);
}
.reveal-row input[type="range"] { flex: 1; }

.legend {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  margin-top: 16px;
  font-size: 13px;
  color: var(--ink-soft);
}
.legend-item { display: flex; align-items: center; gap: 7px; }
.swatch { width: 13px; height: 13px; border-radius: 3px; flex-shrink: 0; }

footer.note {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--ink-soft);
  text-align: center;
  margin-top: 30px;
}

@media print {
  body { background: #fff; }
  .print-btn, .settings-toggle { display: none; }
  .card { border: none; box-shadow: none; }
}

@media (max-width: 640px) {
  .step-nav { grid-template-columns: repeat(2, 1fr); }
  .wall-type-row { flex-wrap: wrap; }
}
