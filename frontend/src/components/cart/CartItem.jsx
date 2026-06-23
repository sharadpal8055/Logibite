import { Minus, Plus, Trash2 } from "lucide-react";

function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}) {
  return (
    <div
      className="
      bg-white
      rounded-3xl
      shadow-lg
      p-6
      flex
      gap-5
      "
    >
      <img
        src={
          item.food.image ||
          "https://placehold.co/150x150?text=Food"
        }
        alt={item.food.name}
        className="
        h-32
        w-32
        rounded-2xl
        object-cover
        "
      />

      <div className="flex-1">

        <h2 className="text-2xl font-bold">
          {item.food.name}
        </h2>

        <p className="text-gray-500 mt-2">
          {item.food.description}
        </p>

        <p className="text-orange-500 text-xl font-bold mt-3">
          ₹{item.food.price}
        </p>

        <div className="flex justify-between items-center mt-6">

          <div
            className="
            flex
            items-center
            gap-4
            bg-orange-100
            rounded-full
            px-4
            py-2
            "
          >

            <button
              onClick={() =>
                onDecrease(item)
              }
            >
              <Minus />
            </button>

            <span className="font-bold">
              {item.quantity}
            </span>

            <button
              onClick={() =>
                onIncrease(item)
              }
            >
              <Plus />
            </button>

          </div>

          <button
            onClick={() =>
              onRemove(item)
            }
            className="
            text-red-500
            hover:text-red-600
            "
          >
            <Trash2 />
          </button>

        </div>

      </div>

    </div>
  );
}

export default CartItem;