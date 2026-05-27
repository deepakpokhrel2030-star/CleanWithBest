import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const postcode = searchParams.get('postcode');

  if (!postcode) return NextResponse.json({ addresses: [] });

  const key = process.env.GETADDRESS_API_KEY || process.env.NEXT_PUBLIC_GETADDRESS_API_KEY;
  if (!key) return NextResponse.json({ addresses: [], error: 'no_key' });

  try {
    const res = await fetch(
      `https://api.getaddress.io/find/${encodeURIComponent(postcode)}?api-key=${key}&expand=true`,
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) return NextResponse.json({ addresses: [], error: `api_${res.status}` });

    const data = await res.json();
    const addresses = (data.addresses || [])
      .map(a => a.formatted_address.filter(Boolean).join(', '))
      .sort((a, b) => {
        const na = parseInt(a.match(/^\d+/)?.[0] ?? '0');
        const nb = parseInt(b.match(/^\d+/)?.[0] ?? '0');
        return na !== nb ? na - nb : a.localeCompare(b);
      });

    return NextResponse.json({ addresses });
  } catch {
    return NextResponse.json({ addresses: [] });
  }
}
