import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface ProtectionTooltipProps {
  title: string;
  description: string;
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
}

export default function ProtectionTooltip({
  title,
  description,
  children,
  side = "top",
}: ProtectionTooltipProps) {
  return (
    <Tooltip delayDuration={150}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent
        side={side}
        sideOffset={6}
        className="p-0 border-0 shadow-xl"
        style={{ background: "none" }}
      >
        <div
          className="w-64 rounded-xl p-3.5"
          style={{
            background: "oklch(0.14 0.02 250)",
            color: "white",
            boxShadow: "0 12px 32px oklch(0 0 0 / 0.3)",
          }}
        >
          <p className="text-xs font-semibold text-white mb-1">{title}</p>
          <p className="text-[11px] leading-relaxed text-white/65">{description}</p>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
