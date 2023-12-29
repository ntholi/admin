import type { Meta, StoryObj } from '@storybook/react';
import CreateView from './CreateView';
import * as z from 'zod';

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

export const Default: Story = {
  args: {
    schema: FormSchema,
    children: <input name='username' placeholder='This is a Placeholder' />,
  },
};
