import { client, trip, products } from "../../invoice";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  try {
    const product = products.flatMap((item) => item.product.map((p) => p));

    return NextResponse.json(
      { client, trip, products, product },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
