import React from "react";
import { TrendingUp } from "lucide-react";
import { HOST_SERVER } from "@/config"; // Asegúrate de que esta ruta sea correcta
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

export const Solidos = () => {
  // 1. Inicializamos en 0 (número), no en array vacío, para evitar errores en la resta
  const [solid, setSolid] = React.useState(0);
  
  // Límite visual: Si pasa de 699 se pone rojo (según tu código anterior)
  const color = solid > 699 ? '#F54927' : "var(--chart-2)";

  // --- FUNCIÓN PARA ENVIAR AL BACKEND ---
  async function enviarAlerta(valor) {
    try {
      // Enviamos el valor al backend siempre.
      // El backend decidirá si es alerta (si sube) o reset (si baja).
      await fetch(`${HOST_SERVER}/api/email/send-alert`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Enviamos la clave 'solidos' que es la que espera tu ruta
        body: JSON.stringify({ solidos: valor })
      });
    } catch (error) {
      console.error("Error reportando sólidos:", error);
    }
  }

  React.useEffect(() => {
    async function fetchData() {
      try {
        const respuesta = await fetch(`${HOST_SERVER}/api/esp/traer-datos`);
        if (!respuesta.ok) return;

        const dataJson = await respuesta.json();
        const datos = dataJson.valor;

        // Validamos que existan datos
        if (datos && Array.isArray(datos) && datos.length > 0) {
           // 2. Tomamos solo el último dato (el más reciente)
           const ultimoDato = datos[datos.length - 1];
           
           // Usamos el campo específico de tu base de datos: 'solidosdisueltos'
           const valorSolidos = Number(ultimoDato.solidosdisueltos);

           if (!isNaN(valorSolidos)) {
             setSolid(valorSolidos);
             
             // 3. Enviamos el dato al backend para gestionar la alerta
             enviarAlerta(valorSolidos);
           }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData(); // Ejecutar inmediatamente al cargar
    const interval = setInterval(fetchData, 3000); // Repetir cada 3s
    return () => clearInterval(interval);
  }, []);

  // Configuración de la gráfica
  // Usamos 900 como máximo visual
  // Math.max(0, ...) evita que la gráfica se rompa si el valor supera 900
  const chartData = [{ month: "actual", ppm: solid, ppmMax: Math.max(0, 900 - solid) }];

  const chartConfig = {
    desktop: {
      label: "ppm",
      color: "var(--chart-1)",
    },
    mobile: {
      label: "ppmMax",
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
                            {solid}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 4}
                            className="fill-black"
                          >
                            Sólidos Disueltos
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 20}
                            className="fill-black text-sm"
                          >
                            ppm
                          </tspan>
                      </text>
                    );
                  }
                  return null;
                }}
              />
            </PolarRadiusAxis>
            
            {/* Barra de fondo (Gris) */}
            <RadialBar
              dataKey="ppmMax"
              stackId="a"
              cornerRadius={5}
              fill="var(--chart-1)" // Color gris definido en CSS variable
              className="stroke-transparent stroke-2"
            />
            
            {/* Barra de valor (Dinámica: Roja o normal) */}
            <RadialBar
              dataKey="ppm"
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