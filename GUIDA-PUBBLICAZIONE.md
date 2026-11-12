# Il Capone – Salsa e Maionese (v1.0)
## Guida: pubblicare su GitHub + Vercel, con classifica Top 10 MENSILE online

Contenuto dello zip:

| File | A cosa serve |
|---|---|
| `index.html` | Il gioco (un solo file) |
| `api/leaderboard.js` | La classifica online (funzione di Vercel) |
| `package.json` | Dice a Vercel di installare il collegamento al database |
| `.gitignore` | File da non caricare su GitHub |

Costo: tutto gratuito con i piani gratuiti di GitHub, Vercel e Upstash (più che sufficienti per un gioco da eventi).

---

## PARTE 1 – GitHub (il "magazzino" dei file)

1. Vai su **github.com** ed entra (o crea un account gratuito).
2. In alto a destra: **+ → New repository**.
   - Nome: `il-capone-salsa-e-maionese`
   - Pubblico o Privato (con Vercel vanno bene entrambi).
   - Clicca **Create repository**.
3. Nella pagina del repository clicca **uploading an existing file**.
4. **Estrai lo zip sul computer** e trascina dentro **tutti i file e la cartella `api`** (non lo zip!). Devi vedere `index.html`, `package.json`, `.gitignore` e la cartella `api/` con dentro `leaderboard.js`.
   - Se il browser non ti lascia trascinare la cartella `api`: scegli **Add file → Create new file**, scrivi come nome `api/leaderboard.js` (la barra crea la cartella) e incolla il contenuto del file.
5. In basso clicca **Commit changes**.

> Alternativa da terminale:
> `git init && git add . && git commit -m "primo caricamento" && git branch -M main && git remote add origin https://github.com/TUO-UTENTE/il-capone-salsa-e-maionese.git && git push -u origin main`

---

## PARTE 2 – Vercel (il sito online)

1. Vai su **vercel.com** → **Sign Up** → **Continue with GitHub** (stesso account di prima).
2. **Add New… → Project**. Trova `il-capone-salsa-e-maionese` e clicca **Import**.
3. Lascia tutto com'è (Framework Preset: *Other*, nessun comando di build) e clicca **Deploy**.
4. Dopo circa un minuto ottieni un indirizzo tipo `https://salsaemaionese.ilcaponequiz.win`.

A questo punto il gioco è online e funziona già, ma la classifica resta **solo sul singolo telefono** finché non fai la parte 3.

---

## PARTE 3 – Classifica condivisa (database gratuito)

Vercel non ha un database interno: si collega **Upstash Redis** dal Marketplace (gratis, in pochi clic).

1. Nel progetto su Vercel apri la scheda **Storage** (oppure **Marketplace → Storage**).
2. Scegli **Upstash → Redis** (o "Create Database"), accetta i termini.
3. Scegli un nome (es. `capone-classifica`), regione **Europa** (es. Francoforte/Irlanda) e il piano **Free**.
4. Quando ti chiede a quale progetto collegarlo, seleziona `il-capone-salsa-e-maionese` e conferma.
   Vercel aggiunge da solo le variabili d'ambiente (`KV_REST_API_URL` e `KV_REST_API_TOKEN`, a volte `UPSTASH_REDIS_REST_*`): il codice le riconosce tutte, **non devi scrivere niente**.
5. **Importante – rifai il deploy** così il sito vede le nuove variabili:
   scheda **Deployments** → i tre puntini sull'ultimo deploy → **Redeploy**.

### Prova che funzioni
- Apri `https://TUO-SITO.vercel.app/api/leaderboard`: deve comparire `[]` (classifica del mese ancora vuota). Se vedi `{"error":"errore server"}` le variabili non sono collegate: ripeti i punti 4–5.
- Gioca una partita fino al Game Over: il punteggio compare in classifica. Aprendo il gioco da un altro telefono vedi gli stessi nomi.

---

## Aggiornare il gioco in futuro
Su GitHub apri `index.html` → icona matita → incolla la nuova versione → **Commit changes**. Vercel ripubblica da solo in circa un minuto. La classifica non si cancella.

> **Se cambi anche `api/leaderboard.js`** (come nella v0.9): su GitHub apri `api/leaderboard.js` → icona matita → seleziona tutto e incolla il nuovo codice → **Commit changes**. Carica **prima** il file dell'API e **poi** `index.html`.

## Classifica mensile (novembre, dicembre, ...)
- Ogni mese ha la sua classifica: nel gioco compare **"TOP 10 DI NOVEMBRE"**, poi **"TOP 10 DI DICEMBRE"** e così via.
- **Il 1° del mese (ora italiana) si riparte da zero da soli:** non devi fare niente. La classifica del mese passato resta salvata e non si perde.
- Per vedere un mese passato apri nel browser `https://TUO-SITO.vercel.app/api/leaderboard?month=2026-11` (anno-mese).
- **Togliere un nome sgradito:** su Vercel → Storage → il tuo database → **Open in Upstash** → *Data Browser* → apri la chiave del mese, per esempio `capone:lb:2026-11`, ed elimina la voce.
- **Azzerare a mano un mese:** nello stesso Data Browser elimina la chiave `capone:lb:AAAA-MM` di quel mese.
- La vecchia chiave `capone:lb` (classifica unica delle versioni precedenti) non viene più usata: puoi eliminarla.
- Sul telefono di chi gioca si tengono anche i punteggi degli ultimi 3 mesi, ma si vede solo quello del mese corrente.

## Dominio tuo (facoltativo)
Vercel → progetto → **Settings → Domains** → aggiungi il dominio e segui le istruzioni DNS.

## Per Android: gioco a schermo intero in orizzontale
Apri il sito con Chrome → menu ⋮ → **Aggiungi a schermata Home**. Dalla nuova icona il gioco parte a tutto schermo in orizzontale. Su iPhone, con il telefono in verticale il gioco si ruota da solo: basta girare il telefono.

## Note sulla sicurezza (versione bozza)
- Il server accetta solo nomi di max 12 caratteri e punteggi realistici (tetto 100.000 €), ma un giocatore esperto potrebbe comunque inviare punteggi falsi dalla console del browser. Per i tornei con premi veri conviene aggiungere controlli più severi: possiamo farlo.
- Il gioco funziona anche aprendo `index.html` dal computer o su GitHub Pages: in quel caso la classifica resta locale al dispositivo.

## Se qualcosa non va
| Problema | Soluzione |
|---|---|
| `/api/leaderboard` dà errore 404 | La cartella `api` non è finita su GitHub, oppure `leaderboard.js` non è dentro `api/`. |
| `errore server` | Database non collegato al progetto, oppure manca il Redeploy dopo il collegamento. |
| La classifica compare ma non si aggiorna su altri telefoni | Ricarica la pagina; la classifica si scarica all'apertura e quando premi CLASSIFICA. |
