import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }

    // Configure your SMTP transporter here.
    // For development, you can use services like Mailtrap or Ethereal.
    // For production, use your real SMTP credentials via environment variables.
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST ?? "smtp.ethereal.email",
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL ?? process.env.SMTP_USER,
      replyTo: email,
      subject: `[Portfolio] Nova mensagem de ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #3b82f6; margin-bottom: 8px;">Nova mensagem do portfólio</h2>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin-bottom: 20px;" />
          <p><strong>Nome:</strong> ${name}</p>
          <p><strong>E-mail:</strong> ${email}</p>
          <p><strong>Mensagem:</strong></p>
          <p style="background: #f9fafb; padding: 16px; border-radius: 8px; border-left: 4px solid #3b82f6;">${message.replace(/\n/g, "<br>")}</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin-top: 20px;" />
          <p style="color: #9ca3af; font-size: 12px;">Enviado via portfólio de Rafael Nunes Neumann</p>
        </div>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Contact API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
