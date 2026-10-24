export function ImpostazioniScreen({ onReset }: { onReset?: () => void }) {
  return (
    <>
      <header className="screen__header">
        <p className="eyebrow">Studio</p>
        <h1 className="screen__title">Impostazioni</h1>
      </header>
      <ul className="settings">
        <li className="settings__row"><span>Profilo studio</span><span className="settings__hint">›</span></li>
        <li className="settings__row"><span>Categorie movimenti</span><span className="settings__hint">›</span></li>
        <li className="settings__row"><span>Esportazione dati</span><span className="settings__hint">›</span></li>
        {onReset && <li className="settings__row settings__row--action" onClick={onReset}>
          <span>Ripristina dati di esempio</span><span className="settings__hint">›</span>
        </li>}
        <li className="settings__row"><span>Informazioni</span><span className="settings__hint">›</span></li>
      </ul>
    </>
  );
}
