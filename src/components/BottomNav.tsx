import { Home, Feather, Repeat, User } from 'lucide-react';

const navItems = [
  { key: 'home', label: 'Home', icon: Home },
  { key: 'nest', label: 'Nest', icon: Feather },
  { key: 'repeat', label: 'Repeat', icon: Repeat },
  { key: 'me', label: 'Me', icon: User },
] as const;

type NavKey = 'home' | 'nest' | 'repeat' | 'me';

type BottomNavProps = {
  active: NavKey | null;
  onNavigate: (value: NavKey) => void;
};

export function BottomNav({ active, onNavigate }: BottomNavProps) {
  return (
    <nav className="bottom-nav">
      <div className="bottom-nav-items">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.key;
          return (
            <button
              key={item.key}
              className={`nav-button ${isActive ? 'active' : ''}`}
              type="button"
              onClick={() => onNavigate(item.key)}
            >
              <Icon size={22} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
