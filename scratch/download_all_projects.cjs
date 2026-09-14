const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const projectsDir = path.join(__dirname, '..', 'public', 'projects');
if (!fs.existsSync(projectsDir)) {
  fs.mkdirSync(projectsDir, { recursive: true });
}

const projects = [
  { id: 'ozum-builders', url: 'https://ozumbuilders.in/' },
  { id: 'solar-and-sun', url: 'https://solarnsun.com/' },
  { id: 'apollinis', url: 'https://apollinis.in/' },
  { id: 'blue-moon-shopee', url: 'https://bluemoonshopee.in/' },
  { id: 'law-eminence', url: 'https://laweminence.com/' },
  { id: 'envonix-tech', url: 'https://envonixtech.com/' },
  { id: 'ued-corp', url: 'https://uedcorp.com/' },
  { id: 'hyades', url: 'https://hyades.in/' },
  { id: 'stiine', url: 'https://stiine.in/' },
  { id: 'the-entrade', url: 'https://theentrade.com/' },
  { id: 'oggle-interior', url: 'https://www.oggleinterior.com/' },
  { id: 'inax-academy', url: 'https://inaxacademy.ezyplus.in/' },
  { id: 'ocean-medical-qa', url: 'https://oceanmedicalqa.com/' },
  { id: 'empire-llc-uae', url: 'https://empirellcuae.com/' },
  { id: 'fly-scanner-online', url: 'https://flyscanneronline.com/' },
  { id: 'art-nouveau', url: 'https://artnouveau.ezyplus.in/' },
  { id: 'azka-logistics', url: 'https://azkalogistics.com/' },
  { id: 'finfocus-global', url: 'https://finfocusglobal.com/' },
  { id: 'alpha-dma-crm', url: 'https://crm.alphadma.in' },
  { id: 'alpha-dma-connect', url: 'https://connect.alphadma.in' },
];

function fetchImage(srcUrl, destPath, maxRedirects = 5) {
  return new Promise((resolve, reject) => {
    if (maxRedirects <= 0) return reject(new Error('Too many redirects'));

    const protocol = srcUrl.startsWith('https') ? https : http;
    const req = protocol.get(srcUrl, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 307 || res.statusCode === 308) {
        let redirectUrl = res.headers.location;
        if (redirectUrl.startsWith('/')) {
          const u = new URL(srcUrl);
          redirectUrl = u.origin + redirectUrl;
        }
        return fetchImage(redirectUrl, destPath, maxRedirects - 1).then(resolve).catch(reject);
      }

      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode}`));
      }

      const file = fs.createWriteStream(destPath);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        const stats = fs.statSync(destPath);
        if (stats.size < 1000) {
          fs.unlinkSync(destPath);
          return reject(new Error(`File too small (${stats.size} bytes)`));
        }
        resolve(stats.size);
      });
    });

    req.on('error', (err) => reject(err));
    req.setTimeout(25000, () => {
      req.destroy();
      reject(new Error('Timeout'));
    });
  });
}

async function downloadProjects() {
  console.log(`Starting high-resolution screenshot download for ${projects.length} projects...`);
  
  for (const item of projects) {
    const destPath = path.join(projectsDir, `${item.id}.jpg`);
    
    // High resolution direct front-view capture
    const thumUrl = `https://image.thum.io/get/width/1200/crop/800/${item.url}`;
    const microlinkUrl = `https://api.microlink.io/?url=${encodeURIComponent(item.url)}&screenshot=true&embed=screenshot.url`;
    
    console.log(`[${item.id}] Fetching high-res screenshot for ${item.url}...`);
    try {
      const size = await fetchImage(thumUrl, destPath);
      console.log(`  ✓ Success via thum.io (${(size / 1024).toFixed(1)} KB)`);
    } catch (err1) {
      console.log(`  ! thum.io failed: ${err1.message}. Trying microlink...`);
      try {
        const size = await fetchImage(microlinkUrl, destPath);
        console.log(`  ✓ Success via microlink (${(size / 1024).toFixed(1)} KB)`);
      } catch (err2) {
        console.log(`  ✗ Failed both sources for ${item.id}: ${err2.message}`);
      }
    }
  }
  
  console.log('All high-resolution downloads processed successfully!');
}

downloadProjects();
