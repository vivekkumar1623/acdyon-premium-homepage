export const SCENARIOS = [
  {
    id: 'linkedin-jobs',
    name: 'LinkedIn / Workday Careers',
    targetUrl: 'https://careers.techcorp.io/api/v2/jobs/401928',
    targetCategory: 'High TLS & Headless Bot Defense',
    targetDefense: 'Akamai Bot Manager & JA4 Inspection',
    description: 'Aggressive TLS ClientHello fingerprint matching and HTTP/2 stream inspection.',
    directResult: {
      status: 403,
      statusText: 'Forbidden (Bot Challenge)',
      latency: '412ms',
      ja4: 't13d0300h2_unknown (Headless Node/cURL)',
      ipStatus: 'Flagged (Egress Subnet Burned)',
      driftStatus: 'N/A (Request Aborted)',
      payload: null,
      terminalLogs: [
        '[0.00ms] Outgoing GET https://careers.techcorp.io/api/v2/jobs/401928',
        '[12.4ms] TLS Handshake: CipherSuite mismatch (Go/Python default ClientHello detected)',
        '[48.1ms] JA4 Hash: t13d0300h2_000000000000 (Blacklisted automation pattern)',
        '[189.2ms] Akamai WAF: Fingerprint challenge triggered',
        '[412.0ms] HTTP 403 Forbidden: "Automated activity detected. CAPTCHA required."'
      ],
      errorMessage: 'Extraction Pipeline Terminated. IP flagged for 3600s cooldown.'
    },
    pulseGuardResult: {
      status: 200,
      statusText: 'OK (Verified Stream)',
      latency: '184ms',
      edgeOverhead: '+3.2ms',
      ja4: 't13d1516h2_8daaf6152771_000000000000 (Chrome 128 / macOS)',
      ipStatus: 'Residential Tier-1 (Frankfurt AS3209)',
      driftStatus: 'Clean (100% Selector Match)',
      terminalLogs: [
        '[0.00ms] Proxy Ingest: GET https://careers.techcorp.io/api/v2/jobs/401928',
        '[1.80ms] PulseGuard Egress: Applied macOS Chrome 128 TLS ClientHello & H2 frames',
        '[4.20ms] Routed through residential egress node (DE-FRA-094)',
        '[62.1ms] Target Handshake: 200 OK (Bypassed Akamai sensor without CAPTCHA)',
        '[184.0ms] Schema Validator: 6/6 fields extracted cleanly. Emitted JSON payload.'
      ],
      payload: {
        job_id: "JOB-401928",
        title: "Senior Distributed Systems Engineer",
        company: "Vanguard Tech Systems",
        location: "Berlin, Germany (Hybrid)",
        salary: "€95,000 - €125,000",
        posted_at: "2026-08-18T14:20:00Z",
        experience_level: "Senior",
        skills_required: ["Go", "Kubernetes", "Kafka", "PostgreSQL", "TLS/JA4"],
        telemetry: {
          egress_region: "eu-central-1",
          proxy_latency_ms: 3.2,
          retry_count: 0
        }
      }
    }
  },
  {
    id: 'ecommerce-catalog',
    name: 'Hardware E-Commerce Catalog',
    targetUrl: 'https://store.hardwarehub.com/p/rtx-5090-oc',
    targetCategory: 'Silent DOM & Selector Drift',
    targetDefense: 'Dynamic Class Hashing Overnight',
    description: 'Target site mutated CSS class names overnight, causing standard scrapers to return empty fields silently.',
    directResult: {
      status: 200,
      statusText: 'OK (Corrupted Payload)',
      latency: '240ms',
      ja4: 't13d1516h2_standard',
      ipStatus: 'Clean',
      driftStatus: 'CRITICAL: 2 Fields Missing (Silent Fail)',
      terminalLogs: [
        '[0.00ms] Outgoing GET https://store.hardwarehub.com/p/rtx-5090-oc',
        '[110.0ms] HTTP 200 OK received',
        '[122.0ms] Parser matching selector: div.product-title-v2 -> MATCHED',
        '[125.0ms] Parser matching selector: span.price-curr-x9b2 -> NOT FOUND (0 nodes)',
        '[128.0ms] Parser matching selector: div.stock-badge-live -> NOT FOUND (0 nodes)',
        '[240.0ms] Emitted corrupted JSON to database with NULL values!'
      ],
      payload: {
        sku: "RTX-5090-OC",
        title: "GeForce RTX 5090 32GB OC Edition",
        price: null,
        currency: null,
        in_stock: false,
        warning: "Silent data corruption: price & stock missing due to selector drift"
      },
      errorMessage: 'Downstream database corrupted with null prices. Alert triggered 8 hours later.'
    },
    pulseGuardResult: {
      status: 200,
      statusText: 'OK (Auto-Healed AST)',
      latency: '248ms',
      edgeOverhead: '+4.1ms',
      ja4: 't13d1516h2_safari17',
      ipStatus: 'Clean Egress',
      driftStatus: 'Healed: 2 Selectors Synthesized',
      terminalLogs: [
        '[0.00ms] Proxy Ingest: GET https://store.hardwarehub.com/p/rtx-5090-oc',
        '[114.0ms] HTTP 200 OK received from target',
        '[122.0ms] DOM Drift Guard: Expected .price-curr-x9b2 missing (target deployed obfuscated classes)',
        '[129.0ms] AST Structural Fallback: Located currency node via proximity heuristics',
        '[134.0ms] Synthesized patch rule: [data-testid="live-price"] -> value "$1,999.00"',
        '[248.0ms] Verified schema integrity. Emitted 100% complete payload.'
      ],
      payload: {
        sku: "RTX-5090-OC",
        title: "GeForce RTX 5090 32GB OC Edition",
        price: "$1,999.00",
        currency: "USD",
        in_stock: true,
        stock_count: 14,
        drift_recovery: {
          original_rule: "span.price-curr-x9b2",
          healed_rule: "[data-testid=\"live-price\"]",
          confidence: 0.994,
          patch_logged: true
        }
      }
    }
  },
  {
    id: 'financial-registry',
    name: 'Public Regulatory & SEC Registry',
    targetUrl: 'https://data.registry.gov/cgi-bin/filings/search',
    targetCategory: 'IP Rate Limiting & Burst Caps',
    targetDefense: 'Strict 10 req/sec Hard Ban Rule',
    description: 'Subnet-wide rate-limit enforcement with automatic 24-hour IP blacklisting.',
    directResult: {
      status: 429,
      statusText: 'Too Many Requests',
      latency: '82ms',
      ja4: 't13d0100h2_curl',
      ipStatus: 'Banned (Subnet Blacklist 24h)',
      driftStatus: 'N/A',
      terminalLogs: [
        '[0.00ms] Outgoing POST /cgi-bin/filings/search (Burst req #12)',
        '[42.0ms] Gateway rate limit threshold exceeded (>10 req/s)',
        '[82.0ms] HTTP 429 Too Many Requests. Retry-After: 86400',
        '[82.1ms] Subnet 198.51.100.0/24 added to IP blocklist.'
      ],
      payload: null,
      errorMessage: 'Pipeline paralyzed. All scraper workers blocked on target domain.'
    },
    pulseGuardResult: {
      status: 200,
      statusText: 'OK (Leaky-Bucket Paced)',
      latency: '142ms',
      edgeOverhead: '+2.8ms',
      ja4: 't13d1516h2_firefox126',
      ipStatus: 'Distributed Pool (Round-Robin 8 Nodes)',
      driftStatus: 'Clean',
      terminalLogs: [
        '[0.00ms] Proxy Ingest: POST /cgi-bin/filings/search (Incoming burst: 45 req/s)',
        '[1.20ms] Leaky-Bucket Queue: Paced egress requests to 8.5 req/s per node',
        '[3.10ms] Egress Dispatch: Distributed across 8 isolated clean nodes',
        '[88.0ms] Target Handshake: 200 OK on all 8 streams',
        '[142.0ms] Aggregated response stream delivered with zero 429 errors.'
      ],
      payload: {
        filing_id: "0001018724-26-000042",
        entity_name: "CYBERDYNE LOGISTICS CORP",
        form_type: "10-Q (Quarterly Report)",
        period_end: "2026-06-30",
        filing_date: "2026-08-17",
        pacing_metrics: {
          burst_input_rate: "45 req/s",
          gateway_egress_rate: "8.4 req/s (Safe Margin)",
          dropped_requests: 0
        }
      }
    }
  }
];

