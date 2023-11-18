import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";
import { NextResponse } from "next/server";

type Data = {
    success: boolean;
    data?: Object;
};


export async function GET(req: Request) {
    const body = await req.json();
    const { reference } = body;

    const verifyUrl = `https://api.paystack.co/transaction/verify/${reference}`;

    try {
        const response = await fetch(
            verifyUrl,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_TEST_KEY}`,
                },
            }
        );
        const data: any = await response.json();
        return NextResponse.json({ success: true, data: data.data }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Error fetching transaction" }, { status: 500 });
    }
}