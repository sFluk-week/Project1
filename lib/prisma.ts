// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// export prisma client สำหรับใช้ในไฟล์อื่น ๆ
export { prisma };
