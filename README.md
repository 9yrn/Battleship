# Battleship 🚢

**Battleship** is an interactive, browser-based naval combat strategy game built from the ground up using pure vanilla JavaScript, Object-Oriented Programming (OOP), and Test-Driven Development (TDD). It features manual ship deployment, an automated computer opponent that never attacks the same square twice, and a retro radar-inspired tactical interface.

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![Babel](https://img.shields.io/badge/-Babel-%23F9DC3E?style=for-the-badge&logo=babel&logoColor=black)

## ✨ Features

- **Full TDD Architecture:** Developed strictly through Test-Driven Development (Red-Green-Refactor) with 100% test pass rates across core models (`Ship`, `Gameboard`, `Player`).
- **Interactive Fleet Placement:** Deploy your official 5-ship fleet (`Carrier`, `Battleship`, `Cruiser`, `Submarine`, `Patrol Boat`) with an orientation toggle and real-time hover previews that prevent collisions and boundary overflows.
- **Smart Computer Opponent:** Play against an automated AI that randomly deploys its own fleet and executes attacks without ever targeting the same coordinate twice.
- **Strict OOP Decoupling:** Complete separation of concerns between game logic and DOM controllers—logic runs independently in test environments without needing a browser or mock DOM.
- **Tactical Radar UI:** Styled with a dark naval radar theme, responsive CSS grids, and retro typography powered by the `Pixelify Sans` Google Font.
- **Live Game State Tracking:** Real-time status banner guiding you through fleet placement, turn outcomes (hits/misses), and victory/defeat announcements.

## 🛠 Tech Stack

- **HTML5:** Semantic markup, decoupled board containers, and accessible button elements.
- **CSS3:** Custom tactical radar styling, CSS Grid boards, flexbox layouts, all interactive states, and Google Fonts (`Pixelify Sans`).
- **Vanilla JavaScript (ES6+):** Pure ES Modules, OOP class design, encapsulation, and event delegation.
- **Jest & Babel:** Unit testing framework with Babel presets (`@babel/preset-env`) for modern ES module compilation.

## 🚀 Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/9yrn/Battleship.git
   cd Battleship
   ```

2. **Install dependencies & run tests:**
   ```bash
   npm install
   npm test
   ```

3. **Launch the game:**
   Because the project uses native ES modules (`type="module"`), launch it with any local development server:
   ```bash
   npx serve src
   ```
   *Or just use the vercel link added in the repo ;).*

4. **Engage the Enemy!**
   Deploy your fleet by placing each ship on your board, toggle between horizontal and vertical orientations, and take turns firing upon enemy waters!
