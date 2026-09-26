/**
 * RYNIA STUDIOS — INTERACTIVE RETRO TERMINAL HUD (CLI)
 * Independent Systems Craftsman Console
 */

interface CommandHandler {
  (args: string[]): string | Promise<string>;
}

const ASCII_BANNER = `
  ██████╗ ██╗   ██╗███╗   ██╗██╗ █████╗ 
  ██╔══██╗╚██╗ ██╔╝████╗  ██║██║██╔══██╗
  ██████╔╝ ╚████╔╝ ██╔██╗ ██║██║███████║
  ██╔══██╗  ╚██╔╝  ██║╚██╗██║██║██╔══██║
  ██║  ██║   ██║   ██║ ╚████║██║██║  ██║
  ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═══╝╚═╝╚═╝  ╚═╝
  SYSTEMS CRAFTSMAN ATELIER · CLI v1.0.0
  Type '<span class="term-green">help</span>' to inspect available system commands.
`;

const COMMANDS: Record<string, { desc: string; run: CommandHandler }> = {
  help: {
    desc: 'List available atelier commands',
    run: () => {
      return `
<span class="term-bold">AVAILABLE COMMANDS:</span>
  <span class="term-green">about</span>       - Architectural thesis & craftsman profile
  <span class="term-green">systems</span>     - Inspect active open-source & production systems (or 'ls')
  <span class="term-green">kalanla</span>     - Kitchen OS telemetry, features & Google Play beta
  <span class="term-green">guard</span>       - Execute simulated pre-flight store safety audit
  <span class="term-green">receipt</span>     - Procedurally render a retro thermal receipt
  <span class="term-green">kernel</span>      - Inspect local-first reactive event micro-kernel
  <span class="term-green">github</span>      - Launch official GitHub headquarters in new tab
  <span class="term-green">clear</span>       - Clear the terminal console
  <span class="term-green">exit</span>        - Close terminal HUD (or press Esc)
`;
    }
  },

  about: {
    desc: 'Systems craftsman thesis & profile',
    run: () => {
      return `
<span class="term-bold">MUHARREM ÖZMEN (@Rynia)</span>
<span class="term-dim">Independent Systems Craftsman & Software Architect</span>

<span class="term-cyan">"The best software is software you own. On your device. Without permission."</span>

<span class="term-bold">CORE THESIS:</span>
  1. <span class="term-yellow">Local-First:</span> 100% data sovereignty. Zero mandatory cloud accounts.
  2. <span class="term-yellow">Deterministic:</span> Predictable state engines with zero mysterious latency.
  3. <span class="term-yellow">Zero Dependencies:</span> Lightweight, audited TypeScript primitives.
  4. <span class="term-yellow">Ambient UX:</span> Quiet technology that removes friction instead of begging for attention.

Contact: <span class="term-green">ryniastudios@gmail.com</span>
`;
    }
  },

  systems: {
    desc: 'List active systems and packages',
    run: () => {
      return `
<span class="term-bold">RYNIA ACTIVE ECOSYSTEM:</span>

  📦 <span class="term-green">local-first-kernel</span>  <span class="term-dim">[v1.0.0 • MIT]</span>
     Deterministic append-only reactive event micro-kernel.
     <a href="https://github.com/Rynia/local-first-kernel" target="_blank" class="term-cyan">github.com/Rynia/local-first-kernel</a>

  📦 <span class="term-green">expo-release-guard</span>  <span class="term-dim">[v1.0.0 • MIT]</span>
     Pre-flight store safety CLI for Apple Privacy & permissions.
     <a href="https://github.com/Rynia/expo-release-guard" target="_blank" class="term-cyan">github.com/Rynia/expo-release-guard</a>

  📦 <span class="term-green">receipt-renderer</span>    <span class="term-dim">[v1.0.0 • MIT]</span>
     Zero-dependency 9:16 thermal receipt AST engine & SVG/ASCII.
     <a href="https://github.com/Rynia/receipt-renderer" target="_blank" class="term-cyan">github.com/Rynia/receipt-renderer</a>

  📱 <span class="term-yellow">KALANLA (Kitchen OS)</span> <span class="term-dim">[Google Play Closed Beta]</span>
     Deterministic zero-waste pantry OS powered by this ecosystem.
     <a href="https://rynia.github.io/KALANLA/" target="_blank" class="term-cyan">rynia.github.io/KALANLA</a>
`;
    }
  },

  ls: {
    desc: 'Alias for systems',
    run: (args) => COMMANDS.systems.run(args)
  },

  kalanla: {
    desc: 'KALANLA telemetry & features',
    run: () => {
      return `
<span class="term-bold">KALANLA — Kiler Kitchen OS</span>
<span class="term-dim">Local-First Zero-Waste Smart Kitchen Assistant</span>

⚡ <span class="term-green">TELEMETRY:</span>
  • 48-Hour Risk Radar: Real-time perishable spoilage forecasting.
  • Zero-Waste Chef: Client-side deterministic recipe matchmaking.
  • Thermal Savings Log: 9:16 thermal receipt export for social sharing.
  • Haptic Undo Guard: 5-second countdown protecting against accidental loss.
  • Zero Cloud Telemetry: Encrypted on-device local storage.

🔗 <span class="term-bold">Links:</span>
  • Web Showcase: <a href="https://rynia.github.io/KALANLA/" target="_blank" class="term-cyan">https://rynia.github.io/KALANLA/</a>
  • Play Store Beta: <a href="https://play.google.com/apps/testing/com.rynia.kalanla" target="_blank" class="term-cyan">Google Play Closed Testing</a>
`;
    }
  },

  guard: {
    desc: 'Simulate expo-release-guard pre-flight store safety scan',
    run: async () => {
      return `
<span class="term-dim">$ npx expo-release-guard --demo</span>
<span class="term-cyan">[DEMO MODE] Simulating pre-flight static audit on sample Expo SDK 52 project:</span>

[1/5] Checking Android versionCode & release tags... <span class="term-green">PASS</span> (versionCode: 1, v1.0.0)
[2/5] Auditing Apple Privacy Manifest (ITMS-91053)... <span class="term-green">PASS</span> (NSPrivacyAccessedAPITypes declared)
[3/5] Inspecting sensitive Android permissions... <span class="term-green">PASS</span> (0 dangerous permissions)
[4/5] Verifying EAS production build profiles... <span class="term-green">PASS</span> (autoIncrement: false)
[5/5] Scanning bundle for exposed credentials... <span class="term-green">PASS</span> (No EXPO_PUBLIC leaks)

==================================================
🛡️ <span class="term-green">EXPO RELEASE GUARD AUDIT: PASSED (Score: 10/10)</span>
Ready for Google Play Store & Apple App Store submission.
Run in your own repo: <span class="term-yellow">npx expo-release-guard</span>
==================================================
`;
    }
  },

  whoami: {
    desc: 'Print current session identity',
    run: () => `<span class="term-green">guest</span> @ <span class="term-cyan">rynia-studios</span> (ambient atelier explorer)`
  },

  sudo: {
    desc: 'Privilege escalation',
    run: () => `<span style="color:#ef4444">permission denied:</span> nice try! Guest sessions cannot escalate privileges in a local-first sandbox.`
  },

  rm: {
    desc: 'Remove files',
    run: () => `<span style="color:#ef4444">rm: operation prohibited:</span> This atelier operates on an append-only event log. Deletion is an illusion; use undo() instead.`
  },

  ping: {
    desc: 'Network ping test',
    run: () => `64 bytes from local-first: icmp_seq=1 ttl=64 <span class="term-green">time=0.042 ms</span> (100% offline, zero cloud latency)`
  },

  neofetch: {
    desc: 'System telemetry overview',
    run: () => {
      return `
<span class="term-cyan">       /\\        </span>  <span class="term-bold">rynia@studios-v1.0.0</span>
<span class="term-cyan">      /  \\       </span>  --------------------
<span class="term-cyan">     / /\\ \\      </span>  <span class="term-green">OS:</span> Rynia Ambient WebGL OS
<span class="term-cyan">    / /  \\ \\     </span>  <span class="term-green">Host:</span> Three.js Spatial Viewport
<span class="term-cyan">   / / /\\ \\ \\    </span>  <span class="term-green">Kernel:</span> local-first-kernel v1.0.0
<span class="term-cyan">  / / /  \\ \\ \\   </span>  <span class="term-green">Uptime:</span> 100% (Offline-Ready)
<span class="term-cyan"> /_/_/____\\_\\_\\  </span>  <span class="term-green">Shell:</span> Rynia CLI v1.0.0
<span class="term-cyan"> \\_\\_\\____/_/_/  </span>  <span class="term-green">Theme:</span> Dark Obsidian Titanium (#090A0F)
                 <span class="term-green">Architect:</span> Muharrem Özmen (@Rynia)
`;
    }
  },

  receipt: {
    desc: 'Render procedurally generated thermal receipt',
    run: () => {
      return `
<span class="term-dim">+----------------------------------------+</span>
|            <span class="term-bold">RYNIA ATELIER RECEIPT</span>       |
|          -------------------------     |
| Order: #RYN-8849       Date: 2026-09-26|
| Terminal: WebGL-01     Auth: LOCAL-FIRST|
+----------------------------------------+
| ITEM                     QTY     PRICE |
| -------------------------------------- |
| local-first-kernel         1     $0.00 |
| expo-release-guard         1     $0.00 |
| receipt-renderer           1     $0.00 |
| KALANLA Kitchen OS         1     $0.00 |
+----------------------------------------+
| TOTAL SAVINGS:                 $142.50 |
| CARBON OFFSET:                  4.8 kg |
+----------------------------------------+
|   ||| | ||||| ||| |||| || |||| |||||   |
|               RYN-8849-OK              |
+----------------------------------------+
<span class="term-dim">* Rendered via receipt-renderer AST Engine *</span>
`;
    }
  },

  kernel: {
    desc: 'Local-first reactive micro-kernel info',
    run: () => {
      return `
<span class="term-bold">LOCAL-FIRST KERNEL ENGINE:</span>
Zero-dependency event log architecture.

<code>
const kernel = new Kernel({ version: 1, items: [] });
kernel.dispatch({ type: 'PANTRY_ITEM_ADD', payload: { name: 'Sourdough Bread' } });
console.log(kernel.getState()); // Reactive, immutable snapshot
kernel.undo(); // Deterministic step reversal
</code>

Repository: <a href="https://github.com/Rynia/local-first-kernel" target="_blank" class="term-cyan">github.com/Rynia/local-first-kernel</a>
`;
    }
  },

  github: {
    desc: 'Open GitHub profile',
    run: () => {
      window.open('https://github.com/Rynia', '_blank');
      return `<span class="term-green">Opening https://github.com/Rynia in a new tab...</span>`;
    }
  },

  clear: {
    desc: 'Clear the terminal output',
    run: () => '__CLEAR__'
  },

  exit: {
    desc: 'Close terminal HUD',
    run: () => '__EXIT__'
  }
};

