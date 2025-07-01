
# 📊 Dashboard App

This project is a React-based dashboard that visualizes customer and company payment data, now powered by a live Express API.

---

## 🚀 Features

✅ Interactive charts and tables with live data  
✅ Express backend deployed via Railway  
✅ Environment-based API configuration with `.env`  
✅ Modern file structure for scalability  
✅ Loading and error handling for API requests  

---

## 📁 Project Structure

```
.
├── /public
├── /src
│   ├── /api
│   │   ├── companies.js
│   │   └── users.js
│   ├── /components
│   │   ├── CompanyTable.js
│   │   ├── CustomerTable.js
│   │   ├── CompanyPie.js
│   │   └── UsersChart.js
│   ├── /utils
│   │   └── currencyFormatter.js
│   ├── App.js
│   └── index.js
├── .env.development
├── .env.production
├── server.js
└── package.json
```

---

## 🌐 Live API

Your React app fetches data from the Express API hosted at:
```
https://data-api-production-fb2b.up.railway.app
```

**Endpoints:**
- `GET /api/users` → returns list of users with payments
- `GET /api/companies` → returns list of companies with summary data

The API is CORS-enabled to allow requests from your frontend dashboard.

---

## ⚙️ Environment Variables

The app uses `.env` files to configure the API URL based on environment.

**Example `.env.development`:**
```env
REACT_APP_API_BASE_URL=http://localhost:3000
```

**Example `.env.production`:**
```env
REACT_APP_API_BASE_URL=https://data-api-production-fb2b.up.railway.app
```

📌 **Important:**  
- Environment variables must start with `REACT_APP_` for Create React App.
- Restart your React dev server after updating `.env` files.

---

## 🛠️ Running the Project Locally

1️⃣ Clone the repository:
```bash
git clone https://github.com/yourusername/your-repo.git
cd your-repo
```

2️⃣ Install dependencies:
```bash
npm install
```

3️⃣ Start the Express API in one terminal:
```bash
node server.js
```

4️⃣ Start the React app in another terminal:
```bash
npm start
```

The React app will connect to your locally running Express API by default if `.env.development` points to `http://localhost:3000`.

The server is hosted on Railway, and the API is CORS-enabled to allow requests from the React app. 
You can find the github repository for the server [here](https://github.com/sarahp/data-api)



---

## 📦 Building for Production

To build the React app for deployment:
```bash
npm run build
```

CRA will automatically use `.env.production` during the build process.

---

## 🚀 Deploying the API

Your Express API is deployed using [Railway](https://railway.app) on their free tier.  
**Production API URL:**  
```
https://data-api-production-fb2b.up.railway.app
```

---

## ✅ TODO

- Add loading spinners or skeleton components for smoother UX
- Create reusable React hooks like `useUsers()` or `useCompanies()`
- Refactor for better responsiveness on mobile devices

---

## 🧪 Testing

- Verified local development with `.env.development` set to `localhost`
- Tested production build with `.env.production` set to live Railway API
- Confirmed React dashboard displays up-to-date data from live API endpoints

---

## 📄 License

MIT – free to use, modify, and distribute.

---

## 🙌 Contributing

Feel free to open issues or submit pull requests for improvements and bug fixes!
