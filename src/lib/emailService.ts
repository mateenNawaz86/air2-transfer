import { createClient } from '@/lib/auth'

interface EmailData {
  recipient_email: string
  recipient_name: string
  subject: string
  body: string
  booking_id: string
  booking_type: string
}

export async function sendBookingEmail(emailData: EmailData) {
  try {
    // Validate email data
    if (!emailData.recipient_email) {
      throw new Error('Recipient email is required')
    }
    
    console.log('Sending email to:', emailData.recipient_email)
    
    // Use Cloudflare Function for email sending
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: emailData.recipient_email,
        subject: emailData.subject,
        html: emailData.body.replace(/\n/g, '<br>'),
        from: 'Air2 Transport <noreply@jet2transport.com>'
      })
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(`Email sending failed: ${response.statusText} - ${JSON.stringify(errorData)}`)
    }

    const result = await response.json()
    console.log('Email sent successfully:', result)
    return { success: true, data: result }
  } catch (error) {
    console.error('Error sending booking email:', error)
    return { success: false, error }
  }
}

export async function processEmailQueue() {
  try {
    const supabase = createClient()
    
    // Get pending emails from the queue
    const { data: pendingEmails, error } = await supabase
      .from('email_queue')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: true })
      .limit(10) // Process 10 emails at a time

    if (error) {
      console.error('Error fetching email queue:', error)
      return
    }

    if (!pendingEmails || pendingEmails.length === 0) {
      return
    }

    console.log(`Processing ${pendingEmails.length} pending emails`)

    for (const email of pendingEmails) {
      try {
        // Send the email
        const result = await sendBookingEmail({
          recipient_email: email.recipient_email,
          recipient_name: email.recipient_name,
          subject: email.subject,
          body: email.body,
          booking_id: email.booking_id,
          booking_type: email.booking_type
        })

        if (result.success) {
          // Mark as sent
          await supabase
            .from('email_queue')
            .update({
              status: 'sent',
              sent_at: new Date().toISOString()
            })
            .eq('id', email.id)
          
          console.log(`Email sent successfully to ${email.recipient_email}`)
        } else {
          // Mark as failed
          await supabase
            .from('email_queue')
            .update({
              status: 'failed',
              error_message: result.error?.toString()
            })
            .eq('id', email.id)
          
          console.error(`Failed to send email to ${email.recipient_email}:`, result.error)
        }
      } catch (error) {
        console.error(`Error processing email ${email.id}:`, error)
        
        // Mark as failed
        await supabase
          .from('email_queue')
          .update({
            status: 'failed',
            error_message: error?.toString()
          })
          .eq('id', email.id)
      }
    }
  } catch (error) {
    console.error('Error processing email queue:', error)
  }
}

// Function to send booking confirmation email directly (for immediate sending)
export async function sendBookingConfirmationEmail(
  customerEmail: string,
  customerName: string,
  bookingDetails: {
    pickupLocation: string
    dropoffLocation: string
    pickupTime: string
    serviceType: string
    price: number
    status: string
  }
) {
  const isPending = bookingDetails.status === 'pending'
  
  const subject = isPending 
    ? 'Booking Received - Air2 Transport'
    : 'Booking Confirmed - Air2 Transport'

  const statusMessage = isPending
    ? 'Your booking is currently pending confirmation. We will review your request and get back to you shortly.'
    : 'Your booking has been confirmed and a driver has been assigned. Your driver will contact you directly before your pickup time.'

  const body = `
Dear ${customerName},

${isPending ? 'Thank you for choosing Air2 Transport! We have received your booking request.' : 'Great news! Your booking has been confirmed and a driver has been assigned.'}

Booking Details:
From: ${bookingDetails.pickupLocation}
To: ${bookingDetails.dropoffLocation}
Date: ${new Date(bookingDetails.pickupTime).toLocaleDateString('en-GB')}
Time: ${new Date(bookingDetails.pickupTime).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
Service: ${bookingDetails.serviceType}
Price: £${bookingDetails.price.toFixed(2)}
Status: ${bookingDetails.status.charAt(0).toUpperCase() + bookingDetails.status.slice(1)}

${statusMessage}

If you have any questions, please contact us at 01213141080.

Best regards,
Air2 Transport Team
  `.trim()

  return await sendBookingEmail({
    recipient_email: customerEmail,
    recipient_name: customerName,
    subject,
    body,
    booking_id: '',
    booking_type: 'direct'
  })
}

