// app/api/resources/route.ts
import { google } from 'googleapis';
import { NextResponse } from 'next/server';

// Revalidate değeri - 60 saniye
export const revalidate = 60;

async function getGoogleSheetsClient() {
  const credentials = {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    // Replace literal "\n" in the key with actual newlines
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  };

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  return sheets;
}

// GET handler in the new App Router API route
export async function GET() {
  try {
    const sheets = await getGoogleSheetsClient();

    // Adjust spreadsheetId and range as needed.
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'A2:E',
    });

    const resources = (response.data.values || [])
      .map(([name, link, description, lesson, tags]) => ({
        name: name?.toString().trim() || '',
        link: link?.toString().trim() || '',
        description: description?.toString().trim() || '',
        lesson: lesson?.toString().trim() || null,
        tags: tags?.toString().trim() || null,
      }))
      .filter((resource) => resource.name && resource.link && resource.description);

    // Zaman damgası ekleyelim
    const timestamp = new Date().toLocaleTimeString('tr-TR');
    
    console.log(`Kaynaklar yenilendi: ${timestamp}`);

    // Return a JSON response and set caching headers for both CDN and client.
    return NextResponse.json({
      resources, 
      _metadata: {
        lastUpdated: timestamp,
        revalidationPeriod: '60 saniye'
      }
    }, {
      headers: {
        // 60 saniye boyunca önbellekte tutulacak ve arka planda yenilenecek
        'Cache-Control': 's-maxage=60, stale-while-revalidate=59',
      },
    });
  } catch (error: any) {
    console.error('Sheets API Error:', error);

    const message =
      process.env.NODE_ENV === 'development'
        ? error.message
        : 'Internal Server Error';

    return NextResponse.json(
      { message: 'Error fetching resources', error: message },
      { status: 500 }
    );
  }
}
