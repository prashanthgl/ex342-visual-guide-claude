// CodeBlock.jsx — wraps react-syntax-highlighter to give every code snippet
// consistent styling, a copy button, and optional titles.
import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { Copy, Check, Terminal } from 'lucide-react'

// A hand-picked dark theme tuned to our Red Hat palette
const THEME = {
  'code[class*="language-"]': { color: '#c9d1d9', background: 'none', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.82rem', lineHeight: '1.7' },
  'pre[class*="language-"]':  { background: '#1c2128', border: '1px solid #30363d', borderRadius: '8px', padding: '1.25rem', overflow: 'auto' },
  comment:   { color: '#8b949e', fontStyle: 'italic' },
  punctuation:{ color: '#c9d1d9' },
  property:  { color: '#79c0ff' },
  string:    { color: '#a5d6ff' },
  'attr-value': { color: '#a5d6ff' },
  keyword:   { color: '#ff7b72' },
  'class-name': { color: '#ffa657' },
  function:  { color: '#d2a8ff' },
  number:    { color: '#79c0ff' },
  boolean:   { color: '#ff7b72' },
  operator:  { color: '#ff7b72' },
  variable:  { color: '#ffa657' },
  builtin:   { color: '#79c0ff' },
  'selector-tag': { color: '#7ee787' },
}

export default function CodeBlock({ code, language = 'bash', title, showLineNumbers = false }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code.trim())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-lg overflow-hidden border border-border my-4">
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-surface-2 border-b border-border">
        <div className="flex items-center gap-2">
          <Terminal size={13} className="text-gray-500" />
          <span className="text-xs text-gray-400 font-mono">{title || language}</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-200 transition-colors px-2 py-1 rounded hover:bg-surface-3"
        >
          {copied ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>

      <SyntaxHighlighter
        language={language}
        style={THEME}
        showLineNumbers={showLineNumbers}
        lineNumberStyle={{ color: '#4d5566', fontSize: '0.75rem', minWidth: '2.5em' }}
        wrapLongLines={false}
      >
        {code.trim()}
      </SyntaxHighlighter>
    </div>
  )
}
