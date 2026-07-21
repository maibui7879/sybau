import { useEffect, useState } from "react";
import { useGameEngine } from "./logic/useGameEngine";
import HeaderNav from "./components/HeaderNav";
import GameScreen from "./components/GameScreen";
import { NotepadModal, WitnessModal, MapModal } from "./components/Modals";
import { getRoleAsset } from "./utils/uiHelpers.tsx";

export default function GameEngine() {
  const { state, currentNode, handleOptionClick, handleReset, isLinkActive } = useGameEngine();
  const [isNotebookOpen, setIsNotebookOpen] = useState(false);
  const [isWitnessOpen, setIsWitnessOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [mapEntryNodeId, setMapEntryNodeId] = useState<string | null>(null);

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

  const handleChoiceSelection = (nextNodeId: string) => {
    setMapEntryNodeId(state.currentNodeId);
    handleOptionClick(nextNodeId);
    setIsMapOpen(true);
  };

  const currentRoleAsset = getRoleAsset(currentNode);

  return (
    <div id="game-container" className="w-full min-h-screen bg-[#171310] text-[#ebd9b4] font-sans flex flex-col relative" style={{ fontFamily: "Lexend, sans-serif" }}>
      <HeaderNav
        onOpenNotebook={() => setIsNotebookOpen(true)}
        onOpenWitness={() => setIsWitnessOpen(true)}
        onOpenMap={() => setIsMapOpen(true)}
        gameStatus={state.gameStatus}
      />

      <GameScreen
        state={state}
        currentNode={currentNode}
        handleOptionClick={handleChoiceSelection}
        handleReset={handleReset}
        currentRoleAsset={currentRoleAsset}
      />

      {isNotebookOpen && <NotepadModal state={state} onClose={() => setIsNotebookOpen(false)} />}
      {isWitnessOpen && <WitnessModal currentNode={currentNode} currentRoleAsset={currentRoleAsset} onClose={() => setIsWitnessOpen(false)} />}
      {isMapOpen && <MapModal state={state} currentNodeId={state.currentNodeId} mapEntryNodeId={mapEntryNodeId || state.currentNodeId} isLinkActive={isLinkActive} onClose={() => { setIsMapOpen(false); setMapEntryNodeId(null); }} />}
    </div>
  );
}
