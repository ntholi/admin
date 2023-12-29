import type { Meta, StoryObj } from '@storybook/react';
import CreateView from './CreateView';

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

export const Default: Story = {};
