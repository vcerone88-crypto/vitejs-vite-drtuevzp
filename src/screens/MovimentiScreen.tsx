import { RowMovimento } from '../components/RowMovimento';
import type { Movimento, Paziente } from '../types';

export function MovimentiScreen({
  movimenti, pazienti, onElimina,
}: {
  movimenti: Movimento[];
  pazienti: Paziente[];
  onElimina: (id: string) => void;
}) {
  return (
    <>
      <header className="screen__header">
        <p className="eyebrow">Registro</p>
        <h1 className="screen__title">Movimenti</h1>
      </header>
      {movimenti.length === 0 ? (
        <div className="empty">
          <p className="empty__title">Nessun movimento</p>
          <p className="empty__text">Aggiungi la prima entrata o uscita dalla Home.</p>
        </div>
      ) : (
        <ul className="list__items">
          {movimenti.map((m) => (
            <RowMovimento key={m.id} m={m} pazienti={pazienti} onElimina={() => onElimina(m.id)} />
          ))}
        </ul>
      )}
    </>
  );
}