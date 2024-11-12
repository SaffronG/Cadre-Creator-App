# Cadre-Creator-App

_A simple rust-based application targeted towards windows and android architectures, contains a rust api for sending JSON and a backend to persist list data_

<hr>

I want to create a simple rust-based desktop/mobile app that uses html css and javascript as frontend using the Tauri framework. This will manage the user's warhammer lists, allow them to create them, view their rules, print them, save them, and import them. I will also have a rust API to provide this basic functionality.

Each user will be able to log in, create an account, and view their lists and favorited rules and models. They should also be able to select a pre-made theme for the application. Export will either print to pdf, or share via email to the given address. Download will print or download the lsit as a pdf.

To further this project, I want to use typescript, and host my api so that I can use my app on my phone wherever I have an internet connection. I would also like to learn how to use docker and mobile-targeted development.

<hr>

> Nov 13 (15%)
- [x] set up tauri project and basic api
- [x] create api schema
- [x] make landing page
- [ ] set up typescript pipeline
> Nov 16 (30%)
- [ ] create list view page
- [ ] be able to add a blank list
- [ ] be able to add a model to the list and set the name
> Nov 20 (45%)
- [ ] create export and download as pdf functionality
- [ ] populate the settings page
- [ ] create alternate themes
> Nov 23 (60%)
- [ ] user can create an account
- [ ] user can log in if their account exists and if their email is unique
- [ ] user can save their list on the server 
> Nov 26 (75%)
- [ ] populate rules api
- [ ] user can view the given rules
- [ ] user can view all available models and their images
> December 4 (100%)
-  [ ] iron out functionality
-  [ ] iron out styling
-  [ ] package as docker
-  [ ] target for mobile development

<hr>

> Api Documentation
https://app.swaggerhub.com/apis/SAFFRONGAMER167/WarhammerDatasheets/0.1.1
