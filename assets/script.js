/**
 * IMPORTANT: When updating this file, increment the version in index.html
 * Use timestamp format: YYYYMMDDHHmm (e.g., 202604281145 for April 28, 2026 11:45 AM)
 * This forces browsers to reload the updated file instead of using cached version.
 */

// Global variables - loaded from config.js
let CONFIG = FACTORIO_DATA.serverConfig;
let MODS_DATA = FACTORIO_DATA.mods;
let BLUEPRINTS_DATA = FACTORIO_DATA.blueprints;

// ── LOGIC ──
function daysSinceStart() {
  const diff = Date.now() - new Date(CONFIG.serverStartDate).getTime();
  return Math.floor(diff / 86400000);
}
function isUnlocked(days) { 
  // Items with 0 cooldown are always unlocked (starter items)
  if (days === 0) return true;
  return daysSinceStart() >= days; 
}
function unlockDate(days) {
  const d = new Date(new Date(CONFIG.serverStartDate).getTime() + days * 86400000);
  return d.toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' });
}
function daysRemaining(days) { return Math.max(0, days - daysSinceStart()); }

function unlockBadges(cooldown) {
  if (isUnlocked(cooldown)) return `<span class="badge avail">✓ Available</span>`;
  return `<span class="badge locked-b">🔒 Locked</span><span class="badge unlock-d">${daysRemaining(cooldown)}d (${unlockDate(cooldown)})</span>`;
}

function renderMod(m) {
  const tags = m.factorioModPortalTags.map(t => `<span class="badge tag">${t}</span>`).join('');
  return `<div class="exp-item${isUnlocked(m.unlockCooldownDays)?'':' locked'}" data-id="${m.modName}">
    <div class="exp-header">
      <div style="flex:1;min-width:0">
        <div class="exp-name">${m.modName}</div>
        <div class="exp-summary">${m.summaryDescription}</div>
      </div>
      <div class="exp-badges">
        <span class="badge cat">${m.factorioModPortalCategory}</span>
        ${unlockBadges(m.unlockCooldownDays)}
        <span class="chevron">▼</span>
      </div>
    </div>
    <div class="exp-body">
      <div class="exp-content">
        ${tags ? `<div class="exp-tags">${tags}</div>` : ''}
        <div class="exp-desc">${m.fullDescription}</div>
        <div class="exp-links">
          <a class="btn-dl" href="${CONFIG.modsBaseUrl}${m.modFileName}" download>⬇ Download</a>
          <a class="btn-ext" href="${m.modPortalUrl}" target="_blank" rel="noopener">↗ Mod Portal</a>
        </div>
      </div>
    </div>
  </div>`;
}

function renderBlueprint(b) {
  const tags = b.tags.map(t => `<span class="badge tag">${t}</span>`).join('');
  const copyBtn = b.blueprintString
    ? `<button class="btn-copy" data-bp="${encodeURIComponent(b.blueprintString)}">📋 Copy Blueprint String</button>`
    : '';
  const stats = Object.entries(b.blueprintStats).filter(([,v])=>v).map(([k,v])=>`<span style="color:var(--text-secondary);font-size:0.82em">${k}: ${v}</span>`).join('  ·  ');
  return `<div class="exp-item${isUnlocked(b.unlockCooldownDays)?'':' locked'}" data-id="${b.blueprintName}">
    <div class="exp-header">
      <div style="flex:1;min-width:0">
        <div class="exp-name">${b.blueprintName}</div>
        <div class="exp-summary">${b.summaryDescription}</div>
      </div>
      <div class="exp-badges">
        <span class="badge cat">${b.blueprintCategory}</span>
        ${unlockBadges(b.unlockCooldownDays)}
        <span class="chevron">▼</span>
      </div>
    </div>
    <div class="exp-body">
      <div class="exp-content">
        ${tags ? `<div class="exp-tags">${tags}</div>` : ''}
        <div class="item-author">By ${b.blueprintAuthor} · Factorio ${b.factorioVersion}</div>
        <div class="exp-desc">${b.fullDescription}</div>
        ${stats ? `<div style="margin-bottom:10px">${stats}</div>` : ''}
        <div class="exp-links">
          ${copyBtn}
          <a class="btn-ext" href="${b.blueprintUrl}" target="_blank" rel="noopener">↗ View Blueprint</a>
          ${b.videoUrl ? `<a class="btn-ext" href="${b.videoUrl}" target="_blank" rel="noopener">▶ Video Tutorial</a>` : ''}
        </div>
      </div>
    </div>
  </div>`;
}

function sortItems(arr) {
  return [...arr].sort((a,b) => {
    const d = (a.unlockCooldownDays||0) - (b.unlockCooldownDays||0);
    return d !== 0 ? d : (a.modName||a.blueprintName).localeCompare(b.modName||b.blueprintName);
  });
}

function render() {
  document.getElementById('serverAddress').textContent = CONFIG.serverAddress;
  document.getElementById('gameVersion').textContent = CONFIG.gameVersion;
  document.getElementById('gameDownloadLink').href = CONFIG.gameDownloadUrl;
  
  // Update server start date label and value based on whether server has started
  const startDate = new Date(CONFIG.serverStartDate);
  const now = new Date();
  const serverStartLabel = document.getElementById('serverStartLabel');
  const serverStartDateEl = document.getElementById('serverStartDate');
  
  if (now < startDate) {
    // Server hasn't started yet
    const daysUntil = Math.ceil((startDate - now) / 86400000);
    serverStartLabel.textContent = `Starts In (${daysUntil} days)`;
    serverStartDateEl.textContent = CONFIG.serverStartDate;
  } else {
    // Server has started
    const daysSince = Math.floor((now - startDate) / 86400000);
    serverStartLabel.textContent = `Started (${daysSince} days ago)`;
    serverStartDateEl.textContent = CONFIG.serverStartDate;
  }

  const byTier = t => sortItems(MODS_DATA.filter(m => m.playerDifficultyCategory === t));
  document.getElementById('starterMods').innerHTML      = byTier('starter').map(renderMod).join('');
  document.getElementById('intermediateMods').innerHTML = byTier('intermediate').map(renderMod).join('');
  document.getElementById('advancedMods').innerHTML     = byTier('advanced').map(renderMod).join('');
  document.getElementById('blueprintsList').innerHTML   = sortItems(BLUEPRINTS_DATA).map(renderBlueprint).join('');

  // expand/collapse
  document.querySelectorAll('.exp-header').forEach(h => {
    h.addEventListener('click', () => h.closest('.exp-item').classList.toggle('open'));
  });

  // copy blueprint
  document.querySelectorAll('.btn-copy').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const str = decodeURIComponent(btn.dataset.bp);
      navigator.clipboard.writeText(str).then(() => {
        const orig = btn.textContent;
        btn.textContent = '✓ Copied!';
        btn.style.borderColor = 'var(--green)';
        btn.style.color = 'var(--green)';
        setTimeout(() => { btn.textContent = orig; btn.style.borderColor=''; btn.style.color=''; }, 2000);
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', render);
