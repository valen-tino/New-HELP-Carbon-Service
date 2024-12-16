import User from "@/models/User";
import connectDB from '@/lib/db';
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest){
    try {
        await connectDB();

        const reqBody = await req.json();
        const { email, password } = reqBody;
        console.log(reqBody);

        const user = await User.findOne({ email });
        if(!user){
            return NextResponse.json({ error: 'User is not found' }, { status: 400 });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return NextResponse.json({ error: 'Password is not valid.'}, { status: 400 });
        }
        
        const token = jwt.sign(
            { id: user._id, email: user.email},
            process.env.SECRET_JWT!,
            { expiresIn: "3d" }
        );
        const { password: userPassword, ...otherDetails } = user._doc;
        const response = NextResponse.json({
            message: "Successfully logged in to the system.",
            user: otherDetails,
            success: true
        });
        response.cookies.set("access_token", token, {
            httpOnly: true,
            maxAge: 3 * 24 * 60 * 60,
            path: "/"
        });
        return response;
    } catch(error){
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// user template: [x]
// pass template: uyllrd1oc2