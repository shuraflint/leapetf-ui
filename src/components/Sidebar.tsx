"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Portfolio", href: "/portfolio", icon: "portfolio", active: true },
  { label: "Trade", href: "/trade", icon: "trade", active: false },
  { label: "Stake", href: "/stake", icon: "stake", active: false },
  { label: "Rewards", href: "/rewards", icon: "rewards", active: false },
  { label: "Faucet", href: "/faucet", icon: "faucet", active: false },
];

function NavIcon({ name, active }: { name: string; active?: boolean }) {
  const c = active ? "text-[var(--accent)]" : "text-[var(--foreground)]";
  const size = "w-5 h-5";
  switch (name) {
    case "portfolio":
      return (
        <svg className={`${size} ${c}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    case "trade":
      return (
        <svg className={`${size} ${c}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    case "stake":
      return (
        <svg className={`${size} ${c}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      );
    case "rewards":
      return (
        <svg className={`${size} ${c}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      );
    case "faucet":
      return (
        <svg className={`${size} ${c}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Sidebar() {

  const pathname = usePathname();
  return (
    <aside className="fixed left-0 top-0 z-10 flex h-full w-56 flex-col border-r border-white/10 bg-[var(--sidebar-bg)]">
      <div className="flex flex-1 flex-col p-6">
        <Link href="/" className="mb-10 flex items-baseline gap-0 font-bold tracking-tight">
          <span className="text-xl text-[var(--foreground)]">LEAP</span>
          <span className="text-xl text-[var(--accent)] underline decoration-[var(--accent)] underline-offset-2">ETF</span>
        </Link>
        <nav className="flex flex-1 flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-5 text-lg font-medium transition-colors ${isActive
                  ? "text-[var(--accent)] bg-white/5"
                  : "text-[var(--foreground)] hover:bg-white/5"
                  }`}
              >
                <NavIcon name={item.icon} active={isActive} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
