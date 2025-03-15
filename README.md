# Aqua Vision Core  

Backend system for AquaVision, built using Nest.js to provide APIs for the frontend and IoT system.  

## 🚀 Features  

- Authentication & authorization (JWT)  
- Fish location prediction using IoT data  
- API for monitoring ocean conditions  
- User & fisherman management  
- Database integration  

## 🛠️ Technologies  

- **Nest.js** (Backend Framework)  
- **PostgreSQL** (Database)  
- **TypeORM** (ORM)  
- **JWT** (Authentication)  
- **Docker** (Optional for deployment)  

## 🔧 Installation  

Clone this repository:  

```sh
git clone https://github.com/Ganiramadhan/aqua-vision-core.git
cd aqua-vision-core
```  

Install dependencies:  

```sh
yarn install
```  

Configure environment:  

Create a `.env` file and add database & JWT configuration.  

Run the application:  

```sh
yarn start
```  

## 📺 API Endpoints  

| Method | Endpoint            | Description                  |
|--------|---------------------|------------------------------|
| GET    | `/api/fish`         | Retrieve fish location data |
| POST   | `/api/auth/login`   | User login                  |
| POST   | `/api/auth/register` | User registration           |  

## 📝 License  

MIT © 2025 AquaVision  
