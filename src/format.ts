import type { Movimento, Paziente } from './types';

export function formatEuro(valore: number): string {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency', currency: 'EUR', maximumFractionDigits: 0,
  }).format(valore);
}

export function oggiBreve(): string {
  return new Date()
    .toLocaleDateString('it-IT', { day: 'numeric', month: 'short' })
    .replace('.', '');
}

export function nomeCompleto(p: Paziente): string {
  return `${p.nome} ${p.cognome}`.trim();
}

export function statistichePaziente(p: Paziente, movimenti: Movimento[]) {
  const linked = movimenti.filter((m) => m.pazienteId === p.id);
  const incassato = linked
    .filter((m) => m.tipo === 'entrata')
    .reduce((a, m) => a + m.importo, 0);
  const residuo = Math.max(p.totaleDovuto - incassato, 0);
  const percent = p.totaleDovuto > 0
    ? Math.min(100, Math.round((incassato / p.totaleDovuto) * 100))
    : 0;
  return { linked, incassato, residuo, percent };
}