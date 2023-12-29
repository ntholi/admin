import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { variableNameToLabel } from '@/lib/utils';
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
  const fieldLabel = label ?? variableNameToLabel(name);
  return (
    <FormItem>
      <FormLabel>{fieldLabel}</FormLabel>
      <FormControl>
        <Input placeholder={placeholder} {...field} />
      </FormControl>
      <FormDescription>{description}</FormDescription>
      <FormMessage />
    </FormItem>
  );
}
