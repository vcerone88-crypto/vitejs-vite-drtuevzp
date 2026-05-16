import type { Movimento, NotaClinica, Paziente } from './types';

export const KEY_MOVIMENTI = 'contabilita-ortodonzia.movimenti.v2';
export const KEY_PAZIENTI  = 'contabilita-ortodonzia.pazienti.v1';
export const KEY_NOTE      = 'contabilita-ortodonzia.note.v1';

export const pazientiIniziali: Paziente[] = [
  { id: 'p1', nome: 'Marco',  cognome: 'Rossi',   piano: 'Apparecchio fisso', totaleDovuto: 3500 },
  { id: 'p2', nome: 'Giulia', cognome: 'Bianchi', piano: 'Allineatori',       totaleDovuto: 4200 },
];

export const movimentiIniziali: Movimento[] = [
  { id: '1', tipo: 'entrata', descrizione: 'Saldo — Apparecchio fisso', importo: 1200, data: '2026-05-14', pazienteId: 'p1' },
  { id: '2', tipo: 'uscita',  descrizione: 'Fornitore — Brackets',      importo: 340,  data: '2026-05-14' },
  { id: '3', tipo: 'entrata', descrizione: 'Acconto — Allineatori',     importo: 800,  data: '2026-05-12', pazienteId: 'p2' },
  { id: '4', tipo: 'entrata', descrizione: 'Controllo — saldo seduta',  importo: 80,   data: '2026-05-12' },
];

export const noteIniziali: NotaClinica[] = [
  {
    id: 'n1',
    pazienteId: 'p1',
    data: '2026-05-14',
    tipo: 'Controllo',
    testo: 'Sostituzione legature. Buona igiene. Continuare con i controlli ogni 4 settimane.',
  },
  {
    id: 'n2',
    pazienteId: 'p2',
    data: '2026-05-12',
    tipo: 'Prestazione',
    testo: 'Consegna set 3 di allineatori. Verifica corretta occlusione tra 2 settimane.',
  },
  {
    id: 'n3',
    pazienteId: 'p1',
    data: '2026-05-10',
    tipo: 'Visita',
    testo: 'Prima visita. Discussione piano di trattamento e tempistiche.',
  },
];