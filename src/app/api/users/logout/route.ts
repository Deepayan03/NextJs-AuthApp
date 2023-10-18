import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const response = NextResponse.json({
      success: true,
      message: "User logged out successfully",
    });
    response.cookies.delete("token");
    return response;
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error?.message,
      },
      { status: 500 }
    );
  }
};
