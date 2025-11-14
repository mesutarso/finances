# Strapi 5 Client

Client optimisé pour Strapi 5 avec gestion d'erreur robuste et API intuitive.

## Structure

- `index.ts` - Fonctions serveur (avec "use server")
- `helpers.ts` - Types et utilitaires
- `client.ts` - Export client-side des helpers

## Utilisation

### Import côté serveur
```typescript
import { 
  getCollection, 
  createCollectionItem,
  updateCollectionItem 
} from "@/lib/strapi";

import { 
  createFilters, 
  createPopulate, 
  queryDefaults 
} from "@/lib/strapi/client";
```

### Import côté client
```typescript
import { 
  createFilters, 
  createPopulate, 
  createSort,
  type QueryParams 
} from "@/lib/strapi/client";
```

## Exemples

### 1. Requête simple
```typescript
const articles = await getCollection('articles', {
  populate: createPopulate.all(),
  pagination: createPagination.page(1, 10)
});
```

### 2. Requête avec filtres
```typescript
const dossiers = await getCollection('dossiers', {
  filters: createFilters.and(
    createFilters.eq('status', 'active'),
    createFilters.containsi('title', 'urgent')
  ),
  sort: createSort.desc('createdAt')
});
```

### 3. Population avancée
```typescript
const users = await getCollection('users', {
  populate: createPopulate.nested({
    avatar: { fields: ['url', 'name'] },
    role: { fields: ['name'] },
    dossiers: {
      fields: ['title', 'status'],
      filters: createFilters.eq('status', 'active')
    }
  })
});
```

### 4. Utilisation des configurations par défaut
```typescript
const publishedArticles = await getCollection('articles', {
  ...queryDefaults.published(),
  ...queryDefaults.paginated(1, 20),
  ...queryDefaults.withRelations(['author', 'category'])
});
```

## API

### Fonctions principales (serveur)
- `getCollection<T>(collection, params?)` - Récupère une collection
- `getCollectionById<T>(collection, id, params?)` - Récupère un élément
- `createCollectionItem<T>(collection, data)` - Crée un élément
- `updateCollectionItem<T>(collection, id, data)` - Met à jour
- `deleteCollectionItem<T>(collection, id)` - Supprime
- `searchCollection<T>(collection, term, fields?, params?)` - Recherche
- `countCollection(collection, filters?)` - Compte les éléments
- `existsInCollection(collection, filters)` - Vérifie l'existence
- `uploadFile(file)` - Upload de fichiers
- `getCurrentUser()` - Utilisateur actuel

### Helpers (client/serveur)
- `createFilters` - Création de filtres
- `createPopulate` - Paramètres de population
- `createSort` - Paramètres de tri
- `createPagination` - Paramètres de pagination
- `queryDefaults` - Configurations prêtes à l'emploi