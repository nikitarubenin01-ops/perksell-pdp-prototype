import { Bell, ChevronDown, Globe, Search, ShoppingCart, Zap } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-border shadow-sm">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-14 gap-4">
          {/* Logo */}
          <a href="#" className="flex items-center gap-1.5 flex-shrink-0 mr-2">
            <div className="flex items-center justify-center w-7 h-7 rounded-md bg-[oklch(0.52_0.18_145)] text-white">
              <Zap size={15} strokeWidth={2.5} />
            </div>
            <span className="font-bold text-[1.05rem] tracking-tight text-foreground">
              Perksell
            </span>
          </a>

          {/* Search */}
          <div className="flex-1 max-w-xl hidden sm:flex items-center gap-2 h-9 bg-[oklch(0.96_0.003_240)] border border-border rounded-lg px-3 text-sm text-muted-foreground hover:border-[oklch(0.75_0.12_145)] transition-colors cursor-text">
            <Search size={14} className="flex-shrink-0" />
            <span className="truncate">Search for games, top-ups and more</span>
          </div>

          {/* Nav links */}
          <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-muted-foreground ml-2">
            <a href="#" className="hover:text-foreground transition-colors">Top Up</a>
            <a href="#" className="hover:text-foreground transition-colors">Support</a>
          </nav>

          {/* Right side */}
          <div className="ml-auto flex items-center gap-2">
            <button className="hidden sm:flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors px-2 py-1.5 rounded-md hover:bg-muted">
              <Globe size={14} />
              <span>EN</span>
              <span className="text-border">|</span>
              <span>USD</span>
              <ChevronDown size={12} />
            </button>
            <button className="relative p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
              <Bell size={17} />
            </button>
            <button className="relative p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
              <ShoppingCart size={17} />
              <span className="absolute top-1 right-1 w-4 h-4 bg-[oklch(0.52_0.18_145)] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                3
              </span>
            </button>
            <button className="hidden sm:flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-md hover:bg-muted transition-colors">
              <div className="w-6 h-6 rounded-full bg-[oklch(0.52_0.18_145)] text-white text-xs font-bold flex items-center justify-center">
                FA
              </div>
              <span className="text-sm font-medium text-foreground truncate max-w-[80px]">
                Fernández A.
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
