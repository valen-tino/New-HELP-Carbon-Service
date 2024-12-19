import User from "@/models/User";
import connectDB from '@/lib/db';
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_JWT = process.env.SECRET_JWT;

export async function POST(req: NextRequest){
    try {
        await connectDB();

        const reqBody = await req.json();
        const { 
            username, 
            password 
        } = reqBody;
        console.log(reqBody);

        if(!username || !password){
            return NextResponse.json({ error: 'Please fill in all of the required fields!' }, { status: 400 });
        }

        const user = await User.findOne({ username });
        if(!user){
            return NextResponse.json({ error: 'User is not found in the system.' }, { status: 400 });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return NextResponse.json({ error: 'Password is not valid!' }, { status: 400 });
        }

        const token = jwt.sign({ id: user._id, name: user.name, email: user.email, username: user.username },
            SECRET_JWT!, { expiresIn: '8h' } // Set the expire session up to 8 hours
        );
        const response = NextResponse.json({ message: "Successfully logged in to the system!", token}, { status: 200 });
        response.cookies.set("token", token, { httpOnly: true, maxAge: 3600 });
        return response;
    } catch(error: any){
        return NextResponse.json({ error: error.message || 'Internal Server Error.' }, { status: 500 });
    }
}