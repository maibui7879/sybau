import { useState, useEffect } from "react";
import { GameNode, GameState } from "./types";
import storyData from "./storyConfig.json";

const defaultImageUrl = new URL("../default_image.jpeg", import.meta.url).href;

// Cast JSON import to typed map
const storyConfig = storyData as Record<string, GameNode>;

// Static configurations for the horizontal branching case map
const nodesList = [
  { id: "node_start", label: "Trưởng phòng", shortLabel: "Sếp", x: 50, y: 150, type: "start", connections: ["node_l1_mechanic", "node_l1_press", "node_l1_clockmaker"] },
  { id: "node_l1_mechanic", label: "Thợ Cơ khí", shortLabel: "Johnny Sins", x: 170, y: 60, type: "investigation", connections: ["bad_end_1"] },
  { id: "node_l1_press", label: "Biên Tập Viên", shortLabel: "BTV", x: 170, y: 150, type: "investigation", connections: ["bad_end_2"] },
  { id: "node_l1_clockmaker", label: "Người bán đá bào", shortLabel: "Đồng Hồ", x: 170, y: 240, type: "investigation", connections: ["bad_end_3", "bad_end_4", "node_l2_void"] },
  { id: "bad_end_1", label: "Loditnohoa", shortLabel: "loditnohoa", x: 260, y: 40, type: "bad_end", connections: [] },
  { id: "bad_end_2", label: "tin giả", shortLabel: "-30tr", x: 260, y: 130, type: "bad_end", connections: [] },
  { id: "bad_end_3", label: "Outdated", shortLabel: "big 26?", x: 250, y: 185, type: "bad_end", connections: [] },
  { id: "bad_end_4", label: "wi a cha li kic", shortLabel: "Wdym", x: 250, y: 275, type: "bad_end", connections: [] },
  { id: "node_l2_void", label: "Khoảng Trống", shortLabel: "Khoảng Trống", x: 330, y: 225, type: "investigation", connections: ["bad_end_5", "bad_end_6", "node_good_end"] },
  { id: "bad_end_5", label: "Tháp Chuông", shortLabel: "Tháp Chuông", x: 450, y: 150, type: "bad_end", connections: [] },
  { id: "bad_end_6", label: "Hầm rượu vang", shortLabel: "Hầm Rượu", x: 450, y: 215, type: "bad_end", connections: [] },
  { id: "node_good_end", label: "Trạm Bơm Nước Ngầm", shortLabel: "Trạm Bơm", x: 450, y: 280, type: "good_end", connections: [] }
];

