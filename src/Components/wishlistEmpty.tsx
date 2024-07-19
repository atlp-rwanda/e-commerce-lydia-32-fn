const WishlistEmpty = () => {
  return (
    <section className="text-center flex flex-col justify-center items-center h-96 bg-gray-50 mt-16">
      <div className="text-5xl font-semibold tracking-widest">WISHLIST</div>
      <div className="text-lg text-gray-400 tracking-tight font-medium">
        No Items in your wishlist
      </div>
    </section>
  );
};

export default WishlistEmpty;
