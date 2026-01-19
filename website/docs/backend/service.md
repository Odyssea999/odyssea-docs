---
id: service
title: Service
---
# Service

Cette partie explique la mise en place et le rôle du **service d'authentification**.

---

# 1. Mise en place du Service

Le service `AuthService` est situé dans le dossier `/application/auth/`.

Il implémente l'interface `IAuthService` afin de définir clairement les responsabilités et de faciliter le respect de la **Clean Architecture**.

Le rôle du service est :
- D'orchestrer la logique métier liée à l'authentification.
- De déléguer la gestion des données à un `Repository` (ici `AuthImplRepository`).
- De garantir que les Controllers et autres couches dépendent uniquement d'une **abstraction** (interface) et non d'une implémentation concrète.

---

# 2. Structure de l'interface

L'interface `IAuthService` définit les fonctionnalités principales disponibles :

```typescript
import { LoginUserDto } from "@infrastructure/dto/auth/login-user.dto";
import { RegisterUserDto } from "@infrastructure/dto/auth/register-user.dto";

export interface IAuthService {
  /**
   * Enregistre un nouvel utilisateur
   */
  register(credentials: RegisterUserDto): Promise<{ id: string }>;

  /**
   * Authentifie un utilisateur
   */
  login(credentials: LoginUserDto): Promise<{ access_token: string }>;

  /**
   * Rafraîchit un token pour un utilisateur
   */
  refresh(idUser: string): Promise<{ message: string }>;

  /**
   * Valide l'authentification d'un utilisateur à partir d'un token
   */
  validateUser(token: string): Promise<{ message: string }>;
}

export const IAuthService = Symbol("IAuthService");
```

Chaque méthode est asynchrone et renvoie un objet structuré.

---

# 3. Implémentation du Service

Le service `AuthService` implémente l'interface `IAuthService` et délègue les opérations au `Repository`.

```typescript
import { Injectable } from "@nestjs/common";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { IAuthService } from "./auth.service.interface";
import { AuthImplRepository } from "@infrastructure/repository/auth/auth-impl.repository";
import { LoginUserDto } from "@infrastructure/dto/auth/login-user.dto";
import { RegisterUserDto } from "@infrastructure/dto/auth/register-user.dto";

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly authRepository: AuthImplRepository,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  async register(credentials: RegisterUserDto): Promise<{ id: string }> {
    return await this.authRepository.createUser(credentials);
  }

  async login(credentials: LoginUserDto): Promise<{ access_token: string }> {
    return await this.authRepository.login(credentials);
  }

  async refresh(idUser: string): Promise<{ message: string }> {
    return await this.authRepository.refreshToken(idUser);
  }

  async validateUser(token: string): Promise<{ message: string }> {
    return await this.authRepository.validateUser(token);
  }
}
```

---

# 4. Déclaration du Provider

Pour permettre l'injection par interface (`IAuthService`), un **Provider** est défini :

```typescript
import { Provider } from "@nestjs/common/interfaces/modules/provider.interface";
import { IAuthService } from "./auth.service.interface";
import { AuthService } from "./auth.service";

export const AuthProvider: Array<Provider> = [
  {
    provide: IAuthService,
    useClass: AuthService,
  },
];
```

Cela permet aux autres parties de l'application (comme les Controllers) d'injecter `IAuthService` sans connaître l'implémentation `AuthService`.

---

# 5. Respect de la Clean Architecture

- **Dépendances inversées** : Le `Controller` dépend de l'interface `IAuthService`, pas de `AuthService`.
- **Séparation claire** :
  - Le **Service** orchestre.
  - Le **Repository** communique avec la base de données ou Keycloak.
  - Le **Controller** expose uniquement des endpoints HTTP.
- **Testabilité accrue** : On peut mocker `IAuthService` pour les tests unitaires.

---

# 6. Résumé des rôles

| Élément         | Rôle principal                                          |
|-----------------|----------------------------------------------------------|
| IAuthService    | Définir le contrat d'utilisation                         |
| AuthService     | Implémenter le contrat et orchestrer la logique métier    |
| AuthProvider    | Permettre l'injection de dépendances par interface        |
| Mapper          | Transformer les objets (prévu pour des usages futurs)     |
