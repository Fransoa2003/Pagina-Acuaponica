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
// ... imports ...

export const Conductividad = () => {
  const [condu, setCondu] = React.useState(0);
  
  // Determinamos el color basado en el estado actual
  const color = condu > 200 ? '#F54927' : "var(--chart-2)";

  async function enviarAlerta(valor) {
    try {
      // Nota la URL corregida
      await fetch(`${HOST_SERVER}/api/email/send-alert`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conductividad: valor })
      });
    } catch (error) {
      console.error("Error enviando alerta:", error);
    }
  }

  React.useEffect(() => {
    async function fetchData() {
      try {
        const respuesta = await fetch(`${HOST_SERVER}/api/esp/traer-datos`);
        const dataJson = await respuesta.json();
        
        // Asumiendo que 'valor' es un array, tomamos el ÚLTIMO dato (el más reciente)
        // Si tu API devuelve los datos al revés (el 0 es el más reciente), usa datos[0]
        const datos = dataJson.valor;
        
        if (datos && datos.length > 0) {
            // Tomamos el último registro ingresado
            const ultimoDato = datos[datos.length - 1]; 
            const valorConductividad = Number(ultimoDato.conductividad);

            setCondu(valorConductividad);

            // Solo intentamos enviar la alerta con el dato más reciente
            
            enviarAlerta(valorConductividad); 
        }

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);
  const chartData = [{ month: "january", conductividad: condu, conductividadMax: 800-condu }];

  const chartConfig = {
    desktop: {
      label: "conductividad",
      color: "var(--chart-1)",
    },
    mobile: {
      label: "conductividadMax",
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
                              {condu}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 4}
                            className="fill-BLACK"
                          >
                            Conductividad
                          </tspan>
                          <tspan
                            // sube o baja según necesites
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 20}
                            className="fill-black"
                          >
                            mS/cm
                          </tspan>
                      </text>
                    );
                  }
                  return null;
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="conductividadMax"
              stackId="a"
              cornerRadius={5}
              fill="var(--chart-1)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="conductividad"
              fill={color}
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}