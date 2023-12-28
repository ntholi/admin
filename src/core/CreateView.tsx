'use client';

import React, { PropsWithChildren } from 'react';
import { ZodObject, ZodTypeAny } from 'zod';
import { useQueryState } from 'next-usequerystate';
import { Button } from '@/components/ui/button';
import { Resource, Repository } from '@/repository';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export type CreateViewProps<T extends Resource> = {
  schema?: ZodObject<{ [K in string | number | symbol]: ZodTypeAny }>;
  repository: Repository<T>;
};

export default function CreateView<T extends Resource>(
  props: PropsWithChildren<CreateViewProps<T>>
) {
  const { children, schema, repository } = props;
  const form = useForm<T>({
    resolver: schema && zodResolver(schema),
  });
  const [__, setView] = useQueryState('view');
  const [_, setId] = useQueryState('id');

  const handleSubmit = async (values: T) => {
    if (repository) {
      const res = await repository.create(values);
      setView(null);
      setId(res.id);
    }
  };

  return (
    <form className='p-5' onSubmit={form.handleSubmit(handleSubmit)}>
      {React.Children.map(children, (child: React.ReactNode) => {
        if (!React.isValidElement(child)) return child;
        return React.cloneElement(child as React.ReactElement, {
          ...child.props,
          ...form.getInputProps(child.props.name),
          repository,
        });
      })}
      <Button>Create</Button>
    </form>
  );
}
