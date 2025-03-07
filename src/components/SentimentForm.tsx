import { useState } from "react";
import axios from "axios";

import { Sentiment } from "../type";
export default function SentimentForm() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const analyzeSentiment = async () => {
    const res = await axios.post<Sentiment>(
      "http://localhost:3010/analyze-sentiment",
      {
        text,
      }
    );
    setResult(res.data.sentiment);
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <textarea
        className="w-full p-2 border rounded"
        placeholder="Escribe un comentario..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="mt-2 w-full px-4 py-2 bg-blue-500 text-white rounded"
        onClick={analyzeSentiment}
      >
        Analizar Sentimiento
      </button>
      {result && (
        <div
          className={`mt-4 p-4 text-white rounded ${
            result === "positivo"
              ? "bg-green-500"
              : result === "negativo"
              ? "bg-red-500"
              : "bg-gray-500"
          }`}
        >
          Sentimiento: {result.toUpperCase()}
        </div>
      )}
    </div>
  );
}
