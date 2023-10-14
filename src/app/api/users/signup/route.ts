import { dbConnect } from "@/dbConfig/dbConfig.ts";
import User from "@/models/userModel.ts";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
dbConnect();
export const POST = async (request: NextRequest) => {
  try {
    console.log("Logging");
    const body = await request.json();
    const { userName, email, password } = body;
    console.log(body);
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        {
          error: "User Already exists",
        },
        { status: 400 }
      );
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = new User({
      userName:userName,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    return NextResponse.json({
      message: "User created successfully",
      data: savedUser,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      {
        error: "An error occurred",
      },
      { status: 500 }
    );
  }
};


