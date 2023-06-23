import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
	const { name, email, password } = await request.json();

	if (!name || !email || !password) {
		return new NextResponse('Missing Fields.', { status: 400 });
	}
	const exist = await db.user.findUnique({
		where: {
			email,
		},
	});

	if (exist) throw new Error('Email is already in use.');

	const hashedPassword = await bcrypt.hash(password, 10);

	const newUser = await db.user.create({
		data: {
			name,
			email,
			hashedPassword,
		},
	});

	return NextResponse.json(newUser);
}
