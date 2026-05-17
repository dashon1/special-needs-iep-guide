import { NextRequest, NextResponse } from 'next/server';
import { getPurchaseByToken, incrementDownloadCount } from '@/lib/db';
import path from 'path';
import fs from 'fs';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  if (!token) {
    return NextResponse.json({ error: 'Token is required' }, { status: 400 });
  }

  const purchase = getPurchaseByToken(token);

  if (!purchase) {
    return NextResponse.json({ error: 'Invalid download token' }, { status: 404 });
  }

  // Check if token has expired
  if (new Date() > purchase.tokenExpiresAt) {
    return NextResponse.json({ error: 'Download link has expired' }, { status: 410 });
  }

  // Check download limit
  if (purchase.downloadCount >= purchase.maxDownloads) {
    return NextResponse.json({ error: 'Download limit reached' }, { status: 403 });
  }

  // Increment download count
  incrementDownloadCount(token);

  // Serve the PDF file
  const pdfPath = path.join(process.cwd(), 'public', 'products', 'special-needs-parent-guide.pdf');

  if (!fs.existsSync(pdfPath)) {
    return NextResponse.json({ error: 'PDF file not found' }, { status: 404 });
  }

  const fileBuffer = fs.readFileSync(pdfPath);

  return new NextResponse(fileBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="Special-Needs-Parent-Guide.pdf"`,
      'Content-Length': fileBuffer.length.toString(),
    },
  });
}