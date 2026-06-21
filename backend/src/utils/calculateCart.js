const calculateCart = (cartItems, coupon = null) => {
  let subtotal = 0;
  let gst = 0;
  let packagingFee = 0;

  cartItems.forEach((item) => {
    const food = item.food;

    subtotal += food.price * item.quantity;

    gst +=
      (food.price *
        food.gstPercentage *
        item.quantity) /
      100;

    packagingFee +=
      food.packagingCharge *
      item.quantity;
  });

  let deliveryFee = 0;

// No delivery fee if cart is empty
if (subtotal > 0) {
  if (subtotal < 199) {
    deliveryFee = 60;
  } else if (subtotal < 499) {
    deliveryFee = 40;
  }
}

  let discount = 0;

  if (coupon) {
    if (coupon.discountType === "flat") {
      discount = coupon.discountValue;
    } else {
      discount =
        (subtotal *
          coupon.discountValue) /
        100;
    }
  }

  const total =
    subtotal +
    gst +
    packagingFee +
    deliveryFee -
    discount;

  return {
    subtotal,
    gst,
    packagingFee,
    deliveryFee,
    discount,
    total,
  };
};

export default calculateCart;