
import React from "react";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  color?: string;
  size?: number;
  className?: string;
  fallback?: string;
}

const Icon = ({ 
  name, 
  color, 
  size = 24, 
  className, 
  fallback = "HelpCircle",
  ...props 
}: IconProps) => {
  const IconComponent = (Icons as any)[name] || (Icons as any)[fallback];

  if (!IconComponent) {
    return null;
  }

  return (
    <IconComponent 
      color={color} 
      size={size} 
      className={cn("shrink-0", className)} 
      {...props} 
    />
  );
};

export default Icon;
