'use client';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';

import { ZodObject, ZodTypeAny } from 'zod';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import * as z from 'zod';
import React from 'react';
import FormWrapper from '../common/FormWrapper';

export type CreateViewProps = {
  schema: ZodObject<{ [K in string | number | symbol]: ZodTypeAny }>;
  children: React.ReactElement;
};

export default function CreateView(props: CreateViewProps) {
  const { schema, children } = props;
  const { toast } = useToast();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: '',
    },
  });

  function onSubmit(data: z.infer<typeof schema>) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form className='p-5 space-y-8' onSubmit={form.handleSubmit(onSubmit)}>
        <FormWrapper form={form}>{children}</FormWrapper>
        <Button>Create</Button>
      </form>
      <Toaster />
    </Form>
  );
}
