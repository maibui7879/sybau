export interface Option {
  text: string;
  nextNodeId: string;
  image?: string; // Hình ảnh cho thẻ bài lựa chọn
}

export interface GameNode {
  id: string;
  characterName: string;
  isReal: boolean;
  dialogue: string;
  options: Option[];
  characterImage?: string; // Hình ảnh chân dung nhân vật
  sceneImage?: string;     // Hình ảnh minh họa bối cảnh/cốt truyện
}

export interface GameState {
  currentNodeId: string;
  history: string[];
  gameStatus: 'PLAYING' | 'GAMEOVER' | 'VICTORY';
}
