import { renderHook } from '@testing-library/react-hooks';
import { useDispatch } from 'react-redux';
import { logOut } from '../slices/authSlice/authSlice';
import { isTokenExpired } from '../utils/cryptoUtils';
import useCheckAuth from '../hooks/useCheckAuth';
import { describe, it, expect, vi, beforeEach, test } from 'vitest';

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
}));

vi.mock('../utils/cryptoUtils', () => ({
  isTokenExpired: vi.fn(),
}));

vi.mock('../slices/authSlice/authSlice', () => ({
  logOut: vi.fn(),
}));

test('useCheckAuth', () => {
  describe('useCheckAuth', () => {
    let dispatch: ReturnType<typeof vi.fn>;

    beforeEach(() => {
      dispatch = vi.fn();
      (useDispatch as unknown as ReturnType<typeof vi.fn>).mockReturnValue(dispatch);
      vi.resetAllMocks();
    });

    it('should not dispatch logOut if token is not expired', () => {
      const logState = 'test-log-state';
      localStorage.setItem('logState', logState);
      (isTokenExpired as unknown as ReturnType<typeof vi.fn>).mockReturnValue(false);

      renderHook(() => useCheckAuth());

      expect(dispatch).not.toHaveBeenCalled();
    });

    it('should not dispatch logOut if logState is not set', () => {
      localStorage.removeItem('logState');

      renderHook(() => useCheckAuth());

      expect(dispatch).not.toHaveBeenCalled();
    });
  });
});