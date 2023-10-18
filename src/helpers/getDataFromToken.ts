import { NextRequest } from "next/server"
import jwt from "jsonwebtoken";
export const getDataFromToken = (request:NextRequest)=>{
    const token:unknown = request.cookies.get("token")?.value || null ;
    const decodedToken:any = jwt.verify(token as string , process.env.JWT_SECRET as string);
    return decodedToken?.id;
}