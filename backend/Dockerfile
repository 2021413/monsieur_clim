# Dockerfile pour MonsieurClim Backend
FROM node:18-alpine

# Informations du mainteneur
LABEL maintainer="MonsieurClim <contact@monsieurclim.fr>"
LABEL description="Backend Express pour MonsieurClim - Gestion formulaires et avis Google"

# Variables d'environnement par défaut
ENV NODE_ENV=production
ENV PORT=3001

# Création du répertoire de travail
WORKDIR /app

# Installation des dépendances système nécessaires
RUN apk add --no-cache \
    dumb-init \
    && rm -rf /var/cache/apk/*

# Copie des fichiers de configuration npm
COPY package*.json ./

# Installation des dépendances Node.js
RUN npm ci --only=production \
    && npm cache clean --force

# Création d'un utilisateur non-root pour la sécurité
RUN addgroup -g 1001 -S nodejs \
    && adduser -S monsieurclim -u 1001

# Copie du code source
COPY --chown=monsieurclim:nodejs . .

# Changement vers l'utilisateur non-root
USER monsieurclim

# Port exposé
EXPOSE 3001

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "const http=require('http'); \
                 const req=http.request({hostname:'localhost',port:3001,path:'/health',method:'GET'}, \
                 (res)=>{process.exit(res.statusCode===200?0:1)}); \
                 req.on('error',()=>process.exit(1)); \
                 req.end();"

# Commande de démarrage avec dumb-init pour la gestion des signaux
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "server.js"]
