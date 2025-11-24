# SportSphere — Cricket Edition Frontend Prototype

This repository contains the responsive and interactive frontend prototype for SportSphere, a project designed to manage a sports league.
This project assesses planning, organization, and collaborative frontend structure building.

## Group Members & Collaboration

* **Group Members:** Rameen Alam, Syeda Nigah Zainab.
* **Repository:** Shared GitHub repository used for collaboration and code contribution tracking.

## Features and Tools Used

### Technologies
* **Design & Layout:** HTML, CSS, Bootstrap 5, and CSS Flexbox/Grid.
* **Styling:** Fully responsive across devices with a consistent color scheme and UI styling.
* **Interactivity:** JavaScript (`app.js`).

### Dynamic Features (Interactivity Requirements)
* **Form Validation:** Implemented on the Login page and the 'Add New Team' modal.
* **Modal Pop-up:** Used to display detailed information for individual teams.
* **Live Search/Filter:** Implemented on the 'Teams' page to search teams by name.
* **Interactive Navigation:** The navigation bar changes the authentication link between 'Login' and 'Logout' based on session state.
* **Dynamic Content Display:** Used for rendering teams, fixtures, and sorting the leaderboard.

## Part A: Project Planning (Modules and Functionality)

| Module/Page Name | Purpose/Functionality | Responsible Group Member(s) |
| :--- | :--- | :--- |
| **Home (index.html)** | Displays the welcome message, live score snapshot, quick action links, and recent fixtures. | Rameen Alam |
| **Teams (teams.html)** | Allows browsing, searching, and filtering of all registered teams. Includes 'Add New Team' modal. | Rameen Alam |
| **Fixtures (fixtures.html)** | Lists all upcoming and completed match schedules. | Syeda Nigah Zainab |
| **Scoreboard (scoreboard.html)** | Displays the live score, current over details, and batsmen/bowler statistics. | Syeda Nigah Zainab  |
| **Leaderboard (leaderboard.html)** | Shows the league table, sortable by points, wins, and NRR. | Syeda Nigah Zainab  |
| **Admin Login (login.html)** | Simple admin gateway to unlock score update and team management features. | Rameen Alam |

## Instructions for Running the Project

1.  **Clone:** Use the repository link to clone the project to your local machine.
2.  **Open:** Navigate to the cloned folder and double-click the `index.html` file to open the project in your web browser.
3.  **Test Admin Features:** To see features like 'Simulate Update', navigate to `login.html` and use any text for the username and password to log in.
