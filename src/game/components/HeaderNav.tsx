import { useState } from "react";
import { FaBook, FaUserSecret, FaMapMarkedAlt, FaBars, FaTimes } from "react-icons/fa";

interface HeaderNavProps {
  onOpenNotebook: () => void;
  onOpenWitness: () => void;
  onOpenMap: () => void;
  gameStatus: "PLAYING" | "GAMEOVER" | "VICTORY";
}

export default function HeaderNav({ onOpenNotebook, onOpenWitness, onOpenMap, gameStatus }: HeaderNavProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const buttonClass =
    "flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-[#2a1d15] hover:bg-[#3d2b1f] border border-[#d4b270]/40 hover:border-[#d4b270] rounded-sm text-xs font-semibold text-[#ebd9b4] transition-all cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.4)] uppercase tracking-[0.15em]";

  return (
    <>
      <header id="game-header" className="min-h-16 border-b border-[#3c2a1c] flex items-center justify-between gap-3 p-4 sm:px-8 bg-[#201914] shrink-0 shadow-[inset_0_-1px_0_rgba(255,255,255,0.05)]">
        <div>
          <h1 className="text-base font-semibold tracking-[0.15em] uppercase text-[#d4b270]" style={{ fontFamily: "Lexend, sans-serif" }}>
            Tìm Manh Mối hay cái gì đó tương tự
          </h1>
        </div>

        <div className="hidden sm:flex flex-wrap items-center justify-center gap-2 sm:gap-4">
          <button onClick={onOpenNotebook} className={buttonClass}>
            <FaBook className="text-[#d4b270] text-sm shrink-0" />
            <span>Sổ Tay</span>
          </button>

          <button onClick={onOpenWitness} className={buttonClass}>
            <FaUserSecret className="text-[#d4b270] text-sm shrink-0" />
            <span>Nhân Chứng</span>
          </button>

          <button onClick={onOpenMap} className={buttonClass}>
            <FaMapMarkedAlt className="text-[#d4b270] text-sm shrink-0" />
            <span>Bản Đồ</span>
          </button>

          {gameStatus !== "PLAYING" && (
            <span
              className={`px-2 py-1 text-[9px] font-mono font-bold tracking-[0.15em] border rounded ${
                gameStatus === "VICTORY"
                  ? "border-emerald-500/40 text-emerald-500 bg-emerald-950/20"
                  : "border-red-500/40 text-red-500 bg-red-950/20"
              }`}
            >
              {gameStatus === "VICTORY" ? "SUCCESS" : "FAILED"}
            </span>
          )}
        </div>

        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="sm:hidden flex items-center justify-center w-10 h-10 rounded-sm border border-[#d4b270]/40 bg-[#2a1d15] text-[#d4b270] hover:bg-[#3d2b1f] transition-all"
          aria-label="Open navigation menu"
        >
          <FaBars />
        </button>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-xs bg-[#1a1410] border-r border-[#3c2a1c] p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#d4b270]">Menu</p>
                <h2 className="text-sm font-semibold text-[#ebd9b4]">Điều hướng</h2>
              </div>
              <button
                onClick={closeMobileMenu}
                className="w-10 h-10 flex items-center justify-center rounded-sm border border-[#d4b270]/30 text-[#d4b270] hover:bg-[#3d2b1f] transition-all"
                aria-label="Close navigation menu"
              >
                <FaTimes />
              </button>
            </div>

            <button
              onClick={() => {
                onOpenNotebook();
                closeMobileMenu();
              }}
              className="w-full text-left flex items-center gap-3 px-4 py-3 bg-[#2a1d15] hover:bg-[#3d2b1f] border border-[#d4b270]/30 rounded-sm text-sm font-semibold text-[#ebd9b4]"
            >
              <FaBook className="text-[#d4b270]" />
              <span>Sổ Tay</span>
            </button>

            <button
              onClick={() => {
                onOpenWitness();
                closeMobileMenu();
              }}
              className="w-full text-left flex items-center gap-3 px-4 py-3 bg-[#2a1d15] hover:bg-[#3d2b1f] border border-[#d4b270]/30 rounded-sm text-sm font-semibold text-[#ebd9b4]"
            >
              <FaUserSecret className="text-[#d4b270]" />
              <span>Nhân Chứng</span>
            </button>

            <button
              onClick={() => {
                onOpenMap();
                closeMobileMenu();
              }}
              className="w-full text-left flex items-center gap-3 px-4 py-3 bg-[#2a1d15] hover:bg-[#3d2b1f] border border-[#d4b270]/30 rounded-sm text-sm font-semibold text-[#ebd9b4]"
            >
              <FaMapMarkedAlt className="text-[#d4b270]" />
              <span>Bản Đồ</span>
            </button>

            {gameStatus !== "PLAYING" && (
              <div className="mt-2 px-4 py-3 rounded-sm border border-[#d4b270]/30 bg-[#19110d] text-sm font-semibold text-[#ebd9b4]">
                <span
                  className={`inline-block px-2 py-1 text-[11px] font-mono tracking-[0.15em] rounded ${
                    gameStatus === "VICTORY"
                      ? "border-emerald-500/40 text-emerald-500 bg-emerald-950/20"
                      : "border-red-500/40 text-red-500 bg-red-950/20"
                  }`}
                >
                  {gameStatus === "VICTORY" ? "SUCCESS" : "FAILED"}
                </span>
              </div>
            )}
          </div>

          <button className="flex-1" onClick={closeMobileMenu} aria-label="Close overlay" />
        </div>
      )}
    </>
  );
}
