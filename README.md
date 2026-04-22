# 🍔 BURGER BUZZ — Premium Gourmet Burger Menu

A full-featured, immersive React-based menu website for **Burger Buzz**, Guntur's premium gourmet burger shop.

---

## ✨ Features

- **🎬 3D Scroll-Driven Canvas Animation** — Uses your 240 burger frame images (in `burgerpics/`) as a parallax scroll animation
- **📱 Full Responsive** — Mobile-first, works on all devices
- **🍔 Complete Menu** — 16 burger items across Classic, Premium, Chicken & Veggie categories with images, prices, ratings, calories
- **⭐ Popular Burgers Section** — Top 3 featured with live order counts
- **🎯 Offers & Deals** — 6 special combo deals and discounts
- **🍟 Sides, Snacks & Drinks** — Complete sidekick menu
- **🛠️ Interactive Burger Customizer** — 5-step build-your-own-burger with live price preview
- **📖 How It's Made** — 4-step craft process with photos
- **💬 Customer Testimonials** — Swiper carousel with real-style reviews
- **📊 Facts/Why Us** — 6 brand fact cards
- **🔢 Animated Stats** — Count-up stats section
- **🌟 Smooth Scroll** — Lenis smooth scroll + GSAP ScrollTrigger
- **🎉 Toast Notifications** — React Hot Toast for order feedback

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** >= 18.x  
- **npm** >= 9.x

### Install & Run

```bash
# 1. Extract this folder
# 2. Navigate into it
cd burger-buzz

# 3. Install dependencies
npm install

# 4. Add your burger images
#    Place your 240 frame images in: public/burgerpics/
#    Named: ezgif-frame-001.jpg through ezgif-frame-240.jpg

# 5. Start dev server
npm run dev

# 6. Open browser
# → http://localhost:3000
```

---

## 📁 Project Structure

```
burger-buzz/
├── public/
│   └── burgerpics/          ← 📸 PUT YOUR 240 FRAMES HERE
│       ├── ezgif-frame-001.jpg
│       ├── ezgif-frame-002.jpg
│       └── ... (up to ezgif-frame-240.jpg)
│
├── src/
│   ├── components/
│   │   ├── Preloader.jsx     ← Loading screen with progress
│   │   ├── Navbar.jsx        ← Fixed nav with mobile menu
│   │   ├── Hero.jsx          ← Canvas scroll animation + hero text
│   │   ├── Marquee.jsx       ← Scrolling ticker strip
│   │   ├── About.jsx         ← Brand story section
│   │   ├── Stats.jsx         ← Animated counter stats
│   │   ├── MenuSection.jsx   ← Full menu grid with category tabs
│   │   ├── BurgerCard.jsx    ← Individual menu item card
│   │   ├── Popular.jsx       ← Top 3 featured burgers
│   │   ├── HowItsMade.jsx    ← 4-step process section
│   │   ├── Offers.jsx        ← Deals & combo cards
│   │   ├── Snacks.jsx        ← Sides, snacks & drinks
│   │   ├── Facts.jsx         ← Brand fact cards
│   │   ├── Customizer.jsx    ← Interactive burger builder
│   │   ├── Testimonials.jsx  ← Customer review carousel
│   │   ├── FinalCTA.jsx      ← Final call-to-action section
│   │   └── Footer.jsx        ← Full footer with links
│   │
│   ├── data/
│   │   └── menuData.js       ← 📝 ALL menu data, prices, offers
│   │
│   ├── styles/
│   │   └── global.css        ← Global CSS variables & utilities
│   │
│   ├── App.jsx               ← Root component + Lenis smooth scroll
│   └── main.jsx              ← React entry point
│
├── index.html
├── vite.config.js
└── package.json
```

---

## 🖼️ Adding Your Burger Images

Your scroll animation needs your 240 burger images placed in:

```
public/burgerpics/ezgif-frame-001.jpg
public/burgerpics/ezgif-frame-002.jpg
...
public/burgerpics/ezgif-frame-240.jpg
```

The canvas in `Hero.jsx` automatically loads these and maps them to scroll position. As you scroll through the 600vh spacer, the burger animation plays through all 240 frames.

---

## 🎨 Customizing Menu Content

All menu data is in `src/data/menuData.js`:

- `menuItems` — All 16 burger items (name, price, image URL, ratings, etc.)
- `snacks` — Side dishes
- `drinks` — Beverage menu
- `offers` — Deal cards
- `burgerFacts` — Facts section cards
- `testimonials` — Customer reviews
- `customizerOptions` — Buns, patties, cheese, sauces, toppings

Update prices, add/remove items, swap images — it all comes from this one file.

---

## 🛒 Order System

This is a **manual order** system as requested. When customers:
- Click "Add" on a menu card → Toast notification appears
- Click "Order Now" → Toast notification appears  
- Complete the customizer → Toast with total price

For production, you can connect these to WhatsApp Business API, a Google Form, or your POS system.

---

## 📦 Tech Stack

| Library | Purpose |
|---------|---------|
| React 18 | UI framework |
| Vite | Build tool |
| GSAP + ScrollTrigger | Scroll-driven canvas animation |
| Framer Motion | UI animations & transitions |
| @studio-freight/lenis | Smooth scroll |
| Swiper | Testimonial carousel |
| react-hot-toast | Order notifications |
| react-countup | Animated stats |
| react-intersection-observer | Scroll reveal |

---

## 🏗️ Build for Production

```bash
npm run build
# Output in: dist/
```

---

Made with 🍔 for Burger Buzz, Guntur, Andhra Pradesh
