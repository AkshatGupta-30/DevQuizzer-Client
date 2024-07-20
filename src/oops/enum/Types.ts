export enum DifficultyType {
	Easy = "eazy",
	Medium = "medium",
	Hard = "hard",
}

export function getDifficulty(type: string): DifficultyType {
	if (type === "easy") return DifficultyType.Easy
	else if (type === "medium") return DifficultyType.Medium
	return DifficultyType.Hard
}