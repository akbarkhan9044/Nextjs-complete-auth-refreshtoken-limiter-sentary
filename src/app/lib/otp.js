
import crypto from 'node:crypto';
import { connection } from 'next/server';
export async function generateOTP(){
    await connection();
    return crypto.randomInt(100000, 999999).toString()
}