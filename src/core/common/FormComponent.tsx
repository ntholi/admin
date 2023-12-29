import React from 'react';
import TextInput, { TextInputProps } from './TextInput';
import { FormField } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import ImageInput, { ImageInputProps } from './ImageInput';

type FormComponentProps = {
  children: React.ReactElement;
  form: UseFormReturn;
};
export default function FormComponent({ children, form }: FormComponentProps) {
  return (
    <>
      {React.Children.map(children, (child: React.ReactNode) => {
        if (!React.isValidElement(child)) return child;
        if (child.type == TextInput) {
          return <RenderTextInput {...child.props} form={form} />;
        } else if (child.type == ImageInput) {
          return <RenderImageInput {...child.props} form={form} />;
        }
        console.warn('FormComponent: Invalid child type, type: ', child.type);
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

function RenderImageInput(props: ImageInputProps & { form: UseFormReturn }) {
  const { name, placeholder, label, description, form } = props;
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <ImageInput
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
