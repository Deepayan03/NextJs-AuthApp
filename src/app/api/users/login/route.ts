import { dbConnect } from "@/dbConfig/dbConfig.ts";
import User from "@/models/userModel.ts";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import AppError from "@/app/utils/Error";
import jwt from "jsonwebtoken";
dbConnect();
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new AppError("User doesn't exist", 400);
    }
    const validPassword = bcryptjs.compare(password, user.password);
    if (!validPassword) {
      throw new AppError("Invalid password", 400);
    }
    const tokenData = {
      id: user._id,
      userName: user.userName,
      email: user.email,
    };
    const jwtSecret: string = process.env.JWT_SECRET as string;
    const token = jwt.sign(tokenData, jwtSecret, { expiresIn: "7d" });
    user.password = undefined;
    const response = NextResponse.json(
      {
        success: true,
        message: "User logged in successfully",
        data: user,
      },
      { status: 200 }
    );
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}
