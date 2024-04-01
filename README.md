# Full-Stack Task

## Tech Stack
- **Frontend:** React.js with TailwindCSS and React-Router DOM v6 for routing.
- **Backend:** Express.js
- **Database:** MongoDB
- **External Service:** face-api.js

## Demo URL

Frontend: [https://codebugged-task.vercel.app/](https://codebugged-task.vercel.app/)

Backend: [https://codebugged-server.vercel.app](https://codebugged-server.vercel.app)

## Features Overview

- Created following pages as mentioned in task description :
    1. `/` to display user information and pictures.
    2. `/login` where user can login using username and their picture.
    3. `/register` to register their face.
  <br />
- **API Endpoints:** Developed API endpoints using Express.js
  - `/api/users` POST Method for user registration storing user info in database.
  - `/api/auth` POST Method to authenticate user.
  - `/images` GET, POST Method for getting and uploading images.
  <br />
- Created a responsive design to ensure compatibility across various devices.
- Both frontend and backend is deployed in vercel.

## Setup
Clone Repo : `git clone https://github.com/kamal9494/codebugged-task`

Frontend : `cd client`
           `npm install`
           `npm run dev`

Backend : `cd server`
           `npm install`
           `npm run dev`
           
## Architecture Diagram
![image](https://github.com/kamal9494/codebugged-task/assets/97849725/99c666cb-1509-4a3f-869d-723bfe990932)




