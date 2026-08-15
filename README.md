# BugSquash: Startup QA Tool

BugSquash is a lightweight, responsive web application designed for startup teams to track, manage, and resolve software bugs efficiently.

## Features
- **Task Management:** Add, view, and delete bug reports.
- **Persistent Storage:** Data is saved locally in the browser so tasks persist after refresh.
- **Smart Filtering:** Search bugs by title or filter them by the assigned developer.
- **Severity Tracking:** Visual badges for Low, Medium, and High priority bugs.
- **Input Validation:** Ensures all bugs have titles and valid, non-past due dates.
- **Responsive Design:** Works seamlessly across different screen sizes.

## Project Structure
- `index.html`: Contains the UI structure, navigation, and input forms.
- `app.js`: Handles the application logic, including state management, filtering, and localStorage integration.

## How to Run
1. Clone the repository.
2. Open the application:
   - **Option A (Recommended):** Use the "Live Server" extension in VS Code. Right-click `index.html` and select "Open with Live Server".
   - **Option B (Terminal):** Navigate to the folder in your terminal and run:
     ```bash
     python3 -m http.server 8000
     ```
   - Then, open `http://localhost:8000` in your web browser.

## Built With
- HTML5
- CSS3
- Vanilla JavaScript
- LocalStorage API

## Team Contributions
- IT24103013 - Gunasekara L M S S
- IT24102868 - Hewage T D
- IT24104324 - Shareeka Azad
- IT24102554 - Thilakarathne H S K N S
