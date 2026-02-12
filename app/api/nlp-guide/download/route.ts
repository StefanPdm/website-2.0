import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { readFile } from 'fs/promises';
import path from 'path';

const DOWNLOAD_TOKEN_SECRET = process.env.DOWNLOAD_TOKEN_SECRET;

function verifyToken(token: string) {
  if (!DOWNLOAD_TOKEN_SECRET) return null;

  const [payloadB64, signature] = token.split('.');
  if (!payloadB64 || !signature) return null;

  const expectedSignature = crypto
    .createHmac('sha256', DOWNLOAD_TOKEN_SECRET)
    .update(payloadB64)
    .digest('base64url');

  if (signature !== expectedSignature) return null;

  try {
    const payloadJson = Buffer.from(payloadB64, 'base64url').toString('utf8');
    const payload = JSON.parse(payloadJson) as { e: string; exp: number };
    if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get('token');

  if (!token) {
    return NextResponse.json({ error: 'Token fehlt.' }, { status: 400 });
  }

  const payload = verifyToken(token);
  if (!payload) {
    return NextResponse.json({ error: 'Token ungueltig oder abgelaufen.' }, { status: 403 });
  }

  const filePath = path.join(process.cwd(), 'private-documents', 'NLP-Leitfaden_SNAC.pdf');
  const fileBuffer = await readFile(filePath);

  return new NextResponse(fileBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="NLP-Leitfaden_SNAC.pdf"',
      'Cache-Control': 'private, max-age=0, no-store',
    },
  });
}
