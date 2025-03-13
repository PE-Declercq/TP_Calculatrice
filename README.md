# TP Calculatrice

Ce projet est une calculatrice, développée en mode TDD. Elle intègre une logique métier pour les opérations (addition, soustraction, multiplication, division, etc.) ainsi qu'une gestion de l'historique. L'application est testée en mode unitaire avec Jest et en E2E avec Playwright.

## Prérequis

- Node.js (>=12.x) et npm installés sur votre machine.
- Un navigateur web pour tester l'interface (Chrome, Firefox, etc.).

## Installation

1. Clonez ce dépôt sur votre machine.
2. Dans le répertoire du projet, installez les dépendances :

   npm install

## Lancer l'application
- Utiliser un serveur local (live-server)

## Installez live-server globalement (si ce n'est pas déjà fait) :

    npm install -g live-server

## Dans le dossier du projet, lancez :

    live-server

L'application sera accessible via http://127.0.0.1:8080.

Remarque : vous pouvez aussi utiliser :

    npm run start

## Exécuter les tests
Tests unitaires (Jest)

Les tests unitaires se trouvent dans le dossier tests/unit/. Pour les lancer :

    npm run test

## Tests End-to-End (Playwright)
Les tests E2E se trouvent dans le dossier tests/e2e/. Pour les exécuter, assurez-vous que votre serveur local est lancé, puis :

    npm run test:e2e

## Commandes principales

### Installation des dépendances :
    npm install

### Démarrage de l'application :
    npm run start
ou ouvrez directement le fichier index.html.

### Lancer les tests unitaires :
    npm run test

### Lancer les tests E2E :
    npm run e2e

### Démarche de développement
TDD (Test Driven Development) :
La méthode TDD a été appliquée en écrivant d'abord des tests (unitaires avec Jest et E2E avec Playwright) pour définir les comportements attendus, puis en développant la logique pour faire passer ces tests. Ce processus a permis d'assurer la qualité et la robustesse du code tout au long du développement.

Linting et formatage :
ESLint (et éventuellement Prettier) ont été utilisés dès le début pour garantir une cohérence et une qualité de code optimale. Le linter permet de détecter les erreurs et les incohérences rapidement, facilitant ainsi la maintenance du code.

Tests E2E :
Playwright a été utilisé pour automatiser les interactions avec l'interface utilisateur et simuler des scénarios réels (ex. : addition, soustraction, multiplication et vérification de l'historique).S