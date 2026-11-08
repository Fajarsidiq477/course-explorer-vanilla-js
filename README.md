# Course Explorer — Vanilla JavaScript

A web application for discovering coding learning resources using an external API. Built with **HTML, CSS, and Vanilla JavaScript** as part of my 24-week Full-Stack Web Development learning journey.

This project focuses on asynchronous JavaScript, API integration, data normalization, state management, and interactive filtering.

## Features

- **External API Integration** — Fetch coding resources from a public API.
- **Live Search** — Search resources by description and topics.
- **Level Filtering** — Filter resources by learning level.
- **Combined Filtering** — Use search and level filters simultaneously.
- **Results Counter** — Display the number of matching resources.
- **Refresh Data** — Request updated resources without reloading the page.
- **Retry on Error** — Retry failed API requests.
- **UI States** — Handle loading, success, empty, and error conditions.
- **Data Normalization** — Validate and clean inconsistent API responses.
- **Request Guard** — Prevent multiple simultaneous requests.

## Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Page structure |
| CSS3 | Styling and layout |
| JavaScript (ES6+) | Application logic and DOM manipulation |
| Fetch API | Retrieve external data |
| Async/Await | Handle asynchronous operations |
| Git & GitHub | Version control |

No frontend frameworks or external JavaScript libraries are required.

## API

This project uses the public [Sample APIs](https://sampleapis.com/) service.

**Endpoint:**

`https://api.sampleapis.com/codingresources/codingResources`

The API provides coding resources with fields such as:

- `id`
- `description`
- `url`
- `types`
- `topics`
- `levels`

The application currently displays resource descriptions, types, topics, and learning levels.

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Fajarsidiq477/course-explorer-vanilla-js.git
```

### 2. Open the project

```bash
cd course-explorer-vanilla-js
```

### 3. Run the application

Open `index.html` using a local development server, such as the VS Code Live Server extension.

The application requires an internet connection to retrieve resources from the API.

## How It Works

The application follows a simple data-processing pipeline:

```text
External API
     |
     v
Fetch Resources
     |
     v
Validate API Response
     |
     v
Normalize Data
     |
     v
Store in Application State
     |
     v
Search & Filter
     |
     v
Render DOM
```

### Data Normalization

API responses are validated before rendering.

The normalization process:

1. Removes invalid course objects.
2. Ensures descriptions contain valid text.
3. Validates topics, levels, and types.
4. Removes invalid array entries.
5. Trims unnecessary whitespace.
6. Produces consistent data structures without mutating the original objects.

### Search and Filtering

Search and level filtering operate on locally stored data.

The application fetches resources when initially loaded or when Refresh/Retry is requested. Typing in the search field does not trigger additional API requests.

### Request State Management

The application tracks four request states:

| State | Description |
|---|---|
| `idle` | Request has not started |
| `loading` | Resources are being fetched |
| `success` | Data is ready |
| `error` | Request failed |

A request guard prevents overlapping requests.

## Project Structure

```text
course-explorer/
├── index.html
├── style.css
├── app.js
└── README.md
```

## What I Learned

Through this project, I practiced:

- Working with Promises and asynchronous JavaScript.
- Using `fetch()`, `async/await`, and `try/catch/finally`.
- Understanding HTTP responses and handling errors.
- Transforming data using `.map()`, `.filter()`, and `.some()`.
- Understanding object references, mutation, and reassignment.
- Managing application state without a framework.
- Separating data fetching, normalization, filtering, and rendering.
- Safely rendering external data using DOM APIs and `textContent`.
- Identifying and handling edge cases.
- Debugging asynchronous application behavior.

## Future Improvements

Potential improvements include:

- Adding clickable links to original learning resources.
- Filtering by resource type.
- Adding sorting and pagination.
- Improving accessibility and keyboard navigation.
- Adding automated tests.
- Enhancing responsive styling.

## Learning Journey

This is **Mission 02 — Course Explorer**, the second completed project in my 24-week project-based Full-Stack Web Development roadmap.

**Phase 1 — JavaScript & Web Fundamentals**

- Mission 01: Registration App — Completed
- Mission 02: Course Explorer — Completed

**Next Phase:** TypeScript & React

The long-term goal is to develop professional full-stack applications and build practical skills for freelance web development.

---

*Built as a hands-on learning project, focusing on understanding concepts and writing code independently.*