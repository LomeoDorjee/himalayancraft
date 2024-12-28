import { useCart, useCartActions } from "@/context/CartContext";
import { currencyFormat } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const CartModal = () => {

  const { state } = useCart();

  const { removeItemFromCart } = useCartActions();

  const calculateTotal = (items: TY_CartItem[]): number => {
    return items.length > 0 ? items.reduce((total, item) => total + ((item.price - item.discount) * item.quantity), 0) : 0;
  };

  const total = calculateTotal(state.items);

  return (
    <div className="w-11/12 mx-auto rounded-md bg-white top-12 right-0 flex flex-col gap-6 z-20 md:w-full">

      {state.items.length == 0 ? (
        <div className="">Cart is Empty</div>
      ) : (
        <>
          {state.isLoading ? (
            <>Loading...</>
          ) : (<>
            <h2 className="text-xl">Your Cart</h2>

            {/* LIST */}
            <div className="flex flex-col gap-8">

              {/* ITEM */}
              {state.items.map((item) => (
                <div className="flex gap-4" key={item.productid}>
                  {item.banner && (
                    <Image
                      src={item.banner}
                      alt=""
                      width={72}
                      height={96}
                      className="object-cover rounded-md"
                    />
                  )}
                  <div className="flex flex-col justify-between w-full">

                    {/* TOP */}
                    <div className="">

                      {/* TITLE */}
                      <div className="flex items-center justify-between gap-8">
                        <h3 className="font-semibold">
                          {item.name}
                        </h3>
                        <div className="p-1 bg-gray-50 rounded-sm flex items-center gap-2">
                          {item.quantity && item.quantity > 1 && (
                            <div className="text-xs text-green-500">
                              {item.quantity} x{" "}
                            </div>
                          )}
                          {currencyFormat(item.price - item.discount)}
                        </div>
                      </div>

                      {/* Availability : */}
                      <div className="text-sm text-gray-500">
                        {item.categories && item.categories.split(', ')[0]}
                      </div>

                    </div>

                    {/* BOTTOM */}
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Qty. {item.quantity}</span>
                      <span
                        className="text-red-500"
                        style={{ cursor: state.isLoading ? "not-allowed" : "pointer" }}
                        onClick={() => {
                          removeItemFromCart(item)
                        }}
                      >
                        Remove
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* BOTTOM */}
            <div className="">
              <hr className="my-2" />

              <div className="flex items-center justify-between font-semibold">
                <span className="">Subtotal</span>
                <span className="">{currencyFormat(total)}</span>
              </div>

              <p className="text-gray-500 text-sm mt-2 mb-4">
                Shipping and taxes calculated at checkout.
              </p>


              <div className="flex justify-between text-sm">

                <Link href="/my-cart"
                  className="rounded-md py-3 px-4 ring-1 ring-gray-300">
                  View Cart
                </Link>

                <Link
                  className="rounded-md py-3 px-4 bg-black text-white disabled:cursor-not-allowed disabled:opacity-75"
                  href={"/order-confirm"}
                >
                  Checkout
                </Link>
              </div>
            </div>
          </>)}

        </>
      )}
    </div>
  );
};

export default CartModal;