// Function to send driver acceptance email
export async function sendDriverAcceptanceEmail(
  customerEmail: string,
  customerName: string,
  bookingDetails: {
    pickupLocation: string
    dropoffLocation: string
    pickupTime: string
    serviceType: string
    price: number
  },
  accepted: boolean,
  rejectionReason?: string
) {
  const subject = accepted 
    ? 'Driver Accepted Your Booking - Air2 Transport'
    : 'Driver Update on Your Booking - Air2 Transport'

  const statusMessage = accepted
    ? 'Great news! Your assigned driver has accepted your booking and will contact you directly before your pickup time.'
    : `Unfortunately, your assigned driver has declined this booking. ${rejectionReason ? `Reason: ${rejectionReason}` : ''} We will assign you a new driver shortly.`

  const body = `
Dear ${customerName},

${accepted 
  ? 'Great news! Your assigned driver has accepted your booking and will contact you directly before your pickup time.'
  : 'Unfortunately, your assigned driver has declined this booking. We will assign you a new driver shortly.'
}

Booking Details:
From: ${bookingDetails.pickupLocation}
To: ${bookingDetails.dropoffLocation}
Date: ${new Date(bookingDetails.pickupTime).toLocaleDateString('en-GB')}
Time: ${new Date(bookingDetails.pickupTime).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
Service: ${bookingDetails.serviceType}
Price: £${bookingDetails.price.toFixed(2)}

${statusMessage}

${rejectionReason ? `Rejection Reason: ${rejectionReason}` : ''}

If you have any questions, please contact us at 01213141080.

Best regards,
Air2 Transport Team
  `.trim()

  return await sendBookingEmail({
    recipient_email: customerEmail,
    recipient_name: customerName,
    subject,
    body,
    booking_id: '',
    booking_type: 'driver_acceptance'
  })
}

// Function to send booking completion email
export async function sendBookingCompletionEmail(
  customerEmail: string,
  customerName: string,
  bookingDetails: {
    pickupLocation: string
    dropoffLocation: string
    pickupTime: string
    serviceType: string
    price: number
  }
) {
  const subject = 'Ride Completed - Air2 Transport'

  const body = `
Dear ${customerName},

Your ride has been completed successfully! We hope you had a pleasant journey with Air2 Transport.

Trip Details:
From: ${bookingDetails.pickupLocation}
To: ${bookingDetails.dropoffLocation}
Date: ${new Date(bookingDetails.pickupTime).toLocaleDateString('en-GB')}
Time: ${new Date(bookingDetails.pickupTime).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
Service: ${bookingDetails.serviceType}
Total: £${bookingDetails.price.toFixed(2)}

Thank you for choosing Air2 Transport! We look forward to serving you again.

If you have any feedback about your journey, please contact us at 01213141080.

Best regards,
Air2 Transport Team
  `.trim()

  return await sendBookingEmail({
    recipient_email: customerEmail,
    recipient_name: customerName,
    subject,
    body,
    booking_id: '',
    booking_type: 'completion'
  })
}

// Function to send driver application submission email
export async function sendDriverApplicationSubmissionEmail(
  driverEmail: string,
  driverName: string,
  applicationDetails: {
    applicationId: string
    submissionDate: string
  }
) {
  const subject = 'Driver Application Received - Air2 Transport'

  const body = `
Dear ${driverName},

Thank you for your interest in joining Air2 Transport as a driver! We have received your application and it is currently under review.

Application Details:
Application ID: ${applicationDetails.applicationId}
Submission Date: ${new Date(applicationDetails.submissionDate).toLocaleDateString('en-GB')}
Status: Pending Review

What happens next:
1. Our team will review your application and documents
2. We will verify all your credentials and references
3. You will receive an email notification once a decision is made
4. If approved, you will be able to start accepting bookings

We typically review applications within 3-5 business days. If you have any questions or need to update your application, please contact us at 01213141080.

Thank you for choosing Air2 Transport!

Best regards,
Air2 Transport Team
  `.trim()

  return await sendBookingEmail({
    recipient_email: driverEmail,
    recipient_name: driverName,
    subject,
    body,
    booking_id: applicationDetails.applicationId,
    booking_type: 'driver_application'
  })
}

// Function to send driver application approval email
export async function sendDriverApplicationApprovalEmail(
  driverEmail: string,
  driverName: string,
  applicationDetails: {
    applicationId: string
    approvalDate: string
  }
) {
  const subject = 'Driver Application Approved - Welcome to Air2 Transport!'

  const body = `
Dear ${driverName},

Congratulations! Your driver application has been approved and you are now officially part of the Air2 Transport team!

Application Details:
Application ID: ${applicationDetails.applicationId}
Approval Date: ${new Date(applicationDetails.approvalDate).toLocaleDateString('en-GB')}
Status: Approved ✅

What's next:
1. You can now log in to your driver dashboard
2. You will start receiving booking notifications
3. You can accept or reject bookings based on your availability
4. Complete rides and mark them as finished to get paid

Important reminders:
- Always maintain professional standards
- Keep your documents up to date
- Contact us immediately if you have any issues
- Check your dashboard regularly for new bookings

Welcome aboard! We're excited to have you as part of our team.

If you have any questions, please contact us at 01213141080.

Best regards,
Air2 Transport Team
  `.trim()

  return await sendBookingEmail({
    recipient_email: driverEmail,
    recipient_name: driverName,
    subject,
    body,
    booking_id: applicationDetails.applicationId,
    booking_type: 'driver_approval'
  })
}

