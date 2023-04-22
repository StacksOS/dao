import * as React from 'react';
import { VariantProps } from 'class-variance-authority';
declare const buttonVariants: (props?: ({
    variant?: "default" | "outline" | "link" | "destructive" | "secondary" | "ghost" | null | undefined;
    size?: "default" | "sm" | "lg" | null | undefined;
} & import("class-variance-authority/dist/types").ClassProp) | undefined) => string;
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
}
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
export { Button, buttonVariants };
