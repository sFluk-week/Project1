// app/api/login/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma'; // เชื่อมต่อกับ Prisma client
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsedBody = loginSchema.parse(body); // ใช้ Zod ในการตรวจสอบข้อมูล

    const { email, password } = parsedBody;

    // ตรวจสอบผู้ใช้ในฐานข้อมูล
    const player = await prisma.player.findUnique({
      where: { email },
    });

    if (!player) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // ตรวจสอบรหัสผ่านที่เข้ารหัส
    const isPasswordValid = await bcrypt.compare(password, player.password);

    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    // ในกรณีนี้, คุณสามารถสร้าง session หรือ JWT เพื่อจัดการการเข้าสู่ระบบได้

    return NextResponse.json({ message: 'Login successful', player: { id: player.id, name: player.name } });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
