import type { Assets } from "./types";

function loadSvgImage(svgString: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
  });
}

// ─── Kitten (hungry, side-facing) ───────────────────────────────────────────

const KITTEN_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
  <!-- Tail -->
  <path d="M48 38 C54 36, 58 28, 54 22" fill="none" stroke="#E8820C" stroke-width="3" stroke-linecap="round"/>
  <!-- Body -->
  <ellipse cx="32" cy="42" rx="16" ry="12" fill="#F5A623"/>
  <!-- Tabby stripes on body -->
  <path d="M22 36 Q28 34 34 36" fill="none" stroke="#E8820C" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M20 40 Q28 38 36 40" fill="none" stroke="#E8820C" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M21 44 Q28 42 35 44" fill="none" stroke="#E8820C" stroke-width="1.5" stroke-linecap="round"/>
  <!-- Front legs -->
  <rect x="22" y="50" width="5" height="8" rx="2" fill="#F5A623"/>
  <rect x="30" y="50" width="5" height="8" rx="2" fill="#F5A623"/>
  <!-- Back leg -->
  <rect x="40" y="50" width="5" height="8" rx="2" fill="#E8960C"/>
  <!-- Paws -->
  <ellipse cx="24.5" cy="58" rx="3.5" ry="2" fill="#FBBF6A"/>
  <ellipse cx="32.5" cy="58" rx="3.5" ry="2" fill="#FBBF6A"/>
  <ellipse cx="42.5" cy="58" rx="3.5" ry="2" fill="#FBBF6A"/>
  <!-- Head -->
  <circle cx="24" cy="26" r="14" fill="#F5A623"/>
  <!-- Left ear -->
  <polygon points="13,18 10,4 20,14" fill="#F5A623"/>
  <polygon points="14,16 12,7 19,14" fill="#FFB0C4"/>
  <!-- Right ear -->
  <polygon points="35,18 38,4 28,14" fill="#F5A623"/>
  <polygon points="34,16 36,7 29,14" fill="#FFB0C4"/>
  <!-- Tabby forehead stripes -->
  <path d="M20 18 L24 14" fill="none" stroke="#E8820C" stroke-width="1.2" stroke-linecap="round"/>
  <path d="M24 18 L24 13" fill="none" stroke="#E8820C" stroke-width="1.2" stroke-linecap="round"/>
  <path d="M28 18 L24 14" fill="none" stroke="#E8820C" stroke-width="1.2" stroke-linecap="round"/>
  <!-- Eyes -->
  <ellipse cx="18" cy="26" rx="4" ry="4.5" fill="white"/>
  <ellipse cx="30" cy="26" rx="4" ry="4.5" fill="white"/>
  <ellipse cx="19" cy="26" rx="2.5" ry="3" fill="#2D8C3C"/>
  <ellipse cx="31" cy="26" rx="2.5" ry="3" fill="#2D8C3C"/>
  <circle cx="19" cy="25.5" r="1.5" fill="black"/>
  <circle cx="31" cy="25.5" r="1.5" fill="black"/>
  <!-- Eye shine -->
  <circle cx="20" cy="24.5" r="0.8" fill="white"/>
  <circle cx="32" cy="24.5" r="0.8" fill="white"/>
  <!-- Nose -->
  <ellipse cx="24" cy="31" rx="2" ry="1.5" fill="#FF8BA7"/>
  <!-- Open mouth (hungry!) -->
  <path d="M21 33 Q24 38 27 33" fill="#FF4D6A" stroke="#D94060" stroke-width="0.5"/>
  <!-- Tongue -->
  <ellipse cx="24" cy="35" rx="1.5" ry="1" fill="#FF8BA7"/>
  <!-- Whiskers left -->
  <line x1="4" y1="28" x2="15" y2="29" stroke="#D4881A" stroke-width="0.7" stroke-linecap="round"/>
  <line x1="4" y1="32" x2="15" y2="31" stroke="#D4881A" stroke-width="0.7" stroke-linecap="round"/>
  <line x1="5" y1="25" x2="15" y2="27" stroke="#D4881A" stroke-width="0.7" stroke-linecap="round"/>
  <!-- Whiskers right -->
  <line x1="33" y1="29" x2="44" y2="28" stroke="#D4881A" stroke-width="0.7" stroke-linecap="round"/>
  <line x1="33" y1="31" x2="44" y2="32" stroke="#D4881A" stroke-width="0.7" stroke-linecap="round"/>
  <line x1="33" y1="27" x2="43" y2="25" stroke="#D4881A" stroke-width="0.7" stroke-linecap="round"/>
