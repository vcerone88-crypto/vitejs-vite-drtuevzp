export type TabId = 'home' | 'movimenti' | 'pazienti' | 'diario' | 'impostazioni';
export type TipoMovimento = 'entrata' | 'uscita';

export const PIANI = [
  'Apparecchio fisso',
  'Allineatori',
  'Apparecchio mobile',
  'Mantenitore',
  'Altro',
] as const;
export type PianoTrattamento = typeof PIANI[number];

export const TIPI_SEDUTA = ['Visita', 'Controllo', 'Prestazione', 'Nota'] as const;
export type TipoSeduta = typeof TIPI_SEDUTA[number];

export type Movimento = {
  id: string;
  tipo: TipoMovimento;
  descrizione: string;
  importo: number;
  data: string;
  pazienteId?: string;
};

export type Paziente = {
  id: string;
  nome: string;
  cognome: string;
  piano: PianoTrattamento;
  totaleDovuto: number;
};

export type NotaClinica = {
  id: string;
  pazienteId: string;
  data: string;
  tipo: TipoSeduta;
  testo: string;
};

export type SheetMovimentoState = { tipo: TipoMovimento; pazienteId?: string };
export type SheetNotaState = { pazienteId: string };