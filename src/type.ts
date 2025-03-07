export interface SentimentAnalysis {
  id: number;
  sentiment: "positivo" | "negativo" | "neutral";
  text: string;
}

export interface Sentiment {
  sentiment: "positivo" | "negativo" | "neutral";
  text: string;
}

export type SentimentResponse = SentimentAnalysis[]; // Un array de resultados
