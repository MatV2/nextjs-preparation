Architecture des pages Next.js avec l'utilisation des routes dynamiques et des layouts.
AppRouter :

app/
├── page.js               # Page d'accueil "/"
├── layout.js             # Layout principal (obligatoire)
├── about/
│   └── page.js           # Page "/about"
├── blog/
│   ├── page.js           # Page "/blog"
│   ├── layout.js         # Layout pour la section blog
│   └── [slug]/
│       └── page.js       # Page dynamique "/blog/article-1"
└── contact/
    └── page.js           # Page "/contact"

