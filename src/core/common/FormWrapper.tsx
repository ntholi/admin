import React from 'react';
import TextInput, { TextInputProps } from './TextInput';
import { FormField } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';

type FormWrapperProps = {
  children: React.ReactElement;
  form: UseFormReturn;
};
export default function FormWrapper({ children, form }: FormWrapperProps) {
  return (
    <>
      {React.Children.map(children, (child: React.ReactNode) => {
        if (!React.isValidElement(child)) return child;
        if (child.type == TextInput) {
          const { name, placeholder, label, description } =
            child.props as TextInputProps;
          return (
            <FormField
              control={form.control}
              name={name}
              render={({ field }) => (
                <TextInput
                  field={field}
                  name={name}
                  label={label}
                  placeholder={placeholder}
                  description={description}
                />
              )}
            />
          );
        }
        return child;
      })}
    </>
  );
}
