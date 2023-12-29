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
          return <RenderTextInput {...child.props} form={form} />;
        }
        return child;
      })}
    </>
  );
}

function RenderTextInput(props: TextInputProps & { form: UseFormReturn }) {
  const { name, placeholder, label, description, form } = props;
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
