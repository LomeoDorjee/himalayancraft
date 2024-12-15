"use client"
// import { CldImage } from 'next-cloudinary'
// import { useState } from "react";

// const ProductImages1 = ({ items }: { items: any }) => {

//   const [index, setIndex] = useState(0);

//   return (
//     <div className="">
//       <div className="h-[600px] relative shadow-lg">
//         <CldImage
//           src={items[index]}
//           alt=""
//           fill
//           className="object-cover rounded-md"
//           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//         />
//       </div>
//       <div className="flex justify-start gap-4 mt-8">
//         {items.map((item: any, i: number) => (
//           <div
//             className="w-1/4 h-32 relative gap-4 mt-8 cursor-pointer"
//             key={i}
//             onClick={() => setIndex(i)}
//           >
//             <CldImage
//               src={item}
//               alt=""
//               fill
//               className="object-cover rounded-md"
//               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };


import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { CldImage } from "next-cloudinary";

const ProductImages = ({ items }: { items: TY_CloudImages[] | [] }) => {
  return (
    <Carousel
      infiniteLoop={true}
      showIndicators={false}
      showStatus={false}
      thumbWidth={60}
      className="productCarousel"
    >
      {items && items?.map((img: TY_CloudImages, i: number) => (
        <div key={i}>
          <CldImage
            width={200}
            height={200}
            src={img.url}
            alt="product image"
            className="object-cover rounded-md"
          />
        </div>
      ))}
    </Carousel>
  );
};

export default ProductImages;