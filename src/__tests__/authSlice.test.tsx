import authReducer, { getCredentials, logOut } from '../slices/authSlice/authSlice';

// Mock localStorage
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('authSlice', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should return the initial state', () => {
    const initialState = {
      userInfo: null,
      logState: null,
    };
    expect(authReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle getCredentials', () => {
    const userInfo = { name: 'John Doe', email: 'john@example.com' };
    const action = getCredentials(userInfo);
    const expectedState = {
      userInfo,
      logState: null,
    };
    expect(authReducer(undefined, action)).toEqual(expectedState);
    expect(localStorage.getItem('userInfo')).toEqual(JSON.stringify(userInfo));
  });

 
  

  it('should handle getCredentials with existing localStorage', () => {
    const userInfo = { name: 'Jane Doe', email: 'jane@example.com' };
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    const action = getCredentials(userInfo);
    const expectedState = {
      userInfo,
      logState: null,
    };
    expect(authReducer({ userInfo: null, logState: null }, action)).toEqual(expectedState);
    expect(localStorage.getItem('userInfo')).toEqual(JSON.stringify(userInfo));
  });

  it('should handle logOut when already logged out', () => {
    const initialState = {
      userInfo: null,
      logState: null,
    };
    localStorage.removeItem('userInfo');
    localStorage.removeItem('logState');
    
    const action = logOut();
    expect(authReducer(initialState, action)).toEqual(initialState);
    expect(localStorage.getItem('userInfo')).toBeNull();
    expect(localStorage.getItem('logState')).toBeNull();
  });


  it('should handle logOut when localStorage is empty', () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('logState');
    
    const action = logOut();
    const initialState = {
      userInfo: null,
      logState: null,
    };
    expect(authReducer(initialState, action)).toEqual(initialState);
    expect(localStorage.getItem('userInfo')).toBeNull();
    expect(localStorage.getItem('logState')).toBeNull();
  });
});