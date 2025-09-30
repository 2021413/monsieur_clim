const nodemailer = require('nodemailer');

/**
 * Configuration du transporteur Nodemailer pour Gmail
 * Utilise les App Passwords de Gmail pour l'authentification
 */
const createTransporter = () => {
  // Vérification des variables d'environnement requises
  if (!process.env.GMAIL_USER || !process.env.GMAIL_PASSWORD) {
    throw new Error('Configuration Gmail manquante: GMAIL_USER et GMAIL_PASSWORD sont requis');
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD // App Password Gmail
    },
    // Configuration supplémentaire pour la fiabilité
    pool: true,
    maxConnections: 5,
    maxMessages: 100,
    rateDelta: 20000, // 20 secondes
    rateLimit: 5 // 5 emails max par rateDelta
  });

  // Vérification de la connexion au démarrage
  transporter.verify((error, success) => {
    if (error) {
      console.error('❌ Erreur de configuration Nodemailer:', error);
    } else {
      console.log('✅ Serveur SMTP Gmail connecté et prêt');
    }
  });

  return transporter;
};

/**
 * Options par défaut pour les emails
 */
const getDefaultMailOptions = () => ({
  from: {
    name: process.env.COMPANY_NAME || 'MonsieurClim',
    address: process.env.GMAIL_USER
  }
});

/**
 * Templates HTML pour les emails
 */
const emailTemplates = {
  // Template pour l'email admin (réception formulaire)
  adminNotification: (formData) => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Nouveau message depuis le site MonsieurClim</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
        .content { background: #f8f9fa; padding: 20px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #495057; }
        .value { margin-left: 10px; }
        .footer { background: #e9ecef; padding: 15px; text-align: center; font-size: 12px; color: #6c757d; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📧 Nouveau message depuis le site</h1>
        </div>
        <div class="content">
          <div class="field">
            <span class="label">Nom:</span>
            <span class="value">${formData.nom || 'Non renseigné'}</span>
          </div>
          <div class="field">
            <span class="label">Email:</span>
            <span class="value">${formData.email || 'Non renseigné'}</span>
          </div>
          <div class="field">
            <span class="label">Téléphone:</span>
            <span class="value">${formData.telephone || 'Non renseigné'}</span>
          </div>
          <div class="field">
            <span class="label">Type de demande:</span>
            <span class="value">${formData.typedemande || 'Non renseigné'}</span>
          </div>
          <div class="field">
            <span class="label">Message:</span>
            <div style="margin-top: 10px; padding: 15px; background: white; border-left: 4px solid #2563eb;">
              ${formData.message || 'Aucun message'}
            </div>
          </div>
          <div class="field">
            <span class="label">Date de réception:</span>
            <span class="value">${new Date().toLocaleString('fr-FR')}</span>
          </div>
        </div>
        <div class="footer">
          <p>Message reçu automatiquement depuis le formulaire de contact du site MonsieurClim</p>
        </div>
      </div>
    </body>
    </html>
  `,

  // Template pour l'email de confirmation client
  clientConfirmation: (formData) => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Confirmation de réception - MonsieurClim</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
        .content { background: #f8f9fa; padding: 20px; }
        .highlight { background: #e3f2fd; padding: 15px; border-left: 4px solid #2563eb; margin: 20px 0; }
        .footer { background: #e9ecef; padding: 15px; text-align: center; font-size: 12px; color: #6c757d; }
        .contact-info { background: white; padding: 15px; margin: 15px 0; border-radius: 5px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✅ Demande bien reçue !</h1>
        </div>
        <div class="content">
          <p>Bonjour ${formData.nom || 'Cher client'},</p>
          
          <div class="highlight">
            <p><strong>Votre demande a été bien prise en compte.</strong></p>
            <p>Nous vous recontacterons dans les plus brefs délais pour répondre à votre demande concernant : <strong>${formData.typedemande || 'votre demande'}</strong></p>
          </div>
          
          <p>Notre équipe d'experts en climatisation analyse votre demande et vous proposera la solution la plus adaptée à vos besoins.</p>
          
          <div class="contact-info">
            <h3>📞 Vous pouvez également nous contacter :</h3>
            <p><strong>Téléphone :</strong> ${process.env.COMPANY_PHONE || '01 23 45 67 89'}</p>
            <p><strong>Email :</strong> ${process.env.COMPANY_EMAIL || 'contact@monsieurclim.fr'}</p>
          </div>
          
          <p>Merci de votre confiance,<br>
          <strong>L'équipe ${process.env.COMPANY_NAME || 'MonsieurClim'}</strong></p>
        </div>
        <div class="footer">
          <p>Cet email est envoyé automatiquement, merci de ne pas y répondre.</p>
          <p>Pour toute question, contactez-nous directement.</p>
        </div>
      </div>
    </body>
    </html>
  `
};

module.exports = {
  createTransporter,
  getDefaultMailOptions,
  emailTemplates
};
