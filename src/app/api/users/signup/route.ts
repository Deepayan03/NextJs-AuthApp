import { dbConnect } from "@/dbConfig/dbConfig.ts";
import User from "@/models/userModel.ts";
import { NextRequest, NextResponse    } from "next/server";
import bcryptjs from "bcryptjs";
import AppError from "@/app/utils/Error";
// import errorMiddleware from "@/app/utils/ErrorMiddleWare";

dbConnect();
export async function POST(request: NextRequest ){
  try {
    const body = await request.json();
    const { userName, email, password , confirm_password } = body;
    if(password!=confirm_password){
      throw new AppError("Both password and confirm password doesnot match",500);
    }
    const user = await User.findOne({ email });
    if (user) {
      throw new AppError("User already exists",400);
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = new User({
      userName:userName,
      email,
      password: hashedPassword,
    });
    console.log(NextResponse);
    const savedUser = await newUser.save();
    return NextResponse.json({
      success:true,
      message : "User registered successfully in the database",
      data:savedUser
    },{status:200})
  } catch (error:any) {
    return NextResponse.json({
      success:false,
      message : error.message,
    },{status:500});
  }
};


