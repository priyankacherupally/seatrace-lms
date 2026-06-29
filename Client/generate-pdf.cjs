const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const mdPath  = path.join(__dirname, 'DESIGN_SYSTEM.md');
const htmlPath = path.join(__dirname, 'DESIGN_SYSTEM.html');
const pdfPath  = path.join(__dirname, 'DESIGN_SYSTEM.pdf');

// ── Markdown → HTML ──────────────────────────────────────────────────────────
function convert(md) {
  let html = md;

  // Fenced code blocks
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
    const escaped = code.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    return `<pre><code class="lang-${lang}">${escaped}</code></pre>`;
  });

  // Inline code
  html = html.replace(/`([^`\n]+)`/g, '<code>$1</code>');

  // Tables
  html = html.replace(/(\|.+\|\n\|[-| :]+\|\n(?:\|.+\|\n?)+)/g, (table) => {
    const lines = table.trim().split('\n');
    const headers = lines[0].split('|').slice(1,-1).map(h =>
      `<th>${h.trim()}</th>`).join('');
    const rows = lines.slice(2).map(row =>
      '<tr>' + row.split('|').slice(1,-1).map(c =>
        `<td>${c.trim()}</td>`).join('') + '</tr>').join('');
    return `<table><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table>\n`;
  });

  // Blockquote
  html = html.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>');

  // HR
  html = html.replace(/^---$/gm, '<hr>');

  // Headings
  html = html.replace(/^###### (.+)$/gm, '<h6>$1</h6>');
  html = html.replace(/^##### (.+)$/gm,  '<h5>$1</h5>');
  html = html.replace(/^#### (.+)$/gm,   '<h4>$1</h4>');
  html = html.replace(/^### (.+)$/gm,    '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm,     '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm,      '<h1>$1</h1>');

  // Bold + italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.+?)\*\*/g,     '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g,         '<em>$1</em>');

  // Lists — collect consecutive li lines into ul blocks
  html = html.replace(/^[-*] (.+)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>[\s\S]+?)(?=\n(?!<li>))/g, '<ul>$1</ul>');

  // Paragraphs — wrap bare lines not already in a block tag
  html = html.split('\n\n').map(block => {
    block = block.trim();
    if (!block) return '';
    if (/^<(h[1-6]|ul|ol|li|pre|table|blockquote|hr)/.test(block)) return block;
    return `<p>${block.replace(/\n/g, '<br>')}</p>`;
  }).join('\n');

  return html;
}

const body = convert(fs.readFileSync(mdPath, 'utf8'));

// ── HTML shell ────────────────────────────────────────────────────────────────
const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Sea Project — Design System</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&family=Fira+Code:wght@400;500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: 'Nunito', system-ui, sans-serif;
  font-size: 13.5px;
  line-height: 1.75;
  color: #1A2340;
  background: #fff;
  padding: 52px 64px;
  max-width: 980px;
  margin: 0 auto;
}

/* ── Headings ── */
h1 {
  font-size: 30px; font-weight: 800; color: #1A2340;
  border-bottom: 3px solid #5B8AF0;
  padding-bottom: 14px; margin-bottom: 6px;
  line-height: 1.2;
}
h2 {
  font-size: 20px; font-weight: 700; color: #1A2340;
  border-bottom: 1.5px solid #DCE9FB;
  padding-bottom: 6px; margin: 40px 0 14px;
}
h3 {
  font-size: 12px; font-weight: 700; color: #5B8AF0;
  text-transform: uppercase; letter-spacing: 0.8px;
  margin: 28px 0 8px;
}
h4 {
  font-size: 13.5px; font-weight: 700; color: #1A2340;
  margin: 20px 0 6px;
}
h5, h6 { font-size: 13px; font-weight: 600; margin: 14px 0 4px; }

/* ── Body ── */
p { margin: 8px 0; color: #1A2340; }

blockquote {
  border-left: 4px solid #5B8AF0;
  background: #EEF3FD;
  padding: 12px 16px; margin: 14px 0;
  border-radius: 0 6px 6px 0;
  color: #5E6E8C; font-style: italic; font-size: 13px;
}

hr {
  border: none;
  border-top: 1px solid #EEF3FD;
  margin: 28px 0;
}

ul { margin: 8px 0 14px 20px; }
li { margin: 3px 0; }

strong { font-weight: 700; }
em     { color: #5E6E8C; font-style: italic; }

/* ── Code ── */
code {
  font-family: 'Fira Code', 'Cascadia Code', Consolas, monospace;
  font-size: 11.5px;
  background: #EEF3FD;
  color: #3A69CE;
  padding: 2px 5px;
  border-radius: 4px;
}
pre {
  background: #111827;
  padding: 18px 22px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 12px 0 20px;
  border-left: 4px solid #5B8AF0;
}
pre code {
  background: transparent;
  color: #E2E8F8;
  font-size: 11.5px;
  line-height: 1.7;
  padding: 0;
}

/* ── Tables ── */
table {
  width: 100%;
  border-collapse: collapse;
  margin: 12px 0 22px;
  font-size: 12.5px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 6px rgba(26,35,64,0.08);
  page-break-inside: avoid;
}
thead { background: #5B8AF0; }
thead th {
  padding: 9px 14px;
  text-align: left;
  font-weight: 700;
  font-size: 11.5px;
  color: #fff;
  letter-spacing: 0.2px;
}
tbody tr:nth-child(odd)  { background: #FFFFFF; }
tbody tr:nth-child(even) { background: #F3F7FB; }
tbody td {
  padding: 8px 14px;
  border-bottom: 1px solid #EEF3FD;
  color: #1A2340;
  vertical-align: top;
}

/* ── Print ── */
@media print {
  body { padding: 36px 48px; }
  h2   { page-break-before: auto; }
  pre, table, blockquote { page-break-inside: avoid; }
  h2, h3 { page-break-after: avoid; }
}
</style>
</head>
<body>
${body}
</body>
</html>`;

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('✓ HTML written:', htmlPath);

// ── Chrome headless → PDF ─────────────────────────────────────────────────────
const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/');

const cmd = [
  `"${chrome}"`,
  '--headless=new',
  '--disable-gpu',
  '--no-sandbox',
  '--run-all-compositor-stages-before-draw',
  `--print-to-pdf="${pdfPath}"`,
  '--print-to-pdf-no-header',
  '--no-pdf-header-footer',
  `"${fileUrl}"`
].join(' ');

console.log('✓ Launching Chrome headless…');
execSync(cmd, { stdio: 'inherit' });
console.log('✓ PDF saved:', pdfPath);
