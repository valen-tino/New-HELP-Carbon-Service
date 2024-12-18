import User from "@/models/User"
import connectDB from '@/lib/db';
import bcrypt from 'bcrypt';
import validator from 'validator';
import generator from "generate-password";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    try {
        await connectDB();

        const reqBody = await req.json();
        const { 
            name, 
            email, 
            username, 
            contactNumber
        } = reqBody;

        // Testing
        console.log(reqBody);
        // Check the required fields
        if(!name || !email || !username || !contactNumber){
            return NextResponse.json({
                error: 'Please fill in all of the required fields.'
            }, { status: 400 });
        }
        // Email validation using validator
        if(!validator.isEmail(email)){
            return NextResponse.json({
                error: 'Email is not valid.'
            }, { status: 400 });
        }
        // Check if the user exists in the database or not
        const isUserExist = await User.findOne({ $or : [{email}, {username}] });
        if(isUserExist){
            return NextResponse.json({
                    error: 'Username or email already exists.'
                }, { status: 400 }
            )
        }
        // Details of the generated password
        const generatedPassword = generator.generate({
            length: 8,
            numbers: true,
            symbols: false,
            uppercase: false,
            lowercase: true,
        });
        console.log(generatedPassword); // check the generated password before proceeding to the hash process
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(generatedPassword, salt);
        const newUser = new User({
            name,
            email,
            username,
            password: hashedPassword,
            contactNumber
        });
        console.log(newUser); // Testing to check the user identity
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

// enricojunior
// 77785006