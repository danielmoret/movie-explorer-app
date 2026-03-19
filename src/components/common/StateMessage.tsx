import { AlertCircle, SearchX, Info, type LucideIcon } from "lucide-react";
import { Button } from "./Button";

type Variant = "error" | "empty" | "info";

interface StateMessageAction {
  label: string;
  onClick: () => void;
}

interface StateMessageProps {
  variant: Variant;
  message?: string;
  description?: string;
  icon?: LucideIcon;
  action?: StateMessageAction;
}

const variantConfig: Record<
  Variant,
  { icon: LucideIcon; iconColor: string; defaultMessage: string }
> = {
  error: {
    icon: AlertCircle,
    iconColor: "text-red-400",
    defaultMessage: "Something went wrong",
  },
  empty: {
    icon: SearchX,
    iconColor: "text-muted",
    defaultMessage: "No results found",
  },
  info: {
    icon: Info,
    iconColor: "text-accent",
    defaultMessage: "Info",
  },
};

export function StateMessage({
  variant,
  message,
  description,
  icon,
  action,
}: StateMessageProps) {
  const config = variantConfig[variant];
  const Icon = icon ?? config.icon;

  return (
    <div className="flex flex-col items-center gap-3 py-12 text-center">
      <Icon className={`h-10 w-10 ${config.iconColor}`} />
      <p className="text-lg font-medium">{message ?? config.defaultMessage}</p>
      {description && <p className="text-sm text-muted">{description}</p>}
      {action && (
        <Button onClick={action.onClick} className="mt-2">
          {action.label}
        </Button>
      )}
    </div>
  );
}
