import type { Meta, StoryObj } from '@storybook/react';
import TwoButton from './TwoButton';

const meta: Meta<typeof TwoButton> = {
  title: 'Components/ButtonsExample',
  component: TwoButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof TwoButton>;

export const Default: Story = {};
