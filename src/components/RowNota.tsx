import { formatDataDisplay, nomeCompleto } from '../format';
import type { NotaClinica, Paziente } from '../types';

export function RowNota({
  n,
  paziente,
  mostraData = true,
  onElimina,
}: {
  n: NotaClinica;
  paziente?: Paziente;
  mostraData?: boolean;
  onElimina?: () => void;
}) {
  const hasMeta = mostraData || !!paziente;

  return (
    <li className="note">
      <header className="note__head">
        <span className="note__tipo">{n.tipo}</span>
        {hasMeta && (
          <span className="note__meta">
            {mostraData && formatDataDisplay(n.data)}
            {mostraData && paziente && ' · '}
            {paziente && <span className="note__patient">{nomeCompleto(paziente)}</span>}
          </span>
        )}
        {onElimina && (
          <button
            className="row__delete"
            type="button"
            onClick={onElimina}
            aria-label="Elimina nota"
          >
            ×
          </button>
        )}
      </header>
      <p className="note__text">{n.testo}</p>
    </li>
  );
}