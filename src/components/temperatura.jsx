import React from "react";
import { TrendingUp } from "lucide-react";
import { HOST_SERVER } from "@/config";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const Temperatura = () => {
  const [temp,setTemp] = React.useState([]);
  let color = '';
  if(temp > 34 ){
    color='#F54927';
  }else{
    color = "var(--chart-2)";
  } 
  React.useEffect(() => {
    async function fetchData() {
      try {
        const registrosAlmacenados = await fetch(`${HOST_SERVER}/api/esp/traer-datos`).then(respuesta => respuesta.json());
        let datos = registrosAlmacenados.valor;
        datos.map((dato) => {
        // console.log(Object.values(dato.temperatura)[0]);
          setTemp(dato.temperatura);
          // console.log(dato.temperatura);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
    const interval = setInterval(fetchData, 3000); 
    return () => clearInterval(interval);
  }, []);
  // ---- datos para la gráfica ----
  const chartData = [{ month: "january", temperatura: temp, TempeMax: 50-temp }];

  const chartConfig = {
    desktop: {
      label: "TEMPERATURA TOTAL",
      color: "var(--chart-1)",
    },
    mobile: {
      label: "LIMITE MAXIMO",
      color: "var(--chart-2)",
    },
  };
  return (
      <Card className="flex flex-col max-w-sm w-full h-[150px] bg-[#FFFFFF] backdrop-blur-md border border-white/20 shadow-2xl shadow-black/40 ">
        <CardContent className="flex flex-1 items-center pb-0">
          <ChartContainer
            config={chartConfig}
            className="items-center justify-center mx-auto aspect-square w-full max-w-[180px]"
          >
            <RadialBarChart
              data={chartData}
              endAngle={180}
              innerRadius={80}
              outerRadius={130}
            >
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) - 16}
                            className="fill-black text-2xl font-bold"
                          >
                            {temp}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 4}
                            className="fill-black"
                          >
                            Temperatura
                          </tspan>
                        </text>
                      );
                    }
                    return null;
                  }}
                />
              </PolarRadiusAxis>
              <RadialBar
                dataKey="TempeMax"
                fill="var(--chart-1)"
                stackId="a"
                cornerRadius={5}
                className="stroke-transparent stroke-2"
              />
              <RadialBar
                dataKey="temperatura"
                stackId="a"
                cornerRadius={5}
                fill={color}
                className="stroke-transparent stroke-2"
              />
            </RadialBarChart>
          </ChartContainer>
        </CardContent>
      </Card>
  );
}