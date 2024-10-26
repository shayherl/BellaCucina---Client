# Recipe Management Web App

A recipe management web application designed to help users discover, search, and manage their favorite recipes.
It allows users to search for recipes, view details, register and log in, add recipes to favorites, and create new recipes.

## Project Overview

This project is structured into two main repositories:
- **Client:** Handles the frontend of the application, allowing users to interact with recipes and manage their collections.
- **Server:** Provides backend functionality, managing user data, interacting with a MySQL database, and serving as an API gateway to external recipe sources.

## Client: Recipe Management - Frontend

This is the client-side of the Recipe Management web app, built using Vue.js for a dynamic and interactive user experience.

### Key Features

- **Search and Filter Options**: Users can search for recipes by keywords and filter results by cuisine, diet, or intolerances, and sort by preparation time or popularity.
- **User Session Management**: User sessions are managed to store favorite recipes for quick access.
- **Custom Recipe Management**: Users can add their own recipes.

### Tech Stack

- **Vue.js**: Primary framework for building the frontend.
- **Bootstrap**: Ensures responsive design for a seamless experience on all devices.
- **Axios**: Manages all API requests for data retrieval and interactions with the backend.
- **Vue Router**: Facilitates smooth navigation between pages and components.

### Development Highlights

- **Modular Architecture**: Components are designed in a modular way to promote code reuse and maintainability.
- **API Integration**: Integrated with the Spoonacular API for real-time recipe data and additional features.
