import { renderHook, act } from '@testing-library/react-hooks';
import { useDataFetchQueue } from '../Components/admin/useDataFetchQueue';

const mockFetchSuccess = vi.fn(() =>
  Promise.resolve('Success Result')
);

const mockFetchError = vi.fn(() =>
  Promise.reject('Fetch Error')
);

describe('useDataFetchQueue Hook', () => {
  beforeEach(() => {
    mockFetchSuccess.mockClear();
    mockFetchError.mockClear();
  });

  it('should initialize with an empty queue', () => {
    const { result } = renderHook(() => useDataFetchQueue([]));

    expect(result.current.results).toEqual({});
    expect(result.current.isLoading).toBe(false);
  });

  it('should set isLoading to true while processing', async () => {
    const queue = [
      { id: 'item1', fetch: mockFetchSuccess },
    ];

    const { result, waitForNextUpdate } = renderHook(() =>
      useDataFetchQueue(queue)
    );

    expect(result.current.isLoading).toBe(true);
    await waitForNextUpdate();
    expect(result.current.isLoading).toBe(false);
  });
});
