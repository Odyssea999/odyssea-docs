---
id: dto
title: Data Transfer Object (DTO)
---

# DTO (Data Transfer Object)

## Rôle

Les DTO définissent la structure des données échangées avec l'API. Ils permettent :
- De typer les payloads entrants/sortants
- D'appliquer la validation via `class-validator`
- D'enrichir la documentation Swagger via `@ApiProperty`
- D'assurer une séparation claire entre les couches

## Emplacement

Les DTO se trouvent dans `src/infrastructure/dto/`, organisés par domaine (ex. `auth/`, `user/`, `course/`, `board/`, etc.).

## Validation globale

Dans `src/main.ts`, un `ValidationPipe` global est configuré :

```typescript
app.useGlobalPipes(
  new ValidationPipe({
    transform: true,
    transformOptions: { enableImplicitConversion: true },
    whitelist: true,
    forbidNonWhitelisted: true,
  }),
);
```

- `whitelist: true` : supprime les propriétés non déclarées dans le DTO
- `forbidNonWhitelisted: true` : rejette la requête si des propriétés non autorisées sont présentes
- `transform: true` : transforme le payload en instance du DTO

## Exemple : LoginUserDto

`src/infrastructure/dto/auth/login-user.dto.ts` :

```typescript
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength, Matches } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description:
      'User password (at least 10 characters, with uppercase, lowercase, number, and special character)',
    example: 'password12M@',
  })
  @IsNotEmpty()
  @MinLength(10, { message: 'Password must be at least 10 characters long' })
  @Matches(/(?=.*[A-Z])/, { message: 'Password must contain at least one uppercase letter' })
  @Matches(/(?=.*[a-z])/, { message: 'Password must contain at least one lowercase letter' })
  @Matches(/(?=.*\d)/, { message: 'Password must contain at least one number' })
  @Matches(/(?=.*[@$!%*?&])/, {
    message: 'Password must contain at least one special character (@, $, !, %, *, ?, &)',
  })
  password: string;
}
```

## Bonnes pratiques

- Un DTO par action quand le contrat diffère (ex. `create-*.dto.ts`, `update-*.dto.ts`)
- Utiliser `@ApiProperty` avec `description`/`example` pour améliorer la doc Swagger
- Préférer des validateurs explicites et des messages clairs
- Ne pas exposer de données sensibles dans les DTOs de réponse inutiles
- Respecter la séparation : les DTOs sont dans `infrastructure/dto/`, pas dans `domain/`
