'use client';
import { Button } from '@/components/ui/button';

export default function TwoButton() {
  return (
    <button className={'flex gap-3 p-5 border border-red-500'}>
      <Button>Button 1</Button>
      <Button variant={'ghost'}>Button 2</Button>
    </button>
  );
}
