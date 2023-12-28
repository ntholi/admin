import { ComponentProps } from 'react';

export default function Button({
  children,
  ...rest
}: ComponentProps<'button'>) {
  return (
    <button {...rest} className='text-blue-500 py-2 px-6 border'>
      {children}
    </button>
  );
}
