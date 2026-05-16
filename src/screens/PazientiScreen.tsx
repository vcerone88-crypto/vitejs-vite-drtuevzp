import { formatEuro, nomeCompleto, statistichePaziente } from '../format';
import type { Movimento, Paziente } from '../types';

export function PazientiScreen({
  pazienti, movimenti, onAggiungi, onApri, onElimina,
}: {
  pazienti: Paziente[];
  movimenti: Movimento[];
  onAggiungi: () => void;
  onApri: (id: string) => void;
  onElimina: (id: string) => void;
}) {
  return (
    <>
      <header className="screen__header screen__header--row">
        <div>
          <p className="eyebrow">Anagrafica</p>
          <h1 className="screen__title">Pazienti</h1>
        </div>
        <button className="screen__action" type="button" onClick={onAggiungi}>+ Aggiungi</button>
      </header>

      {pazienti.length === 0 ? (
        <div className="empty">
          <p className="empty__title">Nessun paziente</p>
          <p className="empty__text">Aggiungi il primo paziente con il pulsante in alto.</p>
        </div>
      ) : (
        <ul className="patient-list">
          {pazienti.map((p) => {
            const { incassato, residuo, percent } = statistichePaziente(p, movimenti);
            return (
              <li
                key={p.id}
                className="patient patient--clickable"
                role="button"
                tabIndex={0}
                onClick={() => onApri(p.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onApri(p.id);
                  }
                }}
              >
                <div className="patient__head">
                  <div className="patient__main">
                    <p className="patient__name">{nomeCompleto(p)}</p>
                    <p className="patient__plan">{p.piano}</p>
                  </div>
                  <button
                    className="row__delete"
                    type="button"
                    onClick={(e) => { e.stopPropagation(); onElimina(p.id); }}
                    aria-label="Elimina paziente"
                  >×</button>
                </div>
                <div className="patient__bar">
                  <div className="patient__bar-fill" style={{ width: `${percent}%` }} />
                </div>
                <div className="patient__totals">
                  <span className="patient__totals-in">{formatEuro(incassato)} incassato</span>
                  <span className="patient__totals-rest">{formatEuro(residuo)} residuo</span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
