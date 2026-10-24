import { useState } from 'react';
import { TabBar } from './components/TabBar';
import { NuovoMovimentoSheet } from './components/NuovoMovimentoSheet';
import { NuovoPazienteSheet } from './components/NuovoPazienteSheet';
import { NuovaNotaSheet } from './components/NuovaNotaSheet';
import { HomeScreen } from './screens/HomeScreen';
import { MovimentiScreen } from './screens/MovimentiScreen';
import { PazientiScreen } from './screens/PazientiScreen';
import { DettaglioPazienteScreen } from './screens/DettaglioPazienteScreen';
import { DiarioScreen } from './screens/DiarioScreen';
import { ImpostazioniScreen } from './screens/ImpostazioniScreen';
import { usePersistedState } from './storage';
import {
  KEY_MOVIMENTI,
  KEY_NOTE,
  KEY_PAZIENTI,
  movimentiIniziali,
  noteIniziali,
  pazientiIniziali,
} from './data';
import type {
  Movimento,
  NotaClinica,
  Paziente,
  SheetMovimentoState,
  SheetNotaState,
  TabId,
} from './types';
import './App.css';

export default function App() {
  const [tab, setTab] = useState<TabId>('home');
  const [pazienteAperto, setPazienteAperto] = useState<string | null>(null);

  const [movimenti, setMovimenti] = usePersistedState<Movimento[]>(KEY_MOVIMENTI, movimentiIniziali);
  const [pazienti, setPazienti] = usePersistedState<Paziente[]>(KEY_PAZIENTI, pazientiIniziali);
  const [note, setNote] = usePersistedState<NotaClinica[]>(KEY_NOTE, noteIniziali);

  const [sheetMov, setSheetMov] = useState<SheetMovimentoState | null>(null);
  const [sheetPaz, setSheetPaz] = useState<boolean>(false);
  const [sheetNota, setSheetNota] = useState<SheetNotaState | null>(null);

  function aggiungiMovimento(m: Omit<Movimento, 'id'>) {
    setMovimenti((prev) => [{ ...m, id: crypto.randomUUID() }, ...prev]);
    setSheetMov(null);
  }
  function eliminaMovimento(id: string) {
    setMovimenti((prev) => prev.filter((m) => m.id !== id));
  }
  function aggiungiPaziente(p: Omit<Paziente, 'id'>) {
    setPazienti((prev) => [...prev, { ...p, id: crypto.randomUUID() }]);
    setSheetPaz(false);
  }
  function aggiungiNota(n: Omit<NotaClinica, 'id'>) {
    setNote((prev) => [{ ...n, id: crypto.randomUUID() }, ...prev]);
    setSheetNota(null);
  }
  function eliminaNota(id: string) {
    setNote((prev) => prev.filter((n) => n.id !== id));
  }

  const paziente = pazienteAperto
    ? pazienti.find((p) => p.id === pazienteAperto) ?? null
    : null;

  return (
    <div className="app">
      <main className="screen">
        {tab === 'home' && (
          <HomeScreen
            movimenti={movimenti}
            pazienti={pazienti}
            onNuovo={(tipo) => setSheetMov({ tipo })}
            onVediTutti={() => setTab('movimenti')}
          />
        )}

        {tab === 'movimenti' && (
          <MovimentiScreen
            movimenti={movimenti}
            pazienti={pazienti}
            onElimina={eliminaMovimento}
          />
        )}

        {tab === 'pazienti' && !paziente && (
          <PazientiScreen
            pazienti={pazienti}
            movimenti={movimenti}
            onApri={(id) => setPazienteAperto(id)}
            onAggiungi={() => setSheetPaz(true)}
          />
        )}

        {tab === 'pazienti' && paziente && (
          <DettaglioPazienteScreen
            paziente={paziente}
            movimenti={movimenti}
            note={note.filter((n) => n.pazienteId === paziente.id)}
            onBack={() => setPazienteAperto(null)}
            onNuovaEntrata={() => setSheetMov({ tipo: 'entrata', pazienteId: paziente.id })}
            onEliminaMovimento={eliminaMovimento}
            onNuovaNota={() => setSheetNota({ pazienteId: paziente.id })}
            onEliminaNota={eliminaNota}
          />
        )}

        {tab === 'diario' && (
          <DiarioScreen
            note={note}
            pazienti={pazienti}
            onElimina={eliminaNota}
          />
        )}

        {tab === 'impostazioni' && <ImpostazioniScreen />}
      </main>

      <TabBar
        active={tab}
        onChange={(t) => {
          setTab(t);
          if (t !== 'pazienti') setPazienteAperto(null);
        }}
      />

      {sheetMov && (
        <NuovoMovimentoSheet
          tipoIniziale={sheetMov.tipo}
          pazienteIdIniziale={sheetMov.pazienteId}
          pazienti={pazienti}
          onClose={() => setSheetMov(null)}
          onSalva={aggiungiMovimento}
        />
      )}
      {sheetPaz && (
        <NuovoPazienteSheet
          onClose={() => setSheetPaz(false)}
          onSalva={aggiungiPaziente}
        />
      )}
      {sheetNota && (
        <NuovaNotaSheet
          pazienteId={sheetNota.pazienteId}
          onChiudi={() => setSheetNota(null)}
          onSalva={aggiungiNota}
        />
      )}
    </div>
  );
}
