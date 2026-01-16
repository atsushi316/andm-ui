/**
 * @description アイコンデータと型定義
 * src/assets/icons/*.ts から動的に読み込む
 */

// アイコンファイルを動的に読み込む
const iconModules = import.meta.glob<{ pathData: string | string[] }>(
  "./icons/*.ts",
  { eager: true }
);

// ファイル名からアイコン名を抽出
function getIconName(path: string): string {
  return path.match(/\/([^/]+)\.ts$/)?.[1] ?? "";
}

// アイコンデータを構築
const iconsMap: Record<string, string | string[]> = {};

for (const path in iconModules) {
  const module = iconModules[path];
  const iconName = getIconName(path);
  if (iconName && module?.pathData) {
    iconsMap[iconName] = module.pathData;
  }
}

// 型定義（動的に生成されたアイコン名から推論）
export type IconName = keyof typeof iconsMap;

// アイコンデータ（型安全）
export const icons = iconsMap as Record<IconName, string | string[]>;

// アイコン名の配列
export const iconNames = Object.keys(icons) as IconName[];

// アイコンが存在するかチェック（型ガード）
export const isValidIconName = (name: string): name is IconName => {
  return name in icons;
};
