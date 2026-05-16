import { useMemo, useState } from 'react';
import { RowNota } from '../components/RowNota';
import { formatDataDisplay } from '../format';
import { TIPI_SEDUTA } from '../types';
import type { NotaClinica, Paziente, TipoSeduta } from '../types';

type FiltroTipo = 'tutti' | TipoSeduta;

type GruppoNote = {
  data: string;
  items: NotaClinica[];
};

function raggruppaNote(note: NotaClinica[]): GruppoNote[] {
  const map = new Map<string, NotaClinica[]>();
  for (const n of note) {
    const arr = map.get(n.data) ?? [];
    arr.push(n);
    map.set(n.data, arr);
  }
  return Array.from(map.entries())
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([data, items]) => ({ data, items }));
}

export function DiarioScreen({
  note,
  pazienti,
  onElimina,
}: {
  note: NotaClinica[];
  pazienti: Paziente[];
  onElimina: (id: string) => void;
}) {
  const [filtro, setFiltro] = useState<FiltroTipo>('tutti');

  const filtrate = useMemo(
    () => (filtro === 'tutti' ? note : note.filter((n) => n.tipo === filtro)),
    [note, filtro],
  );

  const gruppi = useMemo(() => raggruppaNote(filtrate), [filtrate]);

  const pazienteById = useMemo(() => {
    const map = new Map<string, Paziente>();
    pazienti.forEach((p) => map.set(p.id, p));
    return map;
  }, [pazienti]);

  return (
    <>
      <header className="screen__header">
        <p className="eyebrow">Sedute</p>
        <h1 className="screen__title">Diario clinico</h1>
      </header>

      <div className="chips chips--scroll">
        <button
          type="button"
          className={`chip ${filtro === 'tutti' ? 'chip--active' : ''}`}
          onClick={() => setFiltro('tutti')}
        >
          Tutte
        </button>
        {TIPI_SEDUTA.map((t) => (
          <button
            key={t}
            type="button"
            className={`chip ${filtro === t ? 'chip--active' : ''}`}
            onClick={() => setFiltro(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {gruppi.length === 0 ? (
        <div className="empty">
          <p className="empty__title">Nessuna seduta</p>
          <p className="empty__text">
            {filtro === 'tutti'
              ? 'Le note cliniche aggiunte ai pazienti appariranno qui.'
              : 'Nessuna seduta corrisponde al filtro.'}
          </p>
        </div>
      ) : (
        gruppi.map((g) => (
          <section key={g.data} className="day-group">
            <header className="day-group__header">
              <span className="day-group__date">{formatDataDisplay(g.data)}</span>
              <span className="day-group__total">
                {g.items.length} {g.items.length === 1 ? 'seduta' : 'sedute'}
              </span>
            </header>
            <ul className="list__items">
              {g.items.map((n) => (
                <RowNota
                  key={n.id}
                  n={n}
                  paziente={pazienteById.get(n.pazienteId)}
                  mostraData={false}
                  onElimina={() => onElimina(n.id)}
                />
              ))}
            </ul>
          </section>
        ))
      )}
    </>
  );
}