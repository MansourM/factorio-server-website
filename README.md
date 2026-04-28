# Factorio Server Website

Simple, self-contained single-page website for your private Factorio server.

## Features

- ✅ Self-contained (no external CDNs)
- 📦 Mod list with descriptions and download links
- 🔒 Time-based unlock system (client-side, honor system)
- 📐 Approved blueprints section
- 📱 Responsive design
- 🎨 Dark theme optimized for gaming

## Configuration

Edit `config.js` to configure everything:

```javascript
const FACTORIO_DATA = {
  "serverConfig": {
    "serverStartDate": "2025-01-01",  // Change to your actual server start date
    "serverAddress": "YOUR_SERVER_IP:YOUR_PORT",  // Update with actual game port
    "modsBaseUrl": "http://YOUR_SERVER_IP:YOUR_WEB_PORT/game/factorio/mods/"
  },
  "mods": [
    {
      "name": "even-distribution",
      "file": "even-distribution_2.0.2.zip",
      "category": "starter",  // starter, intermediate, or advanced
      "short": "Short description",
      "description": "Full description",
      "cooldownDays": 0,  // Days after server start before mod unlocks
      "modPortalUrl": "https://mods.factorio.com/mod/even-distribution"
    }
  ]
}
```

### Key Configuration Options:

- `serverStartDate`: Date when server started (YYYY-MM-DD format)
- `serverAddress`: Game server address players connect to
- `modsBaseUrl`: Base URL where mod files are hosted
- `cooldownDays`: Individual cooldown for each mod (0 = available immediately)
- `category`: Groups mods in the UI (starter/intermediate/advanced)

## Deployment

1. Upload all files to your server:
   - `index.html`
   - `style.css`
   - `script.js`
   - `config.js`

2. Place in your web server directory (e.g., nginx) serving `http://YOUR_SERVER_IP:YOUR_WEB_PORT/game/factorio/`

3. Ensure mods are accessible at `http://YOUR_SERVER_IP:YOUR_WEB_PORT/game/factorio/mods/`

## Mod Categories

- **Starter Friendly**: QoL improvements, available based on individual cooldowns
- **Intermediate**: Information and planning tools, typically 7-10 day cooldowns
- **Advanced**: Complex calculators, typically 14+ day cooldowns

Each mod has its own cooldown timer that starts from the server start date.

## Customization

### Change Mod Cooldowns

Edit the `cooldownDays` value for any mod in `config.js`:

```javascript
{
  "name": "helmod",
  "cooldownDays": 14  // Change this number
}
```

### Add/Remove Mods

Add or remove mod entries in the `mods` array in `config.js`:

```javascript
{
  "name": "new-mod",
  "file": "new-mod_1.0.0.zip",
  "category": "starter",
  "short": "Brief description",
  "description": "Full description here",
  "cooldownDays": 5,
  "modPortalUrl": "https://mods.factorio.com/mod/new-mod"
}
```

### Update Blueprint Links

Edit the blueprint section in `index.html` to add your own blueprint codes or links.

## File Structure

```
.
├── index.html         # Main HTML structure
├── style.css          # All styling (no external dependencies)
├── script.js          # Logic for loading and displaying mods
├── config.js          # Server config and mod database (EDIT THIS)
└── README.md          # This file
```

## Notes

- All fonts use system fonts (no web fonts needed)
- Each mod has individual cooldown timer starting from server start date
- Unlock system is client-side and relies on player honor system
- Mod descriptions sourced from official Factorio mod portal
- Links to official mod portal pages included for each mod
- Compatible with Factorio 2.0.76
- All configuration in `config.js` for easy editing (no CORS issues)
