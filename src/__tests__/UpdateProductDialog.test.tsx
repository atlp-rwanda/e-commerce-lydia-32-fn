import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import UpdateProductDialog from "../Components/UpdateProductDialog";
import { Product } from "../slices/productSlice/productApiSlice";
import { useUpdateProductMutation } from "../slices/productSlice/updateProductSlice";

vi.mock("../slices/productSlice/updateProductSlice", () => ({
  useUpdateProductMutation: vi.fn(),
}));

const mockedUseUpdateProductMutation =
  useUpdateProductMutation as jest.MockedFunction<
    typeof useUpdateProductMutation
  >;

describe("UpdateProductDialog", () => {
  const handleClose = vi.fn();
  const selectedProduct: Product = {
      productId: 1,
      userId: 1,
      productName: "Test Product",
      price: 100,
      productCategory: "Electronics",
      description: "Test Description",
      dimensions: "10x10x10",
      images: "image_url",
      quantity: 0
  };

  beforeEach(() => {
    mockedUseUpdateProductMutation.mockReturnValue([
      vi.fn(),
      //@ts-ignore
      { isLoading: false },
    ]);
  });

  it("renders the dialog with product details", () => {
    render(
      <UpdateProductDialog
        open={true}
        handleClose={handleClose}
        selectedProduct={selectedProduct}
      />
    );

    expect(screen.getByLabelText(/Product Name/i)).toHaveValue("Test Product");
    expect(screen.getByLabelText(/Price/i)).toHaveValue(100);
    // expect(screen.getByLabelText(/Product Category/i)).toHaveValue(
    //   "Electronics"
    // );
    expect(screen.getByLabelText(/Description/i)).toHaveValue(
      "Test Description"
    );
    expect(screen.getByLabelText(/Dimension/i)).toHaveValue("10x10x10");
    expect(screen.getByLabelText(/images/i)).toHaveValue("image_url");
  });

  it("calls handleClose when Cancel button is clicked", () => {
    render(
      <UpdateProductDialog
        open={true}
        handleClose={handleClose}
        selectedProduct={selectedProduct}
      />
    );

    fireEvent.click(screen.getByText(/Cancel/i));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("calls updateProduct when Save button is clicked", async () => {
    const mockUpdateProduct = vi.fn();
    mockedUseUpdateProductMutation.mockReturnValue([
      mockUpdateProduct,
      //@ts-ignore
      { isLoading: false },
    ]);

    render(
      <UpdateProductDialog
        open={true}
        handleClose={handleClose}
        selectedProduct={selectedProduct}
      />
    );

    fireEvent.click(screen.getByText(/Save/i));
    expect(mockUpdateProduct).toHaveBeenCalledWith(selectedProduct);
  });

  it("shows loading state when Save button is clicked", () => {
    mockedUseUpdateProductMutation.mockReturnValue([
      vi.fn(),
      //@ts-ignore
      { isLoading: true },
    ]);

    render(
      <UpdateProductDialog
        open={true}
        handleClose={handleClose}
        selectedProduct={selectedProduct}
      />
    );

    expect(screen.getByText(/Editing.../i)).toBeInTheDocument();
  });
});
