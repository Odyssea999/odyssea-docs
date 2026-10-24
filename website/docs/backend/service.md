---
id: service
title: Service
---
# Service

## Rôle

Les services dans `src/application/services/` orchestrent la logique métier. Ils :
- Implémentent un contrat (interface) quand le pattern est utilisé
- Délèguent l'accès aux données aux repositories
- Ne gèrent pas directement les requêtes HTTP
- Restent découplés de l'infrastructure via l'inversion de dépendance

## Pattern observé

Dans le projet, on retrouve souvent :
- Une interface dans `src/application/services/<domaine>/` (ex. `auth.service.interface.ts`) avec un token `Symbol`
- Une implémentation concrète (ex. `auth.service.ts`)
- Un provider (ex. `auth.provider.ts`) pour lier l'interface à l'implémentation

Exemple : `auth.service.interface.ts` définit le contrat, `AuthService` l'implémente et délègue au repository.

```typescript
export interface IAuthService {
  register(credentials: RegisterUserDto): Promise<{ id: string }>;
  login(credentials: LoginUserDto): Promise<{ access_token: string }>;
  refresh(idUser: string): Promise<{ message: string }>;
  validateUser(token: string): Promise<{ message: string }>;
}

export const IAuthService = Symbol("IAuthService");
```

## Injection

Les contrôleurs injectent le service via l'interface :

```typescript
constructor(
  @Inject(IAuthService)
  private readonly authService: IAuthService,
) {}
```

Les providers sont généralement enregistrés dans les modules applicatifs (`ApplicationProxyModule` ou modules dédiés) pour rendre l'injection possible.

## Bonnes pratiques

- Le service orchestre, le repository accède aux données
- Préférer l'injection par interface pour découpler les couches
- Garder la logique métier dans la couche `application`
- Éviter les appels HTTP directs dans le service (ils appartiennent aux contrôleurs/intercepteurs)