export const CODE_SNIPPETS = {
  curl: {
    language: 'bash',
    filename: 'terminal.sh',
    code: `# Standard cURL command with PulseGuard gateway
curl -x http://gateway.pulseguard.dev:8080 \\
  -H "X-Pulse-Key: pg_live_e93a7c1f8204" \\
  -H "X-Pulse-Profile: chrome-macOS" \\
  -H "X-Pulse-Heal: true" \\
  "https://careers.techcorp.io/api/v2/jobs/401928"`
  },
  python: {
    language: 'python',
    filename: 'scraper.py',
    code: `import httpx

# Route your existing scrapers through PulseGuard
PROXIES = {
    "all://": "http://pg_live_e93a7c1f8204@gateway.pulseguard.dev:8080"
}

with httpx.Client(proxies=PROXIES, timeout=10.0) as client:
    # PulseGuard auto-negotiates JA4 TLS, proxy rotation, and AST drift recovery
    response = client.get(
        "https://careers.techcorp.io/api/v2/jobs/401928",
        headers={"X-Pulse-Profile": "chrome-macOS"}
    )
    
    print("Status:", response.status_code) # 200 OK
    print("Extracted Data:", response.json())`
  },
  node: {
    language: 'javascript',
    filename: 'extractor.js',
    code: `import { chromium } from 'playwright';

// Drop-in proxy support for Playwright / Puppeteer
const browser = await chromium.launch({
  proxy: {
    server: 'http://gateway.pulseguard.dev:8080',
    username: 'pg_live_e93a7c1f8204',
    password: 'auto'
  }
});

const page = await browser.newPage();
await page.goto('https://store.hardwarehub.com/p/rtx-5090-oc');

// Even if target classes mutated overnight, PulseGuard returns normalized DOM
const product = await page.evaluate(() => window.__PULSE_EXTRACTED__);
console.log(product);`
  },
  go: {
    language: 'go',
    filename: 'crawler.go',
    code: `package main

import (
	"fmt"
	"net/http"
	"net/url"
)

func main() {
	proxyURL, _ := url.Parse("http://pg_live_e93a7c1f8204@gateway.pulseguard.dev:8080")
	client := &http.Client{
		Transport: &http.Transport{Proxy: http.ProxyURL(proxyURL)},
	}

	req, _ := http.NewRequest("GET", "https://careers.techcorp.io/api/v2/jobs/401928", nil)
	req.Header.Set("X-Pulse-Profile", "chrome-macOS")

	resp, err := client.Do(req)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	fmt.Println("Egress Response Code:", resp.StatusCode)
}`
  }
};