// Function to send driver assignment notification
export async function sendDriverAssignmentNotification(
  driverEmail: string,
  driverName: string,
  bookingDetails: {
    pickupLocation: string
    dropoffLocation: string
    pickupTime: string
    serviceType: string
    price: number
    customerName: string
    customerPhone?: string
  }
) {
  const subject = 'New Booking Assignment - Air2 Transport'

  const body = `
Dear ${driverName},

You have been assigned a new booking! Please review the details below and accept or reject this assignment.

Booking Details:
From: ${bookingDetails.pickupLocation}
To: ${bookingDetails.dropoffLocation}
Date: ${new Date(bookingDetails.pickupTime).toLocaleDateString('en-GB')}
Time: ${new Date(bookingDetails.pickupTime).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
Service: ${bookingDetails.serviceType}
Price: £${bookingDetails.price.toFixed(2)}

Customer Information:
Name: ${bookingDetails.customerName}
${bookingDetails.customerPhone ? `Phone: ${bookingDetails.customerPhone}` : ''}

Next Steps:
1. Log in to your driver dashboard
2. Review the booking details
3. Accept or reject the assignment
4. Contact the customer if you accept

Please respond to this assignment as soon as possible.

Best regards,
Air2 Transport Team
  `.trim()

  return await sendBookingEmail({
    recipient_email: driverEmail,
    recipient_name: driverName,
    subject,
    body,
    booking_id: '',
    booking_type: 'driver_assignment'
  })
}

// Function to send admin notification for new booking
export async function sendAdminBookingNotification(
  bookingDetails: {
    bookingId?: string
    customerName: string
    customerEmail: string
    customerPhone?: string
    pickupLocation: string
    dropoffLocation: string
    pickupTime: string
    serviceType: string
    price: number
    passengers?: number
    specialRequests?: string
    distance?: number | null
    duration?: number | null
    paymentIntentId?: string
    bookingType: 'guest' | 'authenticated'
  }
) {
  // Get admin email from environment variable, or use default
  // Use NEXT_PUBLIC_ prefix for client-side access
  const adminEmail = (typeof window !== 'undefined' 
    ? process.env.NEXT_PUBLIC_ADMIN_EMAIL 
    : process.env.ADMIN_EMAIL) || 'info@air2transport.com'
  
  const subject = 'New Booking Received - Air2 Transport'

  const formattedDate = new Date(bookingDetails.pickupTime).toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  
  const formattedTime = new Date(bookingDetails.pickupTime).toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit'
  })

  const distanceText = bookingDetails.distance !== null && bookingDetails.distance !== undefined
    ? `${bookingDetails.distance}`
    : 'N/A'
  
  const durationText = bookingDetails.duration !== null && bookingDetails.duration !== undefined
    ? `${bookingDetails.duration}`
    : 'N/A'

  const body = `
New Booking Notification

A new booking has been received and requires your attention.

Booking Details:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Booking ID: ${bookingDetails.bookingId || 'Pending'}
Booking Type: ${bookingDetails.bookingType === 'guest' ? 'Guest Booking' : 'Authenticated User'}
Status: Confirmed (Payment Received)

Customer Information:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: ${bookingDetails.customerName}
Email: ${bookingDetails.customerEmail}
${bookingDetails.customerPhone ? `Phone: ${bookingDetails.customerPhone}` : ''}

Trip Details:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Pickup Location: ${bookingDetails.pickupLocation}
Dropoff Location: ${bookingDetails.dropoffLocation}
Date: ${formattedDate}
Time: ${formattedTime}
Service Type: ${bookingDetails.serviceType}
Passengers: ${bookingDetails.passengers || 1}
Distance: ${distanceText}
Estimated Duration: ${durationText}
Price: £${bookingDetails.price.toFixed(2)}
${bookingDetails.paymentIntentId ? `Payment Intent ID: ${bookingDetails.paymentIntentId}` : ''}

${bookingDetails.specialRequests ? `Special Requests: ${bookingDetails.specialRequests}` : ''}

Next Steps:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Review the booking in the admin dashboard
2. Assign a driver if needed
3. Monitor the booking status

This is an automated notification from the Air2 Transport booking system.
  `.trim()

  return await sendBookingEmail({
    recipient_email: adminEmail,
    recipient_name: 'Admin',
    subject,
    body,
    booking_id: bookingDetails.bookingId || '',
    booking_type: 'admin_notification'
  })
}