import { useState } from 'react';
import { PIANI, type Paziente, type PianoTrattamento } from '../types';

export function NuovoPazienteSheet({
  onClose, onSalva,
}: { onClose: () => void; onSalva: (p: Omit<Paziente, 'id'>) => void }) {
  const [nome, setNome] = useState('');
  const [cognome, setCognome] = useState('');
  const [piano, setPiano] = useState<PianoTrattamento>('Apparecchio fisso');
  const [totale, setTotale] = useState('');

  const totaleNum = Number(totale.replace(',', '.'));
  const valido =
    nome.trim().length > 0 &&
    cognome.trim().length > 0 &&
    totaleNum > 0;

  function handleSalva() {
    if (!valido) return;
    onSalva({
      nome: nome.trim(),
      cognome: cognome.trim(),
      piano,
      totaleDovuto: Math.round(totaleNum),
    });
  }

  return (
    <div className="sheet" role="dialog" aria-modal="true" aria-label="Nuovo paziente">
      <button className="sheet__backdrop" type="button" aria-label="Chiudi" onClick={onClose} />
      <div className="sheet__panel">
        <div className="sheet__grabber" />
        <header className="sheet__header">
          <button className="sheet__cancel" type="button" onClick={onClose}>Annulla</button>
          <h2 className="sheet__title">Nuovo paziente</h2>
          <button className="sheet__save" type="button" onClick={handleSalva} disabled={!valido}>Salva</button>
        </header>

        <div className="field field--inline">
          <div>
            <label className="field__label" htmlFor="nome">Nome</label>
            <input
              id="nome" className="field__input" type="text"
              value={nome} onChange={(e) => setNome(e.target.value)} autoFocus
            />
          </div>
          <div>
            <label className="field__label" htmlFor="cognome">Cognome</label>
            <input
              id="cognome" className="field__input" type="text"
              value={cognome} onChange={(e) => setCognome(e.target.value)}
            />
          </div>
        </div>

        <div className="field">
          <span className="field__label">Piano di trattamento</span>
          <div className="chips">
            {PIANI.map((p) => (
              <button
                key={p}
                type="button"
                className={`chip ${piano === p ? 'chip--active' : ''}`}
                onClick={() => setPiano(p)}
              >{p}</button>
            ))}
          </div>
        </div>

        <div className="field">
          <label className="field__label" htmlFor="totale">Totale dovuto</label>
          <div className="field__row">
            <span className="field__prefix">€</span>
            <input
              id="totale"
              className="field__input field__input--amount"
              type="text"
              inputMode="decimal"
              placeholder="0"
              value={totale}
              onChange={(e) => setTotale(e.target.value.replace(/[^\d.,]/g, ''))}
            />
          </div>
        </div>
      </div>
    </div>
  );
}