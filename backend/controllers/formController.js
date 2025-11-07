const { validationResult } = require('express-validator');
const mailService = require('../services/mailService');

/**
 * Contrôleur pour la gestion des formulaires de contact/devis
 */
class FormController {
  /**
   * Traite la soumission d'un formulaire de contact
   * POST /api/form/submit
   */
  async submitForm(req, res, next) {
    try {
      // Vérification des erreurs de validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Données de formulaire invalides',
          errors: errors.array()
        });
      }

      const formData = req.body;
      
      // Log de la réception du formulaire (sans données sensibles)
      console.log(`📝 Nouveau formulaire reçu de: ${formData.email || 'email non fourni'}`);

      // Envoi des emails en parallèle pour optimiser les performances
      const emailPromises = [
        mailService.sendAdminNotification(formData),
        mailService.sendClientConfirmation(formData)
      ];

      const emailResults = await Promise.allSettled(emailPromises);
      
      // Vérification des résultats d'envoi
      const adminEmailSuccess = emailResults[0].status === 'fulfilled';
      const clientEmailSuccess = emailResults[1].status === 'fulfilled';

      // Log des erreurs d'email si nécessaire
      if (!adminEmailSuccess) {
        console.error('❌ Erreur envoi email admin:', emailResults[0].reason);
      }
      if (!clientEmailSuccess) {
        console.error('❌ Erreur envoi email client:', emailResults[1].reason);
      }

      // Réponse selon le succès des envois
      if (adminEmailSuccess && clientEmailSuccess) {
        // Succès complet
        return res.status(200).json({
          success: true,
          message: 'Votre demande a été envoyée avec succès. Vous allez recevoir un email de confirmation.',
          data: {
            adminEmailSent: true,
            confirmationEmailSent: true,
            submittedAt: new Date().toISOString()
          }
        });
      } else if (adminEmailSuccess) {
        // Seul l'email admin a réussi
        return res.status(200).json({
          success: true,
          message: 'Votre demande a été envoyée avec succès.',
          warning: 'L\'email de confirmation n\'a pas pu être envoyé.',
          data: {
            adminEmailSent: true,
            confirmationEmailSent: false,
            submittedAt: new Date().toISOString()
          }
        });
      } else {
        // Échec des envois d'emails
        throw new Error('Impossible d\'envoyer les emails');
      }

    } catch (error) {
      console.error('❌ Erreur lors du traitement du formulaire:', error);
      next(error);
    }
  }

  /**
   * Endpoint de test pour vérifier le fonctionnement
   * GET /api/form/test
   */
  async testForm(req, res) {
    try {
      res.status(200).json({
        success: true,
        message: 'Service de formulaire opérationnel',
        timestamp: new Date().toISOString(),
        config: {
          adminEmail: process.env.ADMIN_EMAIL ? 'configuré' : 'non configuré',
          smtpConfig: process.env.GMAIL_USER ? 'configuré' : 'non configuré'
        }
      });
    } catch (error) {
      console.error('❌ Erreur test formulaire:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors du test du service'
      });
    }
  }

  /**
   * Endpoint de debug pour tester la validation sans envoyer d'emails
   * POST /api/form/validate
   */
  async validateForm(req, res) {
    try {
      // Vérification des erreurs de validation
      const errors = validationResult(req);
      
      if (!errors.isEmpty()) {
        return res.status(200).json({
          success: false,
          message: 'Validation échouée',
          errors: errors.array(),
          receivedData: req.body
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Validation réussie - les données sont valides',
        receivedData: req.body
      });
    } catch (error) {
      console.error('❌ Erreur validation:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la validation'
      });
    }
  }

  /**
   * Récupère les types de demandes disponibles
   * GET /api/form/types
   */
  async getFormTypes(req, res) {
    try {
      const formTypes = [
        'Installation climatisation',
        'Dépannage climatisation',
        'Dépannage climatisation réversible',
        'Dépannage pompe à chaleur air-eau',
        'Dépannage pompe à chaleur piscine',
        'Entretien climatisation',
        'Entretien climatisation réversible',
        'Entretien pompe à chaleur air-eau',
        'Entretien pompe à chaleur piscine',
        'Climatisation réversible',
        'Pompe à chaleur air-air',
        'Pompe à chaleur air-eau',
        'Pompe à chaleur piscine',
        'Devis gratuit',
        'Autre demande'
      ];

      res.status(200).json({
        success: true,
        data: formTypes
      });
    } catch (error) {
      console.error('❌ Erreur récupération types:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération des types de demande'
      });
    }
  }
}

module.exports = new FormController();
