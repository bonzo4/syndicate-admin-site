import { StatsIcon } from "./StatsIcon";

type StatsCardProps = {
  name: string;
  value: number;
  change?: number
}

export function StatsCard({ name, value, change }: StatsCardProps) {
  return (
    <div className="flex flex-col gap-2 p-4 rounded-md">
      <div className="flex flex-row items-center gap-2 ">
        <StatsIcon name={name} className="h-10 w-10"/>
        <h1 className="text-foreground text-2xl font-bold">
          Total {name}
        </h1>
      </div>
      <div className="flex flex-row justify-between space-x-10">
        <h1 className="text-foreground text-2xl font-bold">
          {value}
        </h1>
        {change ?
          change > 0 ? (
            <h1 className="text-xl text-[color:green]">↑{change.toFixed(0)}%</h1>
          ) : (
            <h1 className="text-xl text-[color:red]">↓{change.toFixed(0)}%</h1>
          )
        : null}
      </div>
    </div>

  )
}