import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      phone,
      email,
      service,
      location,
      message,
      utmSource,
      utmMedium,
      utmCampaign,
      utmTerm,
      gclid,
    } = body;

    // Server-side validation
    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: 'Name and Phone number are required fields.' },
        { status: 400 }
      );
    }

    // Prepare Lead Record
    const leadRecord = {
      timestamp: new Date().toISOString(),
      name,
      phone,
      email: email || 'N/A',
      service: service || 'Not Selected',
      location: location || 'N/A',
      message: message || 'N/A',
      utm: {
        source: utmSource || 'organic/direct',
        medium: utmMedium || 'none',
        campaign: utmCampaign || 'none',
        term: utmTerm || 'none',
        gclid: gclid || 'none',
      },
    };

    // ── Log the lead (always logs to stdout in production, readable in cloud console)
    console.log('📬 NEW LEAD RECEIVED:', JSON.stringify(leadRecord, null, 2));

    // ── Placeholder for SMTP Email Integration ──
    // In production, configure environment variables: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_EMAIL
    // Using nodemailer:
    // const transporter = nodemailer.createTransport({ host: process.env.SMTP_HOST, port: 587, auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } });
    // await transporter.sendMail({ from: '"Apparao Safety Nets" <apparaosafetynet555@gmail.com>', to: process.env.CONTACT_EMAIL, subject: `New Lead: ${name} - ${service}`, text: ... });

    // ── Placeholder for Google Sheets Integration ──
    // Fetch a Google Sheets API endpoint or Zapier Webhook
    // await fetch(process.env.ZAPIER_WEBHOOK_URL, { method: 'POST', body: JSON.stringify(leadRecord) });

    return NextResponse.json({
      success: true,
      message: 'Lead captured successfully.',
      leadId: Math.random().toString(36).substring(2, 9),
    });
  } catch (error: unknown) {
    console.error('❌ Lead capture error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error while capturing lead.' },
      { status: 500 }
    );
  }
}
