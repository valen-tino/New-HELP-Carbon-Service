import User from "@/models/User";
import connectDB from '@/lib/db';
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest){
    try {
        await connectDB();

        const reqBody = await req.json();
        const { username, password } = reqBody;

        // Testing
        console.log(reqBody);

        // Validate the user inside the DB
        const user = await User.findOne({ username });
        if(!user){
            return NextResponse.json({ 
                error: 'User is not found!'
            }, { status: 400 });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return NextResponse.json({ 
                error: 'Password is not valid!'
            }, { status: 400 });
        }

        const tokenData = {
            id: user._id,
            email: user.email,
            username: user.username,
        };
        const token = await jwt.sign(tokenData, process.env.SECRET_JWT!, {
            expiresIn: '3d'
        });

        const response = NextResponse.json({
            message: 'Successfully logged in to the system!',
            success: true
        });
        response.cookies.set('token', token, { httpOnly: true });
        return response;
    } catch(err: any){
        return NextResponse.json({ 
            error: err.message || 'Internal Server Error.' 
        }, { status: 500 });
    }
}