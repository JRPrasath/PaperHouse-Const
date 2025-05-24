# Paper House Construction Website

A full-stack web application for a construction company, featuring project showcases and contact management.

## Features

- Dynamic project showcase (ongoing and completed projects)
- Contact form with email notifications
- Admin panel for project management
- Responsive design
- Image upload functionality

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Vite

### Backend
- Node.js
- Express.js
- MongoDB
- Nodemailer

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Backend Setup
1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the server directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/paper-house-construction
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-specific-password
   ADMIN_EMAIL=admin@paperhouseconstruction.com
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Projects
- GET `/api/projects` - Get all projects
- GET `/api/projects/ongoing` - Get ongoing projects
- GET `/api/projects/completed` - Get completed projects
- POST `/api/projects` - Add new project (admin only)

### Contact
- POST `/api/contact` - Submit contact form

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. 