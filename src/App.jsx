import React, { useMemo, useState } from 'react'

const WALL_TYPES = {
  betong: {
    label: 'Betong',
    baseColor: '#a6a299',
    baseColorDeep: '#6e6b62',
    prep: 'Betongväggen görs ren, torr och jämn. Lös betonghud, gammal färg och ojämnheter slipas bort. Fuktkvoten i betongen mäts innan arbetet fortsätter — för hög fukt kan senare tränga upp genom tätskiktet.',
    primer: 'En grundning (primer) anpassad för betong appliceras över hela ytan. Den binder kvarvarande damm och gör att tätskiktsmassan fäster jämnt mot den porösa betongytan.',
  },
  gips: {
    label: 'Gipsskiva (våtrumsskiva)',
    baseColor: '#cbb896',
    baseColorDeep: '#a3906d',
    prep: 'Våtrumsskivan skruvas fast enligt tillverkarens anvisningar, med rätt skruvavstånd och infästning i reglar. Skarvarna mellan skivorna spacklas och förstärks med en skarvremsa så att hela ytan blir plan.',
    primer: 'Skarvarna och skruvskallarna grundmålas separat innan hela väggen primas i ett jämnt lager, så att tätskiktet får en likvärdig, sugande yta att fästa mot över hela ytan.',
  },
}

function getSteps(wallType) {
  const w = WALL_TYPES[wallType]
  return [
    { id: 1, code: 'STEG 01', name: 'Underlag', title: 'Underlaget förbereds', text: w.prep },
    { id: 2, code: 'STEG 02', name: 'Grundning', title: 'Primer appliceras', text: w.primer },
    {
      id: 3,
      code: 'STEG 03',
      name: 'Tätskikt',
      title: 'Tätskikt och armering',
      text: 'Ett vattentätt skikt (tätskiktsmassa) appliceras över hela väggen. Vid golvanslutningen, i hörn och runt fönster läggs en extra förstärkning — armering — eftersom det är just där rörelser i huset och fuktbelastning är som störst. Utan den förstärkningen är risken för sprickor och läckage betydligt högre.',
    },
    {
      id: 4,
      code: 'STEG 04',
      name: 'Kakel',
      title: 'Kaklet läggs',
      text: 'När tätskiktet har torkat läggs kaklet ovanpå. Det är tätskiktet som håller vattnet borta från väggen — kaklet är den yta man ser och tar i, men det är inte det som skyddar mot fukt.',
    },
  ]
}

function useGeometry({ wallW, wallH, winW, winH, winX, winY, step, reveal }) {
  return useMemo(() => {
    const areaX = 170, areaY = 90, areaW = 300, areaH = 340
    const scale = Math.min(areaW / wallW, areaH / wallH)
    const wallPxW = wallW * scale
    const wallPxH = wallH * scale
    const wallX = areaX + (areaW - wallPxW) / 2
    const wallY = areaY + (areaH - wallPxH)

    const hasWindow = winW > 0 && winH > 0
    const winPxW = winW * scale
    const winPxH = winH * scale
    const winPxX = wallX + winX * scale
    const winPxY = wallY + wallPxH - (winY + winH) * scale

    const strip = 7
    const tileSize = 22
    const tiles = []
    if (step >= 4) {
      for (let ty = wallY; ty < wallY + wallPxH; ty += tileSize) {
        const h = Math.min(tileSize, wallY + wallPxH - ty)
        for (let tx = wallX; tx < wallX + wallPxW; tx += tileSize) {
          const w = Math.min(tileSize, wallX + wallPxW - tx)
          tiles.push({ x: tx + 0.5, y: ty + 0.5, w: w - 1, h: h - 1 })
        }
      }
    }
    const revealPx = (reveal / 100) * wallPxW
    const revealStartX = wallX + wallPxW - revealPx

    return {
      wallX, wallY, wallPxW, wallPxH, hasWindow,
      winPxX, winPxY, winPxW, winPxH, strip, tiles, revealStartX, revealPx,
    }
  }, [wallW, wallH, winW, winH, winX, winY, step, reveal])
}

function DimensionLines({ g, wallW, wallH }) {
  const { wallX, wallY, wallPxW, wallPxH } = g
  const topY = wallY - 30
  const leftX = wallX - 30
  return (
    <g fontFamily="var(--font-mono)">
      <line x1={wallX} y1={topY} x2={wallX + wallPxW} y2={topY} stroke="var(--ink-soft)" strokeWidth="0.75" markerStart="url(#dimArrow)" markerEnd="url(#dimArrow)" />
      <line x1={wallX} y1={topY - 6} x2={wallX} y2={wallY} stroke="var(--ink-soft)" strokeWidth="0.5" opacity="0.5" />
      <line x1={wallX + wallPxW} y1={topY - 6} x2={wallX + wallPxW} y2={wallY} stroke="var(--ink-soft)" strokeWidth="0.5" opacity="0.5" />
      <text x={wallX + wallPxW / 2} y={topY - 8} textAnchor="middle" fontSize="12" fill="var(--ink-soft)">{Math.round(wallW)} cm</text>

      <line x1={leftX} y1={wallY} x2={leftX} y2={wallY + wallPxH} stroke="var(--ink-soft)" strokeWidth="0.75" markerStart="url(#dimArrow)" markerEnd="url(#dimArrow)" />
      <line x1={leftX - 6} y1={wallY} x2={wallX} y2={wallY} stroke="var(--ink-soft)" strokeWidth="0.5" opacity="0.5" />
      <line x1={leftX - 6} y1={wallY + wallPxH} x2={wallX} y2={wallY + wallPxH} stroke="var(--ink-soft)" strokeWidth="0.5" opacity="0.5" />
      <text x={leftX - 10} y={wallY + wallPxH / 2} textAnchor="end" dominantBaseline="central" fontSize="12" fill="var(--ink-soft)">{Math.round(wallH)} cm</text>
    </g>
  )
}

