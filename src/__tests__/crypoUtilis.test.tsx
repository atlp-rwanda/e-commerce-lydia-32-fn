import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { encodeToken, decodeToken, isTokenExpired } from '../utils/cryptoUtils';

vi.mock('crypto-js', async () => {
  const actual = await vi.importActual('crypto-js');
  return {
    default: actual,
    AES: {
      encrypt: vi.fn().mockImplementation((data, key) => ({
        toString: () => `encrypted:${data}:${key}`
      })),
      decrypt: vi.fn().mockImplementation((ciphertext, key) => ({
        toString: (encoder) => {
          if (ciphertext.startsWith('encrypted:')) {
            return ciphertext.split(':')[1];
          }
          return null;
        }
      }))
    },
    enc: {
      Utf8: {
        parse: vi.fn().mockImplementation((str) => str),
        stringify: vi.fn().mockImplementation((str) => str)
      }
    }
  };
});

const SECRET_KEY = 'test-secret-key-that-is-long-enough-for-aes';
const EXPIRATION_TIME = 1; // 1 hour for testing
const RealTime = EXPIRATION_TIME * 60 * 60 * 1000;

describe('Crypto Utilities', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_TOKEN_SECRET_KEY', SECRET_KEY);
    vi.stubEnv('VITE_EXPIRATION_TIME', EXPIRATION_TIME.toString());
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.clearAllMocks();
    vi.useRealTimers();
  });

//   describe('encodeToken', () => {
//     // it('should correctly encode data', () => {
//     //   const data = 'test data';
//     //   const encoded = encodeToken(data);
//     //   expect(encoded).toBe(`encrypted:${data}:${SECRET_KEY}`);
//     // });
//   });

  describe('decodeToken', () => {
    // it('should correctly decode encoded data', () => {
    //   const data = 'test data';
    //   const encoded = `encrypted:${data}:${SECRET_KEY}`;
    //   const decoded = decodeToken(encoded);
    //   expect(decoded).toBe(data);
    // });

    it('should return null for invalid encoded data', () => {
      const invalidToken = 'invalid-token';
      const decoded = decodeToken(invalidToken);
      expect(decoded).toBeNull();
    });
  });

//   describe('isTokenExpired', () => {
//     it('should return false if the token is not expired', () => {
//       const now = new Date();
//       vi.setSystemTime(now);
//       const data = now.toISOString();
//       const token = `encrypted:${data}:${SECRET_KEY}`;
//       expect(isTokenExpired(token)).toBe(false);
//     });

    it('should return true if the token is expired', () => {
      const now = new Date();
      const pastDate = new Date(now.getTime() - RealTime - 1);
      vi.setSystemTime(now);
      const data = pastDate.toISOString();
      const token = `encrypted:${data}:${SECRET_KEY}`;
      expect(isTokenExpired(token)).toBe(true);
    });
  });