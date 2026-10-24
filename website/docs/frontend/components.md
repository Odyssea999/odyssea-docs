---
id: components
title: Component
---

# Composants

## Organisation

- **`src/app/shared/ui/`** : Composants UI génériques et réutilisables (button, input, dialog, table, select, etc.). Ces composants forment la base de l'interface.
- **`src/app/shared/components/`** : Composants métier/réutilisables plus complexes (explorer, layout, board, etc.)
- **`src/app/pages/`** : Composants de page spécifiques à un domaine/fonctionnalité

## Création

Utiliser Angular CLI :

```bash
ng generate component <nom-composant>
# ou
ng g c <chemin>/<nom-composant>
```

Suivre l'organisation existante (composant dans le bon dossier selon son usage).

## Communication

- **Parent vers enfant** : `@Input()`
- **Enfant vers parent** : `@Output()` avec `EventEmitter`
- **État partagé** : Utiliser les stores NgRx/Signals existants plutôt que de remonter trop profondément

## Bonnes pratiques

- Garder les composants de page dans `pages/`, les composants réutilisables dans `shared/`
- Respecter le pattern existant (standalone ou modules selon le contexte du fichier)
- Typer explicitement les `@Input()`/`@Output()`
- Éviter la logique métier dans les composants : déléguer aux services/stores
- Suivre les conventions de nommage et l'organisation du dossier cible
