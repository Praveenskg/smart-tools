import Home from '@/app/page';
import { render, screen } from '@testing-library/react';

// Mock Next.js components
const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => {
  return <a href={href}>{children}</a>;
};
MockLink.displayName = 'MockLink';

jest.mock('next/link', () => MockLink);

describe('Home Page', () => {
  it('renders without crashing', () => {
    render(<Home />);
    expect(screen.getByText(/Smart Tools/i)).toBeInTheDocument();
  });

  it('displays the main heading', () => {
    render(<Home />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
  });
});

// Example utility function test
describe('Utility Functions', () => {
  it('should validate email correctly', () => {
    // This is a placeholder test - you can add actual utility function tests here
    const isValidEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    expect(isValidEmail('test@example.com')).toBe(true);
    expect(isValidEmail('invalid-email')).toBe(false);
    expect(isValidEmail('')).toBe(false);
  });
});
