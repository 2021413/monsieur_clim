const { createTransporter, getDefaultMailOptions, emailTemplates } = require('../config/mailer');

/**
 * Service pour l'envoi d'emails via Nodemailer
 */
class MailService {
  constructor() {
    this.transporter = null;
    this.isConfigured = false;
    this.initializeTransporter();
  }

  /**
   * Initialise le transporteur Nodemailer
   */
  initializeTransporter() {
    try {
      this.transporter = createTransporter();
      this.isConfigured = true;
      console.log('✅ Service mail initialisé avec succès');
    } catch (error) {
      console.error('❌ Erreur initialisation service mail:', error.message);
      this.isConfigured = false;
    }
  }

  /**
   * Vérifie si le service mail est configuré
   */
  checkConfiguration() {
    if (!this.isConfigured || !this.transporter) {
      throw new Error('Service mail non configuré - vérifiez GMAIL_USER et GMAIL_PASSWORD');
    }
  }

  /**
   * Envoie un email à l'administrateur avec les données du formulaire
   * @param {Object} formData - Données du formulaire de contact
   */
  async sendAdminNotification(formData) {
    this.checkConfiguration();

    try {
      const defaultOptions = getDefaultMailOptions();
      
      const mailOptions = {
        ...defaultOptions,
        to: process.env.ADMIN_EMAIL,
        subject: `🔔 Nouveau message depuis le site - ${formData.typedemande || 'Contact'}`,
        html: emailTemplates.adminNotification(formData),
        // Version texte de secours
        text: this.createPlainTextVersion(formData, 'admin')
      };

      console.log(`📤 Envoi email admin à: ${process.env.ADMIN_EMAIL}`);
      const result = await this.transporter.sendMail(mailOptions);
      
      console.log('✅ Email admin envoyé avec succès:', result.messageId);
      return {
        success: true,
        messageId: result.messageId,
        recipient: process.env.ADMIN_EMAIL
      };

    } catch (error) {
      console.error('❌ Erreur envoi email admin:', error);
      throw new Error(`Impossible d'envoyer l'email à l'administrateur: ${error.message}`);
    }
  }

  /**
   * Envoie un email de confirmation au client
   * @param {Object} formData - Données du formulaire de contact
   */
  async sendClientConfirmation(formData) {
    this.checkConfiguration();

    // Vérification que l'email client est fourni
    if (!formData.email) {
      throw new Error('Email client non fourni pour l\'envoi de confirmation');
    }

    try {
      const defaultOptions = getDefaultMailOptions();
      
      const mailOptions = {
        ...defaultOptions,
        to: formData.email,
        subject: `✅ Confirmation de réception - ${process.env.COMPANY_NAME || 'MonsieurClim'}`,
        html: emailTemplates.clientConfirmation(formData),
        // Version texte de secours
        text: this.createPlainTextVersion(formData, 'client')
      };

      console.log(`📤 Envoi email confirmation à: ${formData.email}`);
      const result = await this.transporter.sendMail(mailOptions);
      
      console.log('✅ Email confirmation envoyé avec succès:', result.messageId);
      return {
        success: true,
        messageId: result.messageId,
        recipient: formData.email
      };

    } catch (error) {
      console.error('❌ Erreur envoi email confirmation:', error);
      throw new Error(`Impossible d'envoyer l'email de confirmation: ${error.message}`);
    }
  }

  /**
   * Crée une version texte simple de l'email
   * @param {Object} formData - Données du formulaire
   * @param {string} type - Type d'email ('admin' ou 'client')
   */
  createPlainTextVersion(formData, type) {
    if (type === 'admin') {
      return `
NOUVEAU MESSAGE DEPUIS LE SITE MONSIEURCLIM

Nom: ${formData.nom || 'Non renseigné'}
Email: ${formData.email || 'Non renseigné'}
Téléphone: ${formData.telephone || 'Non renseigné'}
Type de demande: ${formData.typedemande || 'Non renseigné'}

Message:
${formData.message || 'Aucun message'}

Date de réception: ${new Date().toLocaleString('fr-FR')}

---
Message reçu automatiquement depuis le formulaire de contact du site MonsieurClim
      `;
    } else {
      return `
CONFIRMATION DE RÉCEPTION - MONSIEURCLIM

Bonjour ${formData.nom || 'Cher client'},

Votre demande a été bien prise en compte.
Nous vous recontacterons dans les plus brefs délais pour répondre à votre demande concernant : ${formData.typedemande || 'votre demande'}

Notre équipe d'experts en climatisation analyse votre demande et vous proposera la solution la plus adaptée à vos besoins.

Vous pouvez également nous contacter :
Téléphone : ${process.env.COMPANY_PHONE || '06 46 07 15 39'}
Email : ${process.env.COMPANY_EMAIL || 'monsieurclim83@gmail.com'}

Merci de votre confiance,
L'équipe ${process.env.COMPANY_NAME || 'MonsieurClim'}

---
Cet email est envoyé automatiquement, merci de ne pas y répondre.
Pour toute question, contactez-nous directement.
      `;
    }
  }

  /**
   * Test de la configuration du service mail
   */
  async testConfiguration() {
    try {
      this.checkConfiguration();
      
      // Test de la connexion SMTP
      await this.transporter.verify();
      
      return {
        configured: true,
        smtpConnected: true,
        adminEmail: process.env.ADMIN_EMAIL || 'non configuré'
      };
    } catch (error) {
      return {
        configured: false,
        error: error.message,
        adminEmail: process.env.ADMIN_EMAIL || 'non configuré'
      };
    }
  }

  /**
   * Envoie un email de test
   * @param {string} testEmail - Email de destination pour le test
   */
  async sendTestEmail(testEmail) {
    this.checkConfiguration();

    const defaultOptions = getDefaultMailOptions();
    
    const mailOptions = {
      ...defaultOptions,
      to: testEmail,
      subject: '🧪 Test de configuration email - MonsieurClim',
      html: `
        <h2>Test de configuration réussi !</h2>
        <p>Ce message confirme que la configuration email de MonsieurClim fonctionne correctement.</p>
        <p><strong>Date du test :</strong> ${new Date().toLocaleString('fr-FR')}</p>
      `,
      text: `Test de configuration réussi ! Ce message confirme que la configuration email de MonsieurClim fonctionne correctement. Date du test : ${new Date().toLocaleString('fr-FR')}`
    };

    const result = await this.transporter.sendMail(mailOptions);
    return {
      success: true,
      messageId: result.messageId,
      recipient: testEmail
    };
  }
}

module.exports = new MailService();
