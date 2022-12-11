import { renderWithProviders, screen } from 'src/test/test-utils';
import JobInfo from './JobInfo';

describe('JobInfo', () => {
  it('renders JobInfo component', () => {
    renderWithProviders(<JobInfo icon={<div>Icon</div>} text="Text" />);

    expect(screen.getByText(/icon/i)).toBeInTheDocument();
    expect(screen.getByText(/text/i)).toBeInTheDocument();
  });
});
