import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const postcode = searchParams.get('postcode');

  if (!postcode) return NextResponse.json({ addresses: [] });

  const key = process.env.GETADDRESS_API_KEY || '0o4AI818EEyLkV3wutzE1Q52238';
  if (!key) return NextResponse.json({ addresses: [], error: 'no_key' });

  const url = `https://api.getaddress.io/find/${postcode.replace(/\s/g, '')}?api-key=${key}&expand=true`;

  try {
    const res = await fetch(url, { cache: 'no-store' });
    const body = await res.text();

    if (!res.ok) {
      return NextResponse.json({ addresses: [], debug: `http_${res.status}`, body });
    }

    const data = JSON.parse(body);
    const addresses = (data.addresses || [])
      .map(a => a.formatted_address.filter(Boolean).join(', '))
      .sort((a, b) => {
        const na = parseInt(a.match(/^\d+/)?.[0] ?? '0');
        const nb = parseInt(b.match(/^\d+/)?.[0] ?? '0');
        return na !== nb ? na - nb : a.localeCompare(b);
      });

    return NextResponse.json({ addresses, count: addresses.length });
  } catch (err) {
    return NextResponse.json({ addresses: [], debug: 'fetch_error', error: String(err) });
  }
}
