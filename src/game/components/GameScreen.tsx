import { GameNode, GameState } from "../../types";
import DecisionChoices from "./DecisionChoices";
import { coverImageUrl, getRoleAsset, highlightClues } from "../utils/uiHelpers.tsx";

interface GameScreenProps {
  state: GameState;
  currentNode: GameNode;
  handleOptionClick: (nextNodeId: string) => void;
  handleReset: () => void;
  currentRoleAsset: ReturnType<typeof getRoleAsset>;
}


export default function GameScreen({
  state,
  currentNode,
  handleOptionClick,
  handleReset,
  currentRoleAsset
}: GameScreenProps) {
  return (
    <main id="game-main" className="flex-1 flex flex-col relative bg-[radial-gradient(circle_at_center,_#201610_0%,_#0a0705_100%)] p-4 sm:p-12 justify-center items-center">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,_rgba(255,255,255,0.08),_transparent_70%)] pointer-events-none"></div>

      <div className="w-full max-w-4xl flex-1 flex flex-col justify-center items-center text-center z-10 select-none my-auto">
        <div className="w-full max-w-2xl h-36 sm:h-44 bg-[#1e1510] border border-[#3c2a1c] rounded-sm flex flex-col justify-center items-center relative shadow-2xl mb-6 shrink-0 select-none overflow-hidden">
          <img src={currentNode.sceneImage || coverImageUrl} alt="Scene cover" className="absolute inset-0 w-full h-full object-cover opacity-85" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#3c2a1c]/60"></div>
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#3c2a1c]/60"></div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 max-w-2xl w-full mb-8 shrink-0">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[#3d2a1c] bg-[#1e1510] flex flex-col items-center justify-center shrink-0 shadow-lg relative self-center select-none overflow-hidden">
            <img src={currentRoleAsset.avatarUrl} alt={currentRoleAsset.displayName} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/45"></div>
            <div className="relative z-10 flex flex-col items-center justify-center text-center px-1">
              <span className="text-[10px] font-bold text-[#f8e7c0]  font-mono uppercase">
                {currentRoleAsset.displayName}
              </span>
              <span className="text-[7px] text-stone-300 font-mono uppercase -mt-0.5 leading-tight">
                {currentRoleAsset.subtitle}
              </span>
            </div>
          </div>

          <div className="flex-1 text-center sm:text-left">
            <div className={`text-[10px]  font-bold uppercase mb-2 ${state.gameStatus === "VICTORY" ? "text-emerald-300" : state.gameStatus === "GAMEOVER" ? "text-rose-300" : "text-[#d4b270]/70"}`} style={{ fontFamily: "Lexend, sans-serif" }}>
              {state.gameStatus === "VICTORY"
                ? "KẾT THÚC THÀNH CÔNG"
                : state.gameStatus === "GAMEOVER"
                ? "THẤT BẠI!"
                : currentNode.characterName === "Hệ Thống" || currentNode.characterName === "Hồ sơ"
                ? "Báo cáo điều tra"
                : `Lời Khai: ${currentNode.characterName}`}
            </div>
            <p className="text-sm md:text-base font-sans text-[#ebd9b4] italic leading-relaxed font-light" style={{ fontFamily: "Lexend, sans-serif" }}>
              "{highlightClues(currentNode.dialogue)}"
            </p>
          </div>
        </div>

        <div className="w-full max-w-4xl flex flex-col items-center mt-2 shrink-0">
          <DecisionChoices
            state={state}
            currentNode={currentNode}
            handleOptionClick={handleOptionClick}
          />
          {state.gameStatus !== "PLAYING" && (
            <div className="flex flex-col items-center gap-6 py-4">
              <button
                onClick={handleReset}
                className="px-8 py-3.5 bg-[#3d1a10] border border-[#b91c1c] text-xs text-[#ebd9b4] font-semibold uppercase  hover:bg-[#4d2114] hover:border-[#ef4444] transition-all cursor-pointer rounded-sm"
                style={{ fontFamily: "Lexend, sans-serif" }}
              >
                Chơi Lại
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
