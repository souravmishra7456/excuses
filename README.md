# 🎭 DevExcuse API

A fun and free API that provides developers with creative excuses for when things go wrong in their projects. Whether you need to explain why a bug slipped through, why a feature isn't working, or why the deployment failed, we've got you covered with humorous and relatable developer excuses.

[![API Status](https://img.shields.io/badge/API-Status-green.svg)](https://excuses.onrender.com/health)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14+-black.svg)](https://nextjs.org/)

## 🌟 Features

- **Random Excuses** - Get random developer excuses from any category
- **Multiple Excuses** - Request multiple excuses at once (up to 10)
- **Categorized Content** - 12 different categories including AI, backend, frontend, testing, and more
- **Search Functionality** - Search through all excuses for specific keywords
- **No Authentication** - Free to use with no API keys required
- **JSON Responses** - Clean JSON responses with excuse text and category
- **Rate Limiting** - Fair usage limits to ensure service availability
- **Beautiful Documentation** - Interactive API documentation with examples

## 🚀 Live Demo

- **API Base URL**: https://excuses.onrender.com
- **Documentation**: https://excuses-one.vercel.app/docs
- **Health Check**: https://excuses.onrender.com/health

## 📚 API Endpoints

| Method | Endpoint                           | Description                      |
| ------ | ---------------------------------- | -------------------------------- |
| `GET`  | `/excuse`                          | Get a random excuse              |
| `GET`  | `/excuse?count=3`                  | Get multiple excuses             |
| `GET`  | `/excuse?category=backend`         | Get excuses by category          |
| `GET`  | `/excuse?count=3&category=testing` | Get multiple excuses by category |
| `GET`  | `/excuse/devil`                    | Get the ultimate excuse          |
| `GET`  | `/categories`                      | Get all available categories     |
| `GET`  | `/search?q=cache`                  | Search excuses by keyword        |
| `GET`  | `/health`                          | Check API status and rate limits |

## 🏗️ Project Structure

```
excuses/
├── backend/                 # Node.js/Express API server
│   ├── excuses.js          # Excuse data and logic
│   ├── excuseService.js    # Business logic service
│   ├── index.js            # Express server setup
│   ├── package.json        # Backend dependencies
│   └── utils/
│       └── ascii.js        # ASCII art utilities
├── frontend/               # Next.js documentation site
│   ├── src/
│   │   └── app/
│   │       ├── docs/       # API documentation pages
│   │       ├── layout.js   # Root layout
│   │       └── page.js     # Home page
│   ├── public/             # Static assets
│   └── package.json        # Frontend dependencies
└── README.md              # This file
```

## 🛠️ Technology Stack

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - Request throttling
- **Helmet** - Security headers

### Frontend

- **Next.js 14** - React framework
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Responsive Design** - Mobile-first approach

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Backend Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/excuses.git
   cd excuses
   ```

2. **Install backend dependencies**

   ```bash
   cd backend
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

   The API will be available at `http://localhost:5500`

   **For production:**

   ```bash
   npm start
   ```

### Frontend Setup

1. **Navigate to frontend directory**

   ```bash
   cd ../frontend
   ```

2. **Install frontend dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

   The documentation site will be available at `http://localhost:3000`

   **For production:**

   ```bash
   npm run build
   npm start
   ```

## 📖 Usage Examples

### JavaScript/Node.js

```javascript
const response = await fetch("https://excuses.onrender.com/excuse");
const data = await response.json();
console.log(data.excuse);
```

### Python

```python
import requests

response = requests.get('https://excuses.onrender.com/excuse')
data = response.json()
print(data['excuse'])
```

### cURL

```bash
curl -X GET "https://excuses.onrender.com/excuse" \
  -H "Accept: application/json"
```

### Get Multiple Excuses

```bash
curl -X GET "https://excuses.onrender.com/excuse?count=3" \
  -H "Accept: application/json"
```

### Get Excuses by Category

```bash
curl -X GET "https://excuses.onrender.com/excuse?category=backend" \
  -H "Accept: application/json"
```

## 🎯 Available Categories

- **AI** - Artificial Intelligence and machine learning related excuses
- **backend** - Server-side and backend development excuses
- **blame** - Excuses that shift responsibility to others
- **classic** - Timeless developer excuses that never get old
- **database** - Database and data-related excuses
- **devil** - The ultimate excuse - the devil made me do it
- **devops** - DevOps and deployment related excuses
- **frontend** - Client-side and frontend development excuses
- **hardware** - Hardware and infrastructure related excuses
- **misc** - Miscellaneous excuses that don't fit other categories
- **network** - Network and connectivity related excuses
- **testing** - Testing and quality assurance related excuses

## 📊 Rate Limiting

- **General Endpoints**: 100 requests per 15 minutes
- **Search Endpoint**: 30 requests per 15 minutes

When you exceed the rate limit, you'll receive a 429 status code with retry information.

## 🔧 Development

### Backend Development

The backend uses Express.js with the following key files:

- `index.js` - Main server setup with middleware and routes
- `excuses.js` - Contains all excuse data and helper functions
- `excuseService.js` - Business logic for excuse operations

### Frontend Development

The frontend is built with Next.js 14 and includes:

- Interactive API documentation with tabs
- Code examples in multiple languages
- Responsive design for all devices
- Copy-to-clipboard functionality

### Adding New Excuses

To add new excuses, edit the `backend/excuses.js` file:

```javascript
// Add new excuses to the excuses array
{ text: "Your new excuse here", category: "category_name" }
```

## 🧪 Testing

### Backend Testing

```bash
cd backend
npm test
```

### Frontend Testing

```bash
cd frontend
npm test
```

## 📦 Deployment

### Backend Deployment

The backend can be deployed to any Node.js hosting platform:

- **Vercel**: Connect your GitHub repository
- **Railway**: Deploy with one click
- **Heroku**: Use the Node.js buildpack
- **DigitalOcean App Platform**: Simple deployment

### Frontend Deployment

The frontend is optimized for Vercel deployment:

```bash
cd frontend
npm run build
npm start
```

## 🔍 SEO Optimization

This project includes comprehensive SEO optimizations:

### Meta Tags & Structured Data
- **Comprehensive meta tags** with title, description, and keywords
- **Open Graph tags** for social media sharing
- **Twitter Card tags** for Twitter sharing
- **Structured data (JSON-LD)** for search engine understanding
- **Canonical URLs** to prevent duplicate content

### Technical SEO
- **robots.txt** file for search engine crawling instructions
- **sitemap.xml** for easy page discovery
- **Web manifest** for PWA capabilities
- **Security headers** for better site security
- **Image optimization** with WebP and AVIF support

### Performance Optimizations
- **Code splitting** for faster loading
- **Bundle optimization** with vendor chunking
- **CSS optimization** and tree shaking
- **Compression** enabled for all responses
- **Caching headers** for static assets

### SEO Files Created
```
frontend/public/
├── robots.txt          # Search engine crawling rules
├── sitemap.xml         # Site structure for search engines
└── site.webmanifest    # PWA manifest file
```

### SEO Checklist
- ✅ Meta title and description for all pages
- ✅ Open Graph and Twitter Card tags
- ✅ Structured data markup
- ✅ Robots.txt file
- ✅ XML sitemap
- ✅ Canonical URLs
- ✅ Mobile-friendly design
- ✅ Fast loading times
- ✅ Security headers
- ✅ HTTPS enabled
- ✅ Clean URL structure

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add some amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Contribution Ideas

- Add new excuses to existing categories
- Create new excuse categories
- Improve the documentation
- Add new API endpoints
- Enhance the frontend design
- Add more code examples

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the classic "It works on my machine" excuse
- Built for the developer community
- Thanks to all contributors and users

## 📞 Contact

- **Creator**: [Sourav](https://sourav-portfolio-psi.vercel.app/)
- **Contact**: [Contact Form](https://sourav-portfolio-psi.vercel.app/contact)
- **API Status**: [Health Check](https://excuses.onrender.com/health)

## ⭐ Star History

If you find this project useful, please consider giving it a star on GitHub!

---

Made with ❤️ for developers who need a good excuse every now and then.
