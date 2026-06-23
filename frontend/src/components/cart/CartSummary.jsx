function CartSummary({ pricing }) {
  return (
    <div
      className="
      bg-white
      rounded-3xl
      shadow-xl
      p-8
      sticky
      top-28
      "
    >

      <h2 className="text-2xl font-bold mb-8">
        Bill Details
      </h2>

      <div className="space-y-5">

        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{pricing.subtotal}</span>
        </div>

        <div className="flex justify-between">
          <span>GST</span>
          <span>₹{pricing.gst}</span>
        </div>

        <div className="flex justify-between">
          <span>Packaging</span>
          <span>₹{pricing.packagingFee}</span>
        </div>

        <div className="flex justify-between">
          <span>Delivery</span>
          <span>₹{pricing.deliveryFee}</span>
        </div>

        <hr />

        <div className="flex justify-between text-2xl font-bold">

          <span>Total</span>

          <span className="text-orange-500">
            ₹{pricing.total}
          </span>

        </div>

      </div>

      <button
        className="
        w-full
        mt-8
        bg-orange-500
        hover:bg-orange-600
        text-white
        py-4
        rounded-xl
        font-semibold
        duration-300
        "
      >
        Proceed To Checkout
      </button>

    </div>
  );
}

export default CartSummary;