</svg>`;

// ─── Kitten with Chef Hat ───────────────────────────────────────────────────

const KITTEN_CHEF_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
  <!-- Tail -->
  <path d="M48 46 C54 44, 58 36, 54 30" fill="none" stroke="#E8820C" stroke-width="3" stroke-linecap="round"/>
  <!-- Body -->
  <ellipse cx="32" cy="50" rx="16" ry="10" fill="#F5A623"/>
  <!-- Tabby stripes on body -->
  <path d="M22 46 Q28 44 34 46" fill="none" stroke="#E8820C" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M20 50 Q28 48 36 50" fill="none" stroke="#E8820C" stroke-width="1.5" stroke-linecap="round"/>
  <!-- Legs -->
  <rect x="22" y="56" width="5" height="6" rx="2" fill="#F5A623"/>
  <rect x="30" y="56" width="5" height="6" rx="2" fill="#F5A623"/>
  <rect x="40" y="56" width="5" height="6" rx="2" fill="#E8960C"/>
  <!-- Paws -->
  <ellipse cx="24.5" cy="62" rx="3.5" ry="2" fill="#FBBF6A"/>
  <ellipse cx="32.5" cy="62" rx="3.5" ry="2" fill="#FBBF6A"/>
  <ellipse cx="42.5" cy="62" rx="3.5" ry="2" fill="#FBBF6A"/>
  <!-- Head -->
  <circle cx="24" cy="36" r="13" fill="#F5A623"/>
  <!-- Left ear peeking from hat -->
  <polygon points="13,28 11,20 18,26" fill="#F5A623"/>
  <polygon points="14,27 12,22 17,26" fill="#FFB0C4"/>
  <!-- Right ear peeking from hat -->
  <polygon points="35,28 37,20 30,26" fill="#F5A623"/>
  <polygon points="34,27 36,22 31,26" fill="#FFB0C4"/>
  <!-- Chef hat band -->
  <rect x="10" y="20" width="28" height="4" rx="1" fill="#F0F0F0" stroke="#DDDDDD" stroke-width="0.5"/>
  <!-- Chef hat puff -->
  <ellipse cx="24" cy="12" rx="14" ry="11" fill="white" stroke="#E8E8E8" stroke-width="0.5"/>
  <circle cx="16" cy="14" r="6" fill="white"/>
  <circle cx="32" cy="14" r="6" fill="white"/>
  <circle cx="24" cy="8" r="7" fill="white"/>
  <!-- Hat highlight -->
  <ellipse cx="22" cy="7" rx="4" ry="2" fill="#FFFFFF" opacity="0.6"/>
  <!-- Tabby forehead stripes -->
  <path d="M20 30 L24 27" fill="none" stroke="#E8820C" stroke-width="1.2" stroke-linecap="round"/>
  <path d="M24 30 L24 26" fill="none" stroke="#E8820C" stroke-width="1.2" stroke-linecap="round"/>
  <path d="M28 30 L24 27" fill="none" stroke="#E8820C" stroke-width="1.2" stroke-linecap="round"/>
  <!-- Eyes (happy/proud) -->
  <ellipse cx="18" cy="36" rx="4" ry="4.5" fill="white"/>
  <ellipse cx="30" cy="36" rx="4" ry="4.5" fill="white"/>
  <ellipse cx="19" cy="36" rx="2.5" ry="3" fill="#2D8C3C"/>
  <ellipse cx="31" cy="36" rx="2.5" ry="3" fill="#2D8C3C"/>
  <circle cx="19" cy="35.5" r="1.5" fill="black"/>
  <circle cx="31" cy="35.5" r="1.5" fill="black"/>
  <!-- Eye shine -->
  <circle cx="20" cy="34.5" r="0.8" fill="white"/>
  <circle cx="32" cy="34.5" r="0.8" fill="white"/>
  <!-- Happy blush -->
  <ellipse cx="14" cy="39" rx="2.5" ry="1.5" fill="#FFAAAA" opacity="0.5"/>
  <ellipse cx="34" cy="39" rx="2.5" ry="1.5" fill="#FFAAAA" opacity="0.5"/>
  <!-- Nose -->
  <ellipse cx="24" cy="40" rx="2" ry="1.5" fill="#FF8BA7"/>
  <!-- Happy smile -->
  <path d="M20 42 Q24 46 28 42" fill="none" stroke="#D94060" stroke-width="1.2" stroke-linecap="round"/>
  <!-- Whiskers left -->
  <line x1="4" y1="38" x2="15" y2="39" stroke="#D4881A" stroke-width="0.7" stroke-linecap="round"/>
  <line x1="4" y1="42" x2="15" y2="41" stroke="#D4881A" stroke-width="0.7" stroke-linecap="round"/>
  <!-- Whiskers right -->
  <line x1="33" y1="39" x2="44" y2="38" stroke="#D4881A" stroke-width="0.7" stroke-linecap="round"/>
  <line x1="33" y1="41" x2="44" y2="42" stroke="#D4881A" stroke-width="0.7" stroke-linecap="round"/>
</svg>`;

