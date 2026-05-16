import { RowMovimento } from '../components/RowMovimento';
import { formatEuro } from '../format';
import type { Movimento, Paziente, TipoMovimento } from '../types';

export function HomeScreen({
  movimenti, pazienti, onNuovo, onVediTutti,
}: {
  movimenti: Movimento[];
  pazienti: Paziente[];
  onNuovo: (tipo: TipoMovimento) => void;
  onVediTutti: () => void;
}) {
  const entrate = movimenti.filter((m) => m.tipo === 'entrata').reduce((a, m) => a + m.importo, 0);
  const uscite  = movimenti.filter((m) => m.tipo === 'uscita').reduce((a, m) => a + m.importo, 0);
  const saldo   = entrate - uscite;

  return (
    <>
      <header className="screen__header">
        <p className="eyebrow">Studio Ortodontico</p>
        <h1 className="screen__title">Contabilità</h1>
      </header>

      <section className="balance">
        <p className="balance__label">Saldo del mese</p>
        <p className="balance__value">{formatEuro(saldo)}</p>
        <div className="balance__split">
          <div>
            <span className="balance__split-label">Entrate</span>
            <span className="balance__split-value balance__split-value--in">{formatEuro(entrate)}</span>
          </div>
          <div>
            <span className="balance__split-label">Uscite</span>
            <span className="balance__split-value balance__split-value--out">{formatEuro(uscite)}</span>
          </div>
        </div>
      </section>

      <section className="actions">
        <button className="actions__btn actions__btn--primary"   type="button" onClick={() => onNuovo('entrata')}>+ Entrata</button>
        <button className="actions__btn actions__btn--secondary" type="button" onClick={() => onNuovo('uscita')}>− Uscita</button>
      </section>

      <section>
        <header className="list__header">
          <h2 className="list__title">Movimenti recenti</h2>
          <button className="list__link" type="button" onClick={onVediTutti}>Tutti</button>
        </header>
        {movimenti.length === 0 ? (
          <div className="empty">
            <p className="empty__title">Nessun movimento</p>
            <p className="empty__text">Aggiungi la prima entrata o uscita qui sopra.</p>
          </div>
        ) : (
          <ul className="list__items">
            {movimenti.slice(0, 3).map((m) => (
              <RowMovimento key={m.id} m={m} pazienti={pazienti} />
            ))}
          </ul>
        )}
      </section>
    </>
  );
}