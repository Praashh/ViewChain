import { ReclaimProofRequest } from '@reclaimprotocol/js-sdk';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const APP_ID = process.env.RECLAIM_APP_ID as string;
  const APP_SECRET = process.env.RECLAIM_APP_SECRET as string;
  const PROVIDER_ID = process.env.INSTAGRAM_OWNERSHIP_PROVIDER_ID as string;

  try {
    const reclaimProofRequest = await ReclaimProofRequest.init(
      APP_ID,
      APP_SECRET,
      PROVIDER_ID
    );

    reclaimProofRequest.setAppCallbackUrl(
      process.env.RECLAIM_CALLBACK_URL || '/api/receive-proofs'
    );

    const reclaimProofRequestConfig = reclaimProofRequest.toJsonString();

    return NextResponse.json({ reclaimProofRequestConfig }, { status: 200 });
  } catch (error) {
    console.error('Error generating request config:', error);
    return NextResponse.json({ error: 'Failed to generate request config' }, { status: 500 });
  }
}