// ─── Fish ───────────────────────────────────────────────────────────────────

const FISH_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <!-- Tail fin -->
  <polygon points="3,10 0,4 0,26 3,20" fill="#0099CC"/>
  <!-- Body -->
  <ellipse cx="16" cy="16" rx="13" ry="9" fill="#00BCD4"/>
  <!-- Belly highlight -->
  <ellipse cx="16" cy="19" rx="9" ry="5" fill="#4DD9E8"/>
  <!-- Dorsal fin -->
  <path d="M14 7 Q18 2 22 7" fill="#0099CC"/>
  <!-- Bottom fin -->
  <path d="M14 25 Q16 29 19 25" fill="#0099CC"/>
  <!-- Scale suggestions -->
  <path d="M10 13 Q13 11 16 13" fill="none" stroke="#00A5B8" stroke-width="0.6" opacity="0.6"/>
  <path d="M14 16 Q17 14 20 16" fill="none" stroke="#00A5B8" stroke-width="0.6" opacity="0.6"/>
  <path d="M9 17 Q12 15 15 17" fill="none" stroke="#00A5B8" stroke-width="0.6" opacity="0.6"/>
  <path d="M12 20 Q15 18 18 20" fill="none" stroke="#00A5B8" stroke-width="0.6" opacity="0.6"/>
  <!-- Eye -->
  <circle cx="23" cy="14" r="3" fill="white"/>
  <circle cx="24" cy="13.5" r="1.8" fill="#222222"/>
  <circle cx="24.8" cy="12.8" r="0.7" fill="white"/>
  <!-- Mouth (smile) -->
  <path d="M27 17 Q29 18 28 19" fill="none" stroke="#007A8C" stroke-width="1" stroke-linecap="round"/>
  <!-- Shine on body -->
  <ellipse cx="18" cy="11" rx="4" ry="1.5" fill="white" opacity="0.25"/>
</svg>`;

// ─── Chicken Leg ────────────────────────────────────────────────────────────

const CHICKEN_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <!-- Bone -->
  <rect x="20" y="2" width="4" height="14" rx="2" fill="#FFF5E0" stroke="#E0D5C0" stroke-width="0.5"/>
  <!-- Bone knob top -->
  <circle cx="22" cy="3" r="3" fill="#FFF8EE" stroke="#E0D5C0" stroke-width="0.5"/>
  <!-- Meat body -->
  <ellipse cx="16" cy="20" rx="12" ry="10" fill="#D4880F"/>
  <!-- Cooked skin highlight -->
  <ellipse cx="14" cy="17" rx="8" ry="6" fill="#E8A020"/>
  <!-- Glossy shine -->
  <ellipse cx="12" cy="15" rx="4" ry="2.5" fill="#F0C050" opacity="0.7"/>
  <ellipse cx="10" cy="14" rx="2" ry="1.2" fill="white" opacity="0.35"/>
  <!-- Crispy detail lines -->
  <path d="M8 22 Q12 24 16 22" fill="none" stroke="#B87010" stroke-width="0.7" opacity="0.5"/>
  <path d="M10 25 Q15 27 20 25" fill="none" stroke="#B87010" stroke-width="0.7" opacity="0.5"/>
  <!-- Bottom shadow -->
  <ellipse cx="16" cy="28" rx="10" ry="2" fill="#B87010" opacity="0.3"/>
</svg>`;

// ─── Cupcake ────────────────────────────────────────────────────────────────

