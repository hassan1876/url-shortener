# URL Shortener

A simple **Node.js URL shortener** with **Redis caching, rate limiting**, and **MongoDB indexing** for optimized performance.

## 🚀 Features
- ✅ Shortens long URLs
- ✅ **Caching with Redis** for faster lookups
- ✅ **Rate limiting** to prevent abuse
- ✅ **MongoDB indexing** for optimized query performance
- ✅ Validates URLs before storing

---

## 📚 Installation

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/url-shortener.git
cd url-shortener
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Start Redis Server (WSL or Local)
If using **WSL (Windows Subsystem for Linux)**:
```bash
sudo service redis-server start
```
If using **local Redis**:
```bash
redis-server
```

### 4️⃣ Set Up Environment Variables
Create a `.env` file in the project root:
```env
MONGO_URI=your_mongodb_connection_string
REDIS_URL=redis://localhost:6379
PORT=3333
```

### 5️⃣ Start the Server (use external terminal)
```bash
npm start
```

---

## 🔧 API Endpoints

### ✨ Shorten a URL
**`POST /api/short`**  
Request:
```json
{
  "origUrl": "https://example.com"
}
```
Response:
```json
{
    "_id": "exampleID",
    "urlId": "",
    "origUrl": "https://example.com",
    "shortUrl": "short url",
    "clicks": 1,
    "date": "created date",
    "__v": 0
}
```

### 🔗 Redirect to Original URL
**`GET /:urlId`**  
- Redirects to the original URL if found in **MongoDB** or **Redis cache**.

### 🚦 Rate Limiting
- Limits the number of requests per IP to prevent abuse.

---

## 🛠️ How It Works

### 📌 Caching with Redis
- **Speeds up redirects** by avoiding database queries.
- **Automatically expires old cache entries** for efficiency.

### 📌 Rate Limiting
- **Prevents excessive requests** with `express-rate-limit`.
- Customizable request limits per user/IP.

### 📌 MongoDB Indexing
- **Indexes the `urlId` field** for optimized query performance.
- **Speeds up lookups** in large datasets.


---

## 👨‍💻 Built With
- [Node.js](https://nodejs.org/) + [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/)
- [Redis](https://redis.io/)
- [Express Rate Limit](https://www.npmjs.com/package/express-rate-limit)
- [Nanoid](https://www.npmjs.com/package/nanoid)