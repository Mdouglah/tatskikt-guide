# Tätskikt-guide

Interaktiv illustration som visar hur tätskikt fungerar i en badrumsvägg — tänkt att användas av hantverkare i kundmöten.

## Vad den gör

- Väljbar väggtyp — betong eller gipsskiva (våtrumsskiva) — som ändrar förarbetstexten och underlagets utseende
- Fyra klickbara steg: underlag → grundning (primer) → tätskikt + armering → kakel
- Måtten på väggen och fönstret kan ställas in ("Anpassa mått") så illustrationen matchar kundens badrum
- Reglage i sista steget visar hur kaklet läggs ovanpå tätskiktet
- "Skriv ut / spara som PDF"-knapp för att lämna kvar en utskrift hos kunden
- Varje steg har en kort, kundvänlig förklaringstext som anpassas efter vald väggtyp (för underlag och grundning)

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

- Väggtyperna (betong/gipsskiva) ligger i `WALL_TYPES`-objektet i `App.jsx` — lägg till fler typer (t.ex. "Kalciumsilikatskiva") genom att lägga till en ny nyckel med `label`, `baseColor`, `baseColorDeep`, `prep` och `primer`.
- Stegtexterna som är gemensamma för alla väggtyper (tätskikt, kakel) ligger i `getSteps()`-funktionen i `App.jsx`.
- Färgerna (underlag/grundning/tätskikt/armering) styrs av CSS-variabler i `App.css` (`--concrete`, `--primer`, `--membrane`, `--reinforce`).
