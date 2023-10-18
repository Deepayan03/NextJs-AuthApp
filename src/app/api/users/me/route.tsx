import { dbConnect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
 try {
    dbConnect();
    const data = getDataFromToken(request);
    const user = await User.findOne({ _id: data }).select("-password");
    return NextResponse.json({
      message: "User found",
      data: user,
    });
 } catch (error) {
    return NextResponse.json({
        error
      },{status:400});
 }
};
