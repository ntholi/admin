'use client';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';

import { ZodObject, ZodTypeAny } from 'zod';
import { Button } from '@/components/ui/button';
import { Resource, Repository } from '@/repository';
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

export type CreateViewProps<T extends Resource> = {
  schema?: ZodObject<{ [K in string | number | symbol]: ZodTypeAny }>;
  repository: Repository<T>;
};

const FormSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
});

export default function CreateView() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
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
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder='shadcn' {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button>Create</Button>
      </form>
      <Toaster />
    </Form>
  );
}
