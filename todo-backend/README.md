# 💻 Todo Backend Service - FastAPI

This document outlines the setup, architecture, and goals for the To-Do list backend service, built using FastAPI and PostgreSQL.

## 🎯 Project Goal

The primary objective is to provide a robust and validated CRUD (Create, Read, Update, Delete) API for managing to-do items. The implementation includes clean logging, standard validation, and adherence to proper HTTP status codes.

## 🛠️ Technology Stack

| Component | Technology | Note |
| :--- | :--- | :--- |
| **Framework** | **FastAPI** | High-performance, Python web framework. |
| **Database** | **PostgreSQL 15** | Used via Docker for environment isolation. |
| **ORM** | **SQLAlchemy** | Handling database interactions and models. |
| **Validation** | **Pydantic** | Used for defining API request/response schemas and validation. |

---

## ⚙️ Setup and Installation

### 1. Prerequisites

Ensure you have the following installed on your system:
* Python 3.x
* `pip` (Python package installer)
* Docker and Docker Compose (for PostgreSQL)

### 2. Install Dependencies

Navigate to the `todo-backend` directory and set up the virtual environment:

```bash
# Navigate to the backend directory
cd todo-backend

# Create and activate a virtual environment
python -m venv .venv
# For Windows PowerShell:
.\.venv\Scripts\activate
# For Linux/macOS:
source .venv/bin/activate

# Install required packages
pip install -r requirements.txt