export const SPECS_DATA = [
  {
    category: "TLS / Egress Fingerprinting",
    feature: "JA4 / JA3 Signature Cycling",
    pulseGuard: "Per-request randomized ClientHello, matching valid macOS/Windows browser TLS stacks",
    rawScrapers: "Fixed Go/Python/cURL TLS fingerprints flagged by modern WAFs within 3 requests"
  },
  {
    category: "HTTP/2 Protocol Frames",
    feature: "SETTINGS & WINDOW_UPDATE Mimicry",
    pulseGuard: "Real browser frame sequence negotiation with exact pseudomagic header ordering",
    rawScrapers: "Standard Go/Node HTTP/2 frames with robotic static priorities"
  },
  {
    category: "Resilience & Schema Drift",
    feature: "DOM AST Mutation Self-Healing",
    pulseGuard: "Proximity & semantic AST fallback parser that repairs broken CSS selectors on the fly",
    rawScrapers: "Silent extraction failure; returns null/empty values and corrupts databases"
  },
  {
    category: "Pacing & Rate Management",
    feature: "Adaptive Leaky-Bucket Distributed Pacing",
    pulseGuard: "Automatic backoff & round-robin circuit splitting across residential pools",
    rawScrapers: "Hard burst hits causing 429 Too Many Requests and subnet bans"
  },
  {
    category: "Infrastructure Overhead",
    feature: "Edge Stream Inspection Latency",
    pulseGuard: "< 3.8ms median gateway latency; zero headless browser memory bloat",
    rawScrapers: "500MB+ RAM per Chromium instance; 1.5s - 4.0s startup latency"
  }
];