const CUPCAKE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <!-- Wrapper -->
  <path d="M6 18 L8 30 L24 30 L26 18 Z" fill="#E8365D"/>
  <!-- Wrapper ridges -->
  <path d="M7 20 L8 30" fill="none" stroke="#CC2A4E" stroke-width="0.6"/>
  <path d="M10 19 L10.5 30" fill="none" stroke="#CC2A4E" stroke-width="0.6"/>
  <path d="M13 18.5 L13 30" fill="none" stroke="#CC2A4E" stroke-width="0.6"/>
  <path d="M16 18.2 L16 30" fill="none" stroke="#CC2A4E" stroke-width="0.6"/>
  <path d="M19 18.5 L19 30" fill="none" stroke="#CC2A4E" stroke-width="0.6"/>
  <path d="M22 19 L21.5 30" fill="none" stroke="#CC2A4E" stroke-width="0.6"/>
  <path d="M25 20 L24 30" fill="none" stroke="#CC2A4E" stroke-width="0.6"/>
  <!-- Cake top visible -->
  <rect x="6" y="16" width="20" height="3" rx="1" fill="#F5D090"/>
  <!-- Frosting swirl -->
  <ellipse cx="16" cy="14" rx="12" ry="5" fill="#FF8EC4"/>
  <ellipse cx="16" cy="12" rx="9" ry="4" fill="#FFA0D0"/>
  <ellipse cx="16" cy="10" rx="6" ry="3" fill="#FFB8DA"/>
  <!-- Frosting peak -->
  <ellipse cx="16" cy="8" rx="3.5" ry="2.5" fill="#FFC8E4"/>
  <!-- Cherry -->
  <circle cx="16" cy="5" r="3" fill="#FF2255"/>
  <circle cx="16" cy="4.5" r="2.5" fill="#FF3366"/>
  <!-- Cherry shine -->
  <circle cx="15" cy="3.8" r="0.8" fill="white" opacity="0.6"/>
  <!-- Cherry stem -->
  <path d="M16 3 Q18 1 19 2" fill="none" stroke="#4A8C2A" stroke-width="0.8" stroke-linecap="round"/>
  <!-- Sprinkles -->
  <rect x="10" y="11" width="2" height="1" rx="0.5" fill="#FFE944" transform="rotate(-20 11 11.5)"/>
  <rect x="20" y="12" width="2" height="1" rx="0.5" fill="#44DDFF" transform="rotate(25 21 12.5)"/>
  <rect x="14" y="14" width="2" height="1" rx="0.5" fill="#44FF88" transform="rotate(-10 15 14.5)"/>
  <rect x="8" y="14" width="2" height="1" rx="0.5" fill="#FF8844" transform="rotate(15 9 14.5)"/>
  <rect x="22" y="10" width="2" height="1" rx="0.5" fill="#FF44FF" transform="rotate(-30 23 10.5)"/>
</svg>`;

// ─── Answer Platform (160x40) ───────────────────────────────────────────────

const PLATFORM_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="40" viewBox="0 0 160 40">
  <!-- Main dirt block -->
  <rect x="2" y="10" width="156" height="28" rx="4" fill="#8B6040"/>
  <!-- Dirt shading layers -->
  <rect x="2" y="18" width="156" height="20" rx="4" fill="#7A5535"/>
  <rect x="2" y="26" width="156" height="12" rx="4" fill="#6B4A2E"/>
  <!-- Dirt texture spots -->
  <circle cx="20" cy="24" r="2" fill="#9A7050" opacity="0.5"/>
  <circle cx="60" cy="30" r="1.5" fill="#9A7050" opacity="0.5"/>
  <circle cx="100" cy="22" r="2" fill="#9A7050" opacity="0.5"/>
  <circle cx="140" cy="28" r="1.5" fill="#9A7050" opacity="0.5"/>
  <circle cx="80" cy="34" r="1" fill="#5A3E24" opacity="0.4"/>
  <circle cx="40" cy="32" r="1.5" fill="#5A3E24" opacity="0.3"/>
  <circle cx="120" cy="34" r="1" fill="#5A3E24" opacity="0.4"/>
  <!-- Green grass top -->
  <rect x="2" y="8" width="156" height="8" rx="4" fill="#4CAF50"/>
  <rect x="2" y="8" width="156" height="5" rx="4" fill="#66CC44"/>
  <!-- Grass blade tufts -->
  <path d="M10 8 L8 2 L12 6" fill="#55BB33"/>
  <path d="M14 8 L16 1 L18 7" fill="#44AA22"/>
  <path d="M30 8 L28 3 L32 6" fill="#55BB33"/>
  <path d="M35 8 L37 0 L39 7" fill="#66CC44"/>
  <path d="M55 8 L53 2 L57 6" fill="#44AA22"/>
  <path d="M60 8 L62 1 L64 7" fill="#55BB33"/>
  <path d="M78 8 L76 3 L80 6" fill="#66CC44"/>
  <path d="M85 8 L87 0 L89 7" fill="#44AA22"/>
  <path d="M105 8 L103 2 L107 6" fill="#55BB33"/>
  <path d="M110 8 L112 1 L114 7" fill="#66CC44"/>
  <path d="M128 8 L126 3 L130 6" fill="#44AA22"/>
  <path d="M135 8 L137 1 L139 7" fill="#55BB33"/>
  <path d="M148 8 L146 2 L150 6" fill="#66CC44"/>
  <path d="M153 8 L155 3 L157 7" fill="#44AA22"/>
</svg>`;

