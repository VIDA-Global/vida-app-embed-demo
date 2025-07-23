import nodemailer from 'nodemailer';

export async function sendInviteEmail(to, link) {
  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    INVITE_FROM,
  } = process.env;

  if (!SMTP_HOST) {
    console.warn('SMTP configuration missing; skipping invite email');
    return;
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: false,
    auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
  });

  await transporter.sendMail({
    from: INVITE_FROM || SMTP_USER,
    to,
    subject: 'You have been invited',
    text: `You have been invited. Click the link to join: ${link}`,
    html: `<p>You have been invited. Click the link to join:</p><p><a href="${link}">${link}</a></p>`,
  });
}

export async function sendPasswordResetEmail(to, link) {
  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    RESET_FROM,
  } = process.env;

  if (!SMTP_HOST) {
    console.warn('SMTP configuration missing; skipping password reset email');
    return;
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: false,
    auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
  });

  await transporter.sendMail({
    from: RESET_FROM || SMTP_USER,
    to,
    subject: 'Reset your password',
    text: `Click the link to reset your password: ${link}`,
    html: `<p>Click the link to reset your password:</p><p><a href="${link}">${link}</a></p>`,
  });
}
