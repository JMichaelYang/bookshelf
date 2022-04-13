import { render, screen } from '@testing-library/react';
import Bookshelf from './bookshelf';

test('renders learn react link', () => {
  render(<Bookshelf />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
