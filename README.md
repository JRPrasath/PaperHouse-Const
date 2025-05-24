# Paper House Construction

A full-stack web application for a construction company, featuring project showcases, a contact form, and admin management.

## Features

- Dynamic project showcase (ongoing and completed projects)
- Contact form with MongoDB storage and email notifications
- Responsive design
- Admin-ready backend

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Email:** Nodemailer (Gmail SMTP)

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm
- MongoDB (local or Atlas)
- Git

### Clone the Repository
```bash
git clone https://github.com/JRPrasath/PaperHouse-Const.git
cd PaperHouse-Const
```

### Backend Setup
1. Go to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `server` directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/paperhouse_construction
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_PASS=your-16-character-app-password
   ADMIN_EMAIL=your-gmail@gmail.com
   ```
   - [How to get a Gmail App Password](https://support.google.com/accounts/answer/185833)
4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. In the project root, run a static server (e.g. with `http-server`):
   ```bash
   npx http-server
   ```
2. Open [http://localhost:8080](http://localhost:8080) in your browser.

## Deployment
- **Frontend:** Deploy static files to Netlify, Vercel, or GitHub Pages.
- **Backend:** Deploy to Render, Railway, or Heroku.
- **Database:** Use MongoDB Atlas for cloud database.

## GitHub Actions CI
This project includes a basic GitHub Actions workflow for Node.js:
- Installs dependencies
- Runs backend tests (if any)
- Checks for lint errors

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. 