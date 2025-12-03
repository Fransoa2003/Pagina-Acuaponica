import React from "react";
import { TrendingUp } from "lucide-react";
import { HOST_SERVER } from "@/config"; // Tu configuración original
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
  const [temp, setTemp] = React.useState(0);
  
  // Color rojo si es > 34, gris si es normal
  const color = temp > 34 ? '#F54927' : "var(--chart-2)";

  // Función para reportar al Backend
  async function enviarAlerta(valor) {
    try {
      // Enviamos el dato SIEMPRE.
      await fetch(`${HOST_SERVER}/api/email/send-alert`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ temperatura: valor })
      });
    } catch (error) {
      console.error("Error reportando temperatura:", error);
    }
  }

  React.useEffect(() => {
    async function fetchData() {
      try {
        const respuesta = await fetch(`${HOST_SERVER}/api/esp/traer-datos`);
        
        // Si hay error de red, paramos aquí para no romper el código
        if (!respuesta.ok) return;

        const dataJson = await respuesta.json();
        const datos = dataJson.valor;
        
        if (datos && Array.isArray(datos) && datos.length > 0) {
           // Tomamos el último dato
           const ultimoDato = datos[datos.length - 1];
           const valorTemp = Number(ultimoDato.temperatura);

           if (!isNaN(valorTemp)) {
             setTemp(valorTemp);
             
             // IMPORTANTE: Llamamos a la función SIEMPRE.
             enviarAlerta(valorTemp);
           }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData(); // Ejecutar inmediatamente
    const interval = setInterval(fetchData, 3000); // Repetir cada 3s
    return () => clearInterval(interval);
  }, []);

  // Configuración de la gráfica
  const chartData = [{ month: "actual", temperatura: temp, TempeMax: 50 - temp }];

  const chartConfig = {
    desktop: {
      label: "Temperatura",
      color: "var(--chart-1)",
    },
    mobile: {
      label: "Máximo",
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
                            {temp}°
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