import { connectToDB } from "@/utils/database";
import LaundryBin from "@/models/laundrybin";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
    try {
      await connectToDB();
      console.log("params", res.params.id);
      const order = await LaundryBin.findOne({ _id : res.params.id });
      console.log(order);
      if (!order) return new Response("Order Not Found", { status: 404 });
  
      return new Response(JSON.stringify(order), { status: 200 });
    } catch (error) {
      return new Response("Internal Server Error", { status: 500 });
    }
  };