## Personal Portfolio · MERN Stack · Vercel

An interactive, non-template personal portfolio built with **MongoDB Atlas**, **Express**, **React**, and **Node.js**, deployed as a static frontend + serverless API on **Vercel**.

The UI is fully custom: all animations, layout, and interactions are implemented with vanilla JavaScript, HTML, and CSS (React is used only for structure and state).

---

### 1. Prerequisites and Tooling

- **Node.js**: Install from the official site: [Node.js download](https://nodejs.org/)
  - After installing, verify:
    - `node -v`
    - `npm -v`
- **Git**: Install from [Git Downloads](https://git-scm.com/downloads)
  - Verify:
    - `git --version`
- **Visual Studio Code (VS Code)**: Install from [VS Code download](https://code.visualstudio.com/)
- **MongoDB Atlas account**: Create one at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **MongoDB Compass (optional but recommended)**: GUI client for MongoDB
  - Download from [MongoDB Compass](https://www.mongodb.com/products/compass)

You do **not** need any other frameworks or CLIs beyond what is installed via `npm` for this project.

---

### 2. Project Structure

At the root of the project:

- `package.json` – dependencies and scripts for frontend + backend
- `vite.config.mjs` – Vite (React) bundler configuration
- `index.html` – root HTML shell
- `src/` – React + vanilla JS/CSS frontend
  - `main.jsx` – React entrypoint
  - `App.jsx` – top-level layout and section routing
  - `components/`
    - `Layout.jsx` – global shell, custom cursor
    - `Hero.jsx` – landing section with character-based animation
    - `OrbitalNav.jsx` – radial navigation widget
    - `CanvasBackground.jsx` – animated canvas constellation
    - `ProjectsSection.jsx` – dynamically loaded projects
    - `TimelineSection.jsx` – UX journey timeline
    - `ContactSection.jsx` – contact form with API integration
  - `styles/global.css` – all layout, typography, and animation styles (hand-written)
- `server/` – Express app usable both locally and by Vercel serverless
  - `db.js` – MongoDB (Mongoose) connection with serverless-aware caching
  - `app.js` – Express app setup (CORS, routes, health check)
  - `index.js` – local Node server runner for the API
  - `models/Project.js` – `projects` collection schema
  - `models/Message.js` – `messages` collection schema
  - `routes/projects.js` – `/api/projects` GET endpoint
  - `routes/messages.js` – `/api/messages` POST endpoint
- `api/index.js` – Vercel serverless function that wraps the Express app
- `vercel.json` – Vercel configuration (build + serverless runtime)

You will add your own `.env` file (not committed) for secrets.

---

### 3. Initial Setup (Local Machine)

From your existing local project folder (where this `README.md` lives):

1. **Install dependencies**:

```bash
npm install
```

This installs:

- Frontend dependencies: `react`, `react-dom`, `vite`, `@vitejs/plugin-react`
- Backend dependencies: `express`, `mongoose`, `cors`, `dotenv`, `serverless-http`

2. **Create your environment file**:

Create a file named `.env` in the project root with:

```bash
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster-host>/portfolio?retryWrites=true&w=majority
CORS_ORIGIN=http://localhost:5173
PORT=4000
```

You will fill in the actual MongoDB Atlas connection string in the next section.

---

### 4. Configure MongoDB Atlas (From Scratch)

1. **Create an Atlas account**  
   Go to `https://www.mongodb.com/cloud/atlas` and sign up (free tier is fine).

2. **Create a new project and cluster**
   - In the Atlas UI, create a new **Project** (e.g., "Portfolio").
   - Click **Build a Database**, choose a free/shared cluster.
   - Select a region close to you.
   - Wait for Atlas to finish provisioning your cluster.

3. **Create a database user**
   - In the left sidebar, go to **Database Access**.
   - Click **Add New Database User**.
   - Choose **Password** authentication.
   - Set a username and password (store them somewhere safe).
   - Grant read and write privileges (e.g., "Atlas admin" or readWriteAnyDatabase for dev).

4. **Allow your IP address**
   - Go to **Network Access**.
   - Add your current IP address or allow all for development: `0.0.0.0/0` (not recommended for production).

5. **Create a database and collections**
   - In the cluster view, click **Browse Collections**.
   - Click **Add My Own Data**.
   - Use:
     - Database name: `portfolio`
     - Collection name: `projects`
   - You can also create a `messages` collection when the first contact form entry is saved, or pre-create it.

6. **Obtain your connection string**
   - On your cluster page, click **Connect** → **Connect your application**.
   - Copy the connection string that looks like:

```text
mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

   - Update it to include the `portfolio` database name (or specify `MONGODB_DB` separately). Simplest:

```text
mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster0
```

7. **Place the URI in your `.env`**

```bash
MONGODB_URI="mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster0"
```

8. **(Optional) Connect via MongoDB Compass**
   - Open Compass.
   - Paste the same connection string.
   - Connect and inspect the `portfolio` database, `projects` and `messages` collections.

---

### 5. Running the Project Locally

There are two processes:

- Vite dev server (frontend)
- Express server (backend API)

#### 5.1 Start the backend (Express + MongoDB)

In the project root:

```bash
npm run server
```

What this does:

- Loads `.env` (via `dotenv`).
- Connects to MongoDB Atlas using `MONGODB_URI`.
- Starts Express on `http://localhost:4000`.
- Exposes:
  - `GET /api/health`
  - `GET /api/projects`
  - `POST /api/messages`

Verify it’s working:

```bash
curl http://localhost:4000/api/health
```

You should see JSON like:

```json
{ "ok": true, "env": "development" }
```

#### 5.2 Start the frontend (Vite + React)

In another terminal, still in the project root:

```bash
npm run dev
```

Vite will start a dev server, typically at `http://localhost:5173`.

Open your browser and visit that URL.

---

### 6. API Behavior and Testing

#### 6.1 `/api/projects` (GET)

- URL (local): `http://localhost:4000/api/projects`
- Method: `GET`
- Description: Returns an array of project documents from MongoDB (`projects` collection).

Example response:

```json
[
  {
    "_id": "64f60b...",
    "title": "Interactive Portfolio",
    "description": "A motion-forward personal site focusing on system design.",
    "role": "Full-stack & UX",
    "stack": ["React", "Express", "MongoDB"],
    "url": "https://your-portfolio.vercel.app",
    "repo": "https://github.com/you/portfolio",
    "createdAt": "...",
    "updatedAt": "..."
  }
]
```

Add projects by inserting documents into the `projects` collection using Atlas or Compass.

#### 6.2 `/api/messages` (POST)

- URL (local): `http://localhost:4000/api/messages`
- Method: `POST`
- Body (JSON):

```json
{
  "name": "Ada Lovelace",
  "email": "ada@example.com",
  "message": "I love the way you structured your systems and UI."
}
```

Example `curl`:

```bash
curl -X POST http://localhost:4000/api/messages \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Ada\",\"email\":\"ada@example.com\",\"message\":\"Hello from curl\"}"
```

On success:

```json
{ "ok": true }
```

A corresponding document is stored in the `messages` collection.

---

### 7. Frontend UI, UX, and Interactions

The UI is non-template and relies on:

- **IntersectionObserver** to track which section is in view and update the radial navigation.
- **requestAnimationFrame** for:
  - Smooth scroll motion when using the orbital nav.
  - Custom cursor trailing effect.
  - Canvas-based background constellation.
- **Vanilla DOM APIs** for:
  - Character-by-character hero headline animation.
  - Sticky headers and layout shifts.

#### Key Interaction Flows

- **Orbital Navigation (`OrbitalNav.jsx`)**
  - Fixed circular control on desktop.
  - Buttons are placed around a circle using simple trigonometry and passed coordinates via CSS custom properties.
  - Clicking a node triggers a hand-written smooth scroll implementation; no third-party scrolling library is used.

- **Hero Headline Animation (`Hero.jsx`)**
  - On mount, the headline text is split into individual characters.
  - Each character is wrapped in a `span` and assigned a CSS variable `--char-index`.
  - CSS keyframes stagger the entrance animation based on index.

- **Canvas Background (`CanvasBackground.jsx`)**
  - A `<canvas>` fills the viewport, rendering moving nodes and lines between nearby nodes.
  - Motion and distance-based opacity run on `requestAnimationFrame`, with careful use of cleared frame draws to avoid visual artifacts.

- **Custom Cursor (`Layout.jsx`)**
  - A single DOM element is appended to `<body>`.
  - Pointer movement updates target coordinates; a lerp is applied on every animation frame to create smooth trailing.
  - Uses `mix-blend-mode: screen` to interact with background colors in a unique way.

All styles are implemented in `src/styles/global.css` without any third-party CSS libraries.

---

### 8. Git Setup and Workflow

From your cloned project directory:

1. **Initialize Git (if not already initialized)**:

```bash
git init
```

2. **Set your remote** (if you fork or create a new repo):

```bash
git remote add origin https://github.com/<your-username>/<your-repo>.git
```

3. **Check status and commit**:

```bash
git status
git add .
git commit -m "Initial portfolio implementation"
git push -u origin main
```

Recommended workflow:

- Use feature branches (`git checkout -b feature/projects-admin`).
- Commit small, coherent changes with descriptive messages.
- Merge back to `main` via pull requests if using a hosted Git service.

---

### 9. Deploying to Vercel

#### 9.1 Create a Vercel account and new project

1. Go to `https://vercel.com/` and sign up (GitHub/GitLab/Bitbucket or email).
2. Click **New Project**.
3. Import your Git repository that contains this project.

Vercel will usually auto-detect Vite and set:

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

Our `vercel.json` already explicitly sets:

```json
{
  "functions": {
    "api/index.js": {
      "runtime": "nodejs20.x"
    }
  },
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```

#### 9.2 Configure environment variables on Vercel

In the Vercel project settings:

1. Go to **Settings → Environment Variables**.
2. Add:
   - `MONGODB_URI` – same as your local `.env`
3. (Optional) Add:
   - `CORS_ORIGIN` – your production URL (e.g., `https://your-portfolio.vercel.app`)

Save and redeploy after adding env vars.

#### 9.3 Serverless API on Vercel

Vercel uses the `api/index.js` file as a Node.js serverless function.

This function:

- Ensures the MongoDB connection is established (`ensureDB`).
- Wraps the Express app using `serverless-http`.
- Serves routes such as:
  - `GET /api/health`
  - `GET /api/projects`
  - `POST /api/messages`

On Vercel, calls from the frontend to `/api/...` are same-origin, so you do not need to configure a separate base URL in production.

---

### 10. Environment Config: Local vs Production

- **Local**
  - `.env` at the project root:

```bash
MONGODB_URI=...
CORS_ORIGIN=http://localhost:5173
PORT=4000
```

  - Frontend dev server uses `VITE_API_BASE_URL` fallback logic:
    - Dev: `http://localhost:4000`

- **Production (Vercel)**
  - Environment variables defined in Vercel dashboard.
  - Base API URL from the frontend defaults to the same origin (`''`), so `fetch('/api/projects')` is used under the hood.
  - You do **not** need to set `VITE_API_BASE_URL` for production unless you want to point to a different API host.

---

### 11. Performance Considerations

- **Minimal bundle**: Only `react`, `react-dom`, and essential backend libraries (`express`, `mongoose`, `cors`, `dotenv`, `serverless-http`) are included. No UI frameworks or animation libraries.
- **Efficient DOM usage**:
  - Animations are driven by a small number of long-lived DOM nodes (custom cursor, canvas, hero headline spans).
  - `requestAnimationFrame` is used for smooth, efficient animations in the background and cursor.
  - IntersectionObserver avoids expensive scroll event computations for active-section tracking.
- **Serverless-aware MongoDB connection**:
  - `server/db.js` caches the Mongoose connection in `global` to prevent re-opening a new connection on every serverless invocation.

---

### 12. Troubleshooting and Common Errors

- **`MONGODB_URI is not defined`**
  - Ensure `.env` exists at project root and has `MONGODB_URI`.
  - Restart `npm run server` after updating `.env`.

- **Cannot connect to MongoDB / authentication errors**
  - Double-check username/password in the connection string.
  - Ensure your IP address is allowed in Atlas Network Access.
  - Confirm that the database name in the URI matches the one you created (`portfolio`).

- **CORS errors in the browser (during local dev)**
  - Ensure `CORS_ORIGIN` in `.env` is `http://localhost:5173`.
  - Restart `npm run server`.

- **Frontend cannot load projects**
  - Open DevTools → Network tab.
  - Check the response from `/api/projects` for error messages.
  - Ensure you have at least one document in the `projects` collection.

- **Vercel deployment fails**
  - Check the Vercel build logs:
    - Confirm `npm install` and `npm run build` succeed.
    - Make sure Node version is compatible (we target `>=18`).
  - Ensure `MONGODB_URI` is set in Vercel environment variables.

- **API works locally but not on Vercel**
  - Use Vercel’s **Functions → Logs** to see serverless errors.
  - Common issues: missing env vars, bad URI, or IP not whitelisted in Atlas.

---

### 13. How to Extend the Portfolio

- **Add a new project type**
  - Add new fields to `server/models/Project.js`.
  - Insert updated project documents in MongoDB.
  - Update the UI in `ProjectsSection.jsx` to render the new fields.

- **Add more sections**
  - Register a new section in `App.jsx`’s `sections` array.
  - Create a new React component in `src/components/`.
  - Add styles in `src/styles/global.css`.

- **Add admin tools (local-only)**
  - Add new Express routes (e.g., `/api/admin/projects`) in `server/routes/projects.js`.
  - Protect them logically using environment checks and simple tokens in headers.

---

You now have a complete, production-ready MERN portfolio that can be:

- **Cloned** with Git
- **Installed** with `npm install`
- **Run locally** with `npm run server` and `npm run dev`
- **Deployed to Vercel** with a single import and configured environment variables

All UI/UX elements are fully custom and implemented with vanilla JavaScript, HTML, and CSS atop a React structural layer. Feel free to customize the copy, styling, and data to match your own story and work. 


