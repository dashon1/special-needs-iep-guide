import { NextRequest, NextResponse } from 'next/server';
import { getStats } from '@/lib/db';

export async function GET(request: NextRequest) {
  // Simple admin check (in production, use proper authentication)
  const adminKey = request.headers.get('x-admin-key');

  if (adminKey !== process.env.ADMIN_PASSWORD) {
    // Allow access in development mode without auth
    if (process.env.NODE_ENV === 'development') {
      const stats = getStats();
      return NextResponse.json(stats);
    }
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const stats = getStats();
  return NextResponse.json(stats);
}