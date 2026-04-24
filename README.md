# DateShade 📆✨
*Dates, reimagined in color.*

DateShade is a beautifully crafted, minimalist Next.js application that transforms the concept of a calendar into a personalized exploration of time. By combining chronological navigation, historical events, astrology, and dynamic color generation, DateShade offers a unique way to experience and reflect on any specific date—past, present, or future.

## ✨ Features

- **Dynamic Color Palettes:** Every date generates a unique radial gradient background based on mathematical hashing, giving every day its own visual identity.
- **Fluid Chronological Navigation:** Seamlessly jump between Years, Months, and Days with smart rollovers and relative time tracking.
- **Time Milestones:** Automatically calculates and displays historical milestones for specific years (e.g., *Silver Jubilee*, *Millennium*, *New Decade*).
- **On This Day in History:** Integrates with the Wikipedia REST API to surface top historical events that occurred on the selected date.
- **World News Integration:** Stay informed with real-time global headlines powered by The Guardian API, displayed dynamically for the current month and day.
- **Astrological Insights:** Deterministic monthly and daily Zodiac forecasts, complete with lucky colors, traits, and numbers.
- **Minimalist Typography:** Designed with a clean, editorial aesthetic utilizing classic serif typography (Georgia).

## 🚀 Upcoming Features (Roadmap)

- **📸 Insta-Shareable Dates:** *Coming soon!* Generate perfectly sized, beautifully stylized image cards of any date. Export a visual snapshot containing the date's unique color palette, horoscope, and historical facts, ready to be shared directly to Instagram Stories or other social media platforms.
- **📌 Saved & Pinned Dates:** Bookmark important life events (birthdays, anniversaries) to your personalized dashboard to quickly jump back to them.


## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** Standardized Inline CSS & Modular Components
- **APIs:** - 
    - ***The Guardian API:*** Real-time and historical news headlines.
    - ***Wikipedia REST API:*** Historical "On This Day" data.

## 💻 Getting Started

Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

## 🔐 Environment Variables

Create a `.env` file in the root directory:

Add:

```env
# The Guardian API (Optional, return empty result if not provided)
GUARDIAN_API_KEY=your_guardian_api_key
```

### API Setup

* **The Guardian API:** [https://open-platform.theguardian.com/access/](https://open-platform.theguardian.com/access/)
* **Wikipedia API:** No API key required.


## Run Locally

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## 🤝 Contributing

Contributions are always welcome! If you have ideas to make **DateShade** more meaningful, beautiful, or interactive, feel free to contribute.

Love contributions for:

* New date-based features
* Additional astrology integrations
* More historical/event data sources
* Better social sharing capabilities
* UI/UX enhancements
* Performance improvements
* Accessibility improvements
