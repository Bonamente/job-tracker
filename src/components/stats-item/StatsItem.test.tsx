import { renderWithProviders, screen } from 'src/test/test-utils';
import StatsItem from './StatsItem';

const DATA = {
  count: 10,
  title: 'Title',
  icon: <div>Icon</div>,
  color: 'yellow',
  bgColor: 'green',
};

describe('StatsItem', () => {
  it('renders StatsItem', () => {
    renderWithProviders(<StatsItem {...DATA} />);

    expect(screen.getByRole('heading', { name: /title/i })).toBeInTheDocument();
    expect(screen.getByText(/icon/i)).toBeInTheDocument();
    expect(screen.getByText(/10/i)).toBeInTheDocument();
  });
});
