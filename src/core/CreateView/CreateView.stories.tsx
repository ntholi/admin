import type { Meta, StoryObj } from '@storybook/react';
import CreateView from './CreateView';
import * as z from 'zod';
import { FakeRepository } from '@/repository/FakeRepository';
import ImageInput from '../common/ImageInput';

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
  file: z.any(),
});

const repository = new FakeRepository();

export const Default: Story = {
  args: {
    schema: FormSchema,
    repository,
    children: <ImageInput name='file' label='Image' />,
  },
};
