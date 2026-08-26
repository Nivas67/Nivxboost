/**
 * ============================================================================
 * NIVXBOOST — QUANTUM NETWORK SPEED & LATENCY ACCELERATOR
 * Full Architecture & Engine Implementation
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
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    }

    playCharge() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 1.2);

      gain.gain.setValueAtTime(0.02, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.15, this.ctx.currentTime + 1.0);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 1.2);
    }

    playWarp() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(900, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(2400, this.ctx.currentTime + 0.35);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.4);
    }

    playSuccess() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.5]; // C E G C chord
      notes.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * 0.08);

        gain.gain.setValueAtTime(0.08, this.ctx.currentTime + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + i * 0.08 + 0.5);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + i * 0.08);
        osc.stop(this.ctx.currentTime + i * 0.08 + 0.5);
      });
    }

    playAlert() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.setValueAtTime(320, this.ctx.currentTime + 0.1);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.25);
    }
  }

  const audio = new CyberAudioEngine();

  // ==========================================================================
  // 2. STATE REPOSITORY
  // ==========================================================================
  const State = {
    isBoosted: false,
    isBoosting: false,
    boostStartTime: null,
    boostTimerInterval: null,
    selectedMode: 'gaming',
    activeNode: {
      id: 'fra',
      name: 'Frankfurt Core Edge (FRA-01)',
      ping: 18,
      location: 'Frankfurt, Germany',
      x: 480,
      y: 160
    },
    activeDns: {
      id: 'nivx',
      name: 'Nivx Quantum DoH (AI-Cached)',
      ip: '172.64.32.1',
      ping: 4.2
    },
    metrics: {
      ping: 28,
      jitter: 0.8,
      bufferbloat: 'A+',
      packetLoss: 0.0,
      downloadSpeed: 486.2,
      uploadSpeed: 142.8,
      throughputMultiplier: 0
    },
    processes: [
      { id: 1, name: 'Steam Client Bootstrapper', pid: 14082, usage: 82.4, icon: 'fa-brands fa-steam', throttled: false },
      { id: 2, name: 'Discord Voice & Video Mesh', pid: 9821, usage: 24.1, icon: 'fa-brands fa-discord', throttled: false },
      { id: 3, name: 'Google Chrome 4K Background Tab', pid: 21904, usage: 22.8, icon: 'fa-brands fa-chrome', throttled: false },
      { id: 4, name: 'Windows Delivery Optimization', pid: 4812, usage: 13.1, icon: 'fa-brands fa-windows', throttled: false }
    ],
    auraThemes: [
      { name: 'Cyan Vortex', color1: '#00f0ff', color2: '#7928ca' },
      { name: 'Emerald Turbo', color1: '#00ff87', color2: '#00f0ff' },
      { name: 'Hyper Magenta', color1: '#ff007f', color2: '#ffd000' }
    ],
    currentAuraIndex: 0
  };

  // ==========================================================================
  // 3. SERVER NODES DEFINITIONS
  // ==========================================================================
  const SERVER_NODES = [
    { id: 'fra', name: 'Frankfurt IXP Edge', code: 'FRA-01', ping: 18, flag: '🇩🇪', bandwidth: '25 Gbps', x: 480, y: 160 },
    { id: 'lon', name: 'London Tier-1 Telehouse', code: 'LON-03', ping: 22, flag: '🇬🇧', bandwidth: '40 Gbps', x: 450, y: 150 },
    { id: 'ash', name: 'US-East Ashburn Equinix', code: 'IAD-07', ping: 12, flag: '🇺🇸', bandwidth: '100 Gbps', x: 260, y: 190 },
    { id: 'tok', name: 'Tokyo Anycast Central', code: 'NRT-02', ping: 28, flag: '🇯🇵', bandwidth: '10 Gbps', x: 790, y: 200 },
    { id: 'sin', name: 'Singapore Equinix SG1', code: 'SIN-05', ping: 34, flag: '🇸🇬', bandwidth: '40 Gbps', x: 710, y: 260 },
    { id: 'bom', name: 'Mumbai Direct Peering', code: 'BOM-04', ping: 9, flag: '🇮🇳', bandwidth: '20 Gbps', x: 630, y: 230 }
  ];

  // ==========================================================================
  // 4. DNS PROVIDERS DEFINITION
  // ==========================================================================
  const DNS_PROVIDERS = [
    { id: 'nivx', name: 'Nivx Quantum DoH (AI-Cached)', ip: '172.64.32.1', protocol: 'DoH / QUIC', ping: 4.2, security: 'Hardware DNSSEC + Threat Shield', active: true },
    { id: 'cf', name: 'Cloudflare Ultra-Fast', ip: '1.1.1.1', protocol: 'DNS-over-HTTPS', ping: 8.5, security: 'DNSSEC + Zero Logging', active: false },
    { id: 'goog', name: 'Google Public DNS', ip: '8.8.8.8', protocol: 'DNS-over-TLS', ping: 12.1, security: 'Standard Anycast Validation', active: false },
    { id: 'q9', name: 'Quad9 Privacy DNS', ip: '9.9.9.9', protocol: 'DNS-over-HTTPS', ping: 15.4, security: 'Malware Threat Blocking', active: false },
    { id: 'open', name: 'Cisco OpenDNS Home', ip: '208.67.222.222', protocol: 'DoH', ping: 19.8, security: 'Phishing Protection Filter', active: false }
  ];

  // ==========================================================================
  // 5. CANVAS 1: TURBO BOOSTER DIAL & ACCELERATOR WAVE
  // ==========================================================================
  const boosterCanvas = document.getElementById('boosterCanvas');
  const boosterCtx = boosterCanvas ? boosterCanvas.getContext('2d') : null;
  let boosterAngle = 0;
  let boosterParticles = [];

  function initBoosterParticles() {
    boosterParticles = [];
    for (let i = 0; i < 48; i++) {
      boosterParticles.push({
        angle: Math.random() * Math.PI * 2,
        radius: 120 + Math.random() * 60,
        speed: 0.01 + Math.random() * 0.02,
        size: 1.5 + Math.random() * 2.5,
        alpha: 0.2 + Math.random() * 0.8
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

    // Speed multiplier based on state
    const speedMult = State.isBoosting ? 4.5 : State.isBoosted ? 2.0 : 1.0;
    boosterAngle += 0.015 * speedMult;

    // 1. Outer Tick Ring
    boosterCtx.save();
    boosterCtx.translate(cx, cy);
    boosterCtx.rotate(boosterAngle * 0.2);

    const ticks = 60;
    for (let i = 0; i < ticks; i++) {
      const rad = (i / ticks) * Math.PI * 2;
      const isMajor = i % 5 === 0;
      const len = isMajor ? 12 : 6;
      const r1 = 188;
      const r2 = r1 - len;

      boosterCtx.beginPath();
      boosterCtx.moveTo(Math.cos(rad) * r1, Math.sin(rad) * r1);
      boosterCtx.lineTo(Math.cos(rad) * r2, Math.sin(rad) * r2);
      boosterCtx.strokeStyle = isMajor ? (State.isBoosted ? '#00ff87' : '#00f0ff') : 'rgba(255, 255, 255, 0.12)';
      boosterCtx.lineWidth = isMajor ? 2 : 1;
      boosterCtx.stroke();
    }
    boosterCtx.restore();

    // 2. Animated Glowing Arc
    boosterCtx.save();
    boosterCtx.translate(cx, cy);
    boosterCtx.rotate(-boosterAngle);

    const gradient = boosterCtx.createLinearGradient(-150, -150, 150, 150);
    if (State.isBoosted) {
      gradient.addColorStop(0, '#00ff87');
      gradient.addColorStop(0.5, '#00f0ff');
      gradient.addColorStop(1, '#ffd000');
    } else {
      gradient.addColorStop(0, '#00f0ff');
      gradient.addColorStop(0.5, '#7928ca');
      gradient.addColorStop(1, 'transparent');
    }

    boosterCtx.beginPath();
    boosterCtx.arc(0, 0, 160, 0, Math.PI * 1.5);
    boosterCtx.strokeStyle = gradient;
    boosterCtx.lineWidth = State.isBoosted ? 6 : 3;
    boosterCtx.shadowBlur = State.isBoosted ? 24 : 12;
    boosterCtx.shadowColor = State.isBoosted ? '#00ff87' : '#00f0ff';
    boosterCtx.stroke();
    boosterCtx.restore();

    // 3. Floating Energy Particle Wave
    boosterParticles.forEach(p => {
      p.angle += p.speed * speedMult;
      const px = cx + Math.cos(p.angle) * p.radius;
      const py = cy + Math.sin(p.angle) * p.radius;

      boosterCtx.beginPath();
      boosterCtx.arc(px, py, p.size, 0, Math.PI * 2);
      boosterCtx.fillStyle = State.isBoosted ? `rgba(0, 255, 135, ${p.alpha})` : `rgba(0, 240, 255, ${p.alpha})`;
      boosterCtx.shadowBlur = 8;
      boosterCtx.shadowColor = State.isBoosted ? '#00ff87' : '#00f0ff';
      boosterCtx.fill();
    });

    requestAnimationFrame(drawBoosterDial);
  }
  requestAnimationFrame(drawBoosterDial);

  // ==========================================================================
  // 6. CANVAS 2: REAL-TIME SPECTRUM WAVEFORM
  // ==========================================================================
  const spectrumCanvas = document.getElementById('liveSpectrumCanvas');
  const spectrumCtx = spectrumCanvas ? spectrumCanvas.getContext('2d') : null;
  const spectrumData = Array(60).fill(120);

  function drawLiveSpectrum() {
    if (!spectrumCtx || !spectrumCanvas) return;
    const w = spectrumCanvas.width;
    const h = spectrumCanvas.height;

    // Shift data and add new point
    const baseSpeed = State.isBoosted ? 680 : 380;
    const jitter = (Math.random() - 0.5) * (State.isBoosted ? 40 : 120);
    const nextVal = Math.max(100, Math.min(800, baseSpeed + jitter));

    spectrumData.shift();
    spectrumData.push(nextVal);

    // Update spectrum labels
    const curEl = document.getElementById('specCurrent');
    if (curEl) curEl.textContent = `${nextVal.toFixed(1)} Mbps`;

    spectrumCtx.clearRect(0, 0, w, h);

    // Draw Grid Lines
    spectrumCtx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    spectrumCtx.lineWidth = 1;
    for (let y = 20; y < h; y += 30) {
      spectrumCtx.beginPath();
      spectrumCtx.moveTo(0, y);
      spectrumCtx.lineTo(w, y);
      spectrumCtx.stroke();
    }

    // Draw Gradient Wave Area
    const grad = spectrumCtx.createLinearGradient(0, 0, 0, h);
    if (State.isBoosted) {
      grad.addColorStop(0, 'rgba(0, 255, 135, 0.35)');
      grad.addColorStop(1, 'rgba(0, 255, 135, 0.0)');
    } else {
      grad.addColorStop(0, 'rgba(0, 240, 255, 0.25)');
      grad.addColorStop(1, 'rgba(0, 240, 255, 0.0)');
    }

    spectrumCtx.beginPath();
    const step = w / (spectrumData.length - 1);
    spectrumCtx.moveTo(0, h);

    for (let i = 0; i < spectrumData.length; i++) {
      const val = spectrumData[i];
      const y = h - (val / 850) * (h - 10);
      spectrumCtx.lineTo(i * step, y);
    }
    spectrumCtx.lineTo(w, h);
    spectrumCtx.closePath();
    spectrumCtx.fillStyle = grad;
    spectrumCtx.fill();

    // Draw Top Wave Line
    spectrumCtx.beginPath();
    for (let i = 0; i < spectrumData.length; i++) {
      const val = spectrumData[i];
      const y = h - (val / 850) * (h - 10);
      if (i === 0) spectrumCtx.moveTo(0, y);
      else spectrumCtx.lineTo(i * step, y);
    }
    spectrumCtx.strokeStyle = State.isBoosted ? '#00ff87' : '#00f0ff';
    spectrumCtx.lineWidth = 2;
    spectrumCtx.shadowBlur = 8;
    spectrumCtx.shadowColor = State.isBoosted ? '#00ff87' : '#00f0ff';
    spectrumCtx.stroke();

    setTimeout(() => {
      requestAnimationFrame(drawLiveSpectrum);
    }, 100);
  }
  requestAnimationFrame(drawLiveSpectrum);

  // ==========================================================================
  // 7. CANVAS 3: WORLD NETWORK RADAR & NODE MESH
  // ==========================================================================
  const radarCanvas = document.getElementById('worldRadarCanvas');
  const radarCtx = radarCanvas ? radarCanvas.getContext('2d') : null;
  let radarScanAngle = 0;

  function drawWorldRadar() {
    if (!radarCtx || !radarCanvas) return;
    const w = radarCanvas.width;
    const h = radarCanvas.height;

    radarCtx.clearRect(0, 0, w, h);

    // Draw background map grid
    radarCtx.strokeStyle = 'rgba(0, 240, 255, 0.08)';
    radarCtx.lineWidth = 1;
    for (let x = 0; x < w; x += 40) {
      radarCtx.beginPath();
      radarCtx.moveTo(x, 0);
      radarCtx.lineTo(x, h);
      radarCtx.stroke();
    }
    for (let y = 0; y < h; y += 40) {
      radarCtx.beginPath();
      radarCtx.moveTo(0, y);
      radarCtx.lineTo(w, y);
      radarCtx.stroke();
    }

    // Draw connections between nodes
    radarCtx.beginPath();
    SERVER_NODES.forEach((node, idx) => {
      const nextNode = SERVER_NODES[(idx + 1) % SERVER_NODES.length];
      radarCtx.moveTo(node.x, node.y);
      radarCtx.lineTo(nextNode.x, nextNode.y);
    });
    radarCtx.strokeStyle = 'rgba(0, 240, 255, 0.15)';
    radarCtx.lineWidth = 1.5;
    radarCtx.setLineDash([4, 4]);
    radarCtx.stroke();
    radarCtx.setLineDash([]);

    // Draw active tunnel route to selected node
    const active = State.activeNode;
    radarCtx.beginPath();
    radarCtx.moveTo(w / 2, h / 2);
    radarCtx.lineTo(active.x, active.y);
    radarCtx.strokeStyle = '#00ff87';
    radarCtx.lineWidth = 2.5;
    radarCtx.shadowBlur = 12;
    radarCtx.shadowColor = '#00ff87';
    radarCtx.stroke();

    // Draw Server Node Points
    SERVER_NODES.forEach(node => {
      const isCurrent = node.id === State.activeNode.id;

      // Outer Pulse Ring
      radarCtx.beginPath();
      radarCtx.arc(node.x, node.y, isCurrent ? 14 : 8, 0, Math.PI * 2);
      radarCtx.fillStyle = isCurrent ? 'rgba(0, 255, 135, 0.25)' : 'rgba(0, 240, 255, 0.12)';
      radarCtx.fill();

      // Core Node
      radarCtx.beginPath();
      radarCtx.arc(node.x, node.y, isCurrent ? 6 : 4, 0, Math.PI * 2);
      radarCtx.fillStyle = isCurrent ? '#00ff87' : '#00f0ff';
      radarCtx.shadowBlur = isCurrent ? 16 : 8;
      radarCtx.shadowColor = isCurrent ? '#00ff87' : '#00f0ff';
      radarCtx.fill();

      // Node Label
      radarCtx.font = '10px JetBrains Mono';
      radarCtx.fillStyle = isCurrent ? '#00ff87' : '#c9d1d9';
      radarCtx.fillText(`${node.code} (${node.ping}ms)`, node.x + 10, node.y - 6);
    });

    requestAnimationFrame(drawWorldRadar);
  }
  requestAnimationFrame(drawWorldRadar);

  // ==========================================================================
  // 8. QUANTUM TURBO ACCELERATOR STATE MACHINE
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

  const stages = [
    { id: 'stageDns', name: 'DNS Purge & Benchmark', duration: 700 },
    { id: 'stageTcp', name: 'TCP Window Expansion (64KB)', duration: 800 },
    { id: 'stageMtu', name: 'MTU MSS Clamping & Optimization', duration: 700 },
    { id: 'stageNode', name: 'Anycast Lowest-Latency Node Hop', duration: 900 },
    { id: 'stageLock', name: 'Quantum Turbo Tunnel Active', duration: 500 }
  ];

  function runTurboAcceleration() {
    if (State.isBoosting) return;
    State.isBoosting = true;
    audio.playCharge();

    logTerminal('>>> INITIATING QUANTUM MULTI-VECTOR NETWORK ACCELERATION...', 'prefix');
    boostBtnText.textContent = 'ENGAGING ACCELERATOR...';
    boostBtnSubText.textContent = 'Flushing routing tables and tuning sockets';
    dialActionLabel.textContent = 'PURGING & TUNING...';

    // Reset pipeline stage styles
    stages.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) {
        el.className = 'pipeline-stage';
        el.querySelector('.stage-status').textContent = 'Pending';
      }
    });

    let currentStep = 0;

    function executeNextStage() {
      if (currentStep < stages.length) {
        const stage = stages[currentStep];
        const el = document.getElementById(stage.id);
        if (el) {
          el.classList.add('active');
          el.querySelector('.stage-status').textContent = 'Optimizing...';
        }

        audio.playClick();
        logTerminal(`[ACCEL STEP ${currentStep + 1}/5] ${stage.name}... [OK]`, 'warn');

        setTimeout(() => {
          if (el) {
            el.classList.remove('active');
            el.classList.add('completed');
            el.querySelector('.stage-status').textContent = 'Locked';
          }
          currentStep++;
          executeNextStage();
        }, stage.duration);
      } else {
        // All stages complete!
        completeTurboBoost();
      }
    }

    executeNextStage();
  }

  function completeTurboBoost() {
    State.isBoosting = false;
    State.isBoosted = true;
    audio.playWarp();
    audio.playSuccess();

    // UI Updates
    boostBtnText.textContent = 'TURBO BOOST LOCKED ACTIVE';
    boostBtnSubText.textContent = '+385% Maximum Throughput Achieved';
    dialActionLabel.textContent = 'WARP TUNNEL ACTIVE';
    dialThroughputMultiplier.textContent = '+385%';
    dialSubMetric.textContent = '0.4ms Jitter • Zero Packet Drops';
    if (coreIcon) coreIcon.className = 'fa-solid fa-atom';

    statusBadge.className = 'network-badge status-boosted';
    statusBadgeText.innerHTML = '<i class="fa-solid fa-bolt"></i> QUANTUM TURBO ACTIVE';

    // Metric Values Updated
    document.getElementById('metricPing').textContent = '11';
    document.getElementById('metricJitter').textContent = '0.4';
    document.getElementById('metricBloat').textContent = 'A+';
    document.getElementById('metricLoss').textContent = '0.00';
    document.getElementById('hudMtu').textContent = '1500 (Turbo-Clamped)';

    // Start Boost Duration Timer
    if (boostTimerWrap) boostTimerWrap.style.display = 'flex';
    State.boostStartTime = Date.now();
    if (State.boostTimerInterval) clearInterval(State.boostTimerInterval);
    State.boostTimerInterval = setInterval(updateBoostTimer, 1000);

    logTerminal('>>> [SUCCESS] NIVX QUANTUM TURBO LOCKED. THROUGHPUT MAXIMIZED.', 'success');
  }

  function revertTurboBoost() {
    audio.playClick();
    State.isBoosted = false;
    State.isBoosting = false;

    if (State.boostTimerInterval) clearInterval(State.boostTimerInterval);
    if (boostTimerWrap) boostTimerWrap.style.display = 'none';

    // Reset UI
    boostBtnText.textContent = 'INITIALIZE TURBO BOOST';
    boostBtnSubText.textContent = 'Tap to engage multi-vector acceleration';
    dialActionLabel.textContent = 'SYSTEM STANDBY';
    dialThroughputMultiplier.textContent = '+0%';
    dialSubMetric.textContent = 'CLICK BELOW TO ACCELERATE';
    if (coreIcon) coreIcon.className = 'fa-solid fa-bolt';

    statusBadge.className = 'network-badge status-idle';
    statusBadgeText.textContent = 'SYSTEM IDLE • READY';

    stages.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) {
        el.className = 'pipeline-stage';
        el.querySelector('.stage-status').textContent = 'Ready';
      }
    });

    document.getElementById('metricPing').textContent = '28';
    document.getElementById('metricJitter').textContent = '0.8';
    document.getElementById('hudMtu').textContent = '1500 (Auto-Scaled)';

    logTerminal('>>> Network configuration reverted to default ISP stack.', 'warn');
  }

  function updateBoostTimer() {
    if (!State.boostStartTime) return;
    const diff = Math.floor((Date.now() - State.boostStartTime) / 1000);
    const hrs = String(Math.floor(diff / 3600)).padStart(2, '0');
    const mins = String(Math.floor((diff % 3600) / 60)).padStart(2, '0');
    const secs = String(diff % 60).padStart(2, '0');
    if (boostTimeCounter) boostTimeCounter.textContent = `${hrs}:${mins}:${secs}`;
  }

  if (mainBoostBtn) mainBoostBtn.addEventListener('click', runTurboAcceleration);
  if (revertBoostBtn) revertBoostBtn.addEventListener('click', revertTurboBoost);

  // ==========================================================================
  // 9. DUAL SPEEDOMETER GAUGES & SPEED TEST LAB
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
    const radius = 100;

    ctx.clearRect(0, 0, w, h);

    // Background track arc (from 135deg to 45deg)
    const startAngle = Math.PI * 0.75;
    const endAngle = Math.PI * 2.25;

    ctx.beginPath();
    ctx.arc(cx, cy, radius, startAngle, endAngle);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 12;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Active progress arc
    const progress = Math.min(1, Math.max(0, value / maxVal));
    const currentAngle = startAngle + progress * (endAngle - startAngle);

    if (progress > 0) {
      ctx.beginPath();
      ctx.arc(cx, cy, radius, startAngle, currentAngle);
      ctx.strokeStyle = color;
      ctx.lineWidth = 14;
      ctx.lineCap = 'round';
      ctx.shadowBlur = 18;
      ctx.shadowColor = color;
      ctx.stroke();
    }
  }

  function updateGauges() {
    drawSpeedDial(dlCtx, dlCanvas, dlGaugeSpeed, 1000, '#00f0ff');
    drawSpeedDial(ulCtx, ulCanvas, ulGaugeSpeed, 500, '#c084fc');
    requestAnimationFrame(updateGauges);
  }
  requestAnimationFrame(updateGauges);

  function runSpeedTest() {
    audio.playCharge();
    startSpeedTestBtn.disabled = true;
    startSpeedTestBtn.style.opacity = '0.6';

    const dlValEl = document.getElementById('dlSpeedValue');
    const ulValEl = document.getElementById('ulSpeedValue');
    const dlSubEl = document.getElementById('dlStatusSub');
    const ulSubEl = document.getElementById('ulStatusSub');

    logTerminal('>>> INITIATING MULTI-STREAM SPEED BENCHMARK...', 'prefix');

    // 1. Latency Phase
    speedPhaseLabel.textContent = 'Measuring Loaded Latency & Jitter...';
    speedProgressBar.style.width = '15%';

    setTimeout(() => {
      audio.playClick();
      const pingVal = State.isBoosted ? 11 : 28;
      const loadedPing = State.isBoosted ? 14 : 42;
      document.getElementById('resPing').textContent = `${pingVal} ms`;
      document.getElementById('resLoadedPing').textContent = `${loadedPing} ms`;

      // 2. Download Phase
      speedPhaseLabel.textContent = 'Testing Multi-Socket Download Stream (10Gbps)...';
      speedProgressBar.style.width = '50%';
      dlSubEl.textContent = 'STREAMING...';

      let targetDl = State.isBoosted ? 842.6 : 486.2;
      let currentDl = 0;
      const dlInterval = setInterval(() => {
        currentDl += (targetDl - currentDl) * 0.15 + (Math.random() * 20 - 10);
        dlGaugeSpeed = currentDl;
        dlValEl.textContent = currentDl.toFixed(1);
        document.getElementById('dlTotalTransferred').textContent = `${(currentDl * 0.42).toFixed(1)} MB`;
      }, 50);

      setTimeout(() => {
        clearInterval(dlInterval);
        dlGaugeSpeed = targetDl;
        dlValEl.textContent = targetDl.toFixed(1);
        dlSubEl.textContent = 'TEST COMPLETE';
        document.getElementById('resPeakDl').textContent = `${targetDl.toFixed(1)} Mbps`;
        audio.playClick();

        // 3. Upload Phase
        speedPhaseLabel.textContent = 'Testing Low-Bufferbloat Upload Channel...';
        speedProgressBar.style.width = '85%';
        ulSubEl.textContent = 'UPLOADING...';

        let targetUl = State.isBoosted ? 264.8 : 142.4;
        let currentUl = 0;
        const ulInterval = setInterval(() => {
          currentUl += (targetUl - currentUl) * 0.15 + (Math.random() * 10 - 5);
          ulGaugeSpeed = currentUl;
          ulValEl.textContent = currentUl.toFixed(1);
          document.getElementById('ulTotalTransferred').textContent = `${(currentUl * 0.28).toFixed(1)} MB`;
        }, 50);

        setTimeout(() => {
          clearInterval(ulInterval);
          ulGaugeSpeed = targetUl;
          ulValEl.textContent = targetUl.toFixed(1);
          ulSubEl.textContent = 'TEST COMPLETE';
          document.getElementById('resPeakUl').textContent = `${targetUl.toFixed(1)} Mbps`;
          audio.playSuccess();

          speedProgressBar.style.width = '100%';
          speedPhaseLabel.textContent = 'Diagnostics Complete • All Streams Verified';
          startSpeedTestBtn.disabled = false;
          startSpeedTestBtn.style.opacity = '1';

          logTerminal(`>>> SPEED TEST RESULT: DL: ${targetDl.toFixed(1)} Mbps | UL: ${targetUl.toFixed(1)} Mbps | PING: ${pingVal}ms`, 'success');
        }, 2200);

      }, 2500);

    }, 1000);
  }

  if (startSpeedTestBtn) startSpeedTestBtn.addEventListener('click', runSpeedTest);

  // ==========================================================================
  // 10. GLOBAL NODE HOPPER INITIALIZATION & ROUTING
  // ==========================================================================
  const serverNodesContainer = document.getElementById('serverNodesContainer');
  const activeNodeNameEl = document.getElementById('activeNodeName');
  const autoRouteBtn = document.getElementById('autoRouteBtn');

  function renderServerNodes() {
    if (!serverNodesContainer) return;
    serverNodesContainer.innerHTML = '';

    SERVER_NODES.forEach(node => {
      const isSelected = node.id === State.activeNode.id;
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
          <span>LATENCY: <strong class="${node.ping < 20 ? 'green-text' : 'cyan-text'}">${node.ping}ms</strong></span>
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

  function selectServerNode(node) {
    audio.playClick();
    State.activeNode = node;
    if (activeNodeNameEl) activeNodeNameEl.textContent = `${node.name} (${node.code})`;
    document.getElementById('metricPing').textContent = node.ping;
    renderServerNodes();
    logTerminal(`>>> Switched active tunnel route to: ${node.name} [Ping: ${node.ping}ms]`, 'prefix');
  }

  function autoLockBestNode() {
    audio.playCharge();
    let best = SERVER_NODES[0];
    SERVER_NODES.forEach(n => {
      if (n.ping < best.ping) best = n;
    });
    setTimeout(() => {
      selectServerNode(best);
      audio.playSuccess();
      logTerminal(`>>> Auto-Routing Complete: Locked into optimal edge node: ${best.name}`, 'success');
    }, 600);
  }

  if (autoRouteBtn) autoRouteBtn.addEventListener('click', autoLockBestNode);
  renderServerNodes();

  // ==========================================================================
  // 11. DNS BENCHMARK SUITE & CACHE PURGE
  // ==========================================================================
  const dnsTableBody = document.getElementById('dnsTableBody');
  const runDnsBenchmarkBtn = document.getElementById('runDnsBenchmarkBtn');
  const flushDnsCacheOnlyBtn = document.getElementById('flushDnsCacheOnlyBtn');

  function renderDnsTable() {
    if (!dnsTableBody) return;
    dnsTableBody.innerHTML = '';

    DNS_PROVIDERS.forEach(dns => {
      const isSelected = dns.id === State.activeDns.id;
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
        <td><span class="dns-ms-val ${dns.ping < 10 ? 'green-text' : 'cyan-text'}">${dns.ping} ms</span></td>
        <td style="font-size: 0.78rem; color: #8b9bb4;">${dns.security}</td>
        <td>
          <span class="stage-status ${isSelected ? 'green-text' : ''}">
            ${isSelected ? '<i class="fa-solid fa-circle-check"></i> ACTIVE' : 'STANDBY'}
          </span>
        </td>
        <td>
          <button class="cyber-btn-outline" style="padding: 6px 12px; font-size: 0.7rem;">
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
    logTerminal(`>>> DNS Resolver switched to: ${dns.name} (${dns.ip}) [Query: ${dns.ping}ms]`, 'success');
  }

  function runDnsBenchmark() {
    audio.playCharge();
    logTerminal('>>> Running live DNS Resolver latency sweep...', 'warn');
    if (runDnsBenchmarkBtn) runDnsBenchmarkBtn.disabled = true;

    setTimeout(() => {
      DNS_PROVIDERS.forEach(d => {
        d.ping = +(d.ping + (Math.random() * 2 - 1)).toFixed(1);
      });
      renderDnsTable();
      audio.playSuccess();
      if (runDnsBenchmarkBtn) runDnsBenchmarkBtn.disabled = false;
      logTerminal('>>> DNS Sweep Complete: Nivx Quantum DNS remains lowest latency.', 'success');
    }, 1000);
  }

  function flushDnsCache() {
    audio.playClick();
    audio.playWarp();
    logTerminal('>>> FLUSHING LOCAL SOCKET & OPERATING SYSTEM DNS CACHE...', 'warn');
    setTimeout(() => {
      audio.playSuccess();
      logTerminal('>>> [SUCCESS] 428 DNS entries purged. Clean lookup table established.', 'success');
    }, 500);
  }

  if (runDnsBenchmarkBtn) runDnsBenchmarkBtn.addEventListener('click', runDnsBenchmark);
  if (flushDnsCacheOnlyBtn) flushDnsCacheOnlyBtn.addEventListener('click', flushDnsCache);
  renderDnsTable();

  // ==========================================================================
  // 12. BANDWIDTH HOG LIMITER & PROCESS INSPECTOR
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
            <span class="process-pid">PID: ${proc.pid} &bull; Protocol: TCP Multi-Socket</span>
          </div>
        </div>
        <div class="process-right">
          <span class="process-speed ${proc.throttled ? 'yellow-text' : 'cyan-text'}">
            ${proc.throttled ? 'THROTTLED (0.1 Mbps)' : `${proc.usage.toFixed(1)} Mbps`}
          </span>
          <div class="process-actions">
            <button class="cyber-btn-outline" style="padding: 6px 10px; font-size: 0.68rem;" title="Throttle bandwidth">
              ${proc.throttled ? '<i class="fa-solid fa-unlock"></i> RESTORE' : '<i class="fa-solid fa-gauge-simple-high"></i> THROTTLE'}
            </button>
            <button class="cyber-btn-danger" style="padding: 6px 10px; font-size: 0.68rem;" title="Terminate process connection">
              <i class="fa-solid fa-ban"></i> TERMINATE
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
        logTerminal(`>>> Process ${proc.name} (${proc.pid}) ${proc.throttled ? 'throttled to 100Kbps' : 'bandwidth restored'}.`, 'warn');
      });

      killBtn.addEventListener('click', () => {
        audio.playAlert();
        State.processes = State.processes.filter(p => p.id !== proc.id);
        renderProcesses();
        logTerminal(`>>> [TERMINATED] Process ${proc.name} (${proc.pid}) closed. Bandwidth reclaimed.`, 'warn');
      });

      processListContainer.appendChild(item);
    });

    if (totalHogUsageEl) totalHogUsageEl.textContent = `${totalUsage.toFixed(1)} Mbps`;
    if (reclaimedBandwidthEl) reclaimedBandwidthEl.textContent = `+${totalReclaimed.toFixed(1)} Mbps`;
  }

  function throttleAllHogs() {
    audio.playAlert();
    State.processes.forEach(p => p.throttled = true);
    renderProcesses();
    logTerminal('>>> ALL BACKGROUND BANDWIDTH HOGS RESTRICTED. REALTIME GAMING QOS ENGAGED.', 'success');
  }

  if (killAllHogsBtn) killAllHogsBtn.addEventListener('click', throttleAllHogs);
  renderProcesses();

  // ==========================================================================
  // 13. GAMING PRESETS OPTIMIZER
  // ==========================================================================
  const gamePresetItems = document.querySelectorAll('.game-preset-item');
  gamePresetItems.forEach(item => {
    const btn = item.querySelector('.game-opt-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        audio.playClick();
        gamePresetItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        const game = item.dataset.game;
        logTerminal(`>>> GAMING ACCELERATOR: Tickrate buffer locked for ${game.toUpperCase()}. UDP priority set to Class 1.`, 'success');
      });
    }
  });

  // ==========================================================================
  // 14. TELEMETRY TERMINAL INTERACTION
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

  // Initial startup logs
  logTerminal('NIVX QUANTUM NETWORK OS [Version 4.8.2-PRO]', 'prefix');
  logTerminal('System initialized. Socket interfaces: IPv4/IPv6 Dual Stack ready.', 'normal');
  logTerminal('Hardware Acceleration: ENABLED (WebGL / SIMD Vectorized).', 'success');

  function handleTerminalCommand() {
    if (!terminalInput) return;
    const cmd = terminalInput.value.trim().toLowerCase();
    if (!cmd) return;

    audio.playClick();
    logTerminal(`nivx@quantum:~$ ${cmd}`, 'normal');
    terminalInput.value = '';

    switch (cmd) {
      case 'help':
        logTerminal('Available commands: turbo, status, ping, speed, dns, nodes, hogs, clear, audit, help', 'prefix');
        break;
      case 'turbo':
      case 'boost':
        runTurboAcceleration();
        break;
      case 'status':
        logTerminal(`Status: ${State.isBoosted ? 'BOOSTED (+385%)' : 'STANDBY'} | Node: ${State.activeNode.name} | Latency: ${State.activeNode.ping}ms`, 'success');
        break;
      case 'ping':
        logTerminal(`Pinging ${State.activeNode.name}: 64 bytes from node: icmp_seq=1 ttl=56 time=${State.activeNode.ping} ms`, 'success');
        break;
      case 'speed':
        runSpeedTest();
        break;
      case 'dns':
        runDnsBenchmark();
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
  // 15. TAB NAVIGATION CONTROLLER
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

  // Mode Switcher Pills
  const modePills = document.querySelectorAll('.mode-pill');
  modePills.forEach(pill => {
    pill.addEventListener('click', () => {
      audio.playClick();
      modePills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      State.selectedMode = pill.dataset.mode;
      logTerminal(`>>> Acceleration profile changed to: ${State.selectedMode.toUpperCase()}`, 'prefix');
    });
  });

  // ==========================================================================
  // 16. MODALS & CERTIFICATE EXPORT
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
    document.getElementById('certScore').textContent = State.isBoosted ? '99.4 / 100 (A+ Turbo)' : '84.2 / 100 (Standard)';
    document.getElementById('certPing').textContent = `${State.activeNode.ping}ms (${State.activeNode.name})`;
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

  // Sound Toggle
  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      const active = audio.toggle();
      soundIcon.className = active ? 'fa-solid fa-volume-high' : 'fa-solid fa-volume-xmark';
      soundToggleBtn.querySelector('.btn-tooltip').textContent = active ? 'SFX ON' : 'SFX OFF';
    });
  }

  // Aura Glow Cycler
  if (themeGlowBtn) {
    themeGlowBtn.addEventListener('click', () => {
      audio.playClick();
      State.currentAuraIndex = (State.currentAuraIndex + 1) % State.auraThemes.length;
      const theme = State.auraThemes[State.currentAuraIndex];
      const a1 = document.querySelector('.ambient-1');
      const a2 = document.querySelector('.ambient-2');
      if (a1) a1.style.background = `radial-gradient(circle, ${theme.color1} 0%, rgba(0, 240, 255, 0) 70%)`;
      if (a2) a2.style.background = `radial-gradient(circle, ${theme.color2} 0%, rgba(121, 40, 202, 0) 70%)`;
      logTerminal(`>>> Ambient Aura shifted to: ${theme.name}`, 'prefix');
    });
  }

  // Download JSON Audit Report
  if (downloadJsonCertBtn) {
    downloadJsonCertBtn.addEventListener('click', () => {
      audio.playClick();
      const report = {
        application: 'NivxBoost Quantum Network OS',
        version: '4.8.2',
        timestamp: new Date().toISOString(),
        status: State.isBoosted ? 'QUANTUM_BOOSTED' : 'STANDARD',
        activeNode: State.activeNode,
        activeDns: State.activeDns,
        metrics: {
          pingMs: State.activeNode.ping,
          jitterMs: State.isBoosted ? 0.4 : 0.8,
          bufferbloatGrade: 'A+',
          packetLossPct: 0.0,
          downloadPeakMbps: State.isBoosted ? 842.6 : 486.2,
          uploadPeakMbps: State.isBoosted ? 264.8 : 142.4
        },
        security: {
          webrtcProtection: 'ACTIVE',
          hardwareEncryption: 'AES-256-GCM',
          dnssecValidated: true
        }
      };

      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(report, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', `NivxBoost_Network_Audit_${Date.now()}.json`);
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

})();
