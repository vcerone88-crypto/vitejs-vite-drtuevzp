import { formatEuro, nomeCompleto } from '../format';
import type { Movimento, Paziente } from '../types';

export function RowMovimento({
  m, pazienti, onElimina,
}: { m: Movimento; pazienti: Paziente[]; onElimina?: () => void }) {
  const paziente = pazienti.find((p) => p.id === m.pazienteId);
  return (
    <li className="row">
      <div className="row__main">
        <p className="row__desc">{m.descrizione}</p>
        <p className="row__date">
          {m.data}
          {paziente && <> · <span className="row__patient">{nomeCompleto(paziente)}</span></>}
        </p>
      </div>
      <div className="row__right">
        <p className={`row__amount ${m.tipo === 'entrata' ? 'row__amount--in' : 'row__amount--out'}`}>
          {m.tipo === 'entrata' ? '+' : '−'} {formatEuro(m.importo)}
        </p>
        {onElimina && (
          <button
            className="row__delete"
            type="button"
            onClick={onElimina}
            aria-label="Elimina movimento"
          >×</button>
        )}
      </div>
    </li>
  );
}