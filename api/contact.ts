import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const escapeHtml = (value: string) =>
    value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default async function handler(
    req: VercelRequest,
    res: VercelResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({
            message: "Method not allowed.",
        });
    }

    try {
        const body = req.body ?? {};

        const name = String(body.name ?? "").trim();
        const email = String(body.email ?? "").trim();
        const subject = String(body.subject ?? "").trim();
        const message = String(body.message ?? "").trim();

        // Validate required fields
        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                message: "Please fill in all fields.",
            });
        }

        // Validate email
        if (!isValidEmail(email)) {
            return res.status(400).json({
                message: "Please provide a valid email address.",
            });
        }

        // Validate length
        if (
            name.length > 100 ||
            email.length > 254 ||
            subject.length > 200 ||
            message.length > 5000
        ) {
            return res.status(400).json({
                message: "One or more fields are too long.",
            });
        }

        // Escape user input before putting it into HTML
        const safeName = escapeHtml(name);
        const safeEmail = escapeHtml(email);
        const safeSubject = escapeHtml(subject);
        const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

        // Check environment variables
        if (!process.env.RESEND_API_KEY) {
            console.error("RESEND_API_KEY is missing.");

            return res.status(500).json({
                message: "Email service is not configured.",
            });
        }

        if (!process.env.CONTACT_EMAIL) {
            console.error("CONTACT_EMAIL is missing.");

            return res.status(500).json({
                message: "Contact email is not configured.",
            });
        }

        // Send email through Resend
        const { error } = await resend.emails.send({
            from: "Portfolio Contact <onboarding@resend.dev>",
            to: process.env.CONTACT_EMAIL,
            replyTo: email,
            subject: `Portfolio Contact: ${subject}`,
            html: `
                <h2>New Portfolio Message</h2>

                <p>
                    <strong>Name:</strong>
                    ${safeName}
                </p>

                <p>
                    <strong>Email:</strong>
                    ${safeEmail}
                </p>

                <p>
                    <strong>Subject:</strong>
                    ${safeSubject}
                </p>

                <hr />

                <p>${safeMessage}</p>
            `,
        });

        if (error) {
            console.error("Resend error:", error);

            return res.status(500).json({
                message: "Failed to send message.",
            });
        }

        return res.status(200).json({
            message: "Message sent successfully.",
        });

    } catch (error) {
        console.error("Contact API error:", error);

        return res.status(500).json({
            message: "Server error while sending message.",
        });
    }
}
