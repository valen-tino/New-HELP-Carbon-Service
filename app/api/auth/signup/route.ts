import User from "@/models/User"
import connectDB from '@/lib/db';
import bcrypt from 'bcrypt';
import validator from 'validator';
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    try {
        await connectDB();

        const reqBody = await req.json();
        const { name, email, username, password } = reqBody;

        // Testing
        console.log(reqBody);

        if(!name || !email || !username || !password){
            return NextResponse.json({
                error: 'Please fill in all of the required fields.'
            }, { status: 400 });
        }

        if(!validator.isEmail(email)){
            return NextResponse.json({
                error: 'Email is not valid.'
            }, { status: 400 });
        }

        const isUserExist = await User.findOne({ $or : [{email}, {username}] });
        if(isUserExist){
            return NextResponse.json({
                    error: 'Username or email already exists.'
                }, { status: 400 }
            )
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            name,
            email,
            username,
            password: hashedPassword
        });
        const savedUser = await newUser.save();
        return NextResponse.json({
            message: 'Successfully created a new user.',
            success: true,
            savedUser
        });
    } catch(err){
        return NextResponse.json({
            error: 'Internal Server Error.'
        }, { status: 500 });
    }
}