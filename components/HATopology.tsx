"use client";

const nodes = [
  { id: "wan", x: 24, y: 126, width: 136, title: "WAN / upstream", meta: "internet edge", tone: "neutral" },
  { id: "active", x: 230, y: 70, width: 154, title: "NGFW 01", meta: "active · VIP owner", tone: "active" },
  { id: "standby", x: 230, y: 182, width: 154, title: "NGFW 02", meta: "standby · ready", tone: "standby" },
  { id: "core", x: 476, y: 126, width: 150, title: "Core / L3", meta: "switching plane", tone: "core" },
  { id: "lan", x: 704, y: 126, width: 132, title: "Protected LAN", meta: "10.0.10.0/24", tone: "lan" },
] as const;

const portraitNodes = [
  { id: "portrait-wan", x: 30, y: 16, width: 300, title: "WAN / upstream", meta: "internet edge", tone: "neutral" },
  { id: "portrait-active", x: 18, y: 124, width: 150, title: "NGFW 01", meta: "active · VIP", tone: "active" },
  { id: "portrait-standby", x: 192, y: 124, width: 150, title: "NGFW 02", meta: "standby · ready", tone: "standby" },
  { id: "portrait-core", x: 30, y: 300, width: 300, title: "Core / L3", meta: "switching plane", tone: "core" },
  { id: "portrait-lan", x: 30, y: 436, width: 300, title: "Protected LAN", meta: "10.0.10.0/24", tone: "lan" },
] as const;