// ─── Ground Platform (240x40) ───────────────────────────────────────────────

const GROUND_PLATFORM_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="40" viewBox="0 0 240 40">
  <!-- Main dirt block -->
  <rect x="2" y="10" width="236" height="28" rx="4" fill="#8B6040"/>
  <!-- Dirt shading layers -->
  <rect x="2" y="18" width="236" height="20" rx="4" fill="#7A5535"/>
  <rect x="2" y="26" width="236" height="12" rx="4" fill="#6B4A2E"/>
  <!-- Dirt texture spots -->
  <circle cx="20" cy="24" r="2" fill="#9A7050" opacity="0.5"/>
  <circle cx="55" cy="30" r="1.5" fill="#9A7050" opacity="0.5"/>
  <circle cx="90" cy="22" r="2" fill="#9A7050" opacity="0.5"/>
  <circle cx="130" cy="28" r="1.5" fill="#9A7050" opacity="0.5"/>
  <circle cx="170" cy="24" r="2" fill="#9A7050" opacity="0.5"/>
  <circle cx="210" cy="30" r="1.5" fill="#9A7050" opacity="0.5"/>
  <circle cx="40" cy="34" r="1" fill="#5A3E24" opacity="0.4"/>
  <circle cx="80" cy="32" r="1.5" fill="#5A3E24" opacity="0.3"/>
  <circle cx="120" cy="34" r="1" fill="#5A3E24" opacity="0.4"/>
  <circle cx="160" cy="32" r="1.5" fill="#5A3E24" opacity="0.3"/>
  <circle cx="200" cy="34" r="1" fill="#5A3E24" opacity="0.4"/>
  <!-- Green grass top -->
  <rect x="2" y="8" width="236" height="8" rx="4" fill="#4CAF50"/>
  <rect x="2" y="8" width="236" height="5" rx="4" fill="#66CC44"/>
  <!-- Grass blade tufts -->
  <path d="M10 8 L8 2 L12 6" fill="#55BB33"/>
  <path d="M14 8 L16 1 L18 7" fill="#44AA22"/>
  <path d="M30 8 L28 3 L32 6" fill="#55BB33"/>
  <path d="M35 8 L37 0 L39 7" fill="#66CC44"/>
  <path d="M55 8 L53 2 L57 6" fill="#44AA22"/>
  <path d="M60 8 L62 1 L64 7" fill="#55BB33"/>
  <path d="M78 8 L76 3 L80 6" fill="#66CC44"/>
  <path d="M85 8 L87 0 L89 7" fill="#44AA22"/>
  <path d="M105 8 L103 2 L107 6" fill="#55BB33"/>
  <path d="M110 8 L112 1 L114 7" fill="#66CC44"/>
  <path d="M128 8 L126 3 L130 6" fill="#44AA22"/>
  <path d="M135 8 L137 1 L139 7" fill="#55BB33"/>
  <path d="M148 8 L146 2 L150 6" fill="#66CC44"/>
  <path d="M153 8 L155 3 L157 7" fill="#44AA22"/>
  <path d="M168 8 L166 2 L170 6" fill="#55BB33"/>
  <path d="M175 8 L177 1 L179 7" fill="#66CC44"/>
  <path d="M192 8 L190 3 L194 6" fill="#44AA22"/>
  <path d="M198 8 L200 0 L202 7" fill="#55BB33"/>
  <path d="M215 8 L213 2 L217 6" fill="#66CC44"/>
  <path d="M222 8 L224 1 L226 7" fill="#44AA22"/>
  <path d="M234 8 L232 3 L236 7" fill="#55BB33"/>
</svg>`;

// ─── Asset Loader ───────────────────────────────────────────────────────────

export async function loadAssets(): Promise<Assets> {
  const [kitten, kittenChef, fish, chicken, cupcake, platform, groundPlatform] =
    await Promise.all([
      loadSvgImage(KITTEN_SVG),
      loadSvgImage(KITTEN_CHEF_SVG),
      loadSvgImage(FISH_SVG),
      loadSvgImage(CHICKEN_SVG),
      loadSvgImage(CUPCAKE_SVG),
      loadSvgImage(PLATFORM_SVG),
      loadSvgImage(GROUND_PLATFORM_SVG),
    ]);

  return { kitten, kittenChef, fish, chicken, cupcake, platform, groundPlatform };
}

export function getFoodSprite(assets: Assets, foodType: "fish" | "chicken" | "cupcake"): HTMLImageElement {
  return assets[foodType];
}
