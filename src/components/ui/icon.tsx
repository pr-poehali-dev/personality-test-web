
import React from 'react';
import * as LucideIcons from 'lucide-react';

interface IconProps {
  name: string;
  size?: number;
  className?: string;
  fallback?: string;
}

const Icon: React.FC<IconProps> = ({ name, size = 24, className = "", fallback = "CircleAlert" }) => {
  // Получаем компонент иконки из Lucide
  const IconComponent = (LucideIcons as any)[name] || (LucideIcons as any)[fallback];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found and fallback "${fallback}" also not found.`);
    return <div className={`inline-block ${className}`} style={{ width: size, height: size }} />;
  }
  
  return <IconComponent size={size} className={className} />;
};

export default Icon;