export default function HATopology() {
  return (
    <div className="ha-topology" aria-labelledby="ha-topology-heading">
      <div className="ha-topology__header">
        <div>
          <span className="eyebrow">High availability / topology</span>
          <h3 id="ha-topology-heading">One path, two gateways.</h3>
        </div>
        <span className="ha-topology__live"><i /> VRRP / healthy</span>
      </div>

      <svg className="ha-topology__svg ha-topology__desktop-svg" viewBox="0 0 860 300" role="img" aria-label="High availability network topology showing active and standby firewalls, VRRP synchronization, core switching, and protected LAN">
        <defs>
          <linearGradient id="ha-active-line" x1="0" x2="1">
            <stop offset="0" stopColor="#d4c7a5" stopOpacity=".3" />
            <stop offset="1" stopColor="#a9c7bf" stopOpacity=".9" />
          </linearGradient>
          <filter id="ha-glow"><feGaussianBlur stdDeviation="3" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        </defs>

        <g className="ha-topology__grid" aria-hidden="true">
          <path d="M0 54H860M0 150H860M0 246H860" />
          <path d="M205 0V300M432 0V300M660 0V300" />
        </g>

        <g className="ha-topology__edges" aria-hidden="true">
          <path className="ha-topology__edge ha-topology__edge--active" d="M160 150C192 150 192 97 230 97" />
          <path className="ha-topology__edge ha-topology__edge--standby" d="M160 150C192 150 192 209 230 209" />
          <path className="ha-topology__edge ha-topology__edge--active" d="M384 97C428 97 436 153 476 153" />
          <path className="ha-topology__edge ha-topology__edge--standby" d="M384 209C428 209 436 153 476 153" />
          <path className="ha-topology__edge ha-topology__edge--core" d="M626 153H704" />
          <path className="ha-topology__sync" d="M307 124V182" />
        </g>

        <g className="ha-topology__sync-label">
          <rect x="322" y="137" width="88" height="26" rx="13" />
          <text x="337" y="153">VRRP · SYNC</text>
        </g>

        <circle className="ha-topology__packet ha-topology__packet--active" cx="0" cy="0" r="3" filter="url(#ha-glow)">
          <animateMotion dur="6.6s" repeatCount="indefinite" path="M160 150C192 150 192 97 230 97C428 97 436 153 476 153H704" />
          <animate attributeName="opacity" dur="6.6s" repeatCount="indefinite" values="0;1;1;0" keyTimes="0;.08;.86;1" />
        </circle>
        <circle className="ha-topology__packet ha-topology__packet--return" cx="0" cy="0" r="2.7" filter="url(#ha-glow)">
          <animateMotion dur="7.2s" begin="1.4s" repeatCount="indefinite" path="M704 153H476C436 153 428 97 384 97C192 97 192 150 160 150" />
          <animate attributeName="opacity" dur="7.2s" begin="1.4s" repeatCount="indefinite" values="0;0;1;1;0" keyTimes="0;.12;.2;.88;1" />
        </circle>

        {nodes.map((node) => (
          <g className={`ha-topology__node ha-topology__node--${node.tone}`} key={node.id} transform={`translate(${node.x} ${node.y})`}>
            <rect width={node.width} height="48" rx="2" />
            <circle className="ha-topology__node-dot" cx="14" cy="16" r="4" />
            <text className="ha-topology__node-title" x="27" y="19">{node.title}</text>
            <text className="ha-topology__node-meta" x="27" y="35">{node.meta}</text>
          </g>
        ))}

        <text className="ha-topology__annotation" x="230" y="58">ACTIVE / PASSIVE CLUSTER</text>
        <text className="ha-topology__annotation" x="704" y="116">SEGMENTED EGRESS</text>
      </svg>

      <svg className="ha-topology__svg ha-topology__portrait-svg" viewBox="0 0 360 520" role="img" aria-label="Portrait high availability network topology with parallel active and standby firewalls, core switching, protected LAN, and animated traffic flow">
        <defs>
          <linearGradient id="ha-portrait-active-line" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#d4c7a5" stopOpacity=".3" />
            <stop offset="1" stopColor="#a9c7bf" stopOpacity=".9" />
          </linearGradient>
          <filter id="ha-portrait-glow"><feGaussianBlur stdDeviation="3" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        </defs>

        <g className="ha-topology__grid" aria-hidden="true">
          <path d="M0 82H360M0 260H360M0 420H360" />
          <path d="M90 0V520M270 0V520" />
        </g>

        <g className="ha-topology__edges" aria-hidden="true">
          <path className="ha-topology__edge ha-topology__edge--active" d="M180 64C180 96 93 96 93 124" />
          <path className="ha-topology__edge ha-topology__edge--standby" d="M180 64C180 96 267 96 267 124" />
          <path className="ha-topology__edge ha-topology__edge--active" d="M93 172C93 236 180 236 180 300" />
          <path className="ha-topology__edge ha-topology__edge--standby" d="M267 172C267 236 180 236 180 300" />
          <path className="ha-topology__edge ha-topology__edge--core" d="M180 348V436" />
          <path className="ha-topology__sync" d="M168 148H192" />
        </g>

        <g className="ha-topology__sync-label">
          <rect x="124" y="185" width="112" height="26" rx="13" />
          <text x="136" y="201">VRRP · SYNC</text>
        </g>

        <circle className="ha-topology__packet ha-topology__packet--active" cx="0" cy="0" r="3" filter="url(#ha-portrait-glow)">
          <animateMotion dur="6.6s" repeatCount="indefinite" path="M180 64C180 96 93 96 93 124V172C93 236 180 236 180 300V348V436" />
          <animate attributeName="opacity" dur="6.6s" repeatCount="indefinite" values="0;1;1;0" keyTimes="0;.08;.86;1" />
        </circle>
        <circle className="ha-topology__packet ha-topology__packet--return" cx="0" cy="0" r="2.7" filter="url(#ha-portrait-glow)">
          <animateMotion dur="7.2s" begin="1.4s" repeatCount="indefinite" path="M180 484V436V348V300C180 236 93 236 93 172V124C93 96 180 96 180 64" />
          <animate attributeName="opacity" dur="7.2s" begin="1.4s" repeatCount="indefinite" values="0;0;1;1;0" keyTimes="0;.12;.2;.88;1" />
        </circle>

        {portraitNodes.map((node) => (
          <g className={`ha-topology__node ha-topology__node--${node.tone}`} key={node.id} transform={`translate(${node.x} ${node.y})`}>
            <rect width={node.width} height="48" rx="2" />
            <circle className="ha-topology__node-dot" cx="14" cy="16" r="4" />
            <text className="ha-topology__node-title" x="27" y="19">{node.title}</text>
            <text className="ha-topology__node-meta" x="27" y="35">{node.meta}</text>
          </g>
        ))}

        <text className="ha-topology__annotation" x="18" y="110">PARALLEL HA FIREWALLS</text>
        <text className="ha-topology__annotation" x="30" y="423">SEGMENTED EGRESS</text>
      </svg>

      <div className="ha-topology__footer">
        <span><i className="ha-key ha-key--active" /> active traffic</span>
        <span><i className="ha-key ha-key--standby" /> failover path</span>
        <strong>840ms last measured transition</strong>
      </div>
    </div>
  );
}
