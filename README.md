# Web application: software security

## Inleiding

De SPA kan je terugvinden op: https://www.jarnob.xyz

De REST API kan je terugvinden op: https://api-travelr.jarnobogaert.xyz/

## Inhoudstafel

[Verwerkingsregister](#Verwerkingsregister)

[REST API's](#REST-API's)

[Resources](#Resources)

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

## REST API's

Dit is de url naar de REST API: https://api-travelr.jarnobogaert.xyz/

### Resources

- / (root)

  - GET

> Dit is een route om te controlere of de API nog online staat, GET: geen authenticate vereist

<hr>

- /travelLogs

  - GET
  - POST
  - OPTIONS

> GET: geen authenticate vereist, POST: authenticate vereist

<hr>

- /travelLogs/:id

  - DELETE
  - OPTIONS

> DELETE: authenticate vereist

<hr>

- /travelLogs/own

  - GET
  - OPTIONS

> GET: authenticate vereist

<hr>

- /users/:id

  - GET
  - OPTIONS

> GET: authenticate vereist

<hr>

Alle operaties zijn alleen toegelaten vanuit deze origin: https://www.jarnob.xyz

### Toegangscontrole policy

Voor alle operaties behalve het oplijsten van travel logs moet de gebruiker aangemeld zijn.

#### Normal user (gebruikers)

Kan create/update/delete acties uitvoeren op travel logs. Maar de gebruiker kan geen travel logs van andere gebruikers verwijderen of wijzigen.

#### Admin (beheerders)

Kan travel logs verwijderen. Maar kan geen travel logs aanmaken of wijzigen.
