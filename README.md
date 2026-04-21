# TruthLens AI — Media Credibility Analysis

TruthLens AI is a modern, production-ready web application designed for a hackathon. It empowers users to analyze news articles, headlines, and URLs for credibility using a heuristic analysis engine.

## 🚀 Features

- **Credibility Scoring**: Quantified trust scores (0–100) based on language style, sensationalism, and bias.
- **Source Reputation**: Domain-level trust verification against a database of verified news outlets.
- **Claim Inspector**: NLP-driven extraction of key claims with simulated verification status.
- **Analysis History**: Secure, privacy-friendly localStorage persistence for your past verifications.
- **Educational Hub**: Integrated resources for learning media literacy and the SIFT verification method.
- **Modern UI**: Polished glassmorphism design with Dark/Light mode support and Framer Motion animations.

## 🛠️ Tech Stack

- **Frontend**: React (Vite)
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Charts**: Recharts
- **Validation**: Zod + React Hook Form

## 📦 Getting Started

### Prerequisites

- Node.js (18.x or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/SAFAL-TIWARI/TruthLensAI.git
   cd TruthLensAI
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## 🧠 How it Works

The analysis engine uses a **Heuristic Scoring Model**:
1. **Language Style**: Detects clickbait patterns and sensationalist vocabulary.
2. **Sentiment Analysis**: Measures emotional intensity and bias.
3. **Structural Analysis**: Checks for excessive punctuation, capitalization, and formatting flags.
4. **Metadata Check**: Cross-references domains against a curated source reliability database.

## 🛡️ Disclaimer

*TruthLens AI is an assistive tool for educational and awareness purposes. It is not an absolute truth machine. Final verification should always involve multiple primary sources.*

---
Built for the **Hack2Skill PromptWars Hackathon** by **Safal Tiwari**.
