import Countdown from "@/components/Countdown";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <main>
        <div className="flex min-h-screen flex-col">
          <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 text-center">
            <h1 className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              <span className="text-[var(--accent)]">LeapETF</span>
              <span className="text-[var(--foreground)]"> 视频开源倒计时</span>
            </h1>
            <p className="mb-8 text-base text-[var(--foreground)] opacity-90 sm:text-lg">
              距离2025年10月1日还有
            </p>
            <Countdown />
            <a
              href="https://etf.leapwhale.com/learn"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center justify-center rounded-lg bg-[var(--accent)] px-8 py-3.5 text-base font-medium text-white transition-opacity hover:opacity-90"
            >
              提前学习 & 获取源码
            </a>
            <p className="mt-12 max-w-xl text-sm leading-relaxed text-[var(--foreground)] opacity-90">
              LeapETF 是一个去中心化金融平台，致力于为用户提供简单、高效的ETF投资体验。
            </p>
            <p className="mt-2 text-sm text-[var(--foreground)] opacity-80">
              我们将于2025年10月1日正式开源，敬请期待！
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
