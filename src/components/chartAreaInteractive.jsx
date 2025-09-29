import React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
// Generar datos dinámicos para los últimos 90 días
const chartData = Array.from({ length: 90 }).map((_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (89 - i)); 
  return {
    date: date.toISOString().slice(0, 10),
    desktop: Math.floor(Math.random() * 500 + 50), 
    mobile: Math.floor(Math.random() * 400 + 50),  
  };
});

// Configuración de colores
const chartConfig = {
  desktop: { label: "Calidad del agua", color: "var(--chart-3)" },
};

export function ChartAreaInteractive() {
  const [timeRange, setTimeRange] = React.useState("90d");

  // Filtra los datos según el rango de días seleccionado
  const filteredData = React.useMemo(() => {
    const referenceDate = new Date();
    let daysToSubtract = timeRange === "30d" ? 30 : timeRange === "7d" ? 7 : 90;
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return chartData.filter((item) => new Date(item.date) >= startDate);
  }, [timeRange]);

  return (
    <Card className="flex flex-col w-full bg-[#FFFFFF]-80 backdrop-blur-md border border-white/20 shadow-2xl shadow-black/40 p-6">
      <Card className="pt-0">
        <CardHeader className="flex items-center gap-2 border-b py-5 sm:flex-row">
          <div className="flex-1">
            <CardTitle>Grafica Interactiva</CardTitle>
            <CardDescription>
              Periodo de la calidad del agua
            </CardDescription>
          </div>
          {/* Selector para cambiar la gráfica */}
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="ml-auto rounded-lg border px-2 py-1"
          >
            <option value="7d">Ultimos 7 dias</option>
            <option value="30d">Ultimos 30 dias</option>
            <option value="90d">Ultimos 3 meses</option>
          </select>
        </CardHeader>
        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <AreaChart data={filteredData} width={600} height={250}>
              <defs>
                <linearGradient id={`fillDesktop-${timeRange}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="50%" stopColor="var(--chart-3)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0.1} />
                </linearGradient> 
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) =>
                  new Date(value).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                }
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) =>
                      new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    }
                    indicator="dot"
                  />
                }
              />
              <Area
                dataKey="desktop"
                type="natural"
                fill={`url(#fillDesktop-${timeRange})`}
                stroke="var(--chart-3)"
                stackId="a"
              />
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </Card>
  );
}
