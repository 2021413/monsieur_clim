"use client";
import * as React from "react";
import Input from "./ui/Input";
import Textarea from "./ui/Textarea";
import Select from "./ui/Select";
import Button from "./ui/Button";

interface Props {
  title?: string;
  description?: string;
}

export default function ContactForm({ title, description }: Props) {
  const [state, setState] = React.useState<"idle" | "loading" | "success" | "error">("idle");
  
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    try {
      const fd = new FormData(e.currentTarget);
      
      // Préparation des données pour l'API backend
      const type = fd.get('type') as string;
      const equip = fd.get('equip') as string;
      
      // Mapping des valeurs frontend vers backend (selon les valeurs exactes du backend)
      let typedemande = 'Autre demande';
      
      if (type === 'installation') {
        if (equip === 'pac-air-eau') typedemande = 'Pompe à chaleur air-eau';
        else if (equip === 'pac-air-air') typedemande = 'Climatisation réversible';
        else if (equip === 'pac-piscine') typedemande = 'Pompe à chaleur piscine';
        else typedemande = 'Installation climatisation';
      } else if (type === 'entretien') {
        // Distinguer l'entretien selon le type d'équipement
        if (equip === 'pac-air-air') typedemande = 'Entretien climatisation réversible';
        else if (equip === 'pac-air-eau') typedemande = 'Entretien pompe à chaleur air-eau';
        else if (equip === 'pac-piscine') typedemande = 'Entretien pompe à chaleur piscine';
        else typedemande = 'Entretien climatisation';
      } else if (type === 'depannage') {
        // Distinguer le dépannage selon le type d'équipement
        if (equip === 'pac-air-air') typedemande = 'Dépannage climatisation réversible';
        else if (equip === 'pac-air-eau') typedemande = 'Dépannage pompe à chaleur air-eau';
        else if (equip === 'pac-piscine') typedemande = 'Dépannage pompe à chaleur piscine';
        else typedemande = 'Dépannage climatisation';
      } else if (type === 'devis') {
        typedemande = 'Devis gratuit';
      }

      const formData = {
        nom: fd.get('name') as string,
        email: fd.get('email') as string,
        telephone: fd.get('phone') as string,
        typedemande: typedemande,
        message: fd.get('message') as string
      };

      // Appel à l'API backend  
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
      console.log('📤 Envoi des données:', formData);
      
      const response = await fetch(`${backendUrl}/api/form/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('❌ Erreur backend:', {
          status: response.status,
          statusText: response.statusText,
          errorData
        });
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ Réponse backend:', result);
      setState("success");
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error('❌ Erreur lors de la soumission:', error);
      setState("error");
    }
  }

  return (
    <div className="relative">
      {/* Carte principale du formulaire avec dégradés */}
      <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#1a2135] to-[#161c2e] p-4 sm:p-6 md:p-8 shadow-2xl overflow-hidden">
        
        {/* Éléments décoratifs internes */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/20 to-transparent rounded-full blur-2xl -z-10" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-accent/20 to-transparent rounded-full blur-xl -z-10" />
        
        {/* En-tête du formulaire */}
        {(title || description) && (
          <div className="text-center mb-6 sm:mb-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary to-secondary rounded-xl sm:rounded-2xl mx-auto mb-3 sm:mb-4 flex items-center justify-center">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            {title && (
              <h3 className="font-display text-xl sm:text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-muted">
                {description}
              </p>
            )}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-6 sm:space-y-8">
          {/* Informations personnelles */}
          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
              <h4 className="font-display font-semibold text-foreground">Vos informations</h4>
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-3">
                <label htmlFor="name" className="block text-sm font-medium text-foreground/80">
                  Nom complet *
                </label>
                <Input id="name" name="name" placeholder="Votre nom et prénom" required />
              </div>
              <div className="space-y-3">
                <label htmlFor="phone" className="block text-sm font-medium text-foreground/80">
                  Téléphone *
                </label>
                <Input id="phone" name="phone" placeholder="06 XX XX XX XX" required />
              </div>
            </div>
            
            <div className="space-y-3">
              <label htmlFor="email" className="block text-sm font-medium text-foreground/80">
                Adresse email *
              </label>
              <Input id="email" name="email" type="email" placeholder="votre@email.fr" required />
            </div>
          </div>

          {/* Séparateur visuel */}
          <div className="flex items-center">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
            <div className="px-4">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
          </div>

          {/* Détails du projet */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <h4 className="font-display font-semibold text-foreground">Votre projet</h4>
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-3">
                <label htmlFor="type" className="block text-sm font-medium text-foreground/80">
                  Type d'intervention
                </label>
                <Select id="type" name="type" defaultValue="installation">
                  <option value="installation">Installation</option>
                  <option value="entretien">Entretien</option>
                  <option value="depannage">Dépannage</option>
                  <option value="devis">Devis gratuit</option>
                </Select>
              </div>
              <div className="space-y-3">
                <label htmlFor="equip" className="block text-sm font-medium text-foreground/80">
                  Type d'équipement
                </label>
                <Select id="equip" name="equip" defaultValue="pac-air-eau">
                  <option value="pac-air-eau">Pompe à chaleur air/eau</option>
                  <option value="pac-air-air">Climatisation réversible</option>
                  <option value="pac-piscine">Pompe à chaleur piscine</option>
                  <option value="autre">Autre</option>
                </Select>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-accent/20 to-primary/20 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
              </div>
              <h4 className="font-display font-semibold text-foreground">Détails de votre demande</h4>
            </div>
            
            <div className="space-y-3">
              <label htmlFor="message" className="block text-sm font-medium text-foreground/80">
                Décrivez votre projet
              </label>
              <Textarea
                id="message"
                name="message"
                placeholder="Détaillez votre besoin : ville, surface, marque souhaitée, budget approximatif, disponibilités..."
                rows={5}
              />
            </div>
          </div>

          {/* Bouton d'envoi avec états */}
          <div className="pt-4 sm:pt-6">
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              <Button 
                type="submit" 
                disabled={state === "loading"} 
                className="w-full sm:w-auto bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl py-3 sm:py-4 px-6 sm:px-8 text-base sm:text-lg font-semibold"
              >
                {state === "loading" && (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                {state === "loading" ? "Envoi en cours..." : "Envoyer ma demande"}
              </Button>
              
              {state === "success" && (
                <div className="flex items-center space-x-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 text-green-400 px-4 py-3 rounded-xl">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-sm font-medium">Message envoyé ! Nous vous recontactons dans les plus brefs délais.</span>
                </div>
              )}
              
              {state === "error" && (
                <div className="flex items-center space-x-2 bg-gradient-to-r from-red-500/10 to-rose-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl">
                  <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                  <span className="text-sm font-medium">Erreur lors de l'envoi. Vérifiez votre numéro et email, puis réessayez.</span>
                </div>
              )}
            </div>
            
            {/* Note de confidentialité */}
            <p className="mt-4 text-xs text-muted text-center">
              🔒 Vos données sont sécurisées et ne seront jamais partagées avec des tiers.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
