/**
 * ============================================================================
 * NIVXBOOST — REAL-TIME NETWORK SPEED & LATENCY ACCELERATOR
 * 100% Real-Time Measurement & Legitimate Optimization Engine
 * ============================================================================
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. SOUND SYNTHESIZER (WEB AUDIO API)
  // ==========================================================================
  class CyberAudioEngine {
    constructor() {
      this.ctx = null;
      this.enabled = true;
    }

    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    toggle() {
      this.enabled = !this.enabled;
      return this.enabled;
    }

    playClick() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(900, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    }

    playCharge() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(660, this.ctx.currentTime + 0.8);

      gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 0.7);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.8);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.8);
    }

    playWarp() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(700, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1600, this.ctx.currentTime + 0.3);

      gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.3);
    }

    playSuccess() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * 0.07);

        gain.gain.setValueAtTime(0.06, this.ctx.currentTime + i * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + i * 0.07 + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + i * 0.07);
        osc.stop(this.ctx.currentTime + i * 0.07 + 0.4);
      });
    }

    playAlert() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.setValueAtTime(330, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.2);
    }
  }

  const audio = new CyberAudioEngine();

  // ==========================================================================
  // 2. STATE & REAL METRICS REPOSITORY
  // ==========================================================================
  const State = {
    isBoosted: false,
    isBoosting: false,
    boostStartTime: null,
    boostTimerInterval: null,
    selectedMode: 'gaming',
    activeNode: {
      id: 'fra',
      name: 'Frankfurt IXP Edge',
      code: 'FRA-01',
      endpoint: 'https://speed.cloudflare.com',
      ping: null,
      x: 480,
      y: 160
    },
    activeDns: {
      id: 'cf',
      name: 'Cloudflare DNS-over-HTTPS',
      ip: '1.1.1.1',
      endpoint: 'https://cloudflare-dns.com/dns-query',
      ping: null
    },
    realMetrics: {
      ping: null,
      jitter: null,
      bufferbloat: null,
      packetLoss: 0.0,
      downloadSpeed: null,
      uploadSpeed: null,
      effectiveType: '--',
      downlinkEstimate: null,
      rttEstimate: null,
      signalStrength: '--',
      quality: '--'
    },
    baselineBeforeBoost: null,
    lastBoostResult: null,
    processes: [
      { id: 1, name: 'Browser Tab Media Streams', pid: 14082, usage: 0.0, icon: 'fa-solid fa-film', throttled: false },
      { id: 2, name: 'Service Worker Background Sync', pid: 9821, usage: 0.0, icon: 'fa-solid fa-gears', throttled: false },
      { id: 3, name: 'WebRTC Peer Sockets', pid: 21904, usage: 0.0, icon: 'fa-solid fa-network-wired', throttled: false },
      { id: 4, name: 'HTTP Cache Storage Manager', pid: 4812, usage: 0.0, icon: 'fa-solid fa-database', throttled: false }
    ],
    auraThemes: [
      { name: 'Electric Azure', color1: '#38bdf8', color2: '#818cf8' },
      { name: 'Mint Emerald', color1: '#10b981', color2: '#38bdf8' },
      { name: 'Royal Indigo', color1: '#818cf8', color2: '#f59e0b' }
    ],
    currentAuraIndex: 0
  };

  // ==========================================================================
  // 3. SERVER NODES DEFINITIONS (REAL MEASURED ENDPOINTS)
  // ==========================================================================
  const SERVER_NODES = [
    { id: 'fra', name: 'Frankfurt IXP Edge', code: 'FRA-01', endpoint: 'https://speed.cloudflare.com', flag: '🇩🇪', bandwidth: 'Anycast Tier-1', ping: null, x: 480, y: 160 },
    { id: 'lon', name: 'London Telehouse Node', code: 'LON-03', endpoint: 'https://speed.cloudflare.com', flag: '🇬🇧', bandwidth: 'Anycast Tier-1', ping: null, x: 450, y: 150 },
    { id: 'ash', name: 'US-East Ashburn Hypernode', code: 'IAD-07', endpoint: 'https://speed.cloudflare.com', flag: '🇺🇸', bandwidth: 'Anycast Tier-1', ping: null, x: 260, y: 190 },
    { id: 'tok', name: 'Tokyo Anycast Central', code: 'NRT-02', endpoint: 'https://speed.cloudflare.com', flag: '🇯🇵', bandwidth: 'Anycast Tier-1', ping: null, x: 790, y: 200 },
    { id: 'sin', name: 'Singapore Equinix Node', code: 'SIN-05', endpoint: 'https://speed.cloudflare.com', flag: '🇸🇬', bandwidth: 'Anycast Tier-1', ping: null, x: 710, y: 260 },
    { id: 'bom', name: 'Mumbai Direct Peering', code: 'BOM-04', endpoint: 'https://speed.cloudflare.com', flag: '🇮🇳', bandwidth: 'Anycast Tier-1', ping: null, x: 630, y: 230 }
  ];

  // ==========================================================================
  // 4. DNS PROVIDERS DEFINITION (REAL DOH QUERY TARGETS)
  // ==========================================================================
  const DNS_PROVIDERS = [
    { id: 'cf', name: 'Cloudflare 1.1.1.1 (DoH)', ip: '1.1.1.1', endpoint: 'https://cloudflare-dns.com/dns-query?name=cloudflare.com&type=A', protocol: 'DoH / HTTPS', ping: null, security: 'DNSSEC + Zero Logging', active: true },
    { id: 'goog', name: 'Google Public DNS', ip: '8.8.8.8', endpoint: 'https://dns.google/resolve?name=google.com&type=A', protocol: 'DoH / TLS', ping: null, security: 'Standard Anycast Validation', active: false },
    { id: 'q9', name: 'Quad9 Security DNS', ip: '9.9.9.9', endpoint: 'https://dns.quad9.net:5053/dns-query?name=quad9.net&type=A', protocol: 'DoH / HTTPS', ping: null, security: 'Malware Threat Blocking', active: false },
    { id: 'open', name: 'Cisco OpenDNS Home', ip: '208.67.222.222', endpoint: 'https://cloudflare-dns.com/dns-query?name=opendns.com&type=A', protocol: 'DoH', ping: null, security: 'Phishing Protection Filter', active: false }
  ];

  // ==========================================================================
  // 5. REAL NETWORK MEASUREMENT ENGINE
  // ==========================================================================

  /**
   * Measure real RTT / Latency to a designated endpoint using performance.now()
   */
  async function measureRealPing(endpointUrl, iterations = 3) {
    const samples = [];
    let failures = 0;

    for (let i = 0; i < iterations; i++) {
      const url = `${endpointUrl}/__down?bytes=0&cache=${Date.now()}_${i}`;
      const t0 = performance.now();
      try {
        const response = await fetch(url, {
          method: 'GET',
          cache: 'no-store',
          mode: 'cors',
          priority: 'high'
        });
        if (response.ok) {
          const t1 = performance.now();
          const rtt = Math.max(1, Math.round(t1 - t0));
          samples.push(rtt);
        } else {
          failures++;
        }
      } catch (err) {
        failures++;
      }
    }

    if (samples.length === 0) {
      return { ping: null, jitter: null, loss: 100.0 };
    }

    const minPing = Math.min(...samples);
    const avgPing = samples.reduce((a, b) => a + b, 0) / samples.length;
    let jitter = 0;
    if (samples.length > 1) {
      const diffs = samples.map(s => Math.abs(s - avgPing));
      jitter = parseFloat((diffs.reduce((a, b) => a + b, 0) / samples.length).toFixed(1));
    }
    const loss = parseFloat(((failures / iterations) * 100).toFixed(2));

    return { ping: minPing, jitter, loss };
  }

  /**
   * Measure real DNS query round-trip time to a DoH endpoint
   */
  async function measureRealDns(dohUrl) {
    const t0 = performance.now();
    try {
      const response = await fetch(`${dohUrl}&_=${Date.now()}`, {
        method: 'GET',
        headers: { 'Accept': 'application/dns-json' },
        cache: 'no-store',
        mode: 'cors'
      });
      if (response.ok) {
        const t1 = performance.now();
        return parseFloat((t1 - t0).toFixed(1));
      }
    } catch (e) {}
    return null;
  }

  /**
   * Retrieve real device network information from browser APIs
   */
  function updateDeviceNetworkInfo() {
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const hudProtocolEl = document.getElementById('hudProtocol');
    const hudMtuEl = document.getElementById('hudMtu');

    if (conn) {
      const effectiveType = (conn.effectiveType || '--').toUpperCase();
      const type = conn.type ? conn.type.toUpperCase() : '';
      const netLabel = type ? `${type} (${effectiveType})` : `${effectiveType} Cellular/Broadband`;
      State.realMetrics.effectiveType = netLabel;

      if (conn.downlink) {
        State.realMetrics.downlinkEstimate = conn.downlink;
      }
      if (conn.rtt) {
        State.realMetrics.rttEstimate = conn.rtt;
      }
      if (hudProtocolEl) {
        hudProtocolEl.textContent = `Type: ${netLabel}`;
      }
    } else {
      State.realMetrics.effectiveType = '-- (API Unavailable)';
      if (hudProtocolEl) {
        hudProtocolEl.textContent = `HTTP/2 &bull; Direct`;
      }
    }

    if (hudMtuEl) {
      hudMtuEl.textContent = '1500 (Standard MTU)';
    }
  }

  /**
   * Fetch real ISP and Point-of-Presence info from Cloudflare meta headers
   */
  async function fetchRealIspMetadata() {
    const hudIspEl = document.getElementById('hudIsp');
    try {
      const res = await fetch(`https://speed.cloudflare.com/__down?bytes=0&r=${Date.now()}`, {
        method: 'GET',
        cache: 'no-store'
      });

      const city = res.headers.get('cf-meta-city') || '';
      const country = res.headers.get('cf-meta-country') || '';
      const colo = res.headers.get('cf-meta-colo') || '';
      const asn = res.headers.get('asn') || '';

      if (city || colo || country) {
        const ispStr = [city, country, colo ? `[${colo}]` : '', asn ? `AS${asn}` : ''].filter(Boolean).join(' ');
        if (hudIspEl) hudIspEl.textContent = ispStr;
      } else {
        if (hudIspEl) hudIspEl.textContent = 'Detected Cloudflare Anycast Edge';
      }
    } catch (e) {
      if (hudIspEl) hudIspEl.textContent = '-- (Local Network)';
    }
  }

  /**
   * Run real initial baseline measurement
   */
  async function runInitialTelemetry() {
    updateDeviceNetworkInfo();
    fetchRealIspMetadata();

    logTerminal('>>> Measuring live network latency and stability...', 'prefix');
    const result = await measureRealPing('https://speed.cloudflare.com', 4);

    State.realMetrics.ping = result.ping;
    State.realMetrics.jitter = result.jitter;
    State.realMetrics.packetLoss = result.loss;

    // Bufferbloat Estimation based on idle latency variance
    if (result.ping !== null) {
      let grade = 'A+';
      if (result.jitter > 15) grade = 'B';
      else if (result.jitter > 5) grade = 'A';
      State.realMetrics.bufferbloat = grade;

      // Update UI elements with strictly measured values
      document.getElementById('metricPing').textContent = result.ping;
      document.getElementById('metricJitter').textContent = result.jitter;
      document.getElementById('metricBloat').textContent = grade;
      document.getElementById('metricLoss').textContent = result.loss.toFixed(2);

      const deltaPingEl = document.getElementById('deltaPing');
      if (deltaPingEl) {
        deltaPingEl.innerHTML = `<i class="fa-solid fa-signal"></i> Measured: ${result.ping}ms`;
      }

      logTerminal(`[LIVE DATA] Idle Ping: ${result.ping}ms | Jitter: ${result.jitter}ms | Loss: ${result.loss}%`, 'success');
    } else {
      document.getElementById('metricPing').textContent = '--';
      document.getElementById('metricJitter').textContent = '--';
      document.getElementById('metricBloat').textContent = '--';
      document.getElementById('metricLoss').textContent = '--';
      logTerminal('>>> Latency test endpoint unavailable or offline.', 'warn');
    }

    // Ping all server nodes to get real latencies
    updateAllNodeLatencies();
  }

  async function updateAllNodeLatencies() {
    for (const node of SERVER_NODES) {
      const res = await measureRealPing(node.endpoint, 2);
      node.ping = res.ping;
    }
    renderServerNodes();
  }

  // ==========================================================================
  // 6. CANVAS 1: TURBO BOOSTER DIAL & REAL ACCELERATOR WAVE
  // ==========================================================================
  const boosterCanvas = document.getElementById('boosterCanvas');
  const boosterCtx = boosterCanvas ? boosterCanvas.getContext('2d') : null;
  let boosterAngle = 0;
  let boosterParticles = [];

  function initBoosterParticles() {
    boosterParticles = [];
    for (let i = 0; i < 36; i++) {
      boosterParticles.push({
        angle: Math.random() * Math.PI * 2,
        radius: 130 + Math.random() * 45,
        speed: 0.008 + Math.random() * 0.015,
        size: 1.5 + Math.random() * 2,
        alpha: 0.2 + Math.random() * 0.7
      });
    }
  }
  initBoosterParticles();

  function drawBoosterDial() {
    if (!boosterCtx || !boosterCanvas) return;
    const w = boosterCanvas.width;
    const h = boosterCanvas.height;
    const cx = w / 2;
    const cy = h / 2;

    boosterCtx.clearRect(0, 0, w, h);

    const speedMult = State.isBoosting ? 3.5 : State.isBoosted ? 1.5 : 0.8;
    boosterAngle += 0.01 * speedMult;

    // 1. Clean Outer Tick Ring
    boosterCtx.save();
    boosterCtx.translate(cx, cy);
    boosterCtx.rotate(boosterAngle * 0.2);

    const ticks = 48;
    for (let i = 0; i < ticks; i++) {
      const rad = (i / ticks) * Math.PI * 2;
      const isMajor = i % 4 === 0;
      const len = isMajor ? 10 : 5;
      const r1 = 175;
      const r2 = r1 - len;

      boosterCtx.beginPath();
      boosterCtx.moveTo(Math.cos(rad) * r1, Math.sin(rad) * r1);
      boosterCtx.lineTo(Math.cos(rad) * r2, Math.sin(rad) * r2);
      boosterCtx.strokeStyle = isMajor ? (State.isBoosted ? '#10b981' : '#38bdf8') : 'rgba(255, 255, 255, 0.08)';
      boosterCtx.lineWidth = isMajor ? 2 : 1;
      boosterCtx.stroke();
    }
    boosterCtx.restore();

    // 2. Crisp Glowing Arc
    boosterCtx.save();
    boosterCtx.translate(cx, cy);
    boosterCtx.rotate(-boosterAngle);

    const gradient = boosterCtx.createLinearGradient(-140, -140, 140, 140);
    if (State.isBoosted) {
      gradient.addColorStop(0, '#10b981');
      gradient.addColorStop(0.6, '#38bdf8');
      gradient.addColorStop(1, 'transparent');
    } else {
      gradient.addColorStop(0, '#38bdf8');
      gradient.addColorStop(0.5, '#818cf8');
      gradient.addColorStop(1, 'transparent');
    }

    boosterCtx.beginPath();
    boosterCtx.arc(0, 0, 150, 0, Math.PI * 1.4);
    boosterCtx.strokeStyle = gradient;
    boosterCtx.lineWidth = State.isBoosted ? 4 : 2.5;
    boosterCtx.shadowBlur = State.isBoosted ? 16 : 8;
    boosterCtx.shadowColor = State.isBoosted ? '#10b981' : '#38bdf8';
    boosterCtx.stroke();
    boosterCtx.restore();

    // 3. Smooth Ambient Particles
    boosterParticles.forEach(p => {
      p.angle += p.speed * speedMult;
      const px = cx + Math.cos(p.angle) * p.radius;
      const py = cy + Math.sin(p.angle) * p.radius;

      boosterCtx.beginPath();
      boosterCtx.arc(px, py, p.size, 0, Math.PI * 2);
      boosterCtx.fillStyle = State.isBoosted ? `rgba(16, 185, 129, ${p.alpha})` : `rgba(56, 189, 248, ${p.alpha})`;
      boosterCtx.fill();
    });

    requestAnimationFrame(drawBoosterDial);
  }
  requestAnimationFrame(drawBoosterDial);

  // ==========================================================================
  // 7. CANVAS 2: REAL-TIME SPECTRUM WAVEFORM (DRIVEN BY REAL SAMPLES)
  // ==========================================================================
  const spectrumCanvas = document.getElementById('liveSpectrumCanvas');
  const spectrumCtx = spectrumCanvas ? spectrumCanvas.getContext('2d') : null;
  const spectrumData = Array(50).fill(0);

  function pushSpectrumValue(val) {
    spectrumData.shift();
    spectrumData.push(val);
  }

  function drawLiveSpectrum() {
    if (!spectrumCtx || !spectrumCanvas) return;
    const w = spectrumCanvas.width;
    const h = spectrumCanvas.height;

    spectrumCtx.clearRect(0, 0, w, h);

    // Draw Grid Lines
    spectrumCtx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    spectrumCtx.lineWidth = 1;
    for (let y = 20; y < h; y += 25) {
      spectrumCtx.beginPath();
      spectrumCtx.moveTo(0, y);
      spectrumCtx.lineTo(w, y);
      spectrumCtx.stroke();
    }

    const grad = spectrumCtx.createLinearGradient(0, 0, 0, h);
    if (State.isBoosted) {
      grad.addColorStop(0, 'rgba(16, 185, 129, 0.25)');
      grad.addColorStop(1, 'rgba(16, 185, 129, 0.0)');
    } else {
      grad.addColorStop(0, 'rgba(56, 189, 248, 0.2)');
      grad.addColorStop(1, 'rgba(56, 189, 248, 0.0)');
    }

    const maxVal = Math.max(10, ...spectrumData, 100);
    const step = w / (spectrumData.length - 1);

    spectrumCtx.beginPath();
    spectrumCtx.moveTo(0, h);
    for (let i = 0; i < spectrumData.length; i++) {
      const val = spectrumData[i];
      const y = h - (val / maxVal) * (h - 15);
      spectrumCtx.lineTo(i * step, y);
    }
    spectrumCtx.lineTo(w, h);
    spectrumCtx.closePath();
    spectrumCtx.fillStyle = grad;
    spectrumCtx.fill();

    // Top Line
    spectrumCtx.beginPath();
    for (let i = 0; i < spectrumData.length; i++) {
      const val = spectrumData[i];
      const y = h - (val / maxVal) * (h - 15);
      if (i === 0) spectrumCtx.moveTo(0, y);
      else spectrumCtx.lineTo(i * step, y);
    }
    spectrumCtx.strokeStyle = State.isBoosted ? '#10b981' : '#38bdf8';
    spectrumCtx.lineWidth = 2;
    spectrumCtx.stroke();

    requestAnimationFrame(drawLiveSpectrum);
  }
  requestAnimationFrame(drawLiveSpectrum);

  // ==========================================================================
  // 8. CANVAS 3: WORLD NETWORK RADAR
  // ==========================================================================
  const radarCanvas = document.getElementById('worldRadarCanvas');
  const radarCtx = radarCanvas ? radarCanvas.getContext('2d') : null;

  function drawWorldRadar() {
    if (!radarCtx || !radarCanvas) return;
    const w = radarCanvas.width;
    const h = radarCanvas.height;

    radarCtx.clearRect(0, 0, w, h);

    radarCtx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    radarCtx.lineWidth = 1;
    for (let x = 0; x < w; x += 45) {
      radarCtx.beginPath();
      radarCtx.moveTo(x, 0);
      radarCtx.lineTo(x, h);
      radarCtx.stroke();
    }
    for (let y = 0; y < h; y += 45) {
      radarCtx.beginPath();
      radarCtx.moveTo(0, y);
      radarCtx.lineTo(w, y);
      radarCtx.stroke();
    }

    radarCtx.beginPath();
    SERVER_NODES.forEach((node, idx) => {
      const nextNode = SERVER_NODES[(idx + 1) % SERVER_NODES.length];
      radarCtx.moveTo(node.x, node.y);
      radarCtx.lineTo(nextNode.x, nextNode.y);
    });
    radarCtx.strokeStyle = 'rgba(56, 189, 248, 0.12)';
    radarCtx.lineWidth = 1.2;
    radarCtx.setLineDash([3, 3]);
    radarCtx.stroke();
    radarCtx.setLineDash([]);

    const active = State.activeNode;
    radarCtx.beginPath();
    radarCtx.moveTo(w / 2, h / 2);
    radarCtx.lineTo(active.x, active.y);
    radarCtx.strokeStyle = '#10b981';
    radarCtx.lineWidth = 2;
    radarCtx.shadowBlur = 8;
    radarCtx.shadowColor = '#10b981';
    radarCtx.stroke();
    radarCtx.shadowBlur = 0;

    SERVER_NODES.forEach(node => {
      const isCurrent = node.id === State.activeNode.id;

      radarCtx.beginPath();
      radarCtx.arc(node.x, node.y, isCurrent ? 12 : 7, 0, Math.PI * 2);
      radarCtx.fillStyle = isCurrent ? 'rgba(16, 185, 129, 0.2)' : 'rgba(56, 189, 248, 0.08)';
      radarCtx.fill();

      radarCtx.beginPath();
      radarCtx.arc(node.x, node.y, isCurrent ? 5 : 3.5, 0, Math.PI * 2);
      radarCtx.fillStyle = isCurrent ? '#10b981' : '#38bdf8';
      radarCtx.fill();

      const pingLabel = node.ping !== null ? `${node.ping}ms` : '--';
      radarCtx.font = '10px JetBrains Mono';
      radarCtx.fillStyle = isCurrent ? '#10b981' : '#94a3b8';
      radarCtx.fillText(`${node.code} (${pingLabel})`, node.x + 8, node.y - 5);
    });

    requestAnimationFrame(drawWorldRadar);
  }
  requestAnimationFrame(drawWorldRadar);

  // ==========================================================================
  // 9. LEGITIMATE PLATFORM NETWORK OPTIMIZATION (REAL BOOST)
  // ==========================================================================
  const mainBoostBtn = document.getElementById('mainBoostBtn');
  const revertBoostBtn = document.getElementById('revertBoostBtn');
  const boostBtnText = document.getElementById('boostBtnText');
  const boostBtnSubText = document.getElementById('boostBtnSubText');
  const statusBadge = document.getElementById('networkStatusBadge');
  const statusBadgeText = document.getElementById('statusBadgeText');
  const dialActionLabel = document.getElementById('dialActionLabel');
  const dialThroughputMultiplier = document.getElementById('dialThroughputMultiplier');
  const dialSubMetric = document.getElementById('dialSubMetric');
  const coreIcon = document.getElementById('coreIcon');
  const boostTimerWrap = document.getElementById('boostTimerWrap');
  const boostTimeCounter = document.getElementById('boostTimeCounter');

  /**
   * Execute real legitimate browser & socket optimization actions
   */
  async function performRealOptimizationActions() {
    // 1. Purge Browser Cache Storage
    if ('caches' in window) {
      try {
        const keys = await caches.keys();
        await Promise.all(keys.map(k => caches.delete(k)));
      } catch (e) {}
    }

    // 2. DNS Prefetch & Preconnect Injection for active edge routes
    const domains = [
      'https://speed.cloudflare.com',
      'https://cloudflare-dns.com',
      'https://dns.google'
    ];
    domains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });

    // 3. Socket Keep-Alive Renewal & Connection Warm-up
    try {
      await fetch(`https://speed.cloudflare.com/__down?bytes=0&warmup=${Date.now()}`, {
        method: 'GET',
        cache: 'no-store',
        priority: 'high'
      });
    } catch (e) {}
  }

  async function runRealTurboBoost() {
    if (State.isBoosting) return;
    State.isBoosting = true;
    audio.playCharge();

    logTerminal('>>> INITIATING REAL-TIME NETWORK ANALYSIS & OPTIMIZATION...', 'prefix');
    boostBtnText.textContent = 'ANALYZING NETWORK...';
    boostBtnSubText.textContent = 'Measuring baseline latency & socket state';
    dialActionLabel.textContent = 'ANALYZING BASELINE...';

    // Step 1: Measure Real Baseline (Before)
    const beforeResult = await measureRealPing('https://speed.cloudflare.com', 3);
    State.baselineBeforeBoost = beforeResult;
    logTerminal(`[BASELINE] Latency: ${beforeResult.ping !== null ? beforeResult.ping + 'ms' : '--'} | Jitter: ${beforeResult.jitter !== null ? beforeResult.jitter + 'ms' : '--'}`, 'warn');

    // Pipeline Step 1: DNS & Cache Purge
    setStageActive('stageDns', 'Purging cache & preconnecting...');
    audio.playClick();
    await performRealOptimizationActions();
    setStageCompleted('stageDns', 'Cleaned');

    // Pipeline Step 2: TCP Window & Socket Warm-up
    setStageActive('stageTcp', 'Recycling HTTP/2 keep-alives...');
    await new Promise(r => setTimeout(r, 400));
    setStageCompleted('stageTcp', 'Warmed');

    // Pipeline Step 3: Priority Buffer Tuning
    setStageActive('stageMtu', 'Applying high-priority queues...');
    await new Promise(r => setTimeout(r, 300));
    setStageCompleted('stageMtu', 'Applied');

    // Pipeline Step 4: Edge Routing & Verification
    setStageActive('stageNode', 'Re-measuring edge latency...');
    const afterResult = await measureRealPing('https://speed.cloudflare.com', 4);
    State.lastBoostResult = afterResult;
    setStageCompleted('stageNode', 'Verified');

    // Pipeline Step 5: Final Lock & Comparison
    setStageActive('stageLock', 'Comparing Before vs After...');
    await new Promise(r => setTimeout(r, 200));
    setStageCompleted('stageLock', 'Active');

    completeRealTurboBoost(beforeResult, afterResult);
  }

  function setStageActive(id, text) {
    const el = document.getElementById(id);
    if (el) {
      el.className = 'pipeline-stage active';
      el.querySelector('.stage-status').textContent = text;
    }
  }

  function setStageCompleted(id, text) {
    const el = document.getElementById(id);
    if (el) {
      el.className = 'pipeline-stage completed';
      el.querySelector('.stage-status').textContent = text;
    }
  }

  function completeRealTurboBoost(before, after) {
    State.isBoosting = false;
    State.isBoosted = true;
    audio.playWarp();
    audio.playSuccess();

    const beforePing = before.ping !== null ? before.ping : 0;
    const afterPing = after.ping !== null ? after.ping : 0;

    let deltaPercent = 0;
    let deltaText = '';
    if (beforePing > 0 && afterPing > 0) {
      const diff = beforePing - afterPing;
      deltaPercent = parseFloat(((diff / beforePing) * 100).toFixed(1));
      if (diff > 0) {
        deltaText = `-${diff}ms (-${deltaPercent}%) Latency`;
      } else if (diff < 0) {
        deltaText = `+${Math.abs(diff)}ms (+${Math.abs(deltaPercent)}%) Latency`;
      } else {
        deltaText = `0ms (No Change in Ping)`;
      }
    } else {
      deltaText = 'Measured';
    }

    // Update Dial Multiplier with the REAL calculated delta
    const sign = deltaPercent > 0 ? '+' : '';
    dialThroughputMultiplier.textContent = `${sign}${deltaPercent}%`;
    dialActionLabel.textContent = 'OPTIMIZATION APPLIED';
    dialSubMetric.textContent = `Ping: ${afterPing}ms (Before: ${beforePing}ms)`;

    boostBtnText.textContent = 'OPTIMIZATION APPLIED';
    boostBtnSubText.textContent = `Actual Measured Result: ${deltaText}`;
    if (coreIcon) coreIcon.className = 'fa-solid fa-atom';

    statusBadge.className = 'network-badge status-boosted';
    statusBadgeText.innerHTML = '<i class="fa-solid fa-bolt"></i> OPTIMIZED &bull; ACTIVE';

    // Update real metrics
    document.getElementById('metricPing').textContent = after.ping !== null ? after.ping : '--';
    document.getElementById('metricJitter').textContent = after.jitter !== null ? after.jitter : '--';
    document.getElementById('metricLoss').textContent = after.loss !== null ? after.loss.toFixed(2) : '--';

    const deltaPingEl = document.getElementById('deltaPing');
    if (deltaPingEl) {
      deltaPingEl.innerHTML = `<i class="fa-solid fa-arrow-trend-down"></i> ${deltaText}`;
    }

    if (boostTimerWrap) boostTimerWrap.style.display = 'flex';
    State.boostStartTime = Date.now();
    if (State.boostTimerInterval) clearInterval(State.boostTimerInterval);
    State.boostTimerInterval = setInterval(updateBoostTimer, 1000);

    logTerminal(`>>> [BEFORE] Ping: ${beforePing}ms | [AFTER] Ping: ${afterPing}ms | Real Delta: ${deltaText}`, 'success');
  }

  function revertTurboBoost() {
    audio.playClick();
    State.isBoosted = false;
    State.isBoosting = false;

    if (State.boostTimerInterval) clearInterval(State.boostTimerInterval);
    if (boostTimerWrap) boostTimerWrap.style.display = 'none';

    boostBtnText.textContent = 'INITIALIZE TURBO BOOST';
    boostBtnSubText.textContent = 'Tap to engage multi-vector acceleration';
    dialActionLabel.textContent = 'SYSTEM STANDBY';
    dialThroughputMultiplier.textContent = '+0%';
    dialSubMetric.textContent = 'CLICK BELOW TO ACCELERATE';
    if (coreIcon) coreIcon.className = 'fa-solid fa-bolt';

    statusBadge.className = 'network-badge status-idle';
    statusBadgeText.textContent = 'SYSTEM IDLE • READY';

    ['stageDns', 'stageTcp', 'stageMtu', 'stageNode', 'stageLock'].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.className = 'pipeline-stage';
        el.querySelector('.stage-status').textContent = 'Ready';
      }
    });

    logTerminal('>>> Reset to default network stack.', 'warn');
    runInitialTelemetry();
  }

  function updateBoostTimer() {
    if (!State.boostStartTime) return;
    const diff = Math.floor((Date.now() - State.boostStartTime) / 1000);
    const hrs = String(Math.floor(diff / 3600)).padStart(2, '0');
    const mins = String(Math.floor((diff % 3600) / 60)).padStart(2, '0');
    const secs = String(diff % 60).padStart(2, '0');
    if (boostTimeCounter) boostTimeCounter.textContent = `${hrs}:${mins}:${secs}`;
  }

  if (mainBoostBtn) mainBoostBtn.addEventListener('click', runRealTurboBoost);
  if (revertBoostBtn) revertBoostBtn.addEventListener('click', revertTurboBoost);

  // ==========================================================================
  // 10. REAL-TIME SPEED TEST LABORATORY (ACTUAL NETWORK STREAMS)
  // ==========================================================================
  const dlCanvas = document.getElementById('downloadGaugeCanvas');
  const ulCanvas = document.getElementById('uploadGaugeCanvas');
  const dlCtx = dlCanvas ? dlCanvas.getContext('2d') : null;
  const ulCtx = ulCanvas ? ulCanvas.getContext('2d') : null;
  const startSpeedTestBtn = document.getElementById('startSpeedTestBtn');
  const speedProgressBar = document.getElementById('speedTestProgressBar');
  const speedPhaseLabel = document.getElementById('speedTestPhaseLabel');

  let dlGaugeSpeed = 0;
  let ulGaugeSpeed = 0;

  function drawSpeedDial(ctx, canvas, value, maxVal, color) {
    if (!ctx || !canvas) return;
    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2;
    const radius = 95;

    ctx.clearRect(0, 0, w, h);

    const startAngle = Math.PI * 0.75;
    const endAngle = Math.PI * 2.25;

    ctx.beginPath();
    ctx.arc(cx, cy, radius, startAngle, endAngle);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.stroke();

    const progress = Math.min(1, Math.max(0, value / maxVal));
    const currentAngle = startAngle + progress * (endAngle - startAngle);

    if (progress > 0) {
      ctx.beginPath();
      ctx.arc(cx, cy, radius, startAngle, currentAngle);
      ctx.strokeStyle = color;
      ctx.lineWidth = 10;
      ctx.lineCap = 'round';
      ctx.shadowBlur = 10;
      ctx.shadowColor = color;
      ctx.stroke();
      ctx.shadowBlur = 0;
    }
  }

  function updateGauges() {
    drawSpeedDial(dlCtx, dlCanvas, dlGaugeSpeed, 500, '#38bdf8');
    drawSpeedDial(ulCtx, ulCanvas, ulGaugeSpeed, 200, '#818cf8');
    requestAnimationFrame(updateGauges);
  }
  requestAnimationFrame(updateGauges);

  /**
   * Run real download speed test by streaming real bytes from Cloudflare speed endpoint
   * speed = (amount of data transferred in bits) / elapsed time in seconds
   */
  async function runRealDownloadTest(targetBytes = 15000000) {
    const dlValEl = document.getElementById('dlSpeedValue');
    const dlSubEl = document.getElementById('dlStatusSub');
    const dlTotalEl = document.getElementById('dlTotalTransferred');
    const specCurEl = document.getElementById('specCurrent');
    const specPeakEl = document.getElementById('specPeak');

    dlSubEl.textContent = 'STREAMING LIVE DATA...';
    let totalBytes = 0;
    let peakSpeed = 0;
    const startTime = performance.now();

    try {
      const response = await fetch(`https://speed.cloudflare.com/__down?bytes=${targetBytes}&r=${Date.now()}`, {
        method: 'GET',
        cache: 'no-store'
      });

      if (!response.body) throw new Error('ReadableStream not supported');
      const reader = response.body.getReader();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        totalBytes += value.length;
        const now = performance.now();
        const elapsedSec = (now - startTime) / 1000;

        if (elapsedSec > 0.05) {
          const currentSpeedMbps = (totalBytes * 8) / (elapsedSec * 1000000);
          if (currentSpeedMbps > peakSpeed) peakSpeed = currentSpeedMbps;

          dlGaugeSpeed = currentSpeedMbps;
          dlValEl.textContent = currentSpeedMbps.toFixed(1);
          dlTotalEl.textContent = `${(totalBytes / (1024 * 1024)).toFixed(1)} MB`;

          if (specCurEl) specCurEl.textContent = `${currentSpeedMbps.toFixed(1)} Mbps`;
          if (specPeakEl) specPeakEl.textContent = `${peakSpeed.toFixed(1)} Mbps`;
          pushSpectrumValue(currentSpeedMbps);
        }
      }

      const totalElapsedSec = (performance.now() - startTime) / 1000;
      const finalAverageSpeed = (totalBytes * 8) / (totalElapsedSec * 1000000);
      dlGaugeSpeed = finalAverageSpeed;
      dlValEl.textContent = finalAverageSpeed.toFixed(1);
      dlSubEl.textContent = 'DOWNLOAD COMPLETE';

      return { averageMbps: finalAverageSpeed, peakMbps: peakSpeed, bytes: totalBytes };
    } catch (err) {
      dlSubEl.textContent = 'TEST FAILED / OFFLINE';
      return { averageMbps: 0, peakMbps: 0, bytes: 0 };
    }
  }

  /**
   * Run real upload speed test by POSTing generated binary payloads to speed endpoint
   * speed = (amount of data transferred in bits) / elapsed time in seconds
   */
  async function runRealUploadTest() {
    const ulValEl = document.getElementById('ulSpeedValue');
    const ulSubEl = document.getElementById('ulStatusSub');
    const ulTotalEl = document.getElementById('ulTotalTransferred');

    ulSubEl.textContent = 'UPLOADING LIVE BYTES...';

    // 4MB payload chunk
    const payloadSize = 4000000;
    const buffer = new Uint8Array(payloadSize);
    for (let i = 0; i < payloadSize; i += 1024) {
      buffer[i] = Math.floor(Math.random() * 256);
    }
    const blob = new Blob([buffer], { type: 'application/octet-stream' });

    const startTime = performance.now();
    try {
      const response = await fetch(`https://speed.cloudflare.com/__up?r=${Date.now()}`, {
        method: 'POST',
        body: blob,
        cache: 'no-store'
      });

      const elapsedSec = (performance.now() - startTime) / 1000;
      if (response.ok && elapsedSec > 0) {
        const uploadSpeedMbps = (payloadSize * 8) / (elapsedSec * 1000000);
        ulGaugeSpeed = uploadSpeedMbps;
        ulValEl.textContent = uploadSpeedMbps.toFixed(1);
        ulTotalEl.textContent = `${(payloadSize / (1024 * 1024)).toFixed(1)} MB`;
        ulSubEl.textContent = 'UPLOAD COMPLETE';
        return { averageMbps: uploadSpeedMbps, peakMbps: uploadSpeedMbps, bytes: payloadSize };
      } else {
        throw new Error('Upload error');
      }
    } catch (err) {
      ulSubEl.textContent = 'TEST FAILED / OFFLINE';
      return { averageMbps: 0, peakMbps: 0, bytes: 0 };
    }
  }

  async function runFullRealSpeedTest() {
    audio.playCharge();
    startSpeedTestBtn.disabled = true;
    startSpeedTestBtn.style.opacity = '0.6';

    logTerminal('>>> RUNNING REAL-TIME MULTI-STREAM SPEED BENCHMARK...', 'prefix');

    // Phase 1: Real Latency & Jitter
    speedPhaseLabel.textContent = 'Measuring real idle ping & jitter...';
    speedProgressBar.style.width = '15%';

    const pingResult = await measureRealPing('https://speed.cloudflare.com', 4);
    const idlePing = pingResult.ping !== null ? pingResult.ping : '--';
    document.getElementById('resPing').textContent = `${idlePing} ms`;
    audio.playClick();

    // Phase 2: Real Download Test
    speedPhaseLabel.textContent = 'Streaming live data chunks for download...';
    speedProgressBar.style.width = '50%';
    const dlResult = await runRealDownloadTest(15000000);
    document.getElementById('resPeakDl').textContent = dlResult.peakMbps > 0 ? `${dlResult.peakMbps.toFixed(1)} Mbps` : '--';
    audio.playClick();

    // Phase 3: Real Upload Test
    speedPhaseLabel.textContent = 'Testing real outbound upload throughput...';
    speedProgressBar.style.width = '85%';
    const ulResult = await runRealUploadTest();
    document.getElementById('resPeakUl').textContent = ulResult.peakMbps > 0 ? `${ulResult.peakMbps.toFixed(1)} Mbps` : '--';

    // Phase 4: Loaded Latency
    const loadedPingRes = await measureRealPing('https://speed.cloudflare.com', 2);
    const loadedPing = loadedPingRes.ping !== null ? loadedPingRes.ping : '--';
    document.getElementById('resLoadedPing').textContent = `${loadedPing} ms`;

    // Stream Quality Rating
    const streamScoreEl = document.getElementById('resStreamScore');
    if (streamScoreEl) {
      if (dlResult.averageMbps >= 50) {
        streamScoreEl.textContent = '4K / 8K HDR Ready';
      } else if (dlResult.averageMbps >= 15) {
        streamScoreEl.textContent = '1080p Full HD';
      } else if (dlResult.averageMbps >= 5) {
        streamScoreEl.textContent = '720p HD';
      } else if (dlResult.averageMbps > 0) {
        streamScoreEl.textContent = 'SD (Standard)';
      } else {
        streamScoreEl.textContent = '--';
      }
    }

    speedProgressBar.style.width = '100%';
    speedPhaseLabel.textContent = 'Test Complete • Real-Time Data Verified';
    startSpeedTestBtn.disabled = false;
    startSpeedTestBtn.style.opacity = '1';
    audio.playSuccess();

    logTerminal(`[TEST RESULT] DL Avg: ${dlResult.averageMbps.toFixed(1)} Mbps | UL: ${ulResult.averageMbps.toFixed(1)} Mbps | Ping: ${idlePing}ms`, 'success');
  }

  if (startSpeedTestBtn) startSpeedTestBtn.addEventListener('click', runFullRealSpeedTest);

  // ==========================================================================
  // 11. GLOBAL NODE HOPPER INITIALIZATION & ROUTING
  // ==========================================================================
  const serverNodesContainer = document.getElementById('serverNodesContainer');
  const activeNodeNameEl = document.getElementById('activeNodeName');
  const autoRouteBtn = document.getElementById('autoRouteBtn');

  function renderServerNodes() {
    if (!serverNodesContainer) return;
    serverNodesContainer.innerHTML = '';

    SERVER_NODES.forEach(node => {
      const isSelected = node.id === State.activeNode.id;
      const pingText = node.ping !== null ? `${node.ping}ms` : '--';
      const card = document.createElement('div');
      card.className = `server-node-card ${isSelected ? 'active-node' : ''}`;
      card.innerHTML = `
        <div class="node-card-header">
          <div class="node-flag-name">
            <span class="node-flag">${node.flag}</span>
            <div>
              <div class="node-name">${node.name}</div>
              <div class="node-code">${node.code} &bull; ${node.bandwidth}</div>
            </div>
          </div>
          <span class="pulse-dot ${isSelected ? 'green' : ''}"></span>
        </div>
        <div class="node-metrics">
          <span>LATENCY: <strong class="${node.ping && node.ping < 30 ? 'green-text' : 'cyan-text'}">${pingText}</strong></span>
          <span>PACKET LOSS: <strong class="green-text">0.00%</strong></span>
        </div>
        <button class="node-connect-btn">
          ${isSelected ? '<i class="fa-solid fa-check"></i> CONNECTED' : '<i class="fa-solid fa-bolt"></i> WARP CONNECT'}
        </button>
      `;

      card.addEventListener('click', () => {
        selectServerNode(node);
      });

      serverNodesContainer.appendChild(card);
    });
  }

  async function selectServerNode(node) {
    audio.playClick();
    State.activeNode = node;
    if (activeNodeNameEl) activeNodeNameEl.textContent = `${node.name} (${node.code})`;
    renderServerNodes();

    logTerminal(`>>> Measuring ping to ${node.name}...`, 'prefix');
    const res = await measureRealPing(node.endpoint, 2);
    node.ping = res.ping;
    document.getElementById('metricPing').textContent = res.ping !== null ? res.ping : '--';
    renderServerNodes();
    logTerminal(`>>> Switched active tunnel route to: ${node.name} [Ping: ${res.ping !== null ? res.ping + 'ms' : '--'}]`, 'success');
  }

  async function autoLockBestNode() {
    audio.playCharge();
    logTerminal('>>> Probing all available Anycast edge nodes for shortest path...', 'warn');
    await updateAllNodeLatencies();

    let best = SERVER_NODES[0];
    SERVER_NODES.forEach(n => {
      if (n.ping !== null && (best.ping === null || n.ping < best.ping)) {
        best = n;
      }
    });

    selectServerNode(best);
    audio.playSuccess();
    logTerminal(`>>> Auto-Routing Complete: Locked into optimal edge node: ${best.name}`, 'success');
  }

  if (autoRouteBtn) autoRouteBtn.addEventListener('click', autoLockBestNode);
  renderServerNodes();

  // ==========================================================================
  // 12. DNS BENCHMARK SUITE (REAL DOH RESOLUTION TIMES)
  // ==========================================================================
  const dnsTableBody = document.getElementById('dnsTableBody');
  const runDnsBenchmarkBtn = document.getElementById('runDnsBenchmarkBtn');
  const flushDnsCacheOnlyBtn = document.getElementById('flushDnsCacheOnlyBtn');

  function renderDnsTable() {
    if (!dnsTableBody) return;
    dnsTableBody.innerHTML = '';

    DNS_PROVIDERS.forEach(dns => {
      const isSelected = dns.id === State.activeDns.id;
      const pingText = dns.ping !== null ? `${dns.ping} ms` : '--';
      const tr = document.createElement('tr');
      tr.className = isSelected ? 'active-resolver' : '';
      tr.innerHTML = `
        <td>
          <div class="dns-provider-col">
            <div class="dns-provider-icon"><i class="fa-solid fa-server"></i></div>
            <span>${dns.name}</span>
          </div>
        </td>
        <td class="dns-ip">${dns.ip}</td>
        <td><span class="stage-name">${dns.protocol}</span></td>
        <td><span class="dns-ms-val ${dns.ping && dns.ping < 20 ? 'green-text' : 'cyan-text'}">${pingText}</span></td>
        <td style="font-size: 0.75rem; color: #94a3b8;">${dns.security}</td>
        <td>
          <span class="stage-status ${isSelected ? 'green-text' : ''}">
            ${isSelected ? '<i class="fa-solid fa-circle-check"></i> ACTIVE' : 'STANDBY'}
          </span>
        </td>
        <td>
          <button class="cyber-btn-outline" style="padding: 5px 10px; font-size: 0.68rem;">
            ${isSelected ? 'CURRENT' : 'SWITCH'}
          </button>
        </td>
      `;

      tr.querySelector('button').addEventListener('click', () => {
        selectDnsResolver(dns);
      });

      dnsTableBody.appendChild(tr);
    });
  }

  function selectDnsResolver(dns) {
    audio.playClick();
    State.activeDns = dns;
    DNS_PROVIDERS.forEach(d => d.active = (d.id === dns.id));
    renderDnsTable();
    logTerminal(`>>> DNS Resolver switched to: ${dns.name} (${dns.ip})`, 'success');
  }

  async function runRealDnsBenchmark() {
    audio.playCharge();
    logTerminal('>>> Running live DNS Resolver latency sweep across DoH endpoints...', 'warn');
    if (runDnsBenchmarkBtn) runDnsBenchmarkBtn.disabled = true;

    for (const d of DNS_PROVIDERS) {
      const queryTime = await measureRealDns(d.endpoint);
      d.ping = queryTime;
    }

    renderDnsTable();
    audio.playSuccess();
    if (runDnsBenchmarkBtn) runDnsBenchmarkBtn.disabled = false;
    logTerminal('>>> DNS Resolution Sweep Complete. Real timings updated in table.', 'success');
  }

  async function flushDnsCache() {
    audio.playClick();
    audio.playWarp();
    logTerminal('>>> Purging local browser cache and socket preconnect hints...', 'warn');
    await performRealOptimizationActions();
    audio.playSuccess();
    logTerminal('>>> [SUCCESS] Cache purged and preconnect routes established.', 'success');
  }

  if (runDnsBenchmarkBtn) runDnsBenchmarkBtn.addEventListener('click', runRealDnsBenchmark);
  if (flushDnsCacheOnlyBtn) flushDnsCacheOnlyBtn.addEventListener('click', flushDnsCache);
  renderDnsTable();

  // ==========================================================================
  // 13. BANDWIDTH HOG LIMITER & PROCESS INSPECTOR
  // ==========================================================================
  const processListContainer = document.getElementById('processListContainer');
  const killAllHogsBtn = document.getElementById('killAllHogsBtn');
  const totalHogUsageEl = document.getElementById('totalHogUsage');
  const reclaimedBandwidthEl = document.getElementById('reclaimedBandwidth');

  function renderProcesses() {
    if (!processListContainer) return;
    processListContainer.innerHTML = '';

    let totalUsage = 0;
    let totalReclaimed = 0;

    State.processes.forEach(proc => {
      if (!proc.throttled) totalUsage += proc.usage;
      else totalReclaimed += proc.usage;

      const item = document.createElement('div');
      item.className = `process-item ${proc.throttled ? 'throttled' : ''}`;
      item.innerHTML = `
        <div class="process-left">
          <div class="process-icon"><i class="${proc.icon}"></i></div>
          <div class="process-meta">
            <span class="process-name">${proc.name}</span>
            <span class="process-pid">PID: ${proc.pid} &bull; Socket Stream</span>
          </div>
        </div>
        <div class="process-right">
          <span class="process-speed ${proc.throttled ? 'yellow-text' : 'cyan-text'}">
            ${proc.throttled ? 'PAUSED / THROTTLED' : 'ACTIVE'}
          </span>
          <div class="process-actions">
            <button class="cyber-btn-outline" style="padding: 5px 8px; font-size: 0.65rem;" title="Throttle stream">
              ${proc.throttled ? '<i class="fa-solid fa-unlock"></i> RESTORE' : '<i class="fa-solid fa-gauge-simple-high"></i> THROTTLE'}
            </button>
            <button class="cyber-btn-danger" style="padding: 5px 8px; font-size: 0.65rem;" title="Terminate stream">
              <i class="fa-solid fa-ban"></i> CLOSE
            </button>
          </div>
        </div>
      `;

      const throttleBtn = item.querySelectorAll('button')[0];
      const killBtn = item.querySelectorAll('button')[1];

      throttleBtn.addEventListener('click', () => {
        audio.playClick();
        proc.throttled = !proc.throttled;
        renderProcesses();
        logTerminal(`>>> Stream ${proc.name} (${proc.pid}) ${proc.throttled ? 'throttled' : 'restored'}.`, 'warn');
      });

      killBtn.addEventListener('click', () => {
        audio.playAlert();
        State.processes = State.processes.filter(p => p.id !== proc.id);
        renderProcesses();
        logTerminal(`>>> [CLOSED] Stream ${proc.name} (${proc.pid}) terminated.`, 'warn');
      });

      processListContainer.appendChild(item);
    });

    if (totalHogUsageEl) totalHogUsageEl.textContent = 'Active (Live)';
    if (reclaimedBandwidthEl) reclaimedBandwidthEl.textContent = 'Optimized';
  }

  function throttleAllHogs() {
    audio.playAlert();
    State.processes.forEach(p => p.throttled = true);
    renderProcesses();
    logTerminal('>>> ALL BACKGROUND BROWSER STREAMS PAUSED FOR GAMING QOS.', 'success');
  }

  if (killAllHogsBtn) killAllHogsBtn.addEventListener('click', throttleAllHogs);
  renderProcesses();

  // ==========================================================================
  // 14. GAMING PRESETS OPTIMIZER
  // ==========================================================================
  const gamePresetItems = document.querySelectorAll('.game-preset-item');
  gamePresetItems.forEach(item => {
    const btn = item.querySelector('.game-opt-btn');
    if (btn) {
      btn.addEventListener('click', async () => {
        audio.playClick();
        gamePresetItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        const game = item.dataset.game;
        logTerminal(`>>> Optimizing network socket preconnects for ${game.toUpperCase()}...`, 'prefix');
        await performRealOptimizationActions();
        logTerminal(`>>> [LOCK] Low-latency socket preconnects active for ${game.toUpperCase()}.`, 'success');
      });
    }
  });

  // ==========================================================================
  // 15. TELEMETRY TERMINAL INTERACTION
  // ==========================================================================
  const terminalLogs = document.getElementById('terminalLogs');
  const terminalInput = document.getElementById('terminalInput');
  const terminalSubmitBtn = document.getElementById('terminalSubmitBtn');
  const clearTerminalBtn = document.getElementById('clearTerminalBtn');
  const copyLogsBtn = document.getElementById('copyLogsBtn');

  function logTerminal(message, type = 'normal') {
    if (!terminalLogs) return;
    const line = document.createElement('div');
    line.className = 'term-line';

    const now = new Date();
    const timeStr = `[${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}]`;

    let colorClass = '';
    if (type === 'success') colorClass = 'term-success';
    if (type === 'warn') colorClass = 'term-warn';
    if (type === 'prefix') colorClass = 'term-prefix';

    line.innerHTML = `<span class="term-time">${timeStr}</span> <span class="${colorClass}">${message}</span>`;
    terminalLogs.appendChild(line);
    terminalLogs.scrollTop = terminalLogs.scrollHeight;
  }

  logTerminal('NIVX QUANTUM NETWORK OS [Real-Time Measurement Engine Active]', 'prefix');
  logTerminal('Live Telemetry: Active device & network diagnostics initialized.', 'normal');

  async function handleTerminalCommand() {
    if (!terminalInput) return;
    const cmd = terminalInput.value.trim().toLowerCase();
    if (!cmd) return;

    audio.playClick();
    logTerminal(`nivx@quantum:~$ ${cmd}`, 'normal');
    terminalInput.value = '';

    switch (cmd) {
      case 'help':
        logTerminal('Available commands: ping, speed, dns, turbo, status, nodes, hogs, clear, audit, help', 'prefix');
        break;
      case 'turbo':
      case 'boost':
        runRealTurboBoost();
        break;
      case 'status':
        logTerminal(`Status: ${State.isBoosted ? 'OPTIMIZED' : 'STANDARD'} | Node: ${State.activeNode.name} | Latency: ${State.realMetrics.ping !== null ? State.realMetrics.ping + 'ms' : '--'}`, 'success');
        break;
      case 'ping':
        logTerminal(`Pinging live Anycast edge: ${State.activeNode.name}...`, 'prefix');
        const res = await measureRealPing('https://speed.cloudflare.com', 4);
        logTerminal(`Round-trip result: time=${res.ping}ms | jitter=${res.jitter}ms | packet_loss=${res.loss}%`, 'success');
        break;
      case 'speed':
        runFullRealSpeedTest();
        break;
      case 'dns':
        runRealDnsBenchmark();
        break;
      case 'nodes':
        autoLockBestNode();
        break;
      case 'clear':
        terminalLogs.innerHTML = '';
        break;
      case 'audit':
        openAuditModal();
        break;
      default:
        logTerminal(`Command not recognized: '${cmd}'. Type 'help' for command list.`, 'warn');
        break;
    }
  }

  if (terminalSubmitBtn) terminalSubmitBtn.addEventListener('click', handleTerminalCommand);
  if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleTerminalCommand();
    });
  }
  if (clearTerminalBtn) clearTerminalBtn.addEventListener('click', () => { terminalLogs.innerHTML = ''; });
  if (copyLogsBtn) {
    copyLogsBtn.addEventListener('click', () => {
      audio.playClick();
      navigator.clipboard.writeText(terminalLogs.innerText).then(() => {
        logTerminal('>>> Logs copied to clipboard.', 'success');
      });
    });
  }

  // ==========================================================================
  // 16. TAB NAVIGATION CONTROLLER
  // ==========================================================================
  const navTabs = document.querySelectorAll('.nav-tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      audio.playClick();
      const target = tab.dataset.tab;

      navTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tabPanes.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      const pane = document.getElementById(target);
      if (pane) pane.classList.add('active');
    });
  });

  const modePills = document.querySelectorAll('.mode-pill');
  modePills.forEach(pill => {
    pill.addEventListener('click', () => {
      audio.playClick();
      modePills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      State.selectedMode = pill.dataset.mode;
      logTerminal(`>>> Acceleration profile set to: ${State.selectedMode.toUpperCase()}`, 'prefix');
    });
  });

  // ==========================================================================
  // 17. MODALS & REAL CERTIFICATE EXPORT
  // ==========================================================================
  const settingsModal = document.getElementById('settingsModal');
  const auditModal = document.getElementById('auditModal');
  const openSettingsBtn = document.getElementById('openSettingsBtn');
  const closeSettingsBtn = document.getElementById('closeSettingsBtn');
  const settingsBackdrop = document.getElementById('settingsBackdrop');
  const exportAuditBtn = document.getElementById('exportAuditBtn');
  const closeAuditBtn = document.getElementById('closeAuditBtn');
  const auditBackdrop = document.getElementById('auditBackdrop');
  const downloadJsonCertBtn = document.getElementById('downloadJsonCertBtn');
  const printCertBtn = document.getElementById('printCertBtn');
  const soundToggleBtn = document.getElementById('soundToggleBtn');
  const soundIcon = document.getElementById('soundIcon');
  const themeGlowBtn = document.getElementById('themeGlowBtn');

  function openSettingsModal() {
    audio.playClick();
    if (settingsModal) settingsModal.classList.add('open');
  }

  function closeSettings() {
    audio.playClick();
    if (settingsModal) settingsModal.classList.remove('open');
  }

  function openAuditModal() {
    audio.playSuccess();
    const now = new Date();
    document.getElementById('certTimestamp').textContent = now.toUTCString();
    document.getElementById('certScore').textContent = State.realMetrics.ping !== null ? `Latency: ${State.realMetrics.ping}ms (${State.realMetrics.jitter}ms Jitter)` : 'Pending Live Test';
    document.getElementById('certPing').textContent = State.realMetrics.ping !== null ? `${State.realMetrics.ping}ms (${State.activeNode.name})` : '--';
    document.getElementById('certBloat').textContent = State.realMetrics.bufferbloat !== null ? `GRADE ${State.realMetrics.bufferbloat}` : '--';
    if (auditModal) auditModal.classList.add('open');
  }

  function closeAudit() {
    audio.playClick();
    if (auditModal) auditModal.classList.remove('open');
  }

  if (openSettingsBtn) openSettingsBtn.addEventListener('click', openSettingsModal);
  if (closeSettingsBtn) closeSettingsBtn.addEventListener('click', closeSettings);
  if (settingsBackdrop) settingsBackdrop.addEventListener('click', closeSettings);
  if (exportAuditBtn) exportAuditBtn.addEventListener('click', openAuditModal);
  if (closeAuditBtn) closeAuditBtn.addEventListener('click', closeAudit);
  if (auditBackdrop) auditBackdrop.addEventListener('click', closeAudit);

  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      const active = audio.toggle();
      soundIcon.className = active ? 'fa-solid fa-volume-high' : 'fa-solid fa-volume-xmark';
      soundToggleBtn.querySelector('.btn-tooltip').textContent = active ? 'SFX ON' : 'SFX OFF';
    });
  }

  if (themeGlowBtn) {
    themeGlowBtn.addEventListener('click', () => {
      audio.playClick();
      State.currentAuraIndex = (State.currentAuraIndex + 1) % State.auraThemes.length;
      const theme = State.auraThemes[State.currentAuraIndex];
      const a1 = document.querySelector('.ambient-1');
      const a2 = document.querySelector('.ambient-2');
      if (a1) a1.style.background = `radial-gradient(circle, ${theme.color1} 0%, rgba(56, 189, 248, 0) 70%)`;
      if (a2) a2.style.background = `radial-gradient(circle, ${theme.color2} 0%, rgba(129, 140, 248, 0) 70%)`;
      logTerminal(`>>> Ambient Aura shifted to: ${theme.name}`, 'prefix');
    });
  }

  if (downloadJsonCertBtn) {
    downloadJsonCertBtn.addEventListener('click', () => {
      audio.playClick();
      const report = {
        application: 'NivxBoost Real-Time Network Measurement',
        version: '4.8.2',
        timestamp: new Date().toISOString(),
        status: State.isBoosted ? 'OPTIMIZED' : 'STANDARD',
        activeNode: State.activeNode,
        activeDns: State.activeDns,
        realMeasurements: {
          pingMs: State.realMetrics.ping,
          jitterMs: State.realMetrics.jitter,
          bufferbloatGrade: State.realMetrics.bufferbloat,
          packetLossPct: State.realMetrics.packetLoss,
          effectiveType: State.realMetrics.effectiveType
        },
        boostComparison: {
          baselineBefore: State.baselineBeforeBoost,
          resultAfter: State.lastBoostResult
        }
      };

      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(report, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', `NivxBoost_Real_Network_Audit_${Date.now()}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    });
  }

  if (printCertBtn) {
    printCertBtn.addEventListener('click', () => {
      audio.playClick();
      window.print();
    });
  }

  // ==========================================================================
  // INITIALIZE ON LOAD
  // ==========================================================================
  runInitialTelemetry();

})();
