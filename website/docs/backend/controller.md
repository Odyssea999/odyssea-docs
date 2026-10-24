---
id: controller
title: Controller
---

# Controller

## Rôle

Les contrôleurs exposent les routes HTTP. Dans ce projet, ils :
- Étendent `AbstractController` pour uniformiser les réponses et la gestion d'erreurs
- Délèguent la logique métier aux services
- Ne contiennent pas de logique métier
- Utilisent les DTOs pour typer et valider les entrées
- Sont documentés avec Swagger

## AbstractController

`src/api/controller/abstract.controller.ts` fournit la méthode `execute()` qui :
- Exécute la promesse du service
- Formate la réponse via `ActionResponse` (`statusCode`, `message`, `result`)
- Centralise le mapping des exceptions vers les codes HTTP appropriés
- Gère les cas `NO_CONTENT`

Structure type :

```typescript
async execute(
  method: Promise<any>,
  response: Response,
  message: string = null,
  statusCode: number = HttpStatus.OK,
): Promise<any>
```

## Exemple : AuthController

`src/api/controller/auth/auth.controller.ts` illustre le pattern utilisé :

```typescript
@ApiTags("Auth")
@Controller("auth")
export class AuthController extends AbstractController {
  constructor(
    @Inject(IAuthService)
    private readonly authService: IAuthService,
  ) {
    super();
  }

  @Post("login")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Login a user" })
  @ApiResponse({ status: 200, description: "User logged in successfully", type: JwtResponse })
  @ApiResponse({ status: 401, description: "Authentication failed" })
  @ApiBody({ type: LoginUserDto })
  async login(@Body() body: LoginUserDto, @Res() res): Promise<JwtResponse> {
    return await this.execute(
      this.authService.login(body),
      res,
      "User logged in successfully",
    );
  }
}
```

Points observés :
- Injection par interface (`IAuthService`) via `@Inject`
- Passage du `Response` Express à `execute()` pour envoyer la réponse formatée
- Décorateurs Swagger pour la documentation
- Utilisation des DTOs en entrée

## Guards et autorisation

- `JwtAuthGuard` (`@shared/guards/jwt-auth.guard.ts`) : vérifie le token JWT extrait depuis le cookie, charge `UserInfo` dans `request.user`
- `RoleGuard` (`@shared/guards/roles/roles.guard.ts`) : vérifie les rôles requis via le décorateur `@Roles(...)`
- `UserRole` (`@shared/enums/user-role.enum.ts`) : `ADMIN`, `TEACHER`, `PEDAGO`, `STUDENT`

Exemple d'usage typique :
```typescript
@UseGuards(JwtAuthGuard, RoleGuard)
@Roles(UserRole.ADMIN)
@Get('...')
```

## Enregistrement

Les contrôleurs sont déclarés dans `ControllerModule` et ce module est importé par `AppModule`.