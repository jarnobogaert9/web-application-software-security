# Web application: software security

## Inleiding

Deze SPA is een platform waarop gebruikers hun reiservaringen kunnen delen. Deze reiservaringen worden verder "Travel Logs" genoemd.

De SPA kan je terugvinden op: https://www.jarnob.xyz

De REST API kan je terugvinden op: https://api-travelr.jarnobogaert.xyz/

## Inhoudstafel

[Registratie & aanmelden](#registratie-&-aanmelden)

[Privacyverklaring](#Privacyverklaring)

[Verwerkingsregister](#Verwerkingsregister)

[Maatregelen tegen courante aanvallen](#maatregelen-tegen-courante-aanvallen)

[REST API's](#rest-api's)

[Toegangscontrole policy](#Toegangscontrole-policy)

## Registratie & aanmelden

Voor het registreren en aanmelden wordt Auth0 gebruikt. Als alternatief van de HIBP API wordt er een woordenboek (dictionary) gebruikt die 10.000 wachtwoorden bevat die frequent voorkomen.

## Privacyverklaring

De privacyverklaring kan men [hier](https://www.jarnob.xyz/privacy-policy) terugvinden.

## Verwerkingsregister

1. Contactgegegevens

- Naam: Jarno Bogaert
- Adress: Nijverheidskaai 170, 1070 Anderlecht
- Email: jarno.bogaert@student.ehb.be

2. Categorie persoonsgegevens: naam, email en wachtwoord

3. Categorie betrokkennen: leden

4. Grondslag voor verwerking: uitvoering overeenkomst

5. Doel verwerking: dienstverlening

6. Zelf verwerken: ja

7. Locatie verwerker: binnen de EU

8. Bewaartermijn: wordt bijgehouden tot de gebruiker zijn account wenst te verwijderen

9. Veiligheidsmaatregelen: voorafgaande autorisatie en het encrypteren van data

10. Verwerkingsactiviteiten van bijzondere persoonsgegevens: niet van toepassing

11. Datum aanmaken register: 10 januari 2021

12. Met welke partijen worden de personengegevens gedeeld: niet van toepassing

## Maatregelen tegen courante aanvallen

### Componenten met beveiligingsproblemen

Om mogelijke kwetsbaarheden zo snel mogelijk op te sporen en te identificeren wordt Dependabot gebruikt. Dependabot stuurt automatisch emails wanneer er kwetsbaarheden worden gedetecteerd.

### Maatregelen tegen typische web vulnerabilities

MIME sniffing wordt tegengegaan door de header:

`x-content-type-options: nosniff`

## REST API's

Dit is de url naar de REST API: https://api-travelr.jarnobogaert.xyz/

Alle operaties zijn toegelaten vanuit elke Origin.

Voor sommige operaties is er authenticatie nodig.

**Resources**

### (root)

- GET
- OPTIONS

> Dit is een route om te controlere of de API nog online staat, GET: geen authenticatie vereist

### /travelLogs

- GET
- POST
- OPTIONS

> GET: geen authenticatie vereist, POST: authenticatie vereist

### /travelLogs/:id

- GET
- PUT
- DELETE
- OPTIONS

> GET, PUT, DELETE: authenticatie vereist

### /travelLogs/own

- GET
- OPTIONS

> GET: authenticatie vereist

### /user

- GET
- OPTIONS

> GET: authenticatie vereist

### /users

- GET
- OPTIONS

> GET: geen authenticatie vereist

### /users/:id

- GET
- PUT
- DELETE
- OPTIONS

> GET, PUT & DELETE: authenticatie vereist

> PUT: Wanneer een gebruiker, die gebruik maakt van "Sign up with Google", zijn nickname wenst te wijzgen, stuurt de API een 202 status code terug.

## Toegangscontrole policy

Voor alle operaties behalve het oplijsten van travel logs moet de gebruiker aangemeld zijn.

### Normal user (gebruikers)

Kan travel logs aanmaken, wijzigen en verwijderen. Maar de gebruiker kan geen travel logs van andere gebruikers verwijderen of wijzigen.

Kan zijn gebruikersgegevens wijzigen of verwijderen. Maar de gebruiker kan geen gebruikersgegevens van andere gebruikers wijzigen of verwijderen.

### Admin (beheerders)

Kan travel logs verwijderen. Maar kan geen travel logs aanmaken of wijzigen.

Kan gebruikers verwijderen. Maar kan geen gebruikers aanmaken of wijzigen.

Kan wel zijn eigen gebruikersgegevens wijzigen of verwijderen.
