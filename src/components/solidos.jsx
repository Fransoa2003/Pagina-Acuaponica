import React from "react";
import { TrendingUp } from "lucide-react";
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
    // ---- datos para la gráfica ----
    const chartData = [{ month: "january", desktop: 1260, mobile: 570 }];

    const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "var(--chart-1)",
    },
    mobile: {
        label: "Mobile",
        color: "var(--chart-2)",
    },
    };

    const totalVisitors = chartData[0].desktop + chartData[0].mobile;

    // ---- render ----
    return (
        <Card className="flex flex-col max-w-sm w-full h-[150px] bg-[#287b60] backdrop-blur-md border border-white/20 shadow-2xl shadow-black/40 ">
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
                            className="fill-white text-2xl font-bold"
                            >
                            {/* {totalVisitors.toLocaleString()} */}
                            500
                            </tspan>
                            <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 4}
                            className="fill-white"
                            >
                            Solidos Disueltos
                            </tspan>
                            <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 20}
                            className="fill-white text-sm"
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
                <RadialBar
                dataKey="desktop"
                stackId="a"
                cornerRadius={5}
                fill="var(--chart-1)"
                className="stroke-transparent stroke-2"
                />
                <RadialBar
                dataKey="mobile"
                fill="var(--chart-2)"
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