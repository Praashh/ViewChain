import { Proof, verifyProof } from '@reclaimprotocol/js-sdk'; 
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Get the request body
    const body = await req.json();
    
    const proof = body as Proof[];

    const result = await verifyProof(proof);
    if (!result) {
      return NextResponse.json({ error: 'Invalid proofs data' }, { status: 400 });
    }

    console.log('Received proofs:', proof);
    
    return NextResponse.json({ message: 'OK' }, { status: 200 });
  } catch (error) {
    console.error('Error processing proofs:', error);
    return NextResponse.json({ 
      error: 'Failed to process proofs',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}