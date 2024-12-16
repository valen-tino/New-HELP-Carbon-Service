import User from "@/models/User"
import connectDB from '@/lib/db';
import bcrypt from 'bcrypt';
import validator from 'validator';
import generator from 'generate-password';
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    try {
        await connectDB();

        const reqBody = await req.json();
        const {
            name,
            email,
            contactNumber,
        } = reqBody;

        if(!name || !email || !contactNumber){
            return NextResponse.json({ error: 'Please fill in all of the required fields. '}, { status: 400 });
        }

        if(!validator.isEmail(email)){
            return NextResponse.json({ error: 'Email is not valid' }, { status: 400 });
        }

        const isUserAvailable = await User.findOne({ email });
        if(isUserAvailable){
            return NextResponse.json({ error: 'Sorry, email has already been used.'}, { status: 400 });
        }

        const generatedPassword = generator.generate({
            length: 10,
            numbers: true,
            symbols: false,
            uppercase: false,
            lowercase: true
        });
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(generatedPassword, salt);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            contactNumber
        });
        const savedUser = await newUser.save();
        return NextResponse.json({ message: 'Successfully created the user.',
                                   email,
                                   generatedPassword
        });
    } catch(error){
        return NextResponse.json({ error: 'Internal Server Error. '}, { status: 500 });
    }
}