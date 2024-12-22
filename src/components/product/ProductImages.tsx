"use client"

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { CldImage } from "next-cloudinary";

const ProductImages = ({ items }: { items: TY_CloudImages[] | [] }) => {

  return (
    <Carousel
      infiniteLoop={true}
      showThumbs={true}
      showIndicators={false}
      showStatus={false}
      thumbWidth={60}
      className="productCarousel"
      renderThumbs={() =>
        items.map((img: TY_CloudImages) => (
          <img key={img.url} src={img.url} alt="thumbnail" />
        ))
      }
    >
      {items && items.length > 0 ? (
        items.map((img: TY_CloudImages, i: number) => (
          <div
            key={i}
            className="flex items-center justify-center align-middle h-full"
          >
            <CldImage
              width={400}
              height={400}
              src={img.url}
              alt="product image"
              className="object-contain rounded-md"
            />
          </div>
        ))
      ) : ([
        <div
          key="1"
          className="flex items-center justify-center align-middle h-full"
        >
          No images available
        </div>
      ]
      )}

    </Carousel>
  );
};

export default ProductImages;