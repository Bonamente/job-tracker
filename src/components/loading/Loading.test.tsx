import { renderWithProviders } from 'src/test/test-utils';
import Loading from './Loading';

describe('Loading', () => {
  it('renders Loading component', () => {
    const { container } = renderWithProviders(<Loading />);

    expect(container.getElementsByClassName('loading')[0]).toBeInTheDocument();
  });

  it('renders Loading component when pass prop', () => {
    const { container } = renderWithProviders(<Loading center />);

    expect(
      container.getElementsByClassName('loading-center')[0]
    ).toBeInTheDocument();
  });
});
