import { GameNode } from "../../types";
import storyData from "../../storyConfig.json";

export const GAME_START_NODE = "node_start";
export const storyConfig = storyData as Record<string, GameNode>;

export const nodesList = [
  { id: "node_start", label: "Nhận nhiệm vụ từ Sếp", shortLabel: "Bắt đầu", x: 50, y: 150, type: "start", connections: ["node_l1_mechanic", "node_l1_press", "node_l1_clockmaker"] },
  { id: "node_l1_mechanic", label: "Gặp Thợ cơ khí", shortLabel: "Cơ khí", x: 170, y: 70, type: "investigation", connections: ["node_l2_mechanic_trap", "node_start", "bad_end_1_c"] },
  { id: "node_l2_mechanic_trap", label: "Rơi vào bẫy gầm máy", shortLabel: "Bẫy máy", x: 320, y: 50, type: "investigation", connections: ["bad_end_1_a", "bad_end_1_b", "bad_end_1_d"] },
  { id: "bad_end_1_a", label: "Cờ lê trượt", shortLabel: "Trượt", x: 450, y: 20, type: "bad_end", connections: ["node_start"] },
  { id: "bad_end_1_b", label: "Làm đến tối muộn", shortLabel: "Muộn", x: 450, y: 60, type: "bad_end", connections: ["node_start"] },
  { id: "bad_end_1_c", label: "Bị mỏ lết đánh", shortLabel: "Đánh", x: 300, y: 130, type: "bad_end", connections: ["node_start"] },
  { id: "bad_end_1_d", label: "Giả ngất trốn thoát", shortLabel: "Ngất", x: 450, y: 100, type: "bad_end", connections: ["node_start"] },
  { id: "node_l1_press", label: "Gặp Biên tập viên", shortLabel: "BTV", x: 170, y: 150, type: "investigation", connections: ["node_l2_press_riot", "node_start", "bad_end_2_c"] },
  { id: "node_l2_press_riot", label: "Dẫn đám đông lên Tháp Đồng hồ", shortLabel: "Đám đông", x: 330, y: 150, type: "investigation", connections: ["bad_end_2_a", "bad_end_2_b", "bad_end_2_d"] },
  { id: "bad_end_2_a", label: "Bị còng tay", shortLabel: "Còng tay", x: 450, y: 120, type: "bad_end", connections: ["node_start"] },
  { id: "bad_end_2_b", label: "Bị giẫm đạp", shortLabel: "Giẫm", x: 450, y: 150, type: "bad_end", connections: ["node_start"] },
  { id: "bad_end_2_c", label: "Bị Biên tập viên sút", shortLabel: "Sút", x: 300, y: 190, type: "bad_end", connections: ["node_start"] },
  { id: "bad_end_2_d", label: "Bị hốt vì livestream", shortLabel: "Hốt", x: 450, y: 180, type: "bad_end", connections: ["node_start"] },
  { id: "node_l1_clockmaker", label: "Gặp Người bán đá bào", shortLabel: "Đá Tan", x: 170, y: 240, type: "investigation", connections: ["node_l2_sybau_trap", "bad_end_4", "node_l2_void"] },
  { id: "node_l2_sybau_trap", label: "Mở hộp số 1", shortLabel: "Hộp 1", x: 320, y: 240, type: "investigation", connections: ["bad_end_3", "bad_end_3_b", "bad_end_3_c"] },
  { id: "bad_end_3", label: "Bị cười Sybau", shortLabel: "Cười", x: 450, y: 200, type: "bad_end", connections: ["node_start"] },
  { id: "bad_end_3_b", label: "Bị sút bay", shortLabel: "Sút", x: 450, y: 240, type: "bad_end", connections: ["node_start"] },
  { id: "bad_end_3_c", label: "Bị ném đá bào", shortLabel: "Ném", x: 450, y: 280, type: "bad_end", connections: ["node_start"] },
  { id: "bad_end_4", label: "Mở hộp sai", shortLabel: "Sai", x: 300, y: 280, type: "bad_end", connections: ["node_start"] },
  { id: "node_l2_void", label: "Tìm bản đồ ngầm", shortLabel: "Bản đồ", x: 330, y: 310, type: "investigation", connections: ["node_l3_clocktower_trap", "bad_end_6", "node_good_end"] },
  { id: "node_l3_clocktower_trap", label: "Leo tới đỉnh tháp", shortLabel: "Tháp", x: 450, y: 170, type: "investigation", connections: ["bad_end_5_a", "bad_end_5_b", "bad_end_5_c"] },
  { id: "bad_end_5_a", label: "Bị bóc phốt cosplay", shortLabel: "Phốt", x: 570, y: 140, type: "bad_end", connections: ["node_start"] },
  { id: "bad_end_5_b", label: "Vali vô tận", shortLabel: "Vali", x: 570, y: 170, type: "bad_end", connections: ["node_start"] },
  { id: "bad_end_5_c", label: "Bị đấm vô hình", shortLabel: "Stand", x: 570, y: 200, type: "bad_end", connections: ["node_start"] },
  { id: "bad_end_6", label: "Bị solo hầm rượu", shortLabel: "Solo", x: 570, y: 240, type: "bad_end", connections: ["node_start"] },
  { id: "node_good_end", label: "Tới Trạm Bơm Nước Ngầm", shortLabel: "Thành công", x: 570, y: 280, type: "good_end", connections: ["node_start"] }
];
