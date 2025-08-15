# BobApp

## 1️⃣ Cloner le projet

```bash
# Crée le dossier principal
mkdir BobApp
cd BobApp

# Clone le backend et le frontend
git clone https://github.com/kenchi-san/back_CICD.git back
git clone https://github.com/kenchi-san/front_CICD.git front
```
2️⃣ Installer les dépendances
Frontend (Angular)

```bash
cd front
npm install
cd ..
```
```bash
cd back
mvn clean install
cd ..
```
3️⃣ Dockerisation

Créer docker-compose.yml à placer à la racine du projet BobApp :

```yaml
version: '3.8'

services:
  backend:
    build: ./back
    container_name: bobapp-back
    ports:
      - "8080:8080"
    environment:
      - SPRING_PROFILES_ACTIVE=dev
    depends_on:
      - frontend

  frontend:
    build: ./front
    container_name: bobapp-front
    ports:
      - "4200:4200"
    environment:
      - NODE_ENV=development
```
4️⃣ Lancer l’application avec Docker Compose

```bash
docker-compose up --build
```
* --build : reconstruit les images si nécessaire

*  Les logs du backend et frontend s’affichent dans le terminal.

Pour arrêter les conteneurs :
```bash
docker-compose down
```
5️⃣ Vérifications

Backend accessible sur : http://localhost:8080

Frontend accessible sur : http://localhost:3000

Architecture:

```
├───back
│   ├───.github
│   │   └───workflows
│   ├───src
│   └──├───main
│      │   ├───java
│      │   │   └───com
│      │   │       └───openclassrooms
│      │   │           └───bobapp
│      │   │               ├───controller
│      │   │               ├───data
│      │   │               ├───model
│      │   │               └───service
│      │   └───resources
│      │       └───json
│      └───test
│   
├───front
│    ├───.github
│    │   └───workflows
│    └───src
│    ├───app
│    │   ├───model
│    │   └───services
│    ├───assets
│    └───environments
│
└──docker-compose.yml
```
