import { GameNode, GameState } from "../../types";
import { highlightClues } from "../utils/uiHelpers.tsx";
import { nodesList, storyConfig } from "../logic/gameData";
import { useEffect } from "react";
interface NotepadModalProps {
  state: GameState;
  onClose: () => void;
}

interface WitnessModalProps {
  currentNode: GameNode;
  currentRoleAsset: {
    displayName: string;
    subtitle: string;
    avatarUrl: string;
    optionUrl: string;
  };
  onClose: () => void;
}

interface MapModalProps {
  state: GameState;
  currentNodeId: string;
  mapEntryNodeId: string;
  isLinkActive: (sourceId: string, targetId: string) => boolean;
  onClose: () => void;
}

export function NotepadModal({ state, onClose }: NotepadModalProps) {
  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 transition-all duration-300">
      <div className="bg-[#1a1410] border-2 border-[#3c2a1c] w-full max-w-4xl h-full max-h-[85vh] md:h-[520px] rounded flex flex-col relative shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden">
        <div className="h-14 border-b border-[#3c2a1c] bg-[#221a14] px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <h2 className="text-xs font-bold tracking-[0.15em] text-[#ebd9b4] uppercase">SỔ TAY THÁM TỬ</h2>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-[#2e1c12] hover:bg-[#3d2417] text-[#d4b270] border border-[#4a3622] rounded text-[10px] uppercase tracking-[0.15em] transition-colors cursor-pointer"
          >
            Đóng
          </button>
        </div>

        <div className="flex-1 overflow-y-auto md:overflow-hidden flex flex-col md:flex-row">
          <div className="w-full md:w-[280px] border-b md:border-b-0 md:border-r border-[#3c2a1c] p-6 flex flex-col justify-between bg-[#140f0c]/50">
            <div>
              <h3 className="text-[10px] font-bold text-[#d4b270] uppercase tracking-[0.15em] border-b border-[#3c2a1c] pb-2 mb-4">Mục Tiêu Nghiên Cứu</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className={`mt-1 w-2.5 h-2.5 border flex-shrink-0 rounded-sm ${state.currentNodeId !== "node_start" ? "bg-[#d4b270] border-[#d4b270]" : "border-[#7c5c3e]"}`}></div>
                  <div>
                    <p className={`text-xs leading-normal ${state.currentNodeId !== "node_start" ? "line-through text-stone-500" : "text-[#ebd9b4] font-medium"}`}>
                      Giải yêu cầu của sếp
                    </p>
                    <p className="text-[9px] text-stone-500 mt-0.5">Mã nhị phân dẫn tới Tiệm kem.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className={`mt-1 w-2.5 h-2.5 border flex-shrink-0 rounded-sm ${state.history.includes("node_l1_clockmaker") || state.currentNodeId === "node_l1_clockmaker" || state.currentNodeId === "node_l2_void" || state.currentNodeId === "node_good_end" ? "bg-[#d4b270] border-[#d4b270]" : "border-[#7c5c3e]"}`}></div>
                  <div>
                    <p className={`text-xs leading-normal ${(state.history.includes("node_l1_clockmaker") || state.currentNodeId === "node_l1_clockmaker") ? "line-through text-stone-500" : "text-[#ebd9b4] font-medium"}`}>
                      Khám phá manh mối Tiệm kem
                    </p>
                    <p className="text-[9px] text-stone-500 mt-0.5">Hỏi han Người bán đá bào để rẽ nhánh đúng đắn.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className={`mt-1 w-2.5 h-2.5 border flex-shrink-0 rounded-sm ${state.currentNodeId === "node_good_end" ? "bg-emerald-500 border-emerald-500" : "border-[#7c5c3e]"}`}></div>
                  <div>
                    <p className={`text-xs leading-normal ${state.currentNodeId === "node_good_end" ? "text-emerald-500 font-semibold" : "text-[#ebd9b4] font-medium"}`}>
                      Thoát hiểm qua Trạm Bơm Ngầm
                    </p>
                    <p className="text-[9px] text-stone-500 mt-0.5">Tìm ra Manh mối và hoàn tất hồ sơ.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="text-[9px] text-stone-500 border-t border-[#3c2a1c] pt-4 font-mono">
              Văn phòng thám tử PCA <br />
            </div>
          </div>

          <div className="flex-1 border-b md:border-b-0 md:border-r border-[#3c2a1c] p-6 flex flex-col bg-[#16110e]/20 overflow-y-auto">
            <h3 className="text-[10px] font-bold text-[#d4b270] uppercase tracking-[0.15em] border-b border-[#3c2a1c] pb-2 mb-4">Kho Vật Chứng Thu Thập</h3>
            <div className="space-y-4">
              <div className={`p-3 border rounded flex gap-3 transition-all duration-300 ${state.currentNodeId !== "node_start" ? "border-[#d4b270]/40 bg-[#221a14]/80 shadow-md" : "border-stone-800 bg-black/10 opacity-30"}`}>
                <div className="w-10 h-10 border border-[#3c2a1c] rounded flex flex-col items-center justify-center bg-[#140f0c] shrink-0 text-xs text-[#d4b270] font-bold">
                  #01
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-[#ebd9b4]">Mảnh Giấy Viết Tay Bí Ẩn</p>
                  <p className="text-[10px] text-stone-400 leading-relaxed">
                    {state.currentNodeId !== "node_start"
                      ? "Mảnh giấy cũ nát chứa mã khóa nhị phân giải thuật, chứng minh mật đạo dẫn thẳng tới tiệm cơ khí của lão Người bán đá bào."
                      : "Đang khóa. Rời khỏi điểm xuất phát để mở vật chứng đầu tiên."}
                  </p>
                </div>
              </div>

              <div className={`p-3 border rounded flex gap-3 transition-all duration-300 ${state.currentNodeId === "node_l2_void" || state.currentNodeId === "node_good_end" ? "border-[#d4b270]/40 bg-[#221a14]/80 shadow-md" : "border-stone-800 bg-black/10 opacity-30"}`}>
                <div className="w-10 h-10 border border-[#3c2a1c] rounded flex flex-col items-center justify-center bg-[#140f0c] shrink-0 text-xs text-[#d4b270] font-bold">
                  #02
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-[#ebd9b4]">Bản Đồ Đường Ống Thủy Lực</p>
                  <p className="text-[10px] text-stone-400 leading-relaxed">
                    {state.currentNodeId === "node_l2_void" || state.currentNodeId === "node_good_end"
                      ? "Bản đồ sơ đồ ngầm giấu trong chiếc rương gỗ trống. Chỉ ra lối rẽ an toàn thoát hiểm qua Trạm Bơm Nước."
                      : "Đang khóa. Chỉ nhận vật chứng sau khi vượt bẫy mê khói của Người bán đá bào."}
                  </p>
                </div>
              </div>

              <div className={`p-3 border rounded flex gap-3 transition-all duration-300 ${state.gameStatus === "VICTORY" ? "border-emerald-500/40 bg-[#16221a]/80 shadow-md" : "border-stone-800 bg-black/10 opacity-30"}`}>
                <div className="w-10 h-10 border border-[#3c2a1c] rounded flex flex-col items-center justify-center bg-[#140f0c] shrink-0 text-xs text-emerald-500 font-bold">
                  #03
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-[#ebd9b4]">Nhật Ký Giải Mã Phantom Axolotls</p>
                  <p className="text-[10px] text-stone-400 leading-relaxed">
                    {state.gameStatus === "VICTORY"
                      ? "Cuốn sổ tay chứa toàn bộ mật mã tối hậu giải mật thành công hệ thống đường hầm. Đảm bảo vụ án phá thành công."
                      : "Đang khóa. Phá án thành công tại Trạm Bơm để mở khóa."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-[280px] p-6 flex flex-col justify-between bg-[#140f0c]/30 overflow-y-auto md:overflow-hidden">
            <div className="flex-1 flex flex-col overflow-hidden">
              <h3 className="text-[10px] font-bold text-[#d4b270] uppercase tracking-[0.15em] border-b border-[#3c2a1c] pb-2 mb-4">Nhật Ký Vụ Án (Log)</h3>
              <div className="flex-1 overflow-y-auto space-y-3 font-mono text-[9px] pr-1">
                {state.history.length === 0 ? (
                  <p className="italic text-stone-600">Hành trình trống. Vui lòng đưa ra quyết định để hệ thống lưu vết thám tử.</p>
                ) : (
                  state.history.map((h, idx) => {
                    const node = storyConfig[h];
                    return (
                      <div key={idx} className="flex gap-2 items-start border-l border-[#3c2a1c] pl-3 py-1 relative">
                        <div className="absolute -left-[4.5px] top-2.5 w-2 h-2 rounded-full bg-[#d4b270]"></div>
                        <div>
                          <p className="text-stone-400 font-semibold">Bước {idx + 1}: Di Chuyển</p>
                          <p className="text-[#ebd9b4] mt-0.5 font-sans font-medium">{node?.characterName || "Điểm rẽ"}</p>
                          <p className="text-[8px] text-stone-500 font-mono">ID: {h.toUpperCase()}</p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function WitnessModal({ currentNode, currentRoleAsset, onClose }: WitnessModalProps) {
  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 transition-all duration-300">
      <div className="bg-[#1a1410] border-2 border-[#3c2a1c] w-full max-w-2xl h-full max-h-[85vh] md:h-[480px] rounded flex flex-col relative shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden">
        <div className="h-14 border-b border-[#3c2a1c] bg-[#221a14] px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <h2 className="text-xs font-bold tracking-[0.15em] text-[#ebd9b4] uppercase">HỒ SƠ NHÂN CHỨNG</h2>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-[#2e1c12] hover:bg-[#3d2417] text-[#d4b270] border border-[#4a3622] rounded text-[10px] uppercase tracking-[0.15em] transition-colors cursor-pointer"
          >
            Đóng
          </button>
        </div>

        <div className="flex-1 p-6 overflow-y-auto flex flex-col md:flex-row gap-6 bg-[#16110e]/45">
          <div className="w-full md:w-44 flex flex-col items-center gap-3 shrink-0">
            <div className="w-40 h-52 bg-[#140f0c] border border-[#4a3622] rounded overflow-hidden shadow-lg">
              <img src={currentRoleAsset.avatarUrl} alt={currentNode.characterName} className="w-full h-full object-cover" />
            </div>
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#ebd9b4] mt-2">{currentNode.characterName}</p>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-[10px] font-bold text-[#d4b270] uppercase tracking-[0.15em] mb-1">Mô tả Đối Tượng</h3>
                <p className="text-xs text-stone-300 leading-relaxed font-sans">
                  {currentNode.characterName === "Sếp" && "Là sếp nha ae"}
                  {currentNode.characterName === "Thợ cơ khí" && "Sinh năm 98 học Bác khoa Cơ khí bỏ ngang qua IT. Vì bong bóng AI slop nên lại bỏ IT về cơ khí."}
                  {currentNode.characterName === "Biên tập viên" && "Chủ bút tờ báo Sybau. Từng thi Cao khảo TQ, 3 môn 9 điểm."}
                  {currentNode.characterName === "Người bán đá bào" && "Bộ Di vật cho support team break nha ae"}
                  {!["Sếp", "Thợ cơ khí", "Biên tập viên", "Người bán đá bào"].includes(currentNode.characterName) && "Thông tin chưa rõ ràng. Đối tượng có thể là một điểm bẫy sập được dựng sẵn để tiêu diệt thám tử dấn bước vào sâu."}
                </p>
              </div>

              <div>
                <h3 className="text-[10px] font-bold text-[#d4b270] uppercase tracking-[0.15em] mb-1">Lời Khai Thu Thập Được</h3>
                <div className="bg-[#140f0c] border border-[#3c2a1c] p-3 rounded italic text-xs text-[#ebd9b4] leading-relaxed font-sans">
                  "{highlightClues(currentNode.dialogue)}"
                </div>
              </div>

              <div>
                <h3 className="text-[10px] font-bold text-[#d4b270] uppercase tracking-[0.15em] mb-1">Nhận định của Thám Tử</h3>
                <p className="text-[11px] text-stone-400 italic font-sans leading-normal">
                  {currentNode.characterName === "Sếp" && "Sao bạn lại nghi ngờ sếp?"}
                  {currentNode.characterName === "Thợ Cơ khí" && "Hình như mình từng thấy mặt hắn ta trên hornpub?"}
                  {currentNode.characterName === "Biên tập viên" && "Gì đây? Mét xi bu cu yamal á? Giật tít thế này chắc chắn ăn 30 triệu vào mồm!"}
                  {currentNode.characterName === "Người bán đá bào" && "Nóng vl mua t que kem đi chat"}
                  {!["Sếp", "Thợ Cơ khí", "Biên tập viên", "Người bán đá bào"].includes(currentNode.characterName) && "Quay đầu là bờ"}
                </p>
              </div>
            </div>

            <div className="text-[9px] text-stone-500 border-t border-[#3c2a1c] pt-3 flex justify-between font-mono shrink-0">
              <span>MỨC ĐỘ ĐÁNG TIN: 92%</span>
              <span>TIẾN ĐỘ THU THẬP LỜI KHAI: ĐÃ KHÓA CHẶT</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// Nhớ import MapModalProps và nodesList của bạn vào đây

export function MapModal({ state, currentNodeId, mapEntryNodeId, isLinkActive, onClose }: MapModalProps) {
  
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 1000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const entryNode = nodesList.find(node => node.id === mapEntryNodeId);
  const currentNode = nodesList.find(node => node.id === currentNodeId);
  const currentPath = [...state.history, state.currentNodeId];

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 transition-all duration-300">
      <div className="bg-[#fcf9f2] border-2 border-[#d4b270] w-full max-w-4xl h-full max-h-[85vh] md:h-[520px] rounded flex flex-col relative shadow-[0_20px_60px_rgba(0,0,0,0.4)] overflow-hidden">
        
        {/* Thanh Header */}
        <div className="h-14 border-b border-[#ebd9b4] bg-[#f7f2e8] px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <h2 className="text-xs font-bold tracking-[0.15em] text-[#5c4432] uppercase">SƠ ĐỒ PHÁ ÁN</h2>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-[#ebd9b4] hover:bg-[#d4b270] text-[#5c4432] border border-[#c5b299] rounded text-[10px] uppercase tracking-[0.15em] transition-colors cursor-pointer font-bold"
          >
            Bỏ qua
          </button>
        </div>

        {/* Nội dung Map */}
        <div className="flex-1 p-6 flex flex-col justify-between overflow-hidden relative bg-[#faf6f0]">
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_center,_#d4b270_0%,_transparent_70%)] pointer-events-none"></div>

          <div className="flex-1 w-full bg-[#fdfbf7] border border-[#ebd9b4] rounded-md p-4 relative flex items-center justify-center overflow-hidden shadow-[inset_0_2px_10px_rgba(212,178,112,0.1)]">
            <svg className="w-full h-full max-h-[300px] sm:max-h-[340px] shrink-0 font-sans" viewBox="0 0 520 320" preserveAspectRatio="xMidYMid meet">
              
              {/* Lưới Grid */}
              <g stroke="#d4b270" strokeOpacity="0.25" strokeWidth="0.8" pointerEvents="none">
                <line x1="0" y1="40" x2="520" y2="40" />
                <line x1="0" y1="100" x2="520" y2="100" />
                <line x1="0" y1="160" x2="520" y2="160" />
                <line x1="0" y1="220" x2="520" y2="220" />
                <line x1="0" y1="280" x2="520" y2="280" />
                <line x1="80" y1="0" x2="80" y2="320" />
                <line x1="170" y1="0" x2="170" y2="320" />
                <line x1="260" y1="0" x2="260" y2="320" />
                <line x1="330" y1="0" x2="330" y2="320" />
                <line x1="450" y1="0" x2="450" y2="320" />
              </g>

              {/* VẼ CÁC ĐƯỜNG NỐI */}
              {nodesList.map((node) => {
                const isCurrent = state.currentNodeId === node.id;
                const isVisited = state.history.includes(node.id) || isCurrent;
                
                // Tránh lặp vô ích nếu node này chưa từng được đặt chân tới
                if (!isVisited) return null;

                return node.connections.map((targetId) => {
                  if (targetId === "node_start") return null;

                  const targetNode = nodesList.find(n => n.id === targetId);
                  if (!targetNode) return null;

                  const isWalked = currentPath.some((id, index) => id === node.id && currentPath[index + 1] === targetId);
                  const isGood = targetId === "node_good_end";

                  return (
                    <line
                      key={`${node.id}-${targetId}`}
                      x1={node.x}
                      y1={node.y}
                      x2={targetNode.x}
                      y2={targetNode.y}
                      stroke={isWalked ? (isGood ? "#10b981" : "#ef4444") : "#cbd5e1"}
                      strokeWidth={isWalked ? "3" : "1.2"}
                      strokeDasharray={isWalked ? "none" : "3,3"}
                      className="transition-all duration-500"
                    />
                  );
                });
              })}

              {/* VẼ CÁC ĐIỂM NODE */}
              {nodesList.map((node) => {
                const isCurrent = currentNodeId === node.id;
                const isVisited = state.history.includes(node.id) || isCurrent;
                const isReachable = nodesList.some(n => (state.history.includes(n.id) || currentNodeId === n.id) && n.connections.includes(node.id));
                const isKnown = isVisited || isReachable;

                if (!isKnown) return null;

                let fillCol = "#f3ede2";
                let strokeCol = "#d4c2ab";
                let textCol = "#a08e7c";
                let displayLabel = node.shortLabel;

                if (isCurrent) {
                  if (node.type === "good_end") {
                    fillCol = "#10b981"; strokeCol = "#059669"; textCol = "#047857";
                  } else if (node.type === "bad_end") {
                    fillCol = "#ef4444"; strokeCol = "#dc2626"; textCol = "#b91c1c";
                  } else {
                    fillCol = "#eab308"; strokeCol = "#ca8a04"; textCol = "#854d0e";
                  }
                } else if (isVisited) {
                  if (node.type === "good_end") {
                    fillCol = "#a7f3d0"; strokeCol = "#059669"; textCol = "#047857";
                  } else if (node.type === "bad_end") {
                    fillCol = "#fca5a5"; strokeCol = "#dc2626"; textCol = "#b91c1c";
                  } else {
                    fillCol = "#fef08a"; strokeCol = "#ca8a04"; textCol = "#854d0e";
                  }
                } else {
                  fillCol = "#e2e8f0"; strokeCol = "#94a3b8"; textCol = "#64748b"; displayLabel = "?";
                }

                return (
                  <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
                    {isCurrent && (
                      <circle r="9" fill="none" stroke={node.type === "good_end" ? "#10b981" : node.type === "bad_end" ? "#ef4444" : "#eab308"} strokeWidth="1.5" className="animate-pulse" />
                    )}
                    <circle r="6" fill={fillCol} stroke={strokeCol} strokeWidth="1.5" />
                    <circle r="2" fill="#fff" opacity={isCurrent ? "1" : "0.5"} />
                    <text
                      x="0" y="-13" textAnchor="middle" fill={textCol}
                      className={`text-[9px] font-sans ${isCurrent ? "font-bold" : "font-semibold"} select-none pointer-events-none`}
                      style={{ fontFamily: "Lexend, sans-serif" }}
                    >
                      {displayLabel}
                    </text>
                  </g>
                );
              })}
              
              {/* ANIMATION ĐỊNH VỊ PLAYER */}
              {currentNode && (
                <g 
                  className="transition-all duration-1000 ease-in-out pointer-events-none"
                  style={{ transform: `translate(${currentNode.x}px, ${currentNode.y}px)` }}
                >
                  <circle r="14" fill="none" stroke="#facc15" strokeWidth="2" className="animate-ping opacity-60" />
                  <circle r="5" fill="#facc15" stroke="#a16207" strokeWidth="1" />
                </g>
              )}
            </svg>
          </div>

          <div className="h-10 mt-4 border-t border-[#ebd9b4] pt-3 flex items-center justify-between text-[9px] text-stone-600 font-sans px-2 shrink-0">
             <div>Sơ đồ phát triển theo bước đi (Trái qua Phải)</div>
          </div>
        </div>
      </div>
    </div>
  );
}