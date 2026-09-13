/**
 * फ़ाइल का नाम: custom-ads.js
 * विवरण: स्मार्ट हाइब्रिड ऐड मैनेजर
 */

// 1. मुख्य सेटिंग्स
const IS_GOOGLE_ADSENSE_APPROVED = false; // अभी अप्रूवल नहीं है इसलिए false रखें

const GOOGLE_ADS_CONFIG = {
  client: "ca-pub-XXXXXXXXXXXXXXXX", // बाद में अपनी AdSense ID यहाँ डालें
  slot: "1234567890"                  // बाद में अपना Ad Slot ID डालें
};

// 2. आपके खुद के विज्ञापन (जो अभी दिखेंगे)
const MY_CUSTOM_ADS = [
  {
    tag: "विशेष ऑफर",
    title: "डिजिटल टूल्स और प्रीमियम सर्विसेज पर 50% छूट!",
    desc: "Extrasalary स्टोर पर आज ही नए टूल्स और ऑफर्स चेक करें।",
    btnText: "स्टोर पर जाएं",
    link: "https://extrasalarydotcom.github.io/Extrasalary-store/",
    bgGradient: "from-amber-500 via-orange-500 to-rose-500"
  },
  {
    tag: "ट्रेवल बुकिंग",
    title: "कन्फर्म ट्रेन और बस टिकट बुक करें तुरंत!",
    desc: "बिना किसी झंझट के लाइव सीट उपलब्धता देखें और टिकट बनाएं।",
    btnText: "टिकट बुक करें",
    link: "https://bitli.in/Wj4D6tI",
    bgGradient: "from-indigo-600 via-purple-600 to-indigo-800"
  }
];

let currentAdIndex = 0;
let adRotationTimer = null;

// 3. Google AdSense लोड करने का फ़ंक्शन
function loadGoogleAdSense(container) {
  if (adRotationTimer) {
    clearInterval(adRotationTimer);
  }

  container.innerHTML = `
    <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm text-center">
      <span class="block text-[10px] tracking-wider text-slate-400 font-bold uppercase mb-2">
        प्रायोजित विज्ञापन (Advertisement)
      </span>
      <ins class="adsbygoogle"
           style="display:block"
           data-ad-client="${GOOGLE_ADS_CONFIG.client}"
           data-ad-slot="${GOOGLE_ADS_CONFIG.slot}"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
    </div>
  `;

  try {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  } catch (error) {
    console.error("AdSense एरर:", error);
  }
}

// 4. खुद का विज्ञापन दिखाने का फ़ंक्शन
function displayCustomAd(container) {
  const ad = MY_CUSTOM_ADS[currentAdIndex];

  container.innerHTML = `
    <div class="relative overflow-hidden rounded-2xl bg-gradient-to-r ${ad.bgGradient} p-6 text-white shadow-lg transition-all duration-500">
      <span class="absolute top-2 right-3 text-[9px] uppercase tracking-widest bg-black/25 px-2 py-0.5 rounded text-white/90 font-bold">
        प्रायोजित (Sponsored)
      </span>
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="text-center sm:text-left">
          <span class="bg-white/20 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            ${ad.tag}
          </span>
          <h3 class="text-lg sm:text-xl font-bold mt-2 leading-snug">${ad.title}</h3>
          <p class="text-xs sm:text-sm text-white/90 mt-1">${ad.desc}</p>
        </div>
        <a href="${ad.link}" target="_blank" rel="noopener noreferrer sponsored" class="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-slate-900 font-bold text-xs sm:text-sm rounded-xl shadow-md hover:bg-slate-100 transition transform hover:-translate-y-0.5 flex-shrink-0">
          <i class="fa-solid fa-arrow-up-right-from-square text-indigo-600"></i> ${ad.btnText}
        </a>
      </div>
    </div>
  `;

  currentAdIndex = (currentAdIndex + 1) % MY_CUSTOM_ADS.length;
}

// 5. मुख्य शुरुआत
function initAdsEngine() {
  const container = document.getElementById("self-hosted-ad-container");
  if (!container) return;

  if (IS_GOOGLE_ADSENSE_APPROVED) {
    loadGoogleAdSense(container);
  } else {
    displayCustomAd(container);
    adRotationTimer = setInterval(() => {
      displayCustomAd(container);
    }, 6000); // 6 सेकंड में विज्ञापन बदलेगा
  }
}

window.addEventListener("DOMContentLoaded", initAdsEngine);
