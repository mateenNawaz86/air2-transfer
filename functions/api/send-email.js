export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const { to, subject, html, from } = await request.json();

    console.log('Email request received:', { to, subject, from });

    if (!env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY environment variable is not set');
    }

    // Use Resend API
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: from || 'Air2Transport <info@air2transport.com>',
        to: to,
        subject,
        html
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Resend API error:', errorData);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: `Resend API error: ${errorData.message || 'Unknown error'}` 
        }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const result = await response.json();
    console.log('Email sent successfully via Resend:', result);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Email sent successfully',
        id: result?.id 
      }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: `Failed to send email: ${error.message || 'Unknown error'}` 
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
