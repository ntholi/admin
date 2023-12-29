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
import FormComponent from '../common/FormComponent';
import { Repository, Resource } from '@/repository';

export type CreateViewProps<T extends Resource> = {
  schema: ZodObject<{ [K in string | number | symbol]: ZodTypeAny }>;
  children: React.ReactElement;
  repository?: Repository<T>;
};

function CreateView<T extends Resource>(props: CreateViewProps<T>) {
  const { schema, repository, children } = props;
  const { toast } = useToast();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: '',
    },
  });

  function onSubmit(data: z.infer<typeof schema>) {
    console.log(data);
    repository?.create(data as T);
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
        <FormComponent form={form}>{children}</FormComponent>
        <Button>Create</Button>
      </form>
      <Toaster />
    </Form>
  );
}

export default CreateView;
