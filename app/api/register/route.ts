import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma'; // เชื่อมต่อกับ Prisma client
import bcrypt from 'bcryptjs';
import { z } from 'zod';

// สร้าง Schema ด้วย Zod สำหรับ validate ข้อมูล
const registerSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // ตรวจสอบข้อมูลที่ส่งเข้ามา
    const parsedData = registerSchema.parse(body);

    const { name, email, password } = parsedData;

    // ตรวจสอบว่าผู้ใช้มีอีเมลนี้แล้วหรือไม่
    const existingUser = await prisma.player.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 }
      );
    }

    // แฮชรหัสผ่าน
    const hashedPassword = await bcrypt.hash(password, 10);

    // สร้างผู้ใช้ใหม่ในฐานข้อมูล
    const newUser = await prisma.player.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: 'User registered successfully', user: newUser },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Registration failed', error: error.message },
      { status: 500 }
    );
  }
}
