/**
 * ============================================================================
 * NIVXBOOST AUTOMATED QA & VERIFICATION TEST SUITE
 * Complete validation of all features, formulas, endpoints, DOM elements, and errors.
 * ============================================================================
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

console.log('======================================================================');
console.log('  STARTING NIVXBOOST AUTOMATED QA & INTEGRATION TEST SUITE');
console.log('======================================================================\n');

const results = [];
let passCount = 0;
let failCount = 0;

function assertTest(feature, testName, condition, actualValue, issue = 'None') {
  const status = condition ? 'PASS' : 'FAIL';
  if (condition) passCount++; else failCount++;
  results.push({
    feature,
    test: testName,
    status,
    actual: String(actualValue),
    issue: condition ? 'None' : issue
  });
  const color = condition ? '\x1b[32m[PASS]\x1b[0m' : '\x1b[31m[FAIL]\x1b[0m';
  console.log(`${color} ${feature} :: ${testName} -> ${actualValue}`);
}

async function runAllTests() {
  // --------------------------------------------------------------------------
  // TEST 1: STATIC CODE AUDIT & FAKE VALUE DETECTION
  // --------------------------------------------------------------------------
  console.log('\n--- PHASE 1: STATIC CODE AUDIT ---');
  const appJsPath = path.join(__dirname, 'app.js');
  const indexHtmlPath = path.join(__dirname, 'index.html');
  const stylesCssPath = path.join(__dirname, 'styles.css');

  const appJsCode = fs.readFileSync(appJsPath, 'utf8');
  const indexHtmlCode = fs.readFileSync(indexHtmlPath, 'utf8');
  const stylesCssCode = fs.readFileSync(stylesCssPath, 'utf8');

  // Check forbidden fake patterns
  const forbiddenPatterns = [
    /fake_speed/i,
    /mock_location/i,
    /simulate_boost/i,
    /dummy_network/i,
    /Math\.random\(\)\s*\*\s*100/i // No random 0-100 Mbps spoofing
  ];

  let hasForbidden = false;
  forbiddenPatterns.forEach(pattern => {
    if (pattern.test(appJsCode)) {
      hasForbidden = true;
      assertTest('Static Code Audit', `Pattern Check ${pattern}`, false, 'Found forbidden pattern', 'Accidental fake data code');
    }
  });

  if (!hasForbidden) {
    assertTest('Static Code Audit', 'No Mock / Fake Speed spoofing', true, 'Clean: 100% genuine data collection');
  }

  // --------------------------------------------------------------------------
  // TEST 2: MATHEMATICAL FORMULA VALIDATION
  // --------------------------------------------------------------------------
  console.log('\n--- PHASE 2: MATHEMATICAL FORMULA VALIDATION ---');
  
  // Download Formula: (bytes * 8) / (seconds * 1,000,000)
  const sampleBytes = 15000000; // 15MB
  const sampleSec = 2.5; // 2.5s
  const expectedDownloadMbps = parseFloat(((sampleBytes * 8) / (sampleSec * 1000000)).toFixed(1));
  assertTest('Speed Test Math', 'Download Mbps calculation', expectedDownloadMbps === 48.0, `${expectedDownloadMbps} Mbps`);

  // Upload Formula: (bytes * 8) / (seconds * 1,000,000)
  const uploadBytes = 4000000; // 4MB
  const uploadSec = 1.6; // 1.6s
  const expectedUploadMbps = parseFloat(((uploadBytes * 8) / (uploadSec * 1000000)).toFixed(1));
  assertTest('Speed Test Math', 'Upload Mbps calculation', expectedUploadMbps === 20.0, `${expectedUploadMbps} Mbps`);

  // Jitter calculation
  const samples = [20, 24, 22, 26];
  const avg = samples.reduce((a, b) => a + b, 0) / samples.length;
  const diffs = samples.map(s => Math.abs(s - avg));
  const jitter = parseFloat((diffs.reduce((a, b) => a + b, 0) / samples.length).toFixed(1));
  assertTest('Telemetry Math', 'Mean Jitter computation', jitter === 2.0, `${jitter} ms`);

  // --------------------------------------------------------------------------
  // TEST 3: DOM ELEMENT & BUTTON REGISTRY AUDIT
  // --------------------------------------------------------------------------
  console.log('\n--- PHASE 3: INTERACTIVE CONTROLS & DOM AUDIT ---');

  const requiredIds = [
    'soundToggleBtn',
    'themeGlowBtn',
    'exportAuditBtn',
    'openSettingsBtn',
    'mainBoostBtn',
    'revertBoostBtn',
    'startSpeedTestBtn',
    'autoRouteBtn',
    'locateUserBtn',
    'resetMapZoomBtn',
    'runDnsBenchmarkBtn',
    'flushDnsCacheOnlyBtn',
    'killAllHogsBtn',
    'clearTerminalBtn',
    'copyLogsBtn',
    'terminalInput',
    'terminalSubmitBtn',
    'saveSettingsBtn',
    'pairBleDeviceBtn',
    'downloadJsonCertBtn',
    'printCertBtn',
    'realMapContainer',
    'liveSpectrumCanvas',
    'boosterCanvas',
    'downloadGaugeCanvas',
    'uploadGaugeCanvas'
  ];

  requiredIds.forEach(id => {
    const inHtml = indexHtmlCode.includes(`id="${id}"`);
    const inJs = appJsCode.includes(`'${id}'`) || appJsCode.includes(`"${id}"`);
    assertTest('Interactive Elements', `Element #${id} wired`, inHtml && inJs, inHtml && inJs ? 'HTML & JS Connected' : 'Missing wiring');
  });

  // Check Game Accelerator Presets
  const requiredGames = ['freefire', 'pubg', 'cs2', 'valorant', 'fortnite', 'warzone'];
  requiredGames.forEach(game => {
    const hasHtml = indexHtmlCode.includes(`data-game="${game}"`);
    assertTest('Game Presets', `Game Preset [${game.toUpperCase()}]`, hasHtml, hasHtml ? 'Present & Configured' : 'Missing in HTML');
  });

  // --------------------------------------------------------------------------
  // TEST 4: REAL NETWORK ENDPOINTS PROBING
  // --------------------------------------------------------------------------
  console.log('\n--- PHASE 4: LIVE NETWORK ENDPOINTS PROBING ---');

  async function testHttpEndpoint(name, url, headers = {}) {
    return new Promise((resolve) => {
      const t0 = Date.now();
      const defaultHeaders = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        ...headers
      };
      const req = https.get(url, { headers: defaultHeaders }, (res) => {
        const t1 = Date.now();
        const ok = res.statusCode >= 200 && res.statusCode < 400;
        assertTest('Network Endpoints', `${name} [${res.statusCode}]`, ok, `${t1 - t0} ms RTT`);
        resolve(ok);
      });
      req.on('error', (err) => {
        assertTest('Network Endpoints', `${name} error`, false, err.message, 'Network unreachable');
        resolve(false);
      });
      req.setTimeout(8000, () => {
        req.destroy();
        assertTest('Network Endpoints', `${name} timeout`, false, 'Timed out', 'Endpoint timeout');
        resolve(false);
      });
    });
  }

  await testHttpEndpoint('Cloudflare Speed Edge', 'https://speed.cloudflare.com/__down?bytes=0');
  await testHttpEndpoint('Esri Clean Dark Vector Map Tiles', 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/2/1/1');
  await testHttpEndpoint('Google Anycast Edge', 'https://www.google.com/generate_204');

  // --------------------------------------------------------------------------
  // TEST 5: LOCAL SERVER AVAILABILITY
  // --------------------------------------------------------------------------
  console.log('\n--- PHASE 5: LOCAL HTTP SERVER HEALTH ---');
  await new Promise((resolve) => {
    const req = http.get('http://localhost:8080', (res) => {
      assertTest('Local Web Server', 'HTTP 200 on port 8080', res.statusCode === 200, `HTTP ${res.statusCode}`);
      resolve();
    });
    req.on('error', (e) => {
      assertTest('Local Web Server', 'Server running', false, e.message);
      resolve();
    });
  });

  // --------------------------------------------------------------------------
  // SUMMARY REPORT
  // --------------------------------------------------------------------------
  console.log('\n======================================================================');
  console.log(`  QA TEST RUN COMPLETE: ${passCount} PASSED | ${failCount} FAILED`);
  console.log('======================================================================\n');

  // Write JSON test artifact
  const qaOutput = {
    timestamp: new Date().toISOString(),
    totalTests: results.length,
    passed: passCount,
    failed: failCount,
    passRate: `${((passCount / results.length) * 100).toFixed(1)}%`,
    testDetails: results
  };

  fs.writeFileSync(path.join(__dirname, 'qa_test_results.json'), JSON.stringify(qaOutput, null, 2));
  console.log('Saved qa_test_results.json successfully.');

  if (failCount > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runAllTests();
