'use client';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';

import { ZodObject, ZodTypeAny } from 'zod';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import * as z from 'zod';
import React, { ReactElement } from 'react';

export type CreateViewProps = {
  schema: ZodObject<{ [K in string | number | symbol]: ZodTypeAny }>;
  children: ReactElement<HTMLFormElement> | ReactElement<HTMLFormElement>[];
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
        {React.Children.map(children, (child: React.ReactNode) => {
          if (!React.isValidElement(child)) return child;
          if (child.type == 'input') {
            const { name, placeholder } = child.props;
            return (
              <FormField
                control={form.control}
                name={name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{name}</FormLabel>
                    <FormControl>
                      <Input placeholder='shadcn' {...field} />
                    </FormControl>
                    <FormDescription>{placeholder}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          }
          return child;
        })}

        <Button>Create</Button>
      </form>
      <Toaster />
    </Form>
  );
}
