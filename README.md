# AMC tvoj coffeeshop — webová stránka

Jednoduchá, rýchla a responzívna webstránka pre **AMC tvoj coffeeshop**
v Spišskej Novej Vsi. Funguje na mobiloch aj počítačoch, je celá v slovenčine
a nepotrebuje žiadny server ani databázu — sú to len tri súbory.

## Súbory
| Súbor | Čo obsahuje |
|-------|-------------|
| `index.html` | Obsah stránky (texty, menu, kontakt) |
| `styles.css` | Vzhľad a farby (luxusná tmavá téma) |
| `script.js`  | Mobilné menu + animácie |
| `amc-logo.jpg` | Logo AMC (vľavo hore, v pätičke, ikona záložky) |
| `coffee-beans.svg` | Jemná textúra kávových zŕn v pozadí |

## Ako si stránku pozrieť
Stačí otvoriť `index.html` v prehliadači (dvojklik). To je všetko.

## Čo treba doplniť / upraviť (rýchle TODO)
Všetko sa edituje priamo v `index.html`:

1. **Otváracie hodiny** — sekcia „Kontakt“. Aktuálne sú tam orientačné časy
   (Po–Pia 7:30–18:00 atď.). Nahraď ich reálnymi.
2. **Menu a ceny** — sekcia „Menu“. Položky a ceny sú ukážkové, len ich prepíš.
3. **Fotky produktov** — Galéria aj „O nás“ teraz používajú farebné dlaždice.
   Nahraj do repozitára fotky výrobkov (a obrázok 4 termopohárov — čierna, biela,
   krémová, rose gold) a daj vedieť — zaradím ich do galérie a pridám sekciu
   s termopohármi. Návod na vloženie fotky je nižšie.
4. **Rok založenia** — v hero sekcii je „od roku 2018“. Uprav podľa skutočnosti.

### Ako pridať vlastnú fotku
1. Daj fotku (napr. `kava.jpg`) do tohto priečinka.
2. V `styles.css` nájdi napr. `.g2` a zmeň riadok na:
   `background-image: url("kava.jpg");`

## Farebná schéma (warm + youthful)
- Krémová `#f7f1e8` (pozadie)
- Espresso hnedá `#3a2419` (text/tmavé sekcie)
- Terakota `#d97849` (hlavný akcent — tlačidlá, odkazy)
- Karamel `#e0a458` a šalviová `#8a9a7b` (doplnkové)

Zmeniť ich vieš naraz hore v `styles.css` v bloku `:root`.

## Zverejnenie zadarmo
- **GitHub Pages:** Settings → Pages → zdroj `main` → `/root`. Hotovo.
- **Netlify / Vercel:** pretiahni priečinok do okna — stránka je online za pár sekúnd.

## Kontakt na podnik
- 📍 Ing. Straku 9003, 052 01 Spišská Nová Ves
- 📸 Instagram: [@amctvojcoffeeshop](https://www.instagram.com/amctvojcoffeeshop)
- 🗺️ [Google Maps](https://maps.app.goo.gl/QRpLaR378zq7XD2i9)
