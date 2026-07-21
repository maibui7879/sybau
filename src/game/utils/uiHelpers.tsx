import { GameNode } from "../../types";

export const defaultImageUrl = new URL("../../default_image.jpeg", import.meta.url).href;
export const coverImageUrl = new URL("../../cover.jpg", import.meta.url).href;

const roleLabels: Record<string, { displayName: string; subtitle: string }> = {
  "Sếp": {
    displayName: "Mỹ Nghệ",
    subtitle: "Sếp"
  },
  "Người bán đá bào": {
    displayName: "Nghệ Chopper",
    subtitle: "Thợ làm đá bào"
  },
  "Thợ cơ khí": {
    displayName: "Nghệ Chad",
    subtitle: "Thợ cơ khí"
  },
  "Biên tập viên": {
    displayName: "Nghệgamind",
    subtitle: "Biên tập viên"
  }
};

export const getRoleAsset = (currentNode: GameNode) => {
  const roleLabel = roleLabels[currentNode.characterName];

  return {
    displayName: roleLabel?.displayName || currentNode.characterName,
    subtitle: roleLabel?.subtitle || currentNode.characterName,
    avatarUrl: currentNode.characterImage || defaultImageUrl,
    optionUrl: currentNode.characterImage || defaultImageUrl
  };
};

export const getPortraitStyling = (charName: string) => {
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

const cluePatterns = [
  "Đá Tan",
  "IQ siêu phàm",
  "Gột rửa",
  "Sáng tỏ"
];

export const highlightClues = (text: string) => {
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
