import { NextResponse, NextRequest } from "next/server";
import connectDB from '@/lib/db';
import User from '@/models/User';

// Update the user profile
export async function PUT(req: NextRequest, { params }: { params: { id: string } }){
    try {
        await connectDB();
        
        const {
            name,
            email,
            username,
            contactNumber,
            preferences
        } = await req.json();

        const user = await User.findById(params.id);
        if(!user){
            return NextResponse.json({ error: "User is not found!"}, { status: 400 });
        }

        // Else if found
        user.name = name || user.name;
        user.email = email || user.email;
        user.username = username || user.username;
        user.contactNumber = contactNumber || user.contactNumber;
        user.preferences = preferences || user.preferences;
        
        await user.save();
        return NextResponse.json({ message: "Profile updated successfully."}, { status: 200 });
    } catch(error){
        return NextResponse.json({ error : "Internal Server Error" }, { status: 500 });
    }
}

// Fetch the user data after updating the profile
export async function GET(req: NextRequest, { params }: { params : { id: string }}){
    try {
        await connectDB();

        const user = await User.findById(params.id);
        if(!user){
            return NextResponse.json({ error: "User is not found!"}, { status: 400 });
        }

        return NextResponse.json({ user });
    } catch(error){
        return NextResponse.json({ error: "Internal Server Error"}, { status: 500 });
    }
}