function WallIllustration({ wallW, wallH, winW, winH, winX, winY, step, reveal, wallType }) {
  const g = useGeometry({ wallW, wallH, winW, winH, winX, winY, step, reveal })
  const { wallX, wallY, wallPxW, wallPxH, hasWindow, winPxX, winPxY, winPxW, winPxH, strip, tiles, revealStartX, revealPx } = g
  const wt = WALL_TYPES[wallType]

  const seamYs = [wallY + wallPxH * 0.33, wallY + wallPxH * 0.66]

  return (
    <svg width="100%" viewBox="0 0 680 480" role="img" style={{ maxWidth: 680 }}>
      <title>Tätskikt i badrumsvägg</title>
      <desc>Illustration av en badrumsvägg som visar underlag, grundning, tätskikt med förstärkt armering, och kakel.</desc>
      <defs>
        <marker id="dimArrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke="var(--ink-soft)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
        <clipPath id="revealClip">
          <rect x={revealStartX} y={wallY} width={Math.max(revealPx, 0)} height={wallPxH} />
        </clipPath>
      </defs>

      <DimensionLines g={g} wallW={wallW} wallH={wallH} />

      <rect x={wallX} y={wallY} width={wallPxW} height={wallPxH} rx="2" fill={wt.baseColor} stroke={wt.baseColorDeep} strokeWidth="0.5" />

      {step === 1 && wallType === 'gips' && (
        <g stroke={wt.baseColorDeep} strokeWidth="0.75" strokeDasharray="4 3" opacity="0.7">
          <line x1={wallX} y1={seamYs[0]} x2={wallX + wallPxW} y2={seamYs[0]} />
          <line x1={wallX} y1={seamYs[1]} x2={wallX + wallPxW} y2={seamYs[1]} />
        </g>
      )}

      {step >= 2 && (
        <rect x={wallX} y={wallY} width={wallPxW} height={wallPxH} rx="2" fill="var(--primer)" opacity="0.4" />
      )}

      {step >= 3 && (
        <>
          <rect x={wallX} y={wallY} width={wallPxW} height={wallPxH} rx="2" fill="var(--membrane)" opacity="0.55" />
          <rect x={wallX} y={wallY + wallPxH - strip} width={wallPxW} height={strip} fill="var(--reinforce)" />
          <rect x={wallX} y={wallY} width={strip} height={wallPxH} fill="var(--reinforce)" opacity="0.85" />
          <rect x={wallX + wallPxW - strip} y={wallY} width={strip} height={wallPxH} fill="var(--reinforce)" opacity="0.85" />
          {hasWindow && (
            <>
              <rect x={winPxX - strip} y={winPxY - strip} width={winPxW + 2 * strip} height={strip} fill="var(--reinforce)" />
              <rect x={winPxX - strip} y={winPxY + winPxH} width={winPxW + 2 * strip} height={strip} fill="var(--reinforce)" />
              <rect x={winPxX - strip} y={winPxY - strip} width={strip} height={winPxH + 2 * strip} fill="var(--reinforce)" />
              <rect x={winPxX + winPxW} y={winPxY - strip} width={strip} height={winPxH + 2 * strip} fill="var(--reinforce)" />
            </>
          )}
        </>
      )}

      {step >= 4 && (
        <>
          <g clipPath="url(#revealClip)">
            {tiles.map((t, i) => (
              <rect key={i} x={t.x} y={t.y} width={t.w} height={t.h} fill="#f1f4f2" stroke="var(--grout)" strokeWidth="0.5" rx="1" />
            ))}
          </g>
          <line x1={revealStartX} y1={wallY} x2={revealStartX} y2={wallY + wallPxH} stroke="var(--ink-soft)" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.6" />
        </>
      )}

      {hasWindow && (
        <>
          <rect x={winPxX} y={winPxY} width={winPxW} height={winPxH} fill="#cfe3f2" stroke="#7a8a94" strokeWidth="1.5" />
          <line x1={winPxX} y1={winPxY + winPxH / 2} x2={winPxX + winPxW} y2={winPxY + winPxH / 2} stroke="#7a8a94" strokeWidth="1" />
          <line x1={winPxX + winPxW / 2} y1={winPxY} x2={winPxX + winPxW / 2} y2={winPxY + winPxH} stroke="#7a8a94" strokeWidth="1" />
        </>
      )}
    </svg>
  )
}

