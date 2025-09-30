import * as React from "react";
import Container from "./Container";
import clsx from "clsx";

type Props = React.HTMLAttributes<HTMLElement> & {
  as?: keyof JSX.IntrinsicElements;
  variant?: 'default' | 'card' | 'elevated';
  gradient?: 'primary' | 'secondary' | 'accent' | 'dark' | 'none';
  muted?: boolean;
  noPadding?: boolean;
  fullWidth?: boolean;
};

export default function Section({ 
  as: Tag = "section", 
  variant = 'default',
  gradient = 'none',
  muted,
  noPadding,
  fullWidth,
  className, 
  children,
  style,
  ...rest
}: Props) {
  const variants = {
    default: "",
    card: "bg-background rounded-2xl shadow-sm border border-muted/10",
    elevated: "bg-background rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
  };

  const baseStyles = clsx(
    // Base styles
    "relative",
    !noPadding && "py-12 md:py-16",
    
    // Background variants
    muted && "bg-muted/5",
    variants[variant],
    
    // Gradient variants
    gradient !== 'none' && `gradient-${gradient}`,

    // Container styles
    fullWidth ? "px-4 sm:px-6 lg:px-8" : undefined,
    
    // Custom classes
    className
  );

  const content = fullWidth ? (
    children
  ) : (
    <Container>{children}</Container>
  );

  const backgroundGradients = {
    primary: 'linear-gradient(to bottom, #161c2e, #1a2135)',
    secondary: 'linear-gradient(to bottom, #1e2a42, #162038)',
    accent: 'linear-gradient(to bottom, #22304a, #1a2135)',
    dark: 'linear-gradient(to bottom, #0f1219, #161c2e)',
  };

  const backgroundStyle =
    gradient !== 'none'
      ? { background: backgroundGradients[gradient] }
      : undefined;

  return (
    <Tag className={baseStyles} style={{ ...style, ...backgroundStyle }}>
      {content}
    </Tag>
  );
}
