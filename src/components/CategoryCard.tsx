

import Image from "next/image";
import { useState } from "react";
import { Card, CardContent } from "./ui/card";

const CategoryCard = ({
    image,
    name
}: {
    image: string
    name: string
}) => {

    return (
        <Card
            className="relative w-full h-24 md:h-72 overflow-hidden rounded-lg cursor-pointer group"
        >
            <div
                className={`absolute inset-0 transition-all duration-300 group-hover:scale-95`}
            >
                <Image
                    src={image}
                    alt="Card Background"
                    fill
                    sizes="70%"
                    className="rounded-lg object-cover"
                />
            </div>
            <CardContent
                className={`absolute inset-0 flex items-end justify-center text-white text-2xl font-semibold transition-all duration-400
                hover:text-4xl hover:opacity-100 opacity-65
                `}
            >
                {name}
            </CardContent>
        </Card>
    );
};

export default CategoryCard;
