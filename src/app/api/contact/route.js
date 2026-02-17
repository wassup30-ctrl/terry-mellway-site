export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return Response.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY is not set');
      return Response.json(
        { error: 'Email service is not configured.' },
        { status: 500 }
      );
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Terry Mellway Site <onboarding@resend.dev>',
        to: '6artist6@gmail.com',
        reply_to: email,
        subject: `Contact form: ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      console.error('Resend API error:', res.status, data);
      return Response.json(
        { error: 'Failed to send email. Please try again later.' },
        { status: 502 }
      );
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return Response.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}
