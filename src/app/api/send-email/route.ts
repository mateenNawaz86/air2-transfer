import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY environment variable is not set')
}

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { to, subject, html, from } = await request.json()

    console.log('Email request received:', { to, subject, from })

    // Use Resend SDK
    const { data, error } = await resend.emails.send({
      from: from || 'onboarding@resend.dev', // Use Resend's default domain for testing
      to: to, // Resend expects a string, not an array
      subject,
      html
    })

    if (error) {
      console.error('Resend API error:', error)
      return NextResponse.json(
        { success: false, error: `Resend API error: ${error.message}` },
        { status: 400 }
      )
    }

    console.log('Email sent successfully via Resend:', data)

    return NextResponse.json({ 
      success: true, 
      message: 'Email sent successfully',
      id: data?.id 
    })

  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { success: false, error: `Failed to send email: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    )
  }
}
