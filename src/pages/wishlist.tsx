import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Spinner from "../Components/Spinners";
import {
  useDeleteWishlistItemMutation,
  useGetAllwishlistQuery,
} from "../slices/wishlistSlice/wishlistSliceApi";
import { setWishlistInfo } from "../slices/wishlistSlice/wishlistSlice";
import closeicon from "../assets/CLOSE-ICON.png";
import toast from "react-hot-toast";
import WishlistEmpty from "../Components/wishlistEmpty";

const Wishlist: React.FC = () => {
  const LoadingOverlay: React.FC = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <Spinner />
    </div>
  );

  const [deletingWishlistItemId, setDeletingWishlistItemId] = useState<
    number | null
  >(null);
  const dispatch = useDispatch();
  //@ts-ignore
  const {
    data: AllWishlistItems,
    isLoading,
    error,
    refetch,
    //@ts-ignore
  } = useGetAllwishlistQuery();
  const [deleteWishlistItem] = useDeleteWishlistItemMutation();
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (AllWishlistItems) {
      dispatch(setWishlistInfo(AllWishlistItems));
      refetch();
    }
  }, [AllWishlistItems, dispatch]);

  if (isLoading || !AllWishlistItems)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );

  if (error) {
    console.error("Error fetching wishlist:", error);
    return <WishlistEmpty />;
  }

  if (
    !AllWishlistItems ||
    !AllWishlistItems.wishList ||
    AllWishlistItems.wishList.length === 0
  ) {
    return <WishlistEmpty />;
  }

  if (error) return <div>Error: {JSON.stringify(error)}</div>;

  console.log(AllWishlistItems);

  const handleDeleteWishlistItem = (productId: number) => {
    setDeletingWishlistItemId(productId);
    const modal = document.getElementById("confirm_modal") as HTMLDialogElement;
    modal.showModal();
  };

  const handleConfirmDelete = async () => {
    if (deletingWishlistItemId) {
      setIsDeleting(true);
      const modal = document.getElementById(
        "confirm_modal"
      ) as HTMLDialogElement;
      modal.close();
      try {
        await deleteWishlistItem(deletingWishlistItemId).unwrap();
        refetch();
        toast.success("Item deleted successfully");
      } catch (error) {
        toast.error("Failed to delete item");
      } finally {
        setDeletingWishlistItemId(null);
        setDeletingWishlistItemId(null);
        setIsDeleting(false);
      }
    }
  };

  return (
    <>
      {isDeleting && <LoadingOverlay />}
      <div className="text-center flex flex-col justify-center items-center h-40 bg-gray-50 mt-16">
        <div className="text-5xl font-semibold tracking-widest w-full h-0">
          WISHLIST
        </div>
      </div>
      <div className="container mx-auto p-4 flex justify-center flex-col mb-24 items-center">
        <div className="w-full max-w-5xl space-y-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-center font-bold">
              <div className="w-1/3 md:w-1/4">Name</div>
              <div className="hidden md:block w-1/4">Description</div>
              <div className="hidden md:block w-1/6 text-center">Image</div>
              <div className="w-1/4 md:w-1/12 text-right">Price</div>
              <div className="w-1/3 md:w-1/6 text-right">Action</div>
            </div>
          </div>
          {AllWishlistItems.wishList &&
            AllWishlistItems.wishList.map(
              (wishlistItem: any, index: number) => {
                const product = AllWishlistItems.products[index];
                return (
                  <div
                    key={wishlistItem.id}
                    className="bg-white rounded-lg shadow-md p-4 mb-4"
                  >
                    <div className="flex justify-between items-center">
                      <div className="w-1/3 md:w-1/4 font-semibold">
                        {product.productName}
                      </div>
                      <div className="hidden md:block w-1/4 text-sm">
                        {product.description ||
                          "electroacoustic transducer that converts an electrical audio signa a corresponding sound."}
                      </div>
                      <div className="hidden md:flex w-1/6 justify-center">
                        <img
                          src={product.images}
                          alt={product.productName}
                          className="w-20 h-20 object-cover rounded"
                        />
                      </div>
                      <div className="w-1/4 md:w-1/12 text-right">
                        {product.price}
                      </div>
                      <div className="w-1/3 md:w-1/6 flex justify-end">
                        <button
                          className="bg-gray-900 hover:bg-red-500 text-white px-4 py-2 rounded transition duration-300"
                          onClick={() =>
                            handleDeleteWishlistItem(wishlistItem.id)
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
        </div>
        <dialog
          id="confirm_modal"
          className="modal px-4 rounded-lg bg-gray-100 max-w-xl h-40"
        >
          <div className="modal-box">
            <form method="dialog">
              <button className="absolute right-2 top-2">
                <img src={closeicon} alt="Close icon " className="w-4" />
              </button>
            </form>
            <div className="flex mt-10 flex-col items-center min-w-72">
              <h3 className="font-bold text-lg">Remove this item?</h3>
              <div className="flex w-full justify-around mt-4">
                <button
                  className="bg-red-500 p-1 text-white text-lg w-24 rounded hover:bg-transparent hover:border-2 hover:text-red-500 hover:border-red-500  transition ease-in duration-300"
                  onClick={() => {
                    const modal = document.getElementById(
                      "confirm_modal"
                    ) as HTMLDialogElement;
                    modal.close();
                  }}
                >
                  No
                </button>
                <button
                  className="bg-black p-1 text-white text-lg w-24 rounded hover:bg-transparent hover:border-2 hover:text-black border-black transition ease-in duration-300"
                  onClick={handleConfirmDelete}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </dialog>
      </div>
    </>
  );
};

export default Wishlist;
