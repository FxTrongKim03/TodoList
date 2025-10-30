# Full-stack To-Do List Application Project

This is a full-stack web application project that allows users to manage a to-do list. The project is built with a monorepo architecture, including a separate backend API and frontend user interface.

## 🌟 Key Features

* **Create** new tasks.
* **Read** the list of all tasks.
* **Update** the content or status (completed/pending) of a task.
* **Delete** a task.

## 🛠️ Technology Stack

The project is built with modern and popular technologies:

### Backend (`todo-backend`)

* **Language:** Python 3
* **Framework:** FastAPI (inferred from the file structure: `main.py`, `routers`, `schemas`, `models`)
* **Web Server:** Uvicorn
* **ORM:** SQLAlchemy (inferred from `db` and `models` directories)
* **Validation:** Pydantic (built-in with FastAPI, based on `schemas` directory)
* **Database:** (Please fill in your database name, e.g., PostgreSQL, MySQL, or SQLite)

### Frontend (`todo-frontend`)

* **Framework:** React
* **Language:** TypeScript
* **Build Tool:** Vite
* **State Management:** React Hooks (based on `src/hooks/useTodos.ts`)
* **Styling:** CSS Modules / CSS (based on `App.css`, `index.css`)
* **API Client:** (Please fill in the library you used, e.g., Axios, Fetch API)

### DevOps

* **Containerization:** Docker & Docker Compose

## 🏗️ Project Structure and Process

The project is divided into two main parts within the same repository:

1.  **`todo-backend`**:
    * This is an API service built with Python and FastAPI.
    * `app/main.py`: The main entry point for the FastAPI application.
    * `app/routers/`: Defines the API endpoints (e.g., `/todos/`, `/todos/{id}`).
    * `app/models/`: Defines the database models (using SQLAlchemy).
    * `app/schemas/`: Defines the Pydantic models for input validation and output serialization.
    * `app/db/`: Contains the database connection logic and initialization.
    * `app/core/`: (If present) Contains configuration files, settings.
    * `tests/`: Contains tests (unit tests, integration tests) for the API.

2.  **`todo-frontend`**:
    * This is a Single Page Application (SPA) built with React and TypeScript.
    * `src/pages/`: Contains the main application pages (e.g., `Home.tsx`).
    * `src/components/`: Contains reusable React components (e.g., `TodoItem.tsx`, `TodoInput.tsx`).
    * `src/api/`: Contains functions for making API calls to the `todo-backend`.
    * `src/hooks/`: Contains custom hooks for managing logic and state (e.g., `useTodos.ts`).
    * `src/types/`: Defines the TypeScript types and interfaces for the project.

The development process involved designing the backend API first, defining the models and schemas, and then building the endpoints. Simultaneously, the frontend was developed to interact with these APIs using modular React components and state management with React Hooks.

## 🚀 Installation and Setup

There are two ways to run the project: using Docker (recommended) or running manually.

### Method 1: Using Docker Compose (Recommended)

This is the simplest way to run the entire application (including the database if configured in `docker-compose.yml`).

1.  Ensure you have [Docker](https://www.docker.com/get-started) and [Docker Compose](https://docs.docker.com/compose/install/) installed.

2.  Clone the repository:
    ```bash
    git clone [YOUR_REPO_URL]
    cd TODOLIST
    ```

3.  Build and run the containers in detached mode:
    ```bash
    docker-compose up --build -d
    ```

4.  The application will be accessible at:
    * **Frontend:** `http://localhost:5173` (or the port you configured in `docker-compose.yml`)
    * **Backend API:** `http://localhost:8000` (or your configured port)
    * **API Documentation (Swagger):** `http://localhost:8000/docs`

### Method 2: Manual Setup

You will need to run two separate terminals for the backend and frontend.

#### Running the Backend

1.  Navigate to the backend directory:
    ```bash
    cd todo-backend
    ```
2.  Create and activate a virtual environment:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```
3.  Install the required dependencies:
    ```bash
    pip install -r requirements.txt
    ```
4.  (If needed) Configure a `.env` file with your database information.

5.  Start the FastAPI server:
    ```bash
    uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
    ```

#### Running the Frontend

1.  Open a new terminal and navigate to the frontend directory:
    ```bash
    cd todo-frontend
    ```
2.  Install the node modules:
    ```bash
    npm install
    # or
    yarn install
    ```
3.  Start the Vite development server:
    ```bash
    npm run dev
    # or
    yarn dev
    ```

4.  Open your browser and visit `http://localhost:5173` (this is Vite's default port).