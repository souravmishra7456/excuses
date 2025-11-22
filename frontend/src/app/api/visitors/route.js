import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/mongodb";
import Visitor from "../../../models/Visitor";


export async function GET() {
    await connectDB();

    const visitor = await Visitor.findOne();
    return NextResponse.json({ count: visitor?.count || 0 });
}

export async function POST() {
    await connectDB();

    let visitor = await Visitor.findOne();
    if (!visitor) {
        visitor = await Visitor.create({ count: 1 });
    } else {
        visitor.count += 1;
        await visitor.save();
    }

    return NextResponse.json({ count: visitor.count });
}