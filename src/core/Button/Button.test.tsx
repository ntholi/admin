import React from 'react';
import { render } from '@testing-library/react';

import Button from './Button';

describe('Button', () => {
  test('renders', () => {
    render(<Button>Click me</Button>);
  });
});
