import React, { useMemo, useState } from 'react'

const LANGS = [
  { code: 'sv', label: 'Svenska' },
  { code: 'en', label: 'English' },
  { code: 'ar', label: 'العربية' },
]

const UI = {
  sv: {
    brand: 'Tätskikt — kundguide',
    title: 'Så fungerar tätskiktet i din vägg',
    printBtn: 'Skriv ut / spara som PDF',
    stepWord: 'STEG',
    legend: { underlag: 'Underlag', grundning: 'Grundning', tatskikt: 'Tätskikt', armering: 'Armering', kakel: 'Kakel' },
    revealLabel: 'Kakelläggning',
    settingsOpen: 'Anpassa mått för väggen',
    settingsClose: 'Dölj mått',
    fields: {
      wallW: 'Väggbredd (cm)', wallH: 'Väggens höjd (cm)',
      winW: 'Fönsterbredd (cm)', winH: 'Fönsterhöjd (cm)',
      winX: 'Fönster: avstånd från vänster', winY: 'Fönster: avstånd från golv',
    },
    footer: 'Tätskikt-guide · byggd för att förklara badrumsrenovering för kunder',
    wallTypes: {
      betong: {
        label: 'Betong',
        prep: 'Betongväggen görs ren, torr och jämn. Lös betonghud, gammal färg och ojämnheter slipas bort. Fuktkvoten i betongen mäts innan arbetet fortsätter — för hög fukt kan senare tränga upp genom tätskiktet.',
        prepShort: 'Rent, torrt, jämnt — fuktkvoten mäts',
        primer: 'En grundning (primer) anpassad för betong appliceras över hela ytan. Den binder kvarvarande damm och gör att tätskiktsmassan fäster jämnt mot den porösa betongytan.',
        primerShort: 'Binder dammet i betongen',
      },
      gips: {
        label: 'Gipsskiva (våtrumsskiva)',
        prep: 'Våtrumsskivan skruvas fast enligt tillverkarens anvisningar, med rätt skruvavstånd och infästning i reglar. Skarvarna mellan skivorna spacklas och förstärks med en skarvremsa så att hela ytan blir plan.',
        prepShort: 'Skruvas, skarvspacklas, planas',
        primer: 'Skarvarna och skruvskallarna grundmålas separat innan hela väggen primas i ett jämnt lager, så att tätskiktet får en likvärdig, sugande yta att fästa mot över hela ytan.',
        primerShort: 'Jämnar ut skarvar och skruv',
      },
    },
    steps: {
      s1: { name: 'Underlag', title: 'Underlaget förbereds' },
      s2: { name: 'Grundning', title: 'Primer appliceras' },
      s3: {
        name: 'Tätskikt', title: 'Tätskikt och armering',
        text: 'Ett vattentätt skikt (tätskiktsmassa) appliceras över hela väggen. Vid golvanslutningen, i hörn och runt fönster läggs en extra förstärkning — armering — eftersom det är just där rörelser i huset och fuktbelastning är som störst. Utan den förstärkningen är risken för sprickor och läckage betydligt högre.',
      },
      s4: {
        name: 'Kakel', title: 'Kaklet läggs',
        text: 'När tätskiktet har torkat läggs kaklet ovanpå. Det är tätskiktet som håller vattnet borta från väggen — kaklet är den yta man ser och tar i, men det är inte det som skyddar mot fukt.',
      },
    },
    callouts: {
      primerLabel: 'Grundning',
      membraneLabel: 'Tätskikt', membraneSub: 'Vattentät massa, hela ytan',
      reinforceLabel: 'Armering', reinforceSub: 'Golv, hörn, fönster',
      tileLabel: 'Kakel', tileSub: 'Ytskikt — inte skyddet',
    },
  },

  en: {
    brand: 'Waterproofing — customer guide',
    title: 'How the waterproofing in your wall works',
    printBtn: 'Print / save as PDF',
    stepWord: 'STEP',
    legend: { underlag: 'Substrate', grundning: 'Priming', tatskikt: 'Waterproofing', armering: 'Reinforcement', kakel: 'Tiles' },
    revealLabel: 'Tiling progress',
    settingsOpen: 'Customize wall dimensions',
    settingsClose: 'Hide dimensions',
    fields: {
      wallW: 'Wall width (cm)', wallH: 'Wall height (cm)',
      winW: 'Window width (cm)', winH: 'Window height (cm)',
      winX: 'Window: distance from left', winY: 'Window: distance from floor',
    },
    footer: 'Waterproofing guide · built to explain bathroom renovation to customers',
    wallTypes: {
      betong: {
        label: 'Concrete',
        prep: 'The concrete wall is cleaned, dried and levelled. Loose laitance, old paint and unevenness are ground away. Moisture content in the concrete is measured before work continues — excess moisture can later seep through the waterproofing.',
        prepShort: 'Clean, dry, level — moisture is measured',
        primer: 'A primer suited to concrete is applied across the whole surface. It binds remaining dust and lets the waterproofing compound adhere evenly to the porous concrete.',
        primerShort: 'Binds dust in the concrete',
      },
      gips: {
        label: 'Wet-room board (gypsum)',
        prep: "The wet-room board is screwed in place per the manufacturer's instructions, with correct screw spacing and fixed into the studs. Joints between boards are filled and reinforced with joint tape so the whole surface is flat.",
        prepShort: 'Screwed, joints filled, flattened',
        primer: 'Joints and screw heads are primed separately before the whole wall gets an even coat of primer, giving the waterproofing a consistent, absorbent surface across the entire area.',
        primerShort: 'Evens out joints and screws',
      },
    },
    steps: {
      s1: { name: 'Substrate', title: 'The substrate is prepared' },
      s2: { name: 'Priming', title: 'Primer is applied' },
      s3: {
        name: 'Waterproofing', title: 'Waterproofing and reinforcement',
        text: "A waterproof coating is applied across the entire wall. At the floor junction, in corners, and around windows, extra reinforcement is added — because that's exactly where movement in the building and moisture stress are greatest. Without that reinforcement, the risk of cracking and leaks is far higher.",
      },
      s4: {
        name: 'Tiles', title: 'Tiles are laid',
        text: "Once the waterproofing has dried, tiles are laid on top. It's the waterproofing that keeps water out of the wall — the tiles are the surface you see and touch, but they're not what protects against moisture.",
      },
    },
    callouts: {
      primerLabel: 'Priming',
      membraneLabel: 'Waterproofing', membraneSub: 'Waterproof compound, whole surface',
      reinforceLabel: 'Reinforcement', reinforceSub: 'Floor, corners, window',
      tileLabel: 'Tiles', tileSub: 'Surface layer — not the protection',
    },
  },

  ar: {
    brand: 'طبقة العزل المائي — دليل العميل',
    title: 'كيف تعمل طبقة العزل المائي في جدارك',
    printBtn: 'طباعة / حفظ كملف PDF',
    stepWord: 'خطوة',
    legend: { underlag: 'الأساس', grundning: 'التأسيس', tatskikt: 'العزل المائي', armering: 'التعزيز', kakel: 'البلاط' },
    revealLabel: 'تقدّم تركيب البلاط',
    settingsOpen: 'تخصيص أبعاد الجدار',
    settingsClose: 'إخفاء الأبعاد',
    fields: {
      wallW: 'عرض الجدار (سم)', wallH: 'ارتفاع الجدار (سم)',
      winW: 'عرض النافذة (سم)', winH: 'ارتفاع النافذة (سم)',
      winX: 'النافذة: المسافة من اليسار', winY: 'النافذة: المسافة من الأرضية',
    },
    footer: 'دليل العزل المائي · صُمم لشرح تجديد الحمام للعملاء',
    wallTypes: {
      betong: {
        label: 'خرسانة',
        prep: 'يتم تنظيف الجدار الخرساني وتجفيفه وتسويته. تُزال الطبقة السطحية الرخوة والدهان القديم وأي تفاوتات. تُقاس نسبة الرطوبة في الخرسانة قبل متابعة العمل — فالرطوبة الزائدة قد تتسرب لاحقًا عبر طبقة العزل.',
        prepShort: 'نظيف، جاف، مستوٍ — تُقاس نسبة الرطوبة',
        primer: 'تُوضع مادة تأسيسية (برايمر) مخصصة للخرسانة على كامل السطح. تعمل على تثبيت الغبار المتبقي وتساعد مادة العزل المائي على الالتصاق بشكل متساوٍ بسطح الخرسانة المسامي.',
        primerShort: 'تثبّت الغبار في الخرسانة',
      },
      gips: {
        label: 'لوح جبسي (لوح الغرف الرطبة)',
        prep: 'يتم تثبيت لوح الغرف الرطبة بالبراغي حسب تعليمات الشركة المصنّعة، بمسافات براغي صحيحة وتثبيت في الهيكل الخشبي. تُعالَج وصلات الألواح وتُعزَّز بشريط وصلات ليصبح السطح مستويًا بالكامل.',
        prepShort: 'تثبيت بالبراغي، معالجة الوصلات، تسوية',
        primer: 'تُطلى الوصلات ورؤوس البراغي أولًا بشكل منفصل، ثم يُطلى الجدار بالكامل بطبقة تأسيسية متساوية، ليصبح سطحًا موحدًا وقابلًا للامتصاص تلتصق به مادة العزل المائي على كامل المساحة.',
        primerShort: 'تسوية الوصلات والبراغي',
      },
    },
    steps: {
      s1: { name: 'الأساس', title: 'تجهيز الأساس' },
      s2: { name: 'التأسيس', title: 'وضع طبقة التأسيس' },
      s3: {
        name: 'العزل المائي', title: 'العزل المائي والتعزيز',
        text: 'تُوضع طبقة عازلة للماء على كامل الجدار. عند اتصال الجدار بالأرضية، وفي الزوايا، وحول النافذة، تُضاف طبقة تعزيز إضافية — لأن هذه هي بالتحديد النقاط الأكثر عرضة للحركة في المبنى وللرطوبة. بدون هذا التعزيز، يزداد خطر التشقق والتسرب بشكل كبير.',
      },
      s4: {
        name: 'البلاط', title: 'تركيب البلاط',
        text: 'بعد جفاف طبقة العزل المائي، يُركَّب البلاط فوقها. طبقة العزل هي التي تمنع تسرب الماء إلى الجدار — أما البلاط فهو السطح الذي تراه وتلمسه، لكنه ليس ما يحمي من الرطوبة.',
      },
    },
    callouts: {
      primerLabel: 'التأسيس',
      membraneLabel: 'العزل المائي', membraneSub: 'مادة عازلة للماء، على كامل السطح',
      reinforceLabel: 'التعزيز', reinforceSub: 'الأرضية، الزوايا، النافذة',
      tileLabel: 'البلاط', tileSub: 'طبقة السطح — وليست الحماية',
    },
  },
}

