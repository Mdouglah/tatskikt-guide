# Tätskikt-guide

Interaktiv illustration som visar hur tätskikt fungerar i en badrumsvägg — tänkt att användas av hantverkare i kundmöten.

## Vad den gör

- Tre språk — Svenska, English och العربية — växlas med knapparna högst upp till höger. Arabiska visas automatiskt höger-till-vänster (RTL), inklusive etiketterna på själva illustrationen.
- Väljbar väggtyp — betong eller gipsskiva (våtrumsskiva) — som ändrar förarbetstexten och underlagets utseende
- Fyra klickbara steg: underlag → grundning (primer) → tätskikt + armering → kakel
- Etiketter med pilar direkt på illustrationen som pekar ut vad varje del är, beroende på valt steg och språk
- Måtten på väggen och fönstret kan ställas in ("Anpassa mått") så illustrationen matchar kundens badrum
- Reglage i sista steget visar hur kaklet läggs ovanpå tätskiktet
- "Skriv ut / spara som PDF"-knapp för att lämna kvar en utskrift hos kunden

## Köra lokalt

```bash
npm install
npm run dev
```

## Bygga för produktion

```bash
npm run build
```

Detta skapar en `dist`-mapp redo att deployas.

## Deploya på Vercel

Samma flöde som dina andra appar:

1. Lägg upp mappen i ett nytt GitHub-repo (t.ex. `tatskikt-guide`)
2. Importera repot i Vercel
3. Vercel känner automatiskt igen Vite-projektet (build command: `npm run build`, output: `dist`)
4. Klart — appen får en `.vercel.app`-adress

## Filstruktur

```
tatskikt-guide/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx    ← all logik och illustration
    └── App.css    ← design/tokens
```

## Anpassa vidare

- Alla texter för alla tre språk ligger samlat i `UI`-objektet högst upp i `App.jsx` — varje språk (`sv`, `en`, `ar`) har exakt samma struktur, så det är enkelt att justera ordval eller lägga till ett fjärde språk genom att kopiera ett helt språkblock och översätta det.
- Väggtyperna (betong/gipsskiva) ligger under `wallTypes` inom varje språk i `UI`.
- Färgerna (underlag/grundning/tätskikt/armering) styrs av CSS-variabler i `App.css` (`--concrete`, `--primer`, `--membrane`, `--reinforce`).
