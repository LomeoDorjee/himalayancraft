import Image from "next/image";
import Link from "next/link";
import { LogoIcon } from "./Icons";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="py-10 px-4 lg:px-6 xl:px-32 2xl:px-64 bg-gray-100 text-sm bg-gradient-to-tr from-slate-50 via-slate-200 to-slate-300">

      <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-24 pb-8 max-w-screen-2xl mx-auto">

        {/* LEFT */}
        <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-3">
          <div className="flex flex-row flex-wrap gap-2 justify-start items-center mb-5 ">
            <LogoIcon />
            <Link href="/">
              <div className="text-2xl tracking-wide">{process.env.NEXT_PUBLIC_APP_NAME}</div>
            </Link>
          </div>
          <div className="flex gap-2 flex-col flex-wrap">
            <p> Boudha, Kathmandu,</p>
            <p> Nepal - 44600</p>
            <span className="font-semibold">support@himalayancraftshop.com</span>
            <span className="font-semibold">+977 - 9824114513</span>
          </div>
        </div>

        {/* CENTER */}
        <div className="hidden lg:flex justify-between w-1/2 ">
          <div className="flex flex-col justify-between">
            <h1 className="font-medium text-lg mb-5">COMPANY</h1>
            <div className="flex flex-col gap-3">
              <Link href="/about-us">About Us</Link>
              <Link href="">Careers</Link>
              <Link href="">Affiliates</Link>
              <Link href="">Blog</Link>
              <Link href="">Contact Us</Link>
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <h1 className="font-medium text-lg mb-5">SHOP</h1>
            <div className="flex flex-col gap-3">
              <Link href="">New Arrivals</Link>
              <Link href="">Featured</Link>
              <Link href="">Statues</Link>
              <Link href="">Thankas</Link>
              <Link href="">All Products</Link>
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <h1 className="font-medium text-lg mb-5">HELP</h1>
            <div className="flex flex-col gap-3">
              <Link href="">Customer Service</Link>
              <Link href="">My Account</Link>
              <Link href="">Find a Store</Link>
              <Link href="">Legal & Privacy</Link>
              <Link href="">Gift Card</Link>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
          {/* <h1 className="font-medium text-lg">SUBSCRIBE</h1>
          <p>
            Be the first to get the latest news about trends, promotions, and
            much more!
          </p>
          <div className="flex">
            <input
              type="text"
              placeholder="Email address"
              className="p-4 w-3/4"
            />
            <button className="w-1/4 bg-lama text-white">JOIN</button>
          </div> */}
          <div className="flex flex-col gap-5">
            <span className="font-semibold text-lg">Secure Payments</span>
            <div className="flex justify-between">
              <Image src="/discover.png" alt="" width={40} height={20} />
              <Image src="/skrill.png" alt="" width={40} height={20} />
              <Image src="/paypal.png" alt="" width={40} height={20} />
              <Image src="/mastercard.png" alt="" width={40} height={20} />
              <Image src="/visa.png" alt="" width={40} height={20} />
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <span className="font-semibold text-lg">Follow us</span>
            <div className="flex gap-6">
              <Image src="/facebook.png" alt="" width={16} height={16} />
              <Image src="/instagram.png" alt="" width={16} height={16} />
              <Image src="/youtube.png" alt="" width={16} height={16} />
              <Image src="/pinterest.png" alt="" width={16} height={16} />
              <Image src="/x.png" alt="" width={16} height={16} />
            </div>
          </div>

        </div>

      </div>

      {/* BOTTOM */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-2 pt-8 border-t border-gray-200 max-w-screen-2xl mx-auto">
        <div className="">© {currentYear} Craft Shop</div>
        <div className="flex flex-col gap-2 md:flex-row">
          <div className="">
            <span className="text-gray-500 mr-4">Language</span>
            <span className="font-medium">United States | English</span>
          </div>
          <div className="">
            <span className="text-gray-500 mr-4">Currency</span>
            <span className="font-medium">$ USD</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
