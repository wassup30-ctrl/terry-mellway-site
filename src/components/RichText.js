// Renders plain text with light formatting into safe React nodes (no HTML
// injection): blank lines become separate paragraphs, single newlines become
// line breaks, and **bold** / *italic* / ***bold italic*** are honored.

function parseInline(str, keyBase) {
  const regex = /(\*\*\*(.+?)\*\*\*|\*\*(.+?)\*\*|\*(.+?)\*)/g;
  const nodes = [];
  let last = 0;
  let match;
  let k = 0;
  while ((match = regex.exec(str)) !== null) {
    if (match.index > last) nodes.push(str.slice(last, match.index));
    if (match[2] !== undefined) {
      nodes.push(<strong key={`${keyBase}-${k}`}><em>{match[2]}</em></strong>);
    } else if (match[3] !== undefined) {
      nodes.push(<strong key={`${keyBase}-${k}`}>{match[3]}</strong>);
    } else if (match[4] !== undefined) {
      nodes.push(<em key={`${keyBase}-${k}`}>{match[4]}</em>);
    }
    last = match.index + match[0].length;
    k++;
  }
  if (last < str.length) nodes.push(str.slice(last));
  return nodes;
}

function renderBlock(block, keyBase) {
  const lines = block.split('\n');
  return lines.flatMap((line, i) => {
    const parsed = parseInline(line, `${keyBase}-l${i}`);
    return i < lines.length - 1 ? [...parsed, <br key={`${keyBase}-br${i}`} />] : parsed;
  });
}

export default function RichText({ text, paragraphClassName = '' }) {
  const blocks = (text || '').split(/\n{2,}/);
  return blocks.map((block, i) => (
    <p key={i} className={paragraphClassName}>
      {renderBlock(block, `b${i}`)}
    </p>
  ));
}
