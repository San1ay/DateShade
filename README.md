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
- **APIs:** Wikipedia REST API (History), Local Deterministic Hashing (Zodiac)

## 💻 Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install