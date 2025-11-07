const express = require('express');
const { body } = require('express-validator');
const formController = require('../controllers/formController');

const router = express.Router();

/**
 * Règles de validation pour le formulaire de contact
 */
const formValidationRules = [
  body('nom')
    .trim()
    .notEmpty()
    .withMessage('Le nom est obligatoire')
    .isLength({ min: 2, max: 50 })
    .withMessage('Le nom doit contenir entre 2 et 50 caractères')
    .matches(/^[a-zA-ZÀ-ÿ\s\-']+$/)
    .withMessage('Le nom ne peut contenir que des lettres, espaces, tirets et apostrophes'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('L\'email est obligatoire')
    .isEmail()
    .withMessage('Format d\'email invalide')
    .normalizeEmail()
    .isLength({ max: 100 })
    .withMessage('L\'email ne peut pas dépasser 100 caractères'),

  body('telephone')
    .optional()
    .trim()
    .matches(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/)
    .withMessage('Format de téléphone invalide (format français attendu)'),

  body('typedemande')
    .notEmpty()
    .withMessage('Le type de demande est obligatoire')
    .isIn([
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
    ])
    .withMessage('Type de demande invalide'),

  body('message')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Le message doit contenir entre 10 et 1000 caractères'),

  // Champs optionnels avec validation
  body('ville')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Le nom de ville ne peut pas dépasser 50 caractères'),

  body('codepostal')
    .optional()
    .trim()
    .matches(/^[0-9]{5}$/)
    .withMessage('Le code postal doit contenir exactement 5 chiffres'),

  // Protection contre le spam
  body('honeypot')
    .optional()
    .isEmpty()
    .withMessage('Soumission suspecte détectée')
];

/**
 * Routes pour la gestion des formulaires
 */

// POST /api/form/submit - Soumission du formulaire de contact
router.post('/submit', formValidationRules, formController.submitForm);

// POST /api/form/validate - Validation des données sans envoi d'email (debug)
router.post('/validate', formValidationRules, formController.validateForm);

// GET /api/form/types - Récupération des types de demandes disponibles
router.get('/types', formController.getFormTypes);

// GET /api/form/test - Test du service de formulaire
router.get('/test', formController.testForm);

module.exports = router;
