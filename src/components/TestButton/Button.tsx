import { ComponentProps, forwardRef } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonStyles = cva(
  [
    'w-full',
    'rounded-md',
    'font-semibold',
    'focus:outline-none',
    'disabled:no-cursor',
  ],
  {
    variants: {
      variant: {
        primary: ['bg-blue-500', 'hover:bg-blue-600', 'text-white'],
        secondary: ['bg-gray-200', 'hover:bg-gray-300', 'text-gray-700'],
      },
      size: {
        sm: ['py-1', 'px-4', 'text-sm'],
        md: ['py-2', 'px-6', 'text-base'],
        lg: ['py-3', 'px-8', 'text-lg'],
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

type ButtonProps = ComponentProps<'button'> & VariantProps<typeof buttonStyles>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant, size, className, ...rest }, ref) => (
    <button
      {...rest}
      ref={ref}
      className={cn(buttonStyles({ variant, size, className }))}
    >
      {children}
    </button>
  )
);

export default Button;
