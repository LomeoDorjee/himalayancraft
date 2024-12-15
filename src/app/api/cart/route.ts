"use server"
import { prisma } from '@/lib/db';
import { catchErrorMessage } from '@/lib/utils';
import { auth, currentUser } from '@clerk/nextjs/server';

import { Prisma } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {

    const { userId } = await auth();
    const user = await currentUser();

    if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 500 });

    const data: TY_CartItem[] = await prisma.$queryRaw`
      SELECT C.banner, C.customerid, C.price, C.quantity, C.productid, C.discount,
      (
        SELECT name FROM products where id = C.productid
      ) AS name
      FROM carts C
      WHERE customerid = ${userId}
      ORDER BY C.id`

    data.forEach(row => {
      row.price = new Prisma.Decimal(row.price);
      row.discount = new Prisma.Decimal(row.discount);
      row.productid = Number(row.productid);
    });

    return NextResponse.json({
      data: data,
      message: 'Item fetched successfully'
    });

  } catch (error) {

    console.error('Error handling request:', catchErrorMessage(error));

    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });

  }
}

export async function POST(req: NextRequest) {
  try {

    const { item } = await req.json();

    const { userId } = auth()

    // /* SAVE TO CARTS */ //
    await prisma.carts.create({
      data: {
        quantity: item.quantity,
        price: parseFloat(item.price),
        banner: item.banner,
        customerid: userId,
        productid: item.productid,
        customer_name: item?.customer_name,
        discount: parseFloat(item.discount),
      }
    })

    return NextResponse.json({ message: 'Item added successfully' });

  } catch (error) {

    console.error('Error handling request:', error);

    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }

}

export async function PUT(req: NextRequest) {
  try {
    const { item } = await req.json();
    const { userId } = auth()

    const exists: {
      id: number
    }[] = await prisma.$queryRaw`
      SELECT C.id FROM carts Cart
      WHERE C.customerid = ${userId}
      AND C.productid = ${item?.productid}
    `
    if (!exists[0].id) {
      return NextResponse.json({ message: 'Item Not Found' });
    }

    await prisma.carts.update({
      where: {
        id: parseInt(exists[0].id.toString())
      },
      data: {
        quantity: item.quantity
      }
    })
    return NextResponse.json({ message: 'Item fetched successfully' });
  } catch (error) {
    console.error('Error handling request:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }

}

export async function DELETE(req: NextRequest) {
  try {
    const { productid } = await req.json();
    const { userId } = auth()

    await prisma.$queryRaw`DELETE FROM carts WHERE customerid = ${userId} AND productid = ${productid}`

    revalidatePath("/my-cart")

    return NextResponse.json({ message: 'Item deleted successfully' });

  } catch (error) {

    console.error('Error handling request:', error);

    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });

  }

}