import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/db'
import User from "@/models/User";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const token = req.cookies.get('token')?.value;
    if(!token){
      return NextResponse.json({ message: 'Unauthorized, no token provided.'}, { status: 401 });
    }
    const decoded = jwt.verify(token, process.env.SECRET_JWT!);
    if(!decoded || typeof decoded !== "object"){
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    const { id } = decoded;
    const user = await User.findById(id).select("name email username");
    if(!user){
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User session retrieved successfully',
      success: true,
      user: {
        name: user.name,
        email: user.email,
        username: user.username,
      }
     });
  } catch(error){
    console.error('Session Error' + error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
