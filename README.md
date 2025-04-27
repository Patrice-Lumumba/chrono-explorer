## CHRONO EXPLORER BACK-END

Tous les fichiers concernants chaque éléments sont rangés dans les dossiers appropriés

Les Middlewares:
    - Afin de protéger les routes et les accès
    - J'ai implémenté les authentification Bearer (comme en angular) de telles sortes qu'il faudra le token de l'utilisateur pour avoir accès aux données (pour l'instant, je ne l'ai fait que pour les évènements)
    - pour retirer la fonctionnalité d'auth Bearer, tu ouvres le fichier routes/events, et tu enlèves authToken
    - Pour tester, il te faudra te connecter et récupérer et utilliser le token de l'utilisateur

Les routes:
    Le fichiers index dans le dossier routes, rassemble les différentes routes. A utiliser pour savoir le nom de la route à tester sur Postman