export function initTerminal(): void {
  // Inject Terminal DOM into body if not already present
  if (document.getElementById('terminalModalOverlay')) return;

  const overlay = document.createElement('div');
  overlay.id = 'terminalModalOverlay';
  overlay.className = 'terminal-modal-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Rynia Studios Developer Terminal');

  overlay.innerHTML = `
    <div class="terminal-window" id="terminalWindow">
      <div class="terminal-header">
        <div class="terminal-dots">
          <span class="terminal-dot dot-red" id="termCloseBtn" title="Close (Esc)"></span>
          <span class="terminal-dot dot-yellow" id="termMinimizeBtn" title="Minimize"></span>
          <span class="terminal-dot dot-green" id="termMaximizeBtn" title="Clear (clear)"></span>
        </div>
        <div class="terminal-title">rynia@studios-cli: ~</div>
        <div class="terminal-hint">Press [Esc] or type 'exit'</div>
      </div>
      <div class="terminal-body" id="terminalBody">
        <div class="term-ascii">${ASCII_BANNER}</div>
        <div id="terminalHistory"></div>
        <div class="terminal-input-row">
          <span class="terminal-prompt">guest@rynia:~$</span>
          <input type="text" class="terminal-input" id="terminalInput" autocomplete="off" spellcheck="false" placeholder="type 'help'..." />
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  // Bind Open Trigger in Navigation Header
  const headerControls = document.querySelector('.header-controls');
  if (headerControls && !document.getElementById('terminalTrigger')) {
    const triggerBtn = document.createElement('button');
    triggerBtn.id = 'terminalTrigger';
    triggerBtn.className = 'terminal-trigger';
    triggerBtn.setAttribute('aria-label', 'Open Rynia CLI');
    triggerBtn.setAttribute('title', 'Press ~ or T to toggle CLI');
    triggerBtn.innerHTML = `
      <span class="terminal-icon">&gt;_</span>
      <span class="terminal-label">CLI</span>
    `;
    // Insert before language toggle
    headerControls.insertBefore(triggerBtn, headerControls.firstChild);

    triggerBtn.addEventListener('click', () => toggleTerminal(true));
  }

  // References
  const input = document.getElementById('terminalInput') as HTMLInputElement | null;
  const historyContainer = document.getElementById('terminalHistory');
  const body = document.getElementById('terminalBody');
  const closeBtn = document.getElementById('termCloseBtn');
  const clearBtn = document.getElementById('termMaximizeBtn');

  const history: string[] = [];
  let historyIndex = -1;

  function toggleTerminal(open?: boolean): void {
    const isActive = overlay.classList.contains('is-active');
    const shouldOpen = open !== undefined ? open : !isActive;

    if (shouldOpen) {
      overlay.classList.add('is-active');
      setTimeout(() => input?.focus(), 100);
    } else {
      overlay.classList.remove('is-active');
    }
  }

  closeBtn?.addEventListener('click', () => toggleTerminal(false));
  clearBtn?.addEventListener('click', () => {
    if (historyContainer) historyContainer.innerHTML = '';
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) toggleTerminal(false);
  });

  // Global Keyboard shortcuts (~ or T to toggle, Esc to close)
  window.addEventListener('keydown', (e) => {
    const targetTag = (e.target as HTMLElement)?.tagName?.toLowerCase();
    const isTyping = targetTag === 'input' || targetTag === 'textarea';

    if (e.key === 'Escape') {
      if (overlay.classList.contains('is-active')) {
        toggleTerminal(false);
      }
    } else if ((e.key === '`' || e.key === '~' || (e.key === 't' && !e.ctrlKey && !e.metaKey)) && !isTyping) {
      e.preventDefault();
      toggleTerminal();
    }
  });

  // Terminal Input Execution
  input?.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter') {
      const rawCmd = input.value.trim();
      input.value = '';

      if (!rawCmd) return;

      history.push(rawCmd);
      historyIndex = history.length;

      const [cmdName, ...args] = rawCmd.toLowerCase().split(/\s+/);

      // Render executed command row
      const cmdRow = document.createElement('div');
      cmdRow.className = 'terminal-output-block';
      cmdRow.innerHTML = `<span class="terminal-prompt">guest@rynia:~$</span> <span class="term-bold">${escapeHtml(rawCmd)}</span>`;
      historyContainer?.appendChild(cmdRow);

      // Execute command
      const cmd = COMMANDS[cmdName];
      if (cmd) {
        const result = await cmd.run(args);
        if (result === '__CLEAR__') {
          if (historyContainer) historyContainer.innerHTML = '';
        } else if (result === '__EXIT__') {
          toggleTerminal(false);
        } else {
          const output = document.createElement('div');
          output.className = 'terminal-output-line';
          output.innerHTML = result;
          historyContainer?.appendChild(output);
        }
      } else {
        const err = document.createElement('div');
        err.className = 'terminal-output-line';
        err.innerHTML = `<span style="color:#ef4444">zsh: command not found: ${escapeHtml(rawCmd)}</span>. Type '<span class="term-green">help</span>' for a list of commands.`;
        historyContainer?.appendChild(err);
      }

      body?.scrollTo({ top: body.scrollHeight, behavior: 'smooth' });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        input.value = history[historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        historyIndex++;
        input.value = history[historyIndex];
      } else {
        historyIndex = history.length;
        input.value = '';
      }
    }
  });

  // Keep focus on click anywhere inside terminal body
  body?.addEventListener('click', () => {
    input?.focus();
  });
}

function escapeHtml(str: string): string {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}
