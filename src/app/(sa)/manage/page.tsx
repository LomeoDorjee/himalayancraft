"use client"
import { Button } from "@/components/ui/button"
import { redeploy } from "@/lib/actions/deploy.action"
import { Barcode, Footprints, GalleryVertical, Home, Layout, ListCheck, Tag } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const items = [
  {
    title: "Site",
    url: "/",
    icon: Home,
  },
  {
    title: "Product",
    url: "/manage/products",
    icon: Barcode,
  },
  {
    title: "Category",
    url: "/manage/categories",
    icon: Layout,
  },
  {
    title: "Tags",
    url: "/manage/tags",
    icon: Tag,
  },
  {
    title: "Orders",
    url: "/manage/orders",
    icon: ListCheck,
  },
  {
    title: "Slider",
    url: "/manage/sliders",
    icon: GalleryVertical,
  },
  {
    title: "Footer",
    url: "/manage/footers",
    icon: Footprints,
  },
]

export default function Page() {

  return (
    <div className="px-2 py-2 md:px-4 w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {
          items.map((item, index) => (
            <Link
              href={item.url}
              key={index}
              className="rounded-md border px-32 py-16 justify-start items-center text-3xl gap-4 text-slate-800 shadow-md hover:shadow-xl animate flex flex-row">
              <item.icon />
              <p>{item.title}</p>
            </Link>
          ))
        }

        <form
          action={redeploy}
          className="w-full md:col-span-3 justify-center text-center items-center"
        >
          <CountdownButton />
        </form>
      </div>

    </div>
  )
}

function CountdownButton() {
  const [remainingTime, setRemainingTime] = useState(0);
  const [isPending, setIsPending] = useState(false);

  const handleClick = async () => {
    setIsPending(true);
    setRemainingTime(60);

    // Start countdown
    const interval = setInterval(() => {
      setRemainingTime((time) => {
        if (time <= 1) {
          clearInterval(interval);
          setIsPending(false);
          return 0;
        }
        return time - 1;
      });
    }, 1000);

    // Execute server action
    try {
      await redeploy(new FormData);
    } catch (error) {
      console.error("Error during redeployment:", error);
      setIsPending(false);
      setRemainingTime(0);
    }
  };

  return (
    <Button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      variant={"destructive"}
      className={`max-w-fit align-center justify-between m-2 px-32 py-16 text-2xl
          ${isPending && 'bg-yellow-500'}
        `}
    >
      {isPending
        ? `Please wait ${remainingTime}s`
        : "RE-DEPLOY"}
    </Button>
  );
}