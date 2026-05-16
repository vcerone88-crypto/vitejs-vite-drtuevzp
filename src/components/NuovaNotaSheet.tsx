import { useState } from 'react';
import { oggi } from '../format';
import { TIPI_SEDUTA } from '../types';
import type { NotaClinica, TipoSeduta } from '../types';

export function NuovaNotaSheet({
  pazienteId,
  onChiudi,
  onSalva,
}: {
  pazienteId: string;
  onChiudi: () => void;
  onSalva: (n: Omit<NotaClinica, 'id'>) => void;
}) {
  const [tipo, setTipo] = useState<TipoSeduta>('Controllo');
  const [testo, setTesto] = useState('');

  const valido = testo.trim().length > 0;

  function handleSalva() {
    if (!valido) return;
    onSalva({
      pazienteId,
      tipo,
      testo: testo.trim(),
      data: oggi(),
    });
  }

  return (
    <div className="sheet" role="dialog" aria-modal="true">
      <button
        type="button"
        className="sheet__backdrop"
        onClick={onChiudi}
        aria-label="Chiudi"
      />
      <div className="sheet__panel">
        <div className="sheet__grabber" />
        <div className="sheet__header">
          <button type="button" className="sheet__cancel" onClick={onChiudi}>
            Annulla
          </button>
          <h2 className="sheet__title">Nuova nota</h2>
          <button
            type="button"
            className="sheet__save"
            onClick={handleSalva}
            disabled={!valido}
          >
            Salva
          </button>
        </div>

        <div className="field">
          <label className="field__label">Tipo seduta</label>
          <div className="chips">
            {TIPI_SEDUTA.map((t) => (
              <button
                key={t}
                type="button"
                className={`chip ${tipo === t ? 'chip--active' : ''}`}
                onClick={() => setTipo(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="field">
          <label className="field__label" htmlFor="nota-testo">
            Note
          </label>
          <textarea
            id="nota-testo"
            className="field__input field__input--area"
            placeholder="Trattamento, osservazioni, prossimi step…"
            value={testo}
            onChange={(e) => setTesto(e.target.value)}
            rows={5}
            autoFocus
          />
        </div>
      </div>
    </div>
  );
}