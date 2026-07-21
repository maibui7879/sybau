import { GameNode, GameState } from "../../types";
import { defaultImageUrl } from "../utils/uiHelpers.tsx";

interface DecisionChoicesProps {
  state: GameState;
  currentNode: GameNode;
  handleOptionClick: (nextNodeId: string) => void;
}

export default function DecisionChoices({
  state,
  currentNode,
  handleOptionClick
}: DecisionChoicesProps) {
  return state.gameStatus === "PLAYING" && currentNode.options.length > 0 ? (
    <div className="grid grid-cols-1 gap-4 w-full sm:grid-cols-3">
      {currentNode.options.map((opt, idx) => {
        const numLabels = ["01", "02", "03", "04", "05"];
        const labelNum = numLabels[idx] || `${idx + 1}`;
        const isReturnChoice = opt.nextNodeId === state.currentNodeId || state.history.includes(opt.nextNodeId);

        return (
          <button
            key={idx}
            onClick={() => handleOptionClick(opt.nextNodeId)}
            className="w-full min-h-[180px] sm:h-56 bg-[#1a130f] border-2 border-[#3d2a1c] hover:border-[#d4b270] rounded-sm flex flex-col justify-between text-left transition-all duration-300 hover:-translate-y-1.5 cursor-pointer group relative overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.6)] hover:shadow-[0_15px_30px_rgba(212,178,112,0.1)]"
            style={{ fontFamily: "Lexend, sans-serif" }}
          >
            <div className="w-full h-20 sm:h-24 bg-[#1e1510] border-b border-[#3c2a1c]/60 flex items-center justify-center relative shrink-0 select-none overflow-hidden">
              <img src={opt.image || defaultImageUrl} alt={`Choice ${labelNum}`} className="absolute inset-0 w-full h-full object-cover opacity-90" />
              <div className="absolute inset-0 bg-black/30"></div>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between w-full">
              <div className="w-full flex items-center justify-start pb-2 shrink-0 border-b border-[#3c2a1c]/20">
                <span className="text-[8px] font-bold tracking-[0.15em] text-[#d4b270]/50 uppercase">
                  HƯỚNG ĐI {labelNum}
                </span>
              </div>

              <div className="my-2 flex-1 flex items-center">
                <p className="text-xs text-[#ebd9b4] font-medium leading-relaxed group-hover:text-[#f3e6cd] transition-colors">
                  {opt.text}
                </p>
              </div>

              <div className="w-full pt-2 border-t border-[#3c2a1c]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[8px] text-[#d4b270]/40 group-hover:text-[#d4b270] tracking-[0.15em] uppercase font-bold transition-all shrink-0">
                <span>Lựa chọn</span>
                <span className="group-hover:translate-x-1 transition-transform">{isReturnChoice ? "QUAY LẠI" : "TIẾP TỤC →"}</span>
              </div>
            </div>

            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#3c2a1c] group-hover:border-[#d4b270]/60 transition-colors"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#3c2a1c] group-hover:border-[#d4b270]/60 transition-colors"></div>
          </button>
        );
      })}
    </div>
  ) : null;
}
