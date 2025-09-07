# Full-Stack Book Management App

This is a full-stack web application built using Django (backend) and React (frontend) that allows users to manage a collection of books. The backend serves a REST API, and the frontend uses modern React features.

# Tech Stack
<ul>
  <li>Backend: Django + Django REST Framework</li>
<li>Frontend: React + Axios</li>
<li>Package Managers: pip for backend, npm for frontend</li>
<li>Database: SQLite (default with Django)</li>
</ul>

# Setup Instructions
## Backend (Django)
### 1. Clone the repository
```
git clone https://github.com/AdemHuduti/book-explorer.git
cd book-explorer
```

### 2. Create a Virtual Environment (Windows)
```
python -m venv venv
venv\Scripts\activate 
```

### 2. Create a Virtual Environment (Mac)

```
python3 -m venv venv
source venv/bin/activate
```

### 3. Install Dependencies
```
pip install -r requirements.txt
```

### 4. Run Migrations
```
python manage.py migrate
```

### 5. Populate Initial Data
Initial book data is automatically populated using Django migrations. If needed:

```
python manage.py loaddata initial_books.json
```

### 6. Start the Development Server
```
python manage.py runserver
```

## Frontend (React)
### 1. Navigate to the Frontend Directory
```
cd frontend
```

### 2. Install Dependencies
```
npm install
```

### 3. Start the React App
```
npm start
```

The app will run at http://localhost:3000/


## Dependency Management
### Backend
<ul>
  <li>Dependencies are listed in requirements.txt</li>
  <li>Installed using:</li>
</ul>

```
pip install -r requirements.txt
```

### Frontend
<ul>
  <li>Dependencies are managed via npm</li>
  <li>Installed using:</li>
</ul>

```
npm install
```


## Features Implemented

<ul>
  <li>Full CRUD operations on books via Django REST Framework</li>

  <li>React frontend that displays, adds, updates, and deletes books and book notes as well</li>

  <li>Clean UI built with modern React hooks and Axios for API calls</li>

  <li>Error handling and form validation</li>
</ul>

## Design Choices & Challenges
### Design Decisions

<ul>
  <li>REST API: Django REST Framework was chosen for quick and efficient API building.</li>

<li>React: Used for a dynamic, responsive frontend.</li>

<li>Axios: For simple and readable HTTP requests.</li>

<li>State Management: Managed using useState and useEffect for simplicity, given the app's size.</li>
</ul>

## Challenges Faced

<ul>
  <li>CORS Issues: Solved using django-cors-headers.</li>

<li>Synchronizing Frontend/Backend: Ensured API URLs were correctly set in development mode.</li>

<li>Form Handling in React: Handling nested API errors from DRF in React forms.</li>
<li>Generally dealing with Django, since I don't have much experience with it.</li>
</ul>


## Running Unit Tests
### Backend

To run Django unit tests:
```
python manage.py test
```
