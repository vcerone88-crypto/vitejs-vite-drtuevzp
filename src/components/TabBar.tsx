import type { TabId } from '../types';

const tabs: { id: TabId; label: string; icon: string }[] = [
  { id: 'home',         label: 'Home',      icon: 'M3 11.5 12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z' },
  { id: 'movimenti',    label: 'Movimenti', icon: 'M4 6h16M4 12h16M4 18h10' },
  { id: 'pazienti',     label: 'Pazienti',  icon: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm-7 9a7 7 0 0 1 14 0' },
  { id: 'diario',       label: 'Diario',    icon: 'M6 3h9l5 5v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm8 0v6h6M8 13h8M8 17h5' },
  { id: 'impostazioni', label: 'Studio',    icon: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm8-3a8 8 0 0 0-.2-1.8l2-1.5-2-3.4-2.3.9a8 8 0 0 0-3.1-1.8L14 2h-4l-.4 2.4A8 8 0 0 0 6.5 6.2L4.2 5.3l-2 3.4 2 1.5A8 8 0 0 0 4 12c0 .6.1 1.2.2 1.8l-2 1.5 2 3.4 2.3-.9a8 8 0 0 0 3.1 1.8L10 22h4l.4-2.4a8 8 0 0 0 3.1-1.8l2.3.9 2-3.4-2-1.5c.1-.6.2-1.2.2-1.8z' },
];

export function TabBar({
  active,
  onChange,
}: {
  active: TabId;
  onChange: (id: TabId) => void;
}) {
  return (
    <nav className="tabbar tabbar--five" aria-label="Navigazione principale">
      {tabs.map((t) => {
        const isActive = active === t.id;
        return (
          <button
            key={t.id}
            type="button"
            className={`tabbar__btn ${isActive ? 'tabbar__btn--active' : ''}`}
            onClick={() => onChange(t.id)}
            aria-current={isActive ? 'page' : undefined}
          >
            <svg
              viewBox="0 0 24 24"
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d={t.icon} />
            </svg>
            <span>{t.label}</span>
          </button>
        );
      })}
    </nav>
  );
}