export default function GameEngine() {
  const [state, setState] = useState<GameState>({
    currentNodeId: "node_start",
    history: [],
    gameStatus: "PLAYING"
  });

  // Modal Visibility States
  const [isNotebookOpen, setIsNotebookOpen] = useState(false);
  const [isWitnessOpen, setIsWitnessOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);

  const currentNode = storyConfig[state.currentNodeId] || storyConfig["node_start"];

  // Update Game Status when nodes change
  useEffect(() => {
    if (state.currentNodeId === "node_good_end") {
      setState(prev => ({ ...prev, gameStatus: "VICTORY" }));
    } else if (state.currentNodeId.startsWith("bad_end_")) {
      setState(prev => ({ ...prev, gameStatus: "GAMEOVER" }));
    } else {
      setState(prev => ({ ...prev, gameStatus: "PLAYING" }));
    }
  }, [state.currentNodeId]);

  // Escape key listener to close modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsNotebookOpen(false);
        setIsWitnessOpen(false);
        setIsMapOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleOptionClick = (nextNodeId: string) => {
    setState(prev => ({
      ...prev,
      currentNodeId: nextNodeId,
      history: [...prev.history, prev.currentNodeId]
    }));
  };

  const handleReset = () => {
    setState({
      currentNodeId: "node_start",
      history: [],
      gameStatus: "PLAYING"
    });
  };

  // Helper to determine if connection thread is active
  const isLinkActive = (sourceId: string, targetId: string) => {
    const hasVisitedTarget = state.history.includes(targetId) || state.currentNodeId === targetId;
    const hasVisitedSource = state.history.includes(sourceId) || state.currentNodeId === sourceId;
    return hasVisitedSource && hasVisitedTarget;
  };

  // Helper to render portrait theme based on character
  const getPortraitStyling = (charName: string) => {
    switch (charName) {
      case "Người Hát Rong":
        return {
          bgGradient: "from-amber-950/50",
          statusColor: "text-amber-500",
          statusText: "Nhân chứng"
        };
      case "Thợ Máy":
        return {
          bgGradient: "from-yellow-950/40",
          statusColor: "text-amber-600",
          statusText: "Đối tượng nghi vấn"
        };
      case "Thư Lại":
        return {
          bgGradient: "from-orange-950/40",
          statusColor: "text-amber-600",
          statusText: "Đối tượng nghi vấn"
        };
      case "Người bán đá bào":
        return {
          bgGradient: "from-emerald-950/40",
          statusColor: "text-emerald-500",
          statusText: "Nhân chứng tin cậy"
        };
      default:
        return {
          bgGradient: "from-stone-900/40",
          statusColor: "text-stone-500",
          statusText: "Hồ sơ"
        };
    }
  };

  const portrait = getPortraitStyling(currentNode.characterName);

  const cluePatterns = [
    "Đá Tan",
    "IQ siêu phàm",
    "Gột rửa",
    "Sáng tỏ"
  ];

  const highlightClues = (text: string) => {
    if (!text) return text;

    const escapedPatterns = cluePatterns
      .map(phrase => phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join("|");
    const splitRegex = new RegExp(`(${escapedPatterns})`, "gi");
    const testRegex = new RegExp(`(${escapedPatterns})`, "i");

    return text.split(splitRegex).map((part, idx) =>
      testRegex.test(part) ? (
        <span key={`clue-${idx}`} className="rounded-sm bg-[#f59e0b]/20 text-[#f59e0b] px-0.5">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div id="game-container" className="w-full min-h-screen bg-[#171310] text-[#ebd9b4] font-sans flex flex-col relative" style={{ fontFamily: "Lexend, sans-serif" }}>
      
      {/* HEADER & NAV BAR */}
      <header id="game-header" className="min-h-16 border-b border-[#3c2a1c] flex flex-col sm:flex-row items-center justify-between gap-3 p-4 sm:px-8 bg-[#201914] shrink-0 shadow-[inset_0_-1px_0_rgba(255,255,255,0.05)]">
        <div>
          <h1 className="text-base font-semibold tracking-[0.15em] uppercase text-[#d4b270]" style={{ fontFamily: "Lexend, sans-serif" }}>
            Tìm Manh Mối hay cái gì đó tương tự
          </h1>
        </div>

        {/* DETECTIVE NAV BAR */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
          <button
            onClick={() => setIsNotebookOpen(true)}
            className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#2a1d15] hover:bg-[#3d2b1f] border border-[#d4b270]/40 hover:border-[#d4b270] rounded-sm text-xs font-semibold text-[#ebd9b4] transition-all cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.4)] uppercase tracking-[0.15em]"
          >
            Sổ Tay
          </button>

          <button
            onClick={() => setIsWitnessOpen(true)}
            className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#2a1d15] hover:bg-[#3d2b1f] border border-[#d4b270]/40 hover:border-[#d4b270] rounded-sm text-xs font-semibold text-[#ebd9b4] transition-all cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.4)] uppercase tracking-[0.15em]"
          >
            Nhân Chứng
          </button>

          <button
            onClick={() => setIsMapOpen(true)}
            className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#2a1d15] hover:bg-[#3d2b1f] border border-[#d4b270]/40 hover:border-[#d4b270] rounded-sm text-xs font-semibold text-[#ebd9b4] transition-all cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.4)] uppercase tracking-[0.15em]"
          >
            Bản Đồ
          </button>

          {state.gameStatus !== "PLAYING" && (
            <span className={`px-2 py-1 text-[9px] font-mono font-bold tracking-[0.15em] border rounded ${state.gameStatus === "VICTORY" ? "border-emerald-500/40 text-emerald-500 bg-emerald-950/20" : "border-red-500/40 text-red-500 bg-red-950/20"}`}>
              {state.gameStatus === "VICTORY" ? "SUCCESS" : "FAILED"}
            </span>
          )}
        </div>
      </header>

      {/* MAIN SCREEN (CỐT TRUYỆN PHÁ ÁN FULL SCREEN) */}
      <main id="game-main" className="flex-1 flex flex-col relative bg-[radial-gradient(circle_at_center,_#201610_0%,_#0a0705_100%)] p-4 sm:p-12 justify-center items-center">
        <div className="absolute inset-0 opacity-15 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none"></div>

        {/* Immersive Narrative Container */}
        <div className="w-full max-w-4xl flex-1 flex flex-col justify-center items-center text-center z-10 select-none my-auto">
          
          {/* Optional Scene Illustration */}
            <div className="w-full max-w-2xl h-36 sm:h-44 bg-[#1e1510] border border-[#3c2a1c] rounded-sm flex flex-col justify-center items-center relative shadow-2xl mb-6 shrink-0 select-none overflow-hidden">
              <img src={defaultImageUrl} alt="Default scene" className="absolute inset-0 w-full h-full object-cover opacity-85" />
              {/* Vintage style corners */}
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#3c2a1c]/60"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#3c2a1c]/60"></div>
            </div>

          {/* Speaker Character Profile & Dialogue row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 max-w-2xl w-full mb-8 shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[#3d2a1c] bg-[#1e1510] flex flex-col items-center justify-center shrink-0 shadow-lg relative self-center select-none overflow-hidden">
                <img src={defaultImageUrl} alt="Default portrait" className="absolute inset-0 w-full h-full object-cover opacity-90" />
                <div className="relative z-10 flex flex-col items-center justify-center">
                  <span className="text-[11px] font-bold text-[#d4b270]/60 tracking-[0.15em] font-mono uppercase">
                    {currentNode.characterName.slice(0, 3)}
                  </span>
                  <span className="text-[7px] text-stone-600 font-mono uppercase -mt-0.5">
                    ID: {currentNode.id.slice(-3).toUpperCase()}
                  </span>
                </div>
              </div>
            
            <div className="flex-1 text-center sm:text-left">
              {/* Character Speaker Badge */}
              <div className="text-[10px] tracking-[0.15em] font-bold text-[#d4b270]/70 uppercase mb-2" style={{ fontFamily: "Lexend, sans-serif" }}>
                {currentNode.characterName === "Hệ Thống" || currentNode.characterName === "Hồ sơ" ? "Hệ Thống Báo Cáo" : `Lời Khai: ${currentNode.characterName}`}
              </div>
              
              {/* Core Dialogue Text */}
              <p className="text-sm md:text-base font-sans text-[#ebd9b4] italic leading-relaxed font-light" style={{ fontFamily: "Lexend, sans-serif" }}>
                "{highlightClues(currentNode.dialogue)}"
              </p>
            </div>
          </div>

          {/* Decision Choice Cards */}
          <div className="w-full max-w-4xl flex flex-col items-center mt-2 shrink-0">
            {state.gameStatus === "PLAYING" && currentNode.options.length > 0 ? (
              <div className="flex flex-col sm:flex-row justify-center items-stretch gap-5 w-full">
                {currentNode.options.map((opt, idx) => {
                  const numLabels = ["01", "02", "03", "04", "05"];
                  const labelNum = numLabels[idx] || `${idx + 1}`;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleOptionClick(opt.nextNodeId)}
                      className="flex-1 min-h-[180px] sm:h-56 bg-[#1a130f] border-2 border-[#3d2a1c] hover:border-[#d4b270] rounded-sm flex flex-col justify-between text-left transition-all duration-300 hover:-translate-y-1.5 cursor-pointer group relative overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.6)] hover:shadow-[0_15px_30px_rgba(212,178,112,0.1)]"
                      style={{ fontFamily: "Lexend, sans-serif" }}
                    >
                      {/* Option Image Header */}
                        <div className="w-full h-16 bg-[#1e1510] border-b border-[#3c2a1c]/60 flex flex-col items-center justify-center relative shrink-0 select-none overflow-hidden">
                          <img src={defaultImageUrl} alt={`Choice ${labelNum}`} className="absolute inset-0 w-full h-full object-cover opacity-90" />
                          {/* Top accent */}
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[1px] bg-[#d4b270]/10"></div>
                        </div>

                      {/* Content Container */}
                      <div className="p-4 flex-1 flex flex-col justify-between w-full">
                        {/* Top tag */}
                        <div className="w-full flex items-center justify-start pb-2 shrink-0 border-b border-[#3c2a1c]/20">
                          <span className="text-[8px] font-bold tracking-[0.15em] text-[#d4b270]/50 uppercase">
                            HƯỚNG ĐI {labelNum}
                          </span>
                        </div>

                        {/* Card Content Text */}
                        <div className="my-2 flex-1 flex items-center">
                          <p className="text-xs text-[#ebd9b4] font-medium leading-relaxed group-hover:text-[#f3e6cd] transition-colors">
                            {opt.text}
                          </p>
                        </div>

                        {/* Bottom indicator */}
                        <div className="w-full pt-2 border-t border-[#3c2a1c]/40 flex items-center justify-between text-[8px] text-[#d4b270]/40 group-hover:text-[#d4b270] tracking-[0.15em] uppercase font-bold transition-all shrink-0">
                          <span>Lựa chọn</span>
                          <span className="group-hover:translate-x-1 transition-transform">TIẾP TỤC →</span>
                        </div>
                      </div>

                      {/* Vintage style corners */}
                      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#3c2a1c] group-hover:border-[#d4b270]/60 transition-colors"></div>
                      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#3c2a1c] group-hover:border-[#d4b270]/60 transition-colors"></div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-6 py-4">
                <p className="text-sm tracking-[0.15em] font-bold uppercase text-amber-500" style={{ fontFamily: "Lexend, sans-serif" }}>
                  {state.gameStatus === "VICTORY" ? "PHÁ ÁN THÀNH CÔNG" : "NHIỆM VỤ THẤT BẠI"}
                </p>
                <button
                  onClick={handleReset}
                  className="px-8 py-3.5 bg-[#3d1a10] border border-[#b91c1c] text-xs text-[#ebd9b4] font-semibold uppercase tracking-[0.15em] hover:bg-[#4d2114] hover:border-[#ef4444] transition-all cursor-pointer rounded-sm"
                  style={{ fontFamily: "Lexend, sans-serif" }}
                >
                  Chơi Lại
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* MODAL 1: SỔ TAY THÁM TỬ */}
      {isNotebookOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 transition-all duration-300">
          <div className="bg-[#1a1410] border-2 border-[#3c2a1c] w-full max-w-4xl h-full max-h-[85vh] md:h-[520px] rounded flex flex-col relative shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden">
            
            {/* Modal Header */}
            <div className="h-14 border-b border-[#3c2a1c] bg-[#221a14] px-6 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <h2 className="text-xs font-bold tracking-[0.15em] text-[#ebd9b4] uppercase">SỔ TAY THÁM TỬ</h2>
              </div>
              <button 
                onClick={() => setIsNotebookOpen(false)}
                className="px-3 py-1 bg-[#2e1c12] hover:bg-[#3d2417] text-[#d4b270] border border-[#4a3622] rounded text-[10px] uppercase tracking-[0.15em] transition-colors cursor-pointer"
              >
                Đóng
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto md:overflow-hidden flex flex-col md:flex-row">
              
              {/* Left column: Objectives */}
              <div className="w-full md:w-[280px] border-b md:border-b-0 md:border-r border-[#3c2a1c] p-6 flex flex-col justify-between bg-[#140f0c]/50">
                <div>
                  <h3 className="text-[10px] font-bold text-[#d4b270] uppercase tracking-[0.15em] border-b border-[#3c2a1c] pb-2 mb-4">Mục Tiêu Nghiên Cứu</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className={`mt-1 w-2.5 h-2.5 border flex-shrink-0 rounded-sm ${state.currentNodeId !== "node_start" ? "bg-[#d4b270] border-[#d4b270]" : "border-[#7c5c3e]"}`}></div>
                      <div>
                        <p className={`text-xs leading-normal ${state.currentNodeId !== "node_start" ? "line-through text-stone-500" : "text-[#ebd9b4] font-medium"}`}>
                          Giải mật thư của Người Hát Rong
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
                        <p className="text-[9px] text-stone-500 mt-0.5">Tìm ra bức tượng Nghệ Béo và hoàn tất hồ sơ.</p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div className="text-[9px] text-stone-500 border-t border-[#3c2a1c] pt-4 font-mono">
                  Holmes Investigation Bureau
                </div>
              </div>

              {/* Middle column: Evidence List */}
              <div className="flex-1 border-b md:border-b-0 md:border-r border-[#3c2a1c] p-6 flex flex-col bg-[#16110e]/20 overflow-y-auto">
                <h3 className="text-[10px] font-bold text-[#d4b270] uppercase tracking-[0.15em] border-b border-[#3c2a1c] pb-2 mb-4">Kho Vật Chứng Thu Thập</h3>
                <div className="space-y-4">
                  
                  {/* Paper item */}
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

                  {/* Map item */}
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

                  {/* Notebook item */}
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

              {/* Right column: Chronology logs */}
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
      )}

      {/* MODAL 2: HỒ SƠ NHÂN CHỨNG */}
      {isWitnessOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 transition-all duration-300">
          <div className="bg-[#1a1410] border-2 border-[#3c2a1c] w-full max-w-2xl h-full max-h-[85vh] md:h-[480px] rounded flex flex-col relative shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden">
            
            {/* Modal Header */}
            <div className="h-14 border-b border-[#3c2a1c] bg-[#221a14] px-6 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <h2 className="text-xs font-bold tracking-[0.15em] text-[#ebd9b4] uppercase">HỒ SƠ NHÂN CHỨNG</h2>
              </div>
              <button 
                onClick={() => setIsWitnessOpen(false)}
                className="px-3 py-1 bg-[#2e1c12] hover:bg-[#3d2417] text-[#d4b270] border border-[#4a3622] rounded text-[10px] uppercase tracking-[0.15em] transition-colors cursor-pointer"
              >
                Đóng
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 p-6 overflow-y-auto flex flex-col md:flex-row gap-6 bg-[#16110e]/45">
              
              {/* Portrait container */}
              <div className="w-full md:w-44 flex flex-col items-center gap-3 shrink-0">
                <div className="w-40 h-52 bg-[#140f0c] border border-[#4a3622] rounded flex flex-col items-center justify-center relative overflow-hidden shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                  
                  <div className="text-xs tracking-[0.15em] text-[#d4b270] z-20 uppercase font-bold font-mono">
                    NHÂN VẬT
                  </div>
                  
                  {/* Retro TV Scanline */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,_rgba(0,0,0,0.2)_50%)] bg-[size:100%_4px] pointer-events-none opacity-20"></div>

                  <div className="absolute bottom-3 left-3 right-3 text-center z-20">
                    <p className="text-xs font-bold text-[#ebd9b4]">{currentNode.characterName}</p>
                    <p className={`text-[8px] tracking-[0.15em] uppercase mt-1 ${portrait.statusColor} font-bold`}>{portrait.statusText.split(" // ")[0]}</p>
                  </div>
                </div>
                <span className="text-[9px] text-stone-500 font-mono tracking-[0.15em] uppercase">VẤN ĐỀ: {currentNode.id}</span>
              </div>

              {/* Interrogation Profiling Texts */}
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
                      {currentNode.characterName === "Người Hát Rong" && "Đồng hồ đồng hồ đang hát ru, hai cái tay này nặng trĩu. Mười, mười lắm, hai mươi, sáng thu chơi vơi, chơi một đời lãng du"}
                      {currentNode.characterName === "Thợ Máy" && "Hắn có vẻ bồn chồn. Nếu bước vào xưởng của hắn tiếp, nguy cơ sập hầm cơ học đè bẹp ta là cực lớn."}
                      {currentNode.characterName === "Thư Lại" && "Gì đây? Mét xi bu cu rô nan đô á? Giật tít thế này chắc chắn ăn 30 triệu vào mồm!"}
                      {currentNode.characterName === "Người bán đá bào" && "+16% Tấn công kích phá"}
                      {!["Người Hát Rong", "Thợ Máy", "Thư Lại", "Người bán đá bào"].includes(currentNode.characterName) && "Quay đầu là bờ"}
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
      )}

      {/* MODAL 3: BẢN ĐỒ PHÁ ÁN (CASE BOARD) */}
      {isMapOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 transition-all duration-300">
          <div className="bg-[#fcf9f2] border-2 border-[#d4b270] w-full max-w-4xl h-full max-h-[85vh] md:h-[520px] rounded flex flex-col relative shadow-[0_20px_60px_rgba(0,0,0,0.4)] overflow-hidden">
            
            {/* Modal Header */}
            <div className="h-14 border-b border-[#ebd9b4] bg-[#f7f2e8] px-6 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <h2 className="text-xs font-bold tracking-[0.15em] text-[#5c4432] uppercase">SƠ ĐỒ PHÁ ÁN</h2>
              </div>
              <button 
                onClick={() => setIsMapOpen(false)}
                className="px-3 py-1 bg-[#ebd9b4] hover:bg-[#d4b270] text-[#5c4432] border border-[#c5b299] rounded text-[10px] uppercase tracking-[0.15em] transition-colors cursor-pointer font-bold"
              >
                Đóng
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 p-6 flex flex-col justify-between overflow-hidden relative bg-[#faf6f0]">
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_center,_#d4b270_0%,_transparent_70%)] pointer-events-none"></div>
              
              {/* Horizontally Branched Map Stage */}
              <div className="flex-1 w-full bg-[#fdfbf7] border border-[#ebd9b4] rounded-md p-4 relative flex items-center justify-center overflow-hidden shadow-[inset_0_2px_10px_rgba(212,178,112,0.1)]">
                <svg className="w-full h-full max-h-[300px] sm:max-h-[340px] shrink-0 font-sans" viewBox="0 0 520 320" preserveAspectRatio="xMidYMid meet">
                  
                  {/* Corkboard Grid Lines */}
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

                  {/* Dynamic Threads */}
                  {nodesList.map((node) => {
                    const sourceVisited = state.history.includes(node.id) || state.currentNodeId === node.id;
                    const sourceReachable = nodesList.some(n => (state.history.includes(n.id) || state.currentNodeId === n.id) && n.connections.includes(node.id));
                    const sourceKnown = sourceVisited || sourceReachable;

                    if (!sourceKnown) return null;

                    return node.connections.map((targetId) => {
                      const targetNode = nodesList.find(n => n.id === targetId);
                      if (!targetNode) return null;

                      const targetVisited = state.history.includes(targetId) || state.currentNodeId === targetId;
                      const targetReachable = nodesList.some(n => (state.history.includes(n.id) || state.currentNodeId === n.id) && n.connections.includes(targetId));
                      const targetKnown = targetVisited || targetReachable;

                      // Only render connection line if both endpoints are known (Fog of War)
                      if (!targetKnown) return null;

                      const active = isLinkActive(node.id, targetId);
                      const isGood = targetId === "node_good_end";

                      return (
                        <line
                          key={`${node.id}-${targetId}`}
                          x1={node.x}
                          y1={node.y}
                          x2={targetNode.x}
                          y2={targetNode.y}
                          stroke={active ? (isGood ? "#10b981" : "#ef4444") : "#cbd5e1"}
                          strokeWidth={active ? "3" : "1.2"}
                          strokeDasharray={active ? "none" : "3,3"}
                          className="transition-all duration-500"
                        />
                      );
                    });
                  })}

                  {/* Map Nodes */}
                  {nodesList.map((node) => {
                    const isCurrent = state.currentNodeId === node.id;
                    const isVisited = state.history.includes(node.id) || isCurrent;
                    const isReachable = nodesList.some(n => (state.history.includes(n.id) || state.currentNodeId === n.id) && n.connections.includes(node.id));
                    const isKnown = isVisited || isReachable;

                    // Fog of War: Do not display nodes that have not been unlocked/reached yet
                    if (!isKnown) return null;

                    let fillCol = "#f3ede2";
                    let strokeCol = "#d4c2ab";
                    let textCol = "#a08e7c";
                    let displayLabel = node.shortLabel;

                    if (isCurrent) {
                      if (node.type === "good_end") {
                        fillCol = "#10b981";
                        strokeCol = "#059669";
                        textCol = "#047857";
                      } else if (node.type === "bad_end") {
                        fillCol = "#ef4444";
                        strokeCol = "#dc2626";
                        textCol = "#b91c1c";
                      } else {
                        fillCol = "#eab308";
                        strokeCol = "#ca8a04";
                        textCol = "#854d0e";
                      }
                    } else if (isVisited) {
                      if (node.type === "good_end") {
                        fillCol = "#a7f3d0";
                        strokeCol = "#059669";
                        textCol = "#047857";
                      } else if (node.type === "bad_end") {
                        fillCol = "#fca5a5";
                        strokeCol = "#dc2626";
                        textCol = "#b91c1c";
                      } else {
                        fillCol = "#fef08a";
                        strokeCol = "#ca8a04";
                        textCol = "#854d0e";
                      }
                    } else {
                      // Node has not been visited but is a reachable next option: Hide its actual label and type details to prevent spoilers!
                      fillCol = "#e2e8f0";
                      strokeCol = "#94a3b8";
                      textCol = "#64748b";
                      displayLabel = "?";
                    }

                    return (
                      <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
                        {isCurrent && (
                          <circle r="9" fill="none" stroke={node.type === "good_end" ? "#10b981" : node.type === "bad_end" ? "#ef4444" : "#eab308"} strokeWidth="1.5" className="animate-pulse" />
                        )}
                        <circle r="6" fill={fillCol} stroke={strokeCol} strokeWidth="1.5" />
                        <circle r="2" fill="#fff" opacity={isCurrent ? "1" : "0.5"} />
                        <text
                          x="0"
                          y="-13"
                          textAnchor="middle"
                          fill={textCol}
                          className={`text-[9px] font-sans ${isCurrent ? "font-bold" : "font-semibold"} select-none pointer-events-none`}
                          style={{ fontFamily: "Lexend, sans-serif" }}
                        >
                          {displayLabel}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Legends */}
              <div className="h-10 mt-4 border-t border-[#ebd9b4] pt-3 flex items-center justify-between text-[9px] text-stone-600 font-sans px-2 shrink-0">
                <div className="flex flex-wrap gap-4">
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-yellow-500 animate-pulse"></span> Vị trí hiện tại</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-yellow-200 border border-yellow-600"></span> Đã đi qua</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-slate-300 border border-slate-400"></span> ? Chưa khám phá</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-400 border border-red-600"></span> Điểm Thất Bại</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400 border border-emerald-600"></span> Điểm Thành Công</span>
                </div>
                <div>Sơ đồ phát triển theo bước đi (Trái qua Phải)</div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
