---
id: apiRoutes
title: Classe ApiRoutesService
---

# ApiRoutesService

## Rôle

`src/app/core/services/api-routes.service.ts` centralise les URLs des endpoints backend. Il permet d'organiser les routes par domaine et d'éviter la duplication de chaînes de caractères dans l'application.

## Utilisation

Injecter le service dans les services Angular (pas directement dans les composants) :

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiRoutesService } from '@core/services/api-routes.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private apiRoutes: ApiRoutesService
  ) {}

  login(credentials: { email: string; password: string }) {
    return this.http.post(this.apiRoutes.AUTH.LOGIN, credentials);
  }
}
```

## Excluded URLs

Le service expose généralement `EXCLUDED_URLS` pour indiquer quelles routes ne doivent pas être interceptées (ex. login, inscription, vérification d'invitation). Les interceptors (`api-prefix.interceptor.ts`, `jwt-cookie.interceptor.ts`) s'appuient sur cette liste.

## Bonnes pratiques

- **Centraliser** toutes les routes API dans `ApiRoutesService`
- **Organiser** par fonctionnalité (AUTH, USER, COURSE, BOARD, etc.)
- **Utiliser uniquement dans les services** : les composants ne doivent pas construire manuellement les URLs
- **Garder cohérent** avec les routes backend (préfixe `api` géré par le backend/configuration)
- **Mettre à jour** `EXCLUDED_URLS` si une route publique est ajoutée et ne doit pas recevoir de token
