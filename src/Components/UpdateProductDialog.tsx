import React, { useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Product } from "../slices/productSlice/productApiSlice";
import { useAddProductMutation } from "../slices/productSlice/productApiSlice";
import { useUpdateProductMutation } from "../slices/productSlice/updateProductSlice";

interface IEditProductProps {
  open: boolean;
  handleClose: () => void;
  selectedProduct: Product | null;
}

const categories = [
  "Select Category",
  "Electronics",
  "Clothes",
  "Home & Garden",
  "Sports & Outdoors",
  "Books",
  "Toys & Games",
  "Beauty & Personal Care",
  "Automotive",
  "Health & Wellness",
  "Food & Beverages",
  "Pet Supplies",
  "Jewelry",
  "Office Products",
  "Musical Instruments",
  "Arts & Crafts",
];

const UpdateProductDialog: React.FC<IEditProductProps> = ({
  open,
  handleClose,
  selectedProduct,
}) => {
  const [currentProduct, setCurrentProduct] = useState<Product | null>(
    selectedProduct
  );

  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  useEffect(() => {
    if (selectedProduct) {
      setCurrentProduct(selectedProduct);
    }
  }, [selectedProduct]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setCurrentProduct((prev) => ({
      ...prev!,
      [name]: name === "price" ? parseFloat(value) : value,
    }));
  };

  

  const handleEdit = async () => {
    if (currentProduct) {
      setIsEditing(true);
      setError(null);

      try {
        await updateProduct(currentProduct).unwrap();
        
        handleClose();
      } catch (err) {
        console.error("Failed to update the product:", err);
        setError("Failed to update the product. Please try again.");
      } finally {
        setIsEditing(false);
      }
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>Edit Product</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          {error && <Typography color="error">{error}</Typography>}
          <TextField
            fullWidth
            size="small"
            label="Product Name"
            name="productName"
            focused
            value={currentProduct?.productName || ""}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            size="small"
            type="number"
            label="Price"
            name="price"
            focused
            value={currentProduct?.price || ""}
            InputProps={{
              endAdornment: <Typography>Rwf</Typography>,
            }}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            size="small"
            label="Product Category"
            name="productCategory"
            select
            value={currentProduct?.productCategory || ""}
            onChange={handleChange}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            size="small"
            label="Description"
            name="description"
            focused
            value={currentProduct?.description || ""}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            size="small"
            label="Dimension"
            name="dimensions"
            focused
            value={currentProduct?.dimensions || ""}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            size="small"
            label="images"
            name="images"
            focused
            value={currentProduct?.images || ""}
            onChange={handleChange}
          />
        </Stack>
        <Stack direction="row" spacing={2}>
          <label style={{ cursor: "pointer" }}>
            <img
              src={currentProduct?.images}
              alt="Product"
              style={{ width: "100%", height: "auto" }}
            />
          </label>
        </Stack>
        {/* <label htmlFor="image-upload" style={{ cursor: "pointer" }}>
          <img
            src={currentProduct?.images}
            alt="Product"
            style={{ width: "100%", height: "auto" }}
          />
        </label> */}
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="error" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          onClick={handleEdit}
          variant="contained"
          disabled={isEditing || isLoading}
          sx={{
            background: "black",
            color: "white",
            ":hover": {
              background: "black",
            },
          }}
        >
          {isEditing || isLoading ? "Editing..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateProductDialog;
