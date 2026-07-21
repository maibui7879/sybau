import { GameNode } from "../../types";
import storyData from "../../storyConfig.json";

export const GAME_START_NODE = "node_start";
export const storyConfig = storyData as Record<string, GameNode>;

export const nodesList = [
  { id: "node_start", label: "Trưởng phòng", shortLabel: "Sếp", x: 50, y: 150, type: "start", connections: ["node_l1_mechanic", "node_l1_press", "node_l1_clockmaker"] },
  { id: "node_l1_mechanic", label: "Thợ Cơ khí", shortLabel: "Thợ cơ khí", x: 170, y: 70, type: "investigation", connections: ["node_l2_mechanic_trap", "node_start", "bad_end_1_c"] },
  { id: "node_l2_mechanic_trap", label: "Cạm Bẫy Cơ khí", shortLabel: "Gầm máy", x: 320, y: 50, type: "investigation", connections: ["bad_end_1_a", "bad_end_1_b", "bad_end_1_d"] },
  { id: "bad_end_1_a", label: "Thất bại A", shortLabel: "1A", x: 450, y: 20, type: "bad_end", connections: ["node_start"] },
  { id: "bad_end_1_b", label: "Thất bại B", shortLabel: "1B", x: 450, y: 60, type: "bad_end", connections: ["node_start"] },
  { id: "bad_end_1_c", label: "Thất bại C", shortLabel: "1C", x: 300, y: 130, type: "bad_end", connections: ["node_start"] },
  { id: "bad_end_1_d", label: "Thất bại D", shortLabel: "1D", x: 450, y: 100, type: "bad_end", connections: ["node_start"] },
  { id: "node_l1_press", label: "Biên Tập Viên", shortLabel: "BTV", x: 170, y: 150, type: "investigation", connections: ["node_l2_press_riot", "node_start", "bad_end_2_c"] },
  { id: "node_l2_press_riot", label: "Bạo Loạn Báo", shortLabel: "Báo", x: 330, y: 150, type: "investigation", connections: ["bad_end_2_a", "bad_end_2_b", "bad_end_2_d"] },
  { id: "bad_end_2_a", label: "Thất bại A", shortLabel: "2A", x: 450, y: 120, type: "bad_end", connections: ["node_start"] },
  { id: "bad_end_2_b", label: "Thất bại B", shortLabel: "2B", x: 450, y: 150, type: "bad_end", connections: ["node_start"] },
  { id: "bad_end_2_c", label: "Thất bại C", shortLabel: "2C", x: 300, y: 190, type: "bad_end", connections: ["node_start"] },
  { id: "bad_end_2_d", label: "Thất bại D", shortLabel: "2D", x: 450, y: 180, type: "bad_end", connections: ["node_start"] },
  { id: "node_l1_clockmaker", label: "Người bán đá bào", shortLabel: "Đồng Hồ", x: 170, y: 240, type: "investigation", connections: ["node_l2_sybau_trap", "bad_end_4", "node_l2_void"] },
  { id: "node_l2_sybau_trap", label: "Cạm Bẫy Sybau", shortLabel: "Hộp mù", x: 320, y: 240, type: "investigation", connections: ["bad_end_3", "bad_end_3_b", "bad_end_3_c"] },
  { id: "bad_end_3", label: "Thất bại 3", shortLabel: "3A", x: 450, y: 200, type: "bad_end", connections: ["node_start"] },
  { id: "bad_end_3_b", label: "Thất bại 3B", shortLabel: "3B", x: 450, y: 240, type: "bad_end", connections: ["node_start"] },
  { id: "bad_end_3_c", label: "Thất bại 3C", shortLabel: "3C", x: 450, y: 280, type: "bad_end", connections: ["node_start"] },
  { id: "bad_end_4", label: "Hộp Sai", shortLabel: "4", x: 300, y: 280, type: "bad_end", connections: ["node_start"] },
  { id: "node_l2_void", label: "Khoảng Trống", shortLabel: "Khoảng Trống", x: 330, y: 310, type: "investigation", connections: ["node_l3_clocktower_trap", "bad_end_6", "node_good_end"] },
  { id: "node_l3_clocktower_trap", label: "Tháp Đồng hồ", shortLabel: "Tháp Đồng hồ", x: 450, y: 170, type: "investigation", connections: ["bad_end_5_a", "bad_end_5_b", "bad_end_5_c"] },
  { id: "bad_end_5_a", label: "Thất bại 5A", shortLabel: "5A", x: 570, y: 140, type: "bad_end", connections: ["node_start"] },
  { id: "bad_end_5_b", label: "Thất bại 5B", shortLabel: "5B", x: 570, y: 170, type: "bad_end", connections: ["node_start"] },
  { id: "bad_end_5_c", label: "Thất bại 5C", shortLabel: "5C", x: 570, y: 200, type: "bad_end", connections: ["node_start"] },
  { id: "bad_end_6", label: "Hầm rượu vang", shortLabel: "Hầm Rượu", x: 570, y: 240, type: "bad_end", connections: ["node_start"] },
  { id: "node_good_end", label: "Trạm Bơm Nước Ngầm", shortLabel: "Trạm Bơm", x: 570, y: 280, type: "good_end", connections: ["node_start"] }
];
