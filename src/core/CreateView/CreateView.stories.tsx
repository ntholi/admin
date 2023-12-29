import type { Meta, StoryObj } from '@storybook/react';
import CreateView from './CreateView';
import * as z from 'zod';
import { FakeRepository } from '@/repository/FakeRepository';
import FileInput from '../common/FileInput';

const meta: Meta<typeof CreateView> = {
  title: 'Core/CreateView',
  component: CreateView,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof CreateView>;

const FormSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
});

const repository = new FakeRepository();

export const Default: Story = {
  args: {
    schema: FormSchema,
    repository,
    children: (
      <FileInput
        name='username'
        description='This is a description'
        placeholder='This is a Placeholder'
      />
    ),
  },
};
