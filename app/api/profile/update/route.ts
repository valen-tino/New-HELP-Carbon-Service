import User from "@/models/User"
import connectDB from '@/lib/db';
import bcrypt from 'bcrypt';
import validator from 'validator';
import generator from 'generate-password';
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest){
    try {
        await connectDB();

        const reqBody = await req.json();
        const {
            name,
            email,
            contactNumber,
            transportationPreferences,
            energyPreferences,
            dietaryPreferences,
        } = reqBody;

        if(!name || !email || !contactNumber || !transportationPreferences || !energyPreferences || !dietaryPreferences){
            return NextResponse.json({ error: 'Please fill in all of the required fields.' }, { status: 400 });
        }

        const user = await User.findOne({ email });
        if(!user){
            return NextResponse.json({ error: 'User not found.' }, { status: 400 });
        }

        user.name = name || user.name;
        user.contactNumber = contactNumber || user.contactNumber;
        user.preferences.transportationPreferences = transportationPreferences || user.preferences.transportationPreferences;
        user.preferences.energyPreferences = energyPreferences || user.preferences.energyPreferences;
        user.preferences.dietaryPreferences = dietaryPreferences || user.preferences.dietaryPreferences;

        user.updatedAt = new Date();
        await user.save();

        return NextResponse.json({ message: 'Successfully updated the profile.', user });
    } catch(error){
        return NextResponse.json({ error: 'Internal Server Error. '}, { status: 500 });
    }
}