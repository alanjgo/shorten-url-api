cors de ses morts

{
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Access-Control-Allow-Origin", "value": "*" },
        { "key": "Access-Control-Allow-Methods", "value": "GET,POST,PUT,DELETE" },
        { "key": "Access-Control-Allow-Headers", "value": "Content-Type" }
      ]
    }
  ]
}


Si tu utilises des fonctions serverless (API), tu peux aussi définir des headers dans le fichier ‎`vercel.json` :￼

À retenir ￼
 • CORS se gère côté serveur : ajoute les bons headers dans tes réponses API.
 • Vercel ne bloque pas le CORS : c’est à toi de le configurer dans ton code ou via ‎`vercel.json`.
 • Pour des besoins avancés (origines dynamiques, cookies, etc.), utilise une librairie comme cors ↗ dans tes fonctions Node.js.

Si tu veux un exemple adapté à ton stack 