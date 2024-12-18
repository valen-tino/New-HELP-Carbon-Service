import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    try {
        const headers = new Headers();
        headers.set('Set-Cookie', 'token=; Path=/; Max-Age=0; HttpOnly; SameSite=Strict; Secure');
        return NextResponse.json({ message: 'Signed out successfully' }, { status: 200, headers });
    } catch(error){
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}