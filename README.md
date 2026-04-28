# Factorio Server Website

A clean, self-contained website for managing your private Factorio server's approved mods and blueprints. Perfect for keeping friends organized with a time-based unlock system that gradually introduces QoL mods as players learn the game.

**🔗 [Live Demo](https://mansourm.github.io/factorio-server-website/)**

## Features

- 📦 **Curated Mod List** - Approved mods organized by difficulty (Starter/Intermediate/Advanced)
- 🔒 **Time-Based Unlocks** - Mods unlock progressively based on server start date
- 📐 **Blueprint Library** - Approved blueprints with copy-to-clipboard functionality
- 📱 **Responsive Design** - Works on desktop and mobile
- 🎨 **Factorio-Themed** - Dark theme optimized for gaming
- ✅ **Self-Contained** - No external dependencies, works offline

## Quick Start

1. **Edit `assets/config.js`** - Update server info and mod list
2. **Deploy** - Upload to any web server or use GitHub Pages
3. **Share** - Send the link to your players

### Configuration

Edit `assets/config.js`:

```javascript
"serverConfig": {
  "serverStartDate": "2026-05-01",           // Your server start date
  "serverAddress": "YOUR_SERVER_IP:PORT",    // Game server address
  "gameDownloadUrl": "https://factorio.com/",
  "modsBaseUrl": "http://YOUR_SERVER_IP:PORT/mods/"  // Where mod files are hosted
}
```

### Adding/Removing Mods

Edit the `mods` array in `assets/config.js`. Each mod has:
- `unlockCooldownDays`: Days after server start before unlock (0 = immediate)
- `playerDifficultyCategory`: `starter`, `intermediate`, or `advanced`

### Adding Blueprints

Edit the `blueprints` array in `assets/config.js`. Include blueprint strings for copy-paste functionality.

## Deployment Options

**GitHub Pages** (Free):
1. Push to GitHub
2. Settings → Pages → Deploy from `main` branch
3. Done! Site live at `https://USERNAME.github.io/REPO_NAME/`

**Self-Hosted**:
- Upload files to any web server (nginx, Apache, etc.)
- No build step required - pure HTML/CSS/JS

## File Structure

```
├── index.html              # Main page
├── assets/
│   ├── config.js          # Server config & mod/blueprint data (EDIT THIS)
│   ├── script.js          # UI logic
│   └── style.css          # Styling
├── mods/                  # Place mod .zip files here (gitignored)
└── README.md
```

## Notes

- Compatible with Factorio 2.0 (Space Age)
- Unlock system is client-side (honor system)
- Mod files are not included.
- All configuration in one file (`assets/config.js`)
