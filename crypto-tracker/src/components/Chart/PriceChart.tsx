import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  Tooltip,
} from "chart.js";
import {
  CandlestickController,
  CandlestickElement,
} from "chartjs-chart-financial";
import "chartjs-adapter-date-fns";

import { Chart } from "react-chartjs-2";
import { useEffect, useState } from "react";

ChartJS.register(
  TimeScale,
  LinearScale,
  Tooltip,
  CandlestickController,
  CandlestickElement
);

interface Candle {
  x: number;
  o: number;
  h: number;
  l: number;
  c: number;
}

function mapToApiSymbol(symbol: string) {
  return symbol.replace("USD", "USDT");
}

export default function PriceChart({ symbol }: { symbol: string }) {
  const [candles, setCandles] = useState<Candle[]>([]);

  useEffect(() => {
    async function fetchCandles() {
      try {
        const now = Math.floor(Date.now() / 1000);
        const past = now - 60 * 60;

        const apiSymbol = mapToApiSymbol(symbol);

        const res = await fetch(
            `https://api.delta.exchange/v2/history/candles?symbol=${apiSymbol}&resolution=1m&start=${past}&end=${now}`
        );

        const json = await res.json();

        const raw = json?.result || [];

        const formatted: Candle[] = raw.map((c: any) => ({
        x: c.time * 1000, // convert seconds → milliseconds
        o: Number(c.open),
        h: Number(c.high),
        l: Number(c.low),
        c: Number(c.close),
        }));

        setCandles(formatted.slice(-30));
      } catch (err) {
        console.error("Chart fetch error", err);
      }
    }

    fetchCandles();
  }, [symbol]);

  const data = {
    datasets: [
      {
        label: "Price",
        data: candles,
      },
    ],
  };

    const options: any = {
        responsive: true,
        maintainAspectRatio: false, 
        animation: false,

        layout: {
            padding: 0, 
        },

        plugins: {
            legend: { display: false },
        },

        scales: {
            x: {
                type: "time",
                display: false,
                grid: {
                    display: false,
                },
            },
            y: {
                display: true,
                position: "right", 
                grid: {
                    color: "#eee",
                },
                ticks: {
                    maxTicksLimit: 4,
                    padding: 4,
                },
            },
        },
    };

  return (
        <div style={{ width: "100%", height: "100%" }}>
            <Chart
                type="candlestick"
                data={data}
                options={options}
                style={{ width: "100%", height: "100%" }} 
            />
        </div>
    );
}