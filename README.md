# Task Manager – To-Do App

A simple and responsive Task Manager application built with React.js. It helps users create, manage, and track their daily tasks with a clean dashboard interface.

## Features

* Add new tasks
* Edit existing tasks
* Delete tasks
* Mark tasks as completed or pending
* Filter tasks by All, Pending, and Completed
* View total, pending, and completed task counts
* Dark and light mode
* Tasks are saved using browser LocalStorage
* Empty-state messages for different filters
* Responsive design for desktop and mobile devices
* Keyboard-friendly input and button interactions

## Technologies Used

* React.js
* JavaScript
* HTML5
* CSS3
* Vite
* Browser LocalStorage

## How to Run

1. Clone the repository.
2. Open the project folder in VS Code.
3. Install the required dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open the local URL shown in the terminal.

## LocalStorage

The application uses browser LocalStorage to preserve:

* Task data
* Task completion status
* Selected theme preference

This allows tasks and theme settings to remain available even after refreshing the page.

## Project Structure

```text
Task-Manager/
├── public/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── TaskInput.jsx
│   │   ├── TaskList.jsx
│   │   ├── TaskItem.jsx
│   │   ├── FilterTabs.jsx
│   │   └── EmptyState.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── README.md
```

## Project Purpose

This project was developed as part of the Frontend Development Internship at CodeVedX.

The project demonstrates practical implementation of:

* React component-based development
* State management
* CRUD operations
* Conditional rendering
* Filtering
* LocalStorage integration
* Responsive UI design

## Author

Developed as part of the CodeVedX Frontend Development Internship.
