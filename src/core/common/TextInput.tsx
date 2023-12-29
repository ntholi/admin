import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { variableNameToLabel as varToLabel } from '@/lib/utils';
import { ControllerRenderProps } from 'react-hook-form';

export type TextInputProps = {
  name: string;
  label?: string;
  placeholder?: string;
  description?: string;
  field?: ControllerRenderProps;
};

export default function TextInput(props: TextInputProps) {
  const { label, name, placeholder, field, description } = props;
  return (
    <FormItem>
      <FormLabel>{label ?? varToLabel(name)}</FormLabel>
      <FormControl>
        <Input placeholder={placeholder} {...field} />
      </FormControl>
      <FormDescription>{description}</FormDescription>
      <FormMessage />
    </FormItem>
  );
}
