import { describe, test, expect, vi, beforeEach } from "vitest";
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore, Store } from "@reduxjs/toolkit";
import Profile from "../pages/Profile"; // Adjust the import based on your folder structure
import authReducer from "../slices/authSlice/authSlice";
import { userApiSlice } from "../slices/authSlice/authApiSlice"; // Updated import

vi.mock("react-hot-toast", async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, unknown>;
  return {
    ...actual,
    success: vi.fn(),
    error: vi.fn(),
  };
});

const mockUserInfo = {
  user: {
    firstname: "John",
    othername: "Doe",
    phone: "1234567890",
    street: "123 Main St",
    city: "Metropolis",
    country: "Countryland",
    state: "Stateville",
    postal_code: "12345",
  },
};

type RootState = ReturnType<typeof createStoreState>;

const createStoreState = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      [userApiSlice.reducerPath]: userApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(userApiSlice.middleware),
  }).getState();
};

describe("Profile Component", () => {
  let store: Store<RootState>;

  beforeEach(() => {
    localStorage.setItem("userInfo", JSON.stringify(mockUserInfo));
    store = configureStore({
      reducer: {
        auth: authReducer,
        [userApiSlice.reducerPath]: userApiSlice.reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userApiSlice.middleware),
    });
  });

  const renderWithProviders = (ui: React.ReactElement) => {
    return render(
      <Provider store={store}>
        <BrowserRouter>{ui}</BrowserRouter>
      </Provider>
    );
  };

  test("renders user information correctly", () => {
    renderWithProviders(<Profile />);
    expect(screen.getByLabelText("First Name")).toHaveValue(
      mockUserInfo.user.firstname
    );
    expect(screen.getByLabelText("Last Name")).toHaveValue(
      mockUserInfo.user.othername
    );
    expect(screen.getByLabelText("Phone Number")).toHaveValue(
      mockUserInfo.user.phone
    );
    expect(screen.getByLabelText("Street")).toHaveValue(
      mockUserInfo.user.street
    );
    expect(screen.getByLabelText("City")).toHaveValue(mockUserInfo.user.city);
    expect(screen.getByLabelText("Country")).toHaveValue(
      mockUserInfo.user.country
    );
    expect(screen.getByLabelText("State")).toHaveValue(mockUserInfo.user.state);
    expect(screen.getByLabelText("Postal Code")).toHaveValue(
      mockUserInfo.user.postal_code
    );
  });

  test("handles input changes correctly", () => {
    renderWithProviders(<Profile />);
    const firstNameInput = screen.getByLabelText(
      "First Name"
    ) as HTMLInputElement;
    fireEvent.change(firstNameInput, { target: { value: "Jane" } });
    expect(firstNameInput).toHaveValue("Jane");
  });

  test("submits the form with updated user information", async () => {
    renderWithProviders(<Profile />);
    const firstNameInput = screen.getByLabelText(
      "First Name"
    ) as HTMLInputElement;
    fireEvent.change(firstNameInput, { target: { value: "Jane" } });
    const saveButton = screen.getByText("Save Changes");
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText("Saving...")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("Save Changes")).toBeInTheDocument();
    });
  });

  test("displays validation errors", async () => {
    renderWithProviders(<Profile />);
    const phoneInput = screen.getByLabelText(
      "Phone Number"
    ) as HTMLInputElement;
    fireEvent.change(phoneInput, { target: { value: "invalid" } });
    const saveButton = screen.getByText("Save Changes");
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText("Invalid phone number")).toBeInTheDocument();
    });
  });



});
