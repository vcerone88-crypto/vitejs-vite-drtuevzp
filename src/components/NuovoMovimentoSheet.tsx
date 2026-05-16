import { useState } from 'react';
import { nomeCompleto, oggiBreve } from '../format';
import type { Movimento, Paziente, TipoMovimento } from '../types';

export function NuovoMovimentoSheet({
  tipoIniziale, pazienteIdIniziale, pazienti, onClose, onSalva,
}: {
  tipoIniziale: TipoMovimento;
  pazienteIdIniziale?: string;
  pazienti: Paziente[];
  onClose: () => void;
  onSalva: (m: Omit<Movimento, 'id'>) => void;
}) {
  const [tipo, setTipo] = useState<TipoMovimento>(tipoIniziale);
  const [descrizione, setDescrizione] = useState('');
  const [importo, setImporto] = useState('');
  const [pazienteId, setPazienteId] = useState<string | undefined>(pazienteIdIniziale);

  const importoNum = Number(importo.replace(',', '.'));
  const valido = descrizione.trim().length > 0 && importoNum > 0;

  function handleSalva() {
    if (!valido) return;
    onSalva({
      tipo,
      descrizione: descrizione.trim(),
      importo: Math.round(importoNum),
      data: oggiBreve(),
      pazienteId: tipo === 'entrata' ? pazienteId : undefined,
    });
  }

  return (
    <div className="sheet" role="dialog" aria-modal="true" aria-label="Nuovo movimento">
      <button className="sheet__backdrop" type="button" aria-label="Chiudi" onClick={onClose} />
      <div className="sheet__panel">
        <div className="sheet__grabber" />
        <header className="sheet__header">
          <button className="sheet__cancel" type="button" onClick={onClose}>Annulla</button>
          <h2 className="sheet__title">Nuovo movimento</h2>
          <button className="sheet__save" type="button" onClick={handleSalva} disabled={!valido}>Salva</button>
        </header>

        <div className="segmented">
          <button
            type="button"
            className={`segmented__btn ${tipo === 'entrata' ? 'segmented__btn--active' : ''}`}
            onClick={() => setTipo('entrata')}
          >Entrata</button>
          <button
            type="button"
            className={`segmented__btn ${tipo === 'uscita' ? 'segmented__btn--active' : ''}`}
            onClick={() => setTipo('uscita')}
          >Uscita</button>
        </div>

        <div className="field">
          <label className="field__label" htmlFor="importo">Importo</label>
          <div className="field__row">
            <span className="field__prefix">€</span>
            <input
              id="importo"
              className="field__input field__input--amount"
              type="text"
              inputMode="decimal"
              placeholder="0"
              value={importo}
              onChange={(e) => setImporto(e.target.value.replace(/[^\d.,]/g, ''))}
              autoFocus
            />
          </div>
        </div>

        <div className="field">
          <label className="field__label" htmlFor="descrizione">Descrizione</label>
          <input
            id="descrizione"
            className="field__input"
            type="text"
            placeholder={tipo === 'entrata' ? 'Es. Saldo paziente — Allineatori' : 'Es. Fornitore — Materiali'}
            value={descrizione}
            onChange={(e) => setDescrizione(e.target.value)}
          />
        </div>

        {tipo === 'entrata' && pazienti.length > 0 && (
          <div className="field">
            <span className="field__label">Paziente (opzionale)</span>
            <div className="chips">
              <button
                type="button"
                className={`chip ${pazienteId === undefined ? 'chip--active' : ''}`}
                onClick={() => setPazienteId(undefined)}
              >Nessuno</button>
              {pazienti.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className={`chip ${pazienteId === p.id ? 'chip--active' : ''}`}
                  onClick={() => setPazienteId(p.id)}
                >{nomeCompleto(p)}</button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}