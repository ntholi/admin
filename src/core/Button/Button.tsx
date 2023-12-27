import React from 'react';
import './Button.css';

type Props = {
  children: React.ReactNode;
};
export default function Button({ children }: Props) {
  return <button className='text-9xl'>{children}</button>;
}
