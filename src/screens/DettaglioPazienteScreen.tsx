import { RowMovimento } from '../components/RowMovimento';
import { RowNota } from '../components/RowNota';
import { formatEuro, nomeCompleto, statistichePaziente } from '../format';
import type { Movimento, NotaClinica, Paziente } from '../types';

export function DettaglioPazienteScreen({
  paziente,
  movimenti,
  note,
  onBack,
  onNuovaEntrata,
  onEliminaMovimento,
  onNuovaNota,
  onEliminaNota,
}: {
  paziente: Paziente;
  movimenti: Movimento[];
  note: NotaClinica[];
  onBack: () => void;
  onNuovaEntrata: () => void;
  onEliminaMovimento: (id: string) => void;
  onNuovaNota: () => void;
  onEliminaNota: (id: string) => void;
}) {
  const { linked, incassato, residuo, percent } = statistichePaziente(paziente, movimenti);
  const noteOrdinate = [...note].sort((a, b) => b.data.localeCompare(a.data));

  return (
    <>
      <header className="screen__header">
        <button type="button" className="screen__back" onClick={onBack}>
          ‹ Pazienti
        </button>
        <p className="eyebrow eyebrow--spaced">{paziente.piano}</p>
        <h1 className="screen__title">{nomeCompleto(paziente)}</h1>
        <p className="screen__subtitle">Piano da {formatEuro(paziente.totaleDovuto)}</p>
      </header>

      <div className="stats">
        <div className="stats__row">
          <div>
            <p className="stats__label">Piano</p>
            <p className="stats__value">{formatEuro(paziente.totaleDovuto)}</p>
          </div>
          <div>
            <p className="stats__label">Incassato</p>
            <p className="stats__value stats__value--in">{formatEuro(incassato)}</p>
          </div>
          <div>
            <p className="stats__label">Residuo</p>
            <p className="stats__value">{formatEuro(residuo)}</p>
          </div>
        </div>
        <div className="stats__bar">
          <div className="stats__bar-fill" style={{ width: `${percent}%` }} />
        </div>
        <p className="stats__percent">{percent}% completato</p>
      </div>

      <div className="actions">
        <button
          type="button"
          className="actions__btn actions__btn--primary"
          onClick={onNuovaEntrata}
        >
          + Entrata
        </button>
        <button
          type="button"
          className="actions__btn actions__btn--secondary"
          onClick={onNuovaNota}
        >
          + Nota clinica
        </button>
      </div>

      <section className="detail-section">
        <div className="list__header">
          <h2 className="list__title">Diario clinico</h2>
        </div>
        {noteOrdinate.length === 0 ? (
          <div className="empty">
            <p className="empty__title">Nessuna nota</p>
            <p className="empty__text">Aggiungi la prima voce di diario.</p>
          </div>
        ) : (
          <ul className="list__items">
            {noteOrdinate.map((n) => (
              <RowNota
                key={n.id}
                n={n}
                onElimina={() => onEliminaNota(n.id)}
              />
            ))}
          </ul>
        )}
      </section>

      <section className="detail-section">
        <div className="list__header">
          <h2 className="list__title">Storico pagamenti</h2>
        </div>
        {linked.length === 0 ? (
          <div className="empty">
            <p className="empty__title">Nessun pagamento</p>
            <p className="empty__text">Le entrate associate appariranno qui.</p>
          </div>
        ) : (
          <ul className="list__items">
            {linked.map((m) => (
              <RowMovimento
                key={m.id}
                m={m}
                pazienti={[paziente]}
                onElimina={() => onEliminaMovimento(m.id)}
              />
            ))}
          </ul>
        )}
      </section>
    </>
  );
}