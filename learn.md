Voici une architecture SOLID pour un projet Node.js utilisant Express.js et Sequelize ORM. L'architecture est conçue pour être modulaire, maintenable et évolutive.

### Principes SOLID appliqués :

1. **Single Responsibility Principle (SRP)** : Chaque classe ou module doit avoir une seule responsabilité.
2. **Open/Closed Principle (OCP)** : Les entités doivent être ouvertes à l'extension mais fermées à la modification.
3. **Liskov Substitution Principle (LSP)** : Les objets doivent pouvoir être remplacés par des instances de leurs sous-types sans altérer le comportement du programme.
4. **Interface Segregation Principle (ISP)** : Les clients ne doivent pas être forcés de dépendre d'interfaces qu'ils n'utilisent pas.
5. **Dependency Inversion Principle (DIP)** : Les modules de haut niveau ne doivent pas dépendre des modules de bas niveau. Les deux doivent dépendre d'abstractions.

### Structure des dossiers

```markdown
project-root/
│
├── src/
│   ├── config/
│   │   ├── config.js                # Configuration de l'application (base de données, etc.)
│   │   └── database.js              # Configuration de la base de données
│   │
│   ├── controllers/
│   │   ├── UserController.js        # Contrôleurs pour les utilisateurs
│   │   └── PostController.js        # Contrôleurs pour les posts
│   │
│   ├── models/
│   │   ├── index.js                 # Point d'entrée des modèles
│   │   ├── User.js                  # Modèle utilisateur
│   │   └── Post.js                  # Modèle post
│   │
│   ├── repositories/
│   │   ├── UserRepository.js        # Gestion des opérations CRUD pour les utilisateurs
│   │   └── PostRepository.js        # Gestion des opérations CRUD pour les posts
│   │
│   ├── services/
│   │   ├── UserService.js           # Logique métier pour les utilisateurs
│   │   └── PostService.js           # Logique métier pour les posts
│   │
│   ├── routes/
│   │   ├── userRoutes.js            # Routes pour les utilisateurs
│   │   └── postRoutes.js            # Routes pour les posts
│   │
│   ├── middlewares/
│   │   ├── authMiddleware.js        # Middleware d'authentification
│   │   └── errorMiddleware.js       # Middleware de gestion des erreurs
│   │
│   ├── utils/
│   │   └── helper.js                # Fonctions utilitaires
│   │
│   ├── app.js                       # Initialisation de l'application Express
│   └── server.js                    # Point d'entrée principal
│
├── tests/
│   ├── controllers/
│   ├── services/
│   ├── routes/
│   └── models/
│
├── .env                             # Fichier de configuration des variables d'environnement
├── .gitignore                       # Fichier pour ignorer les fichiers spécifiques dans Git
├── package.json                     # Fichier de configuration de npm
└── README.md                        # Documentation du projet
```

### Exemple de code pour chaque couche

**app.js**
```javascript
const express = require('express');
const { sequelize } = require('./models');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

module.exports = app;
```

**server.js**
```javascript
const app = require('./app');
const { sequelize } = require('./models');

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
```

**models/User.js**
```javascript
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = User;
```

**controllers/UserController.js**
```javascript
const UserService = require('../services/UserService');

class UserController {
    static async createUser(req, res) {
        try {
            const user = await UserService.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = UserController;
```

**routes/userRoutes.js**
```javascript
const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();

router.post('/', UserController.createUser);

module.exports = router;
```

**services/UserService.js**
```javascript
const UserRepository = require('../repositories/UserRepository');

class UserService {
    static async createUser(userData) {
        const user = await UserRepository.create(userData);
        return user;
    }
}

module.exports = UserService;
```

**repositories/UserRepository.js**
```javascript
const User = require('../models/User');

class UserRepository {
    static async create(userData) {
        const user = await User.create(userData);
        return user;
    }
}

module.exports = UserRepository;
```

Cette structure permet de respecter les principes SOLID en séparant les responsabilités et en favorisant l'extensibilité et la maintenabilité du code.