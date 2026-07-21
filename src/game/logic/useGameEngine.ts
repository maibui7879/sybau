import { useEffect, useMemo, useState } from "react";
import { GameState } from "../../types";
import { GAME_START_NODE, nodesList, storyConfig } from "./gameData";

const initialState: GameState = {
  currentNodeId: GAME_START_NODE,
  history: [],
  gameStatus: "PLAYING"
};

export function useGameEngine() {
  const [state, setState] = useState<GameState>(initialState);

  const currentNode = useMemo(() => {
    return storyConfig[state.currentNodeId] || storyConfig[GAME_START_NODE];
  }, [state.currentNodeId]);

  useEffect(() => {
    const nextStatus = state.currentNodeId === "node_good_end"
      ? "VICTORY"
      : state.currentNodeId.startsWith("bad_end_")
      ? "GAMEOVER"
      : "PLAYING";

    if (state.gameStatus !== nextStatus) {
      setState(prev => ({ ...prev, gameStatus: nextStatus }));
    }
  }, [state.currentNodeId, state.gameStatus]);

  const handleOptionClick = (nextNodeId: string) => {
    setState(prev => {
      if (nextNodeId === GAME_START_NODE) {
        return {
          ...prev,
          currentNodeId: nextNodeId,
          history: []
        };
      }

      const rewindIndex = prev.history.indexOf(nextNodeId);
      if (rewindIndex !== -1) {
        return {
          ...prev,
          currentNodeId: nextNodeId,
          history: prev.history.slice(0, rewindIndex + 1)
        };
      }

      return {
        ...prev,
        currentNodeId: nextNodeId,
        history: [...prev.history, prev.currentNodeId]
      };
    });
  };

  const handleReset = () => {
    setState(initialState);
  };

  const isLinkActive = (sourceId: string, targetId: string) => {
    const hasVisitedTarget = state.history.includes(targetId) || state.currentNodeId === targetId;
    const hasVisitedSource = state.history.includes(sourceId) || state.currentNodeId === sourceId;
    return hasVisitedSource && hasVisitedTarget;
  };

  return {
    state,
    currentNode,
    handleOptionClick,
    handleReset,
    isLinkActive,
    nodesList
  };
}
