import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { variableNameToLabel as varToLabel } from '@/lib/utils';
import { useState } from 'react';
import { ControllerRenderProps } from 'react-hook-form';

export type ImageInputProps = {
  name: string;
  label?: string;
  placeholder?: string;
  description?: string;
  field?: ControllerRenderProps;
};

export default function ImageInput(props: ImageInputProps) {
  const { label, name, placeholder, field, description } = props;
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <FormItem>
      <FormLabel>{label ?? varToLabel(name)}</FormLabel>
      <FormControl>
        <Input
          type='file'
          accept='image/*'
          placeholder={placeholder}
          {...field}
          onChange={(event) => {
            if (event.target.files?.length) {
              setPreview(URL.createObjectURL(event.target.files[0]));
            }
            field?.onChange(event);
          }}
        />
      </FormControl>
      <div className='size-32 border flex justify-center items-center bg-slate-100'>
        {preview ? (
          <img src={preview} className='w-full h-full object-cover' />
        ) : (
          <span className='text-slate-500'>No Image</span>
        )}
      </div>
      <FormDescription>{description}</FormDescription>
      <FormMessage />
    </FormItem>
  );
}
