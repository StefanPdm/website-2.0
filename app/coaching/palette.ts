/**
 * PROTOTYP (Branch experiment/coaching-farbwelt): schaltet die Farbwelt von
 * Welt A zum Vergleich um. Wert steht als data-palette am .theme-coaching-
 * Container, gesetzt vor dem ersten Bild durch `paletteScript` (kein Flackern).
 * Links für Tester: /coaching?farbe=hell (bzw. bisher, aufgehellt, mix).
 * Vor einem Merge wieder entfernen – oder die gewählte Variante fest übernehmen.
 */
export const palettes = [
  { id: 'bisher', short: '0', label: 'Bisher' },
  { id: 'aufgehellt', short: '1', label: 'Dunkel aufgehellt' },
  { id: 'hell', short: '2', label: 'Hell & warm' },
  { id: 'mix', short: '3', label: 'Mischform' },
] as const;

export type PaletteId = (typeof palettes)[number]['id'];

export const STORAGE_KEY = 'coaching-farbe';
const ids = palettes.map((p) => p.id);

/** Läuft inline als erstes Kind des Containers, bevor der Browser malt. */
export const paletteScript = `(function(){try{var d=document.currentScript.parentElement;var ok=${JSON.stringify(ids)};var p=new URLSearchParams(location.search).get('farbe');if(ok.indexOf(p)>-1){localStorage.setItem('${STORAGE_KEY}',p)}else{p=localStorage.getItem('${STORAGE_KEY}')}if(p&&p!=='bisher'&&ok.indexOf(p)>-1)d.dataset.palette=p}catch(e){}})()`;
