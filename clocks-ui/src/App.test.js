import { render, screen } from '@testing-library/react';
import Clock from './Clock';
import moment from 'moment-timezone';

test('renders clock with correct label and time', () => {
  const timezone = 'Europe/London';
  const label = 'London Clock';
  render(<Clock label={label} timezone={timezone} />);
  expect(screen.getByText(label)).toBeInTheDocument();
  const currentTime = moment.tz(timezone).format('HH:mm:ss');
  expect(screen.getByText(currentTime)).toBeInTheDocument();
});