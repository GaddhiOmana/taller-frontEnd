import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { SentimentResponse } from "../type";

const COLORS = ["#22C55E", "#EF4444", "#3B82F6"]; // Verde, Rojo, Azul

export default function SentimentChart() {
  const { data } = useQuery({
    queryKey: ["sentiments"],
    queryFn: async () => {
      const res = await axios.get<SentimentResponse>(
        "http://localhost:3010/sentiments"
      );
      return res.data;
    },
  });

  if (!data) return <p className="text-center text-gray-600">Cargando...</p>;

  const countSentiments = (type: string) =>
    data.filter((s: any) => s.sentiment === type).length;

  const chartData = [
    { name: "Positivo", value: countSentiments("positivo") },
    { name: "Negativo", value: countSentiments("negativo") },
    { name: "Neutral", value: countSentiments("neutral") },
  ];

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
      {/* Barra superior */}
      <div className="bg-gray-800 text-white py-3 px-4 rounded-t-lg">
        <h2 className="text-2xl font-bold text-center">
          📊 Análisis de Sentimientos
        </h2>
      </div>

      {/* Gráfico */}
      <div className="flex justify-center mt-4">
        <PieChart width={360} height={300}>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={90}
            innerRadius={40} // Hace un gráfico tipo "donut"
            paddingAngle={5} // Espaciado entre secciones
          >
            {chartData.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
}
