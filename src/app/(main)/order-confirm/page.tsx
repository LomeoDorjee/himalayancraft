import OrderForm from '@/components/OrderForm';
import OrderSummary from '@/components/OrderSummary';
import { currentUser } from '@clerk/nextjs/server';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Order Confirm"
  },
  description: "Confirm your Order",
  metadataBase: new URL(process.env.NEXT_PUBLIC_DOMAIN_URL ? process.env.NEXT_PUBLIC_DOMAIN_URL : "https://nepalcraft.com.np/"),
};

export default async function OrderConfirmation() {

  const user = await currentUser()

  if (!user || user.id == undefined) return

  return (
    <main className="max-w-7xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto lg:max-w-none">
        <h1 className="sr-only">Checkout</h1>

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
          {/* Order summary */}
          <OrderSummary />

          <OrderForm
            userId={user.id || ""}
            userEmail={user.emailAddresses[0] ? user.emailAddresses[0].emailAddress : ""}
            userFirstName={user.firstName ? user.firstName : ""}
            userLastName={user.lastName ? user.lastName : ""}
          />

        </div>

      </div>
    </main>
  );
};