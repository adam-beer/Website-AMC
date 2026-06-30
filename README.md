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
3. **Fotky** — ✅ hotovo. Galéria používa 6 reálnych fotiek (`IMG_5910`–`IMG_5916`)
   a sekcia „O nás“ zobrazuje záber kávy + termopoháre (`termopohare.png`).
   Fotky sa načítavajú „lazy“ (až keď na ne posunieš), takže stránka je rýchla.
   Tip: `termopohare.png` má ~3,4 MB — ak chceš ešte rýchlejšie načítanie,
   zmenši ho na ~1400 px šírku (napr. cez squoosh.app) a nahraď súbor.
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
