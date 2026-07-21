interface HeaderNavProps {
  onOpenNotebook: () => void;
  onOpenWitness: () => void;
  onOpenMap: () => void;
  gameStatus: "PLAYING" | "GAMEOVER" | "VICTORY";
}

export default function HeaderNav({ onOpenNotebook, onOpenWitness, onOpenMap, gameStatus }: HeaderNavProps) {
  return (
    <header id="game-header" className="min-h-16 border-b border-[#3c2a1c] flex flex-col sm:flex-row items-center justify-between gap-3 p-4 sm:px-8 bg-[#201914] shrink-0 shadow-[inset_0_-1px_0_rgba(255,255,255,0.05)]">
      <div>
        <h1 className="text-base font-semibold tracking-[0.15em] uppercase text-[#d4b270]" style={{ fontFamily: "Lexend, sans-serif" }}>
          Tìm Manh Mối hay cái gì đó tương tự
        </h1>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
        <button
          onClick={onOpenNotebook}
          className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#2a1d15] hover:bg-[#3d2b1f] border border-[#d4b270]/40 hover:border-[#d4b270] rounded-sm text-xs font-semibold text-[#ebd9b4] transition-all cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.4)] uppercase tracking-[0.15em]"
        >
          Sổ Tay
        </button>

        <button
          onClick={onOpenWitness}
          className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#2a1d15] hover:bg-[#3d2b1f] border border-[#d4b270]/40 hover:border-[#d4b270] rounded-sm text-xs font-semibold text-[#ebd9b4] transition-all cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.4)] uppercase tracking-[0.15em]"
        >
          Nhân Chứng
        </button>

        <button
          onClick={onOpenMap}
          className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#2a1d15] hover:bg-[#3d2b1f] border border-[#d4b270]/40 hover:border-[#d4b270] rounded-sm text-xs font-semibold text-[#ebd9b4] transition-all cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.4)] uppercase tracking-[0.15em]"
        >
          Bản Đồ
        </button>

        {gameStatus !== "PLAYING" && (
          <span className={`px-2 py-1 text-[9px] font-mono font-bold tracking-[0.15em] border rounded ${gameStatus === "VICTORY" ? "border-emerald-500/40 text-emerald-500 bg-emerald-950/20" : "border-red-500/40 text-red-500 bg-red-950/20"}`}>
            {gameStatus === "VICTORY" ? "SUCCESS" : "FAILED"}
          </span>
        )}
      </div>
    </header>
  );
}