export default function App() {
  const [wallW, setWallW] = useState(200)
  const [wallH, setWallH] = useState(240)
  const [winW, setWinW] = useState(50)
  const [winH, setWinH] = useState(50)
  const [winX, setWinX] = useState(120)
  const [winY, setWinY] = useState(130)
  const [wallType, setWallType] = useState('betong')
  const [step, setStep] = useState(3)
  const [reveal, setReveal] = useState(55)
  const [showSettings, setShowSettings] = useState(false)

  const clampedWinW = Math.min(winW, wallW - 10)
  const clampedWinH = Math.min(winH, wallH - 10)
  const clampedWinX = Math.min(winX, wallW - clampedWinW)
  const clampedWinY = Math.min(winY, wallH - clampedWinH)

  const steps = getSteps(wallType)
  const activeStep = steps.find((s) => s.id === step)

  return (
    <div className="app">
      <div className="header">
        <div>
          <span className="brand">Tätskikt — kundguide</span>
          <h1>Så fungerar tätskiktet i din vägg</h1>
        </div>
        <button className="print-btn" onClick={() => window.print()}>Skriv ut / spara som PDF</button>
      </div>

      <div className="wall-type-row">
        {Object.entries(WALL_TYPES).map(([key, w]) => (
          <button
            key={key}
            className={`wall-type-btn ${wallType === key ? 'active' : ''}`}
            onClick={() => setWallType(key)}
          >
            {w.label}
          </button>
        ))}
      </div>

      <div className="card">
        <div className="step-nav">
          {steps.map((s) => (
            <button
              key={s.id}
              className={`step-card ${step === s.id ? `active s${s.id}` : ''}`}
              onClick={() => setStep(s.id)}
            >
              <span className="code">{s.code}</span>
              <span className="name">{s.name}</span>
            </button>
          ))}
        </div>

        <div className="illustration-wrap">
          <WallIllustration
            wallW={wallW} wallH={wallH}
            winW={clampedWinW} winH={clampedWinH}
            winX={clampedWinX} winY={clampedWinY}
            step={step} reveal={reveal} wallType={wallType}
          />
        </div>

        {step === 4 && (
          <div className="reveal-row">
            <span>Kakelläggning</span>
            <input type="range" min="0" max="100" value={reveal} onChange={(e) => setReveal(Number(e.target.value))} />
            <span>{reveal}%</span>
          </div>
        )}

        <div className="legend">
          <div className="legend-item"><span className="swatch" style={{ background: WALL_TYPES[wallType].baseColor }} />Underlag</div>
          <div className="legend-item"><span className="swatch" style={{ background: 'var(--primer)' }} />Grundning</div>
          <div className="legend-item"><span className="swatch" style={{ background: 'var(--membrane)' }} />Tätskikt</div>
          <div className="legend-item"><span className="swatch" style={{ background: 'var(--reinforce)' }} />Armering</div>
          <div className="legend-item"><span className="swatch" style={{ background: '#f1f4f2', border: '1px solid var(--grout)' }} />Kakel</div>
        </div>
      </div>

      <div className="card explain">
        <span className="code">{activeStep.code}</span>
        <strong style={{ fontSize: 17, display: 'block', marginBottom: 6 }}>{activeStep.title}</strong>
        <p style={{ margin: 0 }}>{activeStep.text}</p>
      </div>

      <button className="settings-toggle" onClick={() => setShowSettings((v) => !v)}>
        {showSettings ? 'Dölj mått' : 'Anpassa mått för väggen'}
      </button>

      {showSettings && (
        <div className="card">
          <div className="settings-grid">
            <div className="field">
              <label>Väggbredd (cm)</label>
              <input type="number" value={wallW} min={60} max={400} step={5} onChange={(e) => setWallW(Number(e.target.value) || 60)} />
            </div>
            <div className="field">
              <label>Väggens höjd (cm)</label>
              <input type="number" value={wallH} min={60} max={400} step={5} onChange={(e) => setWallH(Number(e.target.value) || 60)} />
            </div>
            <div className="field">
              <label>Fönsterbredd (cm)</label>
              <input type="number" value={winW} min={0} max={200} step={5} onChange={(e) => setWinW(Number(e.target.value) || 0)} />
            </div>
            <div className="field">
              <label>Fönsterhöjd (cm)</label>
              <input type="number" value={winH} min={0} max={200} step={5} onChange={(e) => setWinH(Number(e.target.value) || 0)} />
            </div>
            <div className="field">
              <label>Fönster: avstånd från vänster</label>
              <input type="number" value={winX} min={0} max={400} step={5} onChange={(e) => setWinX(Number(e.target.value) || 0)} />
            </div>
            <div className="field">
              <label>Fönster: avstånd från golv</label>
              <input type="number" value={winY} min={0} max={400} step={5} onChange={(e) => setWinY(Number(e.target.value) || 0)} />
            </div>
          </div>
        </div>
      )}

      <footer className="note">Tätskikt-guide · byggd för att förklara badrumsrenovering för kunder</footer>
    </div>
  )
}