function getSteps(wallType, lang) {
  const t = UI[lang]
  const w = t.wallTypes[wallType]
  return [
    { id: 1, code: `${t.stepWord} 01`, name: t.steps.s1.name, title: t.steps.s1.title, text: w.prep, icon: 'underlag' },
    { id: 2, code: `${t.stepWord} 02`, name: t.steps.s2.name, title: t.steps.s2.title, text: w.primer, icon: 'grundning' },
    { id: 3, code: `${t.stepWord} 03`, name: t.steps.s3.name, title: t.steps.s3.title, text: t.steps.s3.text, icon: 'tatskikt' },
    { id: 4, code: `${t.stepWord} 04`, name: t.steps.s4.name, title: t.steps.s4.title, text: t.steps.s4.text, icon: 'kakel' },
  ]
}

const WALL_COLORS = {
  betong: { baseColor: '#a6a299', baseColorDeep: '#6e6b62' },
  gips: { baseColor: '#cbb896', baseColorDeep: '#a3906d' },
}

function StepIcon({ type }) {
  const common = { width: 18, height: 18, viewBox: '0 0 20 20', fill: 'none' }
  if (type === 'underlag') {
    return (
      <svg {...common}>
        <rect x="2.5" y="2.5" width="15" height="15" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
        <line x1="2.5" y1="8.5" x2="17.5" y2="8.5" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
        <line x1="2.5" y1="13" x2="17.5" y2="13" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
      </svg>
    )
  }
  if (type === 'grundning') {
    return (
      <svg {...common}>
        <path d="M10 2.5C10 2.5 5 8.5 5 12.2C5 15 7.2 17 10 17C12.8 17 15 15 15 12.2C15 8.5 10 2.5 10 2.5Z" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    )
  }
  if (type === 'tatskikt') {
    return (
      <svg {...common}>
        <path d="M10 2.8L16.5 5V10C16.5 14 13.8 16.8 10 18C6.2 16.8 3.5 14 3.5 10V5L10 2.8Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    )
  }
  return (
    <svg {...common}>
      <rect x="2.5" y="2.5" width="6.5" height="6.5" rx="0.8" stroke="currentColor" strokeWidth="1.3" />
      <rect x="11" y="2.5" width="6.5" height="6.5" rx="0.8" stroke="currentColor" strokeWidth="1.3" />
      <rect x="2.5" y="11" width="6.5" height="6.5" rx="0.8" stroke="currentColor" strokeWidth="1.3" />
      <rect x="11" y="11" width="6.5" height="6.5" rx="0.8" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  )
}

function useGeometry({ wallW, wallH, winW, winH, winX, winY, step, reveal }) {
  return useMemo(() => {
    const areaX = 170, areaY = 90, areaW = 260, areaH = 340
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

function Callout({ px, py, lx, ly, label, sub, color }) {
  return (
    <g>
      <line x1={px} y1={py} x2={lx - 8} y2={ly - 4} stroke={color} strokeWidth="1" opacity="0.65" />
      <circle cx={px} cy={py} r="3" fill={color} />
      <text x={lx} y={ly} fontSize="12.5" fontWeight="600" fill="var(--ink)">{label}</text>
      {sub && <text x={lx} y={ly + 15} fontSize="11" fill="var(--ink-soft)">{sub}</text>}
    </g>
  )
}

function WallIllustration({ wallW, wallH, winW, winH, winX, winY, step, reveal, wallType, lang }) {
  const g = useGeometry({ wallW, wallH, winW, winH, winX, winY, step, reveal })
  const { wallX, wallY, wallPxW, wallPxH, hasWindow, winPxX, winPxY, winPxW, winPxH, strip, tiles, revealStartX, revealPx } = g
  const wc = WALL_COLORS[wallType]
  const t = UI[lang]
  const wt = t.wallTypes[wallType]
  const labelX = wallX + wallPxW + 26

  const seamYs = [wallY + wallPxH * 0.33, wallY + wallPxH * 0.66]

  return (
    <svg width="100%" viewBox="0 0 680 480" role="img" style={{ maxWidth: 680 }} dir="ltr">
      <title>{t.title}</title>
      <defs>
        <marker id="dimArrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke="var(--ink-soft)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
        <clipPath id="revealClip">
          <rect x={revealStartX} y={wallY} width={Math.max(revealPx, 0)} height={wallPxH} />
        </clipPath>
        <pattern id="membraneHatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="7" stroke="var(--membrane-soft)" strokeWidth="2" />
        </pattern>
      </defs>

      <DimensionLines g={g} wallW={wallW} wallH={wallH} />

      <rect x={wallX} y={wallY} width={wallPxW} height={wallPxH} rx="2" fill={wc.baseColor} stroke={wc.baseColorDeep} strokeWidth="0.5" />

      {step === 1 && wallType === 'gips' && (
        <g stroke={wc.baseColorDeep} strokeWidth="0.75" strokeDasharray="4 3" opacity="0.7">
          <line x1={wallX} y1={seamYs[0]} x2={wallX + wallPxW} y2={seamYs[0]} />
          <line x1={wallX} y1={seamYs[1]} x2={wallX + wallPxW} y2={seamYs[1]} />
        </g>
      )}

      {step >= 2 && (
        <rect x={wallX} y={wallY} width={wallPxW} height={wallPxH} rx="2" fill="var(--primer)" opacity="0.4" />
      )}

      {step >= 3 && (
        <>
          <rect x={wallX} y={wallY} width={wallPxW} height={wallPxH} rx="2" fill="var(--membrane)" opacity="0.6" />
          <rect x={wallX} y={wallY} width={wallPxW} height={wallPxH} rx="2" fill="url(#membraneHatch)" opacity="0.5" />
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
            {tiles.map((tl, i) => (
              <rect key={i} x={tl.x} y={tl.y} width={tl.w} height={tl.h} fill="#f1f4f2" stroke="var(--grout)" strokeWidth="0.5" rx="1" />
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

      {step === 1 && (
        <Callout px={wallX + wallPxW * 0.25} py={wallY + wallPxH * 0.2} lx={labelX} ly={wallY + wallPxH * 0.2}
          label={wt.label} sub={wt.prepShort} color={wc.baseColorDeep} />
      )}
      {step === 2 && (
        <Callout px={wallX + wallPxW * 0.6} py={wallY + wallPxH * 0.35} lx={labelX} ly={wallY + wallPxH * 0.2}
          label={t.callouts.primerLabel} sub={wt.primerShort} color="var(--primer)" />
      )}
      {step === 3 && (
        <>
          <Callout px={wallX + wallPxW * 0.35} py={wallY + wallPxH * 0.15} lx={labelX} ly={wallY + wallPxH * 0.12}
            label={t.callouts.membraneLabel} sub={t.callouts.membraneSub} color="var(--membrane)" />
          <Callout px={wallX + wallPxW - strip / 2} py={wallY + wallPxH - strip / 2} lx={labelX} ly={wallY + wallPxH * 0.55}
            label={t.callouts.reinforceLabel} sub={t.callouts.reinforceSub} color="var(--reinforce)" />
        </>
      )}
      {step === 4 && (
        <Callout px={wallX + wallPxW * 0.75} py={wallY + wallPxH * 0.5} lx={labelX} ly={wallY + wallPxH * 0.3}
          label={t.callouts.tileLabel} sub={t.callouts.tileSub} color="var(--ink)" />
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
  const [lang, setLang] = useState('sv')

  const t = UI[lang]
  const dir = lang === 'ar' ? 'rtl' : 'ltr'

  const clampedWinW = Math.min(winW, wallW - 10)
  const clampedWinH = Math.min(winH, wallH - 10)
  const clampedWinX = Math.min(winX, wallW - clampedWinW)
  const clampedWinY = Math.min(winY, wallH - clampedWinH)

  const steps = getSteps(wallType, lang)
  const activeStep = steps.find((s) => s.id === step)

  return (
    <div className="app" dir={dir} lang={lang}>
      <div className="header">
        <div className="brand-row">
          <svg width="26" height="26" viewBox="0 0 26 26" className="brand-mark">
            <rect x="2" y="2" width="22" height="6" fill="var(--concrete)" />
            <rect x="2" y="9" width="22" height="4" fill="var(--membrane)" />
            <rect x="2" y="14" width="22" height="10" fill="var(--reinforce)" opacity="0.85" />
          </svg>
          <div>
            <span className="brand">{t.brand}</span>
            <h1>{t.title}</h1>
          </div>
        </div>
        <div className="header-actions">
          <div className="lang-row">
            {LANGS.map((l) => (
              <button key={l.code} className={`lang-btn ${lang === l.code ? 'active' : ''}`} onClick={() => setLang(l.code)}>
                {l.label}
              </button>
            ))}
          </div>
          <button className="print-btn" onClick={() => window.print()}>{t.printBtn}</button>
        </div>
      </div>

      <div className="wall-type-row">
        {Object.keys(UI[lang].wallTypes).map((key) => (
          <button
            key={key}
            className={`wall-type-btn ${wallType === key ? 'active' : ''}`}
            onClick={() => setWallType(key)}
          >
            {t.wallTypes[key].label}
          </button>
        ))}
      </div>

      <div className="step-nav">
        {steps.map((s) => (
          <button
            key={s.id}
            className={`step-card ${step === s.id ? `active s${s.id}` : ''}`}
            onClick={() => setStep(s.id)}
          >
            <span className="step-card-icon"><StepIcon type={s.icon} /></span>
            <span className="step-card-text">
              <span className="code">{s.code}</span>
              <span className="name">{s.name}</span>
            </span>
          </button>
        ))}
      </div>

      <div className="workspace">
        <div className="card illustration-card">
          <div className="illustration-wrap">
            <WallIllustration
              wallW={wallW} wallH={wallH}
              winW={clampedWinW} winH={clampedWinH}
              winX={clampedWinX} winY={clampedWinY}
              step={step} reveal={reveal} wallType={wallType} lang={lang}
            />
          </div>

          {step === 4 && (
            <div className="reveal-row">
              <span>{t.revealLabel}</span>
              <input type="range" min="0" max="100" value={reveal} onChange={(e) => setReveal(Number(e.target.value))} />
              <span>{reveal}%</span>
            </div>
          )}

          <div className="legend">
            <div className="legend-item"><span className="swatch" style={{ background: WALL_COLORS[wallType].baseColor }} />{t.legend.underlag}</div>
            <div className="legend-item"><span className="swatch" style={{ background: 'var(--primer)' }} />{t.legend.grundning}</div>
            <div className="legend-item"><span className="swatch" style={{ background: 'var(--membrane)' }} />{t.legend.tatskikt}</div>
            <div className="legend-item"><span className="swatch" style={{ background: 'var(--reinforce)' }} />{t.legend.armering}</div>
            <div className="legend-item"><span className="swatch" style={{ background: '#f1f4f2', border: '1px solid var(--grout)' }} />{t.legend.kakel}</div>
          </div>
        </div>

        <div className={`card explain-card accent-${step}`}>
          <span className="code">{activeStep.code}</span>
          <strong className="explain-title">{activeStep.title}</strong>
          <p className="explain-text">{activeStep.text}</p>
        </div>
      </div>

      <button className="settings-toggle" onClick={() => setShowSettings((v) => !v)}>
        {showSettings ? t.settingsClose : t.settingsOpen}
      </button>

      {showSettings && (
        <div className="card">
          <div className="settings-grid">
            <div className="field">
              <label>{t.fields.wallW}</label>
              <input type="number" value={wallW} min={60} max={400} step={5} onChange={(e) => setWallW(Number(e.target.value) || 60)} />
            </div>
            <div className="field">
              <label>{t.fields.wallH}</label>
              <input type="number" value={wallH} min={60} max={400} step={5} onChange={(e) => setWallH(Number(e.target.value) || 60)} />
            </div>
            <div className="field">
              <label>{t.fields.winW}</label>
              <input type="number" value={winW} min={0} max={200} step={5} onChange={(e) => setWinW(Number(e.target.value) || 0)} />
            </div>
            <div className="field">
              <label>{t.fields.winH}</label>
              <input type="number" value={winH} min={0} max={200} step={5} onChange={(e) => setWinH(Number(e.target.value) || 0)} />
            </div>
            <div className="field">
              <label>{t.fields.winX}</label>
              <input type="number" value={winX} min={0} max={400} step={5} onChange={(e) => setWinX(Number(e.target.value) || 0)} />
            </div>
            <div className="field">
              <label>{t.fields.winY}</label>
              <input type="number" value={winY} min={0} max={400} step={5} onChange={(e) => setWinY(Number(e.target.value) || 0)} />
            </div>
          </div>
        </div>
      )}

      <footer className="note">{t.footer}</footer>
    </div>
  )
}
