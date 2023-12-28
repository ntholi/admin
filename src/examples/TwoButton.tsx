import { Button } from '@/components';

export default function TwoButton() {
  return (
    <button className={'flex gap-3 p-5 border border-red-500'}>
      <Button variant='primary' size='md'>
        One
      </Button>
      <Button variant='secondary' size='md'>
        Two
      </Button>
    </button>
  );
}
