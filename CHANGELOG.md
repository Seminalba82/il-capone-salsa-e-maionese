# Il Capone – Salsa e Maionese · Storico versioni

## v1.0 (11/11/2026) – Nuova grafica
- Scena ridisegnata: furgone di notte ad Agrigento (luna, palma, tempio illuminato), tendone, lucine, parete a piastrelle con fascia in maiolica, pavimento a scacchi con luci e ombre, bancone in legno, piastre in ghisa con fiamme vere, vapore e fumo
- La scena riempie tutto lo schermo del telefono (niente più bande nere ai lati)
- Cibo, bibite e panini ridisegnati con sfumature e riflessi; cassette più ordinate, con il nome sempre leggibile e il lucchetto su quelle ancora bloccate
- Capone ridisegnato (testa-microfono a griglia, due occhi, baffi, giacca, grembiule); clienti con più pettinature, cappelli e vestiti
- Interfaccia nuova: barra in alto con moneta, barra dei clienti serviti e cuoricini per i clienti che si possono ancora perdere; pulsanti e finestre lucidi; schermata iniziale con Capone, salse e panino
- Effetti: monete, cuori, scintille quando è pronto, coriandoli a fine livello
- Giocabilità: si possono toccare più cose di fila (fino a 4 mosse in coda, con i numeri); nel fumetto compare la spunta sugli ingredienti già messi e il fumetto giusto si illumina quando hai in mano il suo ordine; bonus SERIE per i clienti serviti di fila senza perderne; Capone un po' più veloce
- Classifica mensile, audio, tutorial, livelli e tempi invariati

## v0.9.1 (02/11/2026)
- Il pulsante "Prova anche gli altri giochi del Capone" ora porta a https://salagiochi.ilcaponequiz.win/ (si apre in una nuova scheda)
- Tolto giochi.html da questo sito: la sala giochi vive solo all'indirizzo giochi.ilcaponequiz.win

## v0.9 (02/11/2026) – Classifica mensile
- La classifica è mensile: "TOP 10 DI NOVEMBRE", poi "TOP 10 DI DICEMBRE" e così via. Il 1° del mese (ora italiana) riparte da zero da sola; i mesi passati restano salvati
- Titolo del mese anche nella schermata di fine partita; scritta "La classifica si azzera il 1° di ogni mese"
- Server (`api/leaderboard.js`): una chiave per mese (`capone:lb:AAAA-MM`), possibilità di vedere un mese passato con `?month=AAAA-MM`
- Nessun cambiamento a gioco, tutorial, audio, pulsanti e schermata iniziale

## v0.8.1 (02/11/2026)
- Aggiunto il simbolo ™ al titolo nel menu iniziale ("SALSA E MAIONESE™") e nel titolo della pagina

## v0.8 (02/11/2026)
- I pulsanti per Super Capone e Formula Anziani sono sostituiti da un solo pulsante "Prova anche gli altri giochi del Capone" che apre la nuova pagina giochi.html (la sala giochi di Alberto Seminerio con tutti i giochi)
- Aggiunto giochi.html nella radice del sito

## v0.7 (01/11/2026)
- Tolto il link "Provalo anche in 3D" (la scelta 2D/3D si fa dalla home di Formula Anziani)
- Aggiunte in fondo alla schermata iniziale le due righe: invito al gioco personalizzato (con link a ilcaponequiz.win e albertoseminerio.com) e crediti "Gioco creato da Alberto Seminerio · di proprietà di Il Capone Quiz™"

## v0.6 (31/10/2026)
- Pulsanti per giocare anche a Super Capone e Formula Anziani (solo nella schermata iniziale, si aprono in una nuova scheda)
- Link facoltativo "Provalo anche in 3D" per Formula Anziani
- Schermata iniziale riorganizzata per far stare tutto anche in orizzontale su telefono

## v0.5.1 (31/10/2026)
- Clienti persi: limite fisso a 5 in ogni livello (prima cresceva con i livelli). Al 5º cliente perso la partita finisce

## v0.5 (31/10/2026) – Audio
- Musica di sottofondo "Veloce come un'auto d'epoca" a volume basso, in loop durante la partita
- Voce quando il panino sulla piastra è pronto
- Voce quando qualcosa si brucia
- Voci dei clienti all'arrivo: le quattro tracce si alternano in ordine
- Voce "Sei licenziato!" al game over (la musica si ferma)
- La musica si abbassa da sola mentre parla una voce
- Tasto altoparlante (in alto, accanto alla pausa e nel menu) per togliere/rimettere l'audio
- Gli audio sono incorporati in index.html: basta caricare un solo file. In `audio-incorporati/` ci sono le copie ottimizzate

## v0.4 (31/10/2026) – Più facile e più preciso
- Ingredienti sbloccati piano piano: livello 1 solo patatine, panelle e ketchup; poi maionese e crocchette (liv. 2), barbecue e prosciutto (liv. 3), toast e formaggio (liv. 4), piadina, salame, Fanta (liv. 5), mortadella e birra (liv. 6)
- Popup "NOVITÀ!" all'inizio di ogni livello con quello che si sblocca
- Tasto TOGLI: rimuove l'ultimo ingrediente sbagliato senza buttare tutto (anche con il tasto Backspace/Z)
- Tocchi più precisi: cassette più grandi e viene scelta quella più vicina al dito
- Ordini più semplici (meno ingredienti nei primi livelli), meno clienti insieme, arrivi più lenti
- Clienti molto più pazienti e più tempo per ritirare il panino dalla piastra (14 s al liv. 1, poi cala di 1,3 s a livello, minimo 5 s)
- Si può perdere fino alla metà dei clienti prima del game over

## v0.3 (31/10/2026)
- Classifica Top 10 con nome giocatore (online su Vercel, locale altrove)
- Tolta la scelta dei livelli: si parte sempre dal livello 1
- Fine partita con punteggio, posizione e classifica
- Gioco ruotato automaticamente in orizzontale su telefono (iPhone) e blocco orizzontale su Android
- Panino sulla piastra: più tempo prima di bruciarsi (10 s al livello 1, poi cala di 0,9 s a livello)

## v0.2 (30/10/2026)
- Tutorial guidato al livello 1 (passo per passo con frecce e scritte)
- Livello 1 molto più facile (pochi clienti, tanta pazienza, 1–2 ingredienti)

## v0.1 (30/10/2026)
- Prima bozza: furgone in pseudo-3D, piastre, ingredienti, clienti con fumetto e umore
- Livelli da 5/10/15 clienti, bibite dal livello 3, mance in base alla velocità
- Controlli touch / mouse / frecce

