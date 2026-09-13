/**
 * फ़ाइल का नाम: custom-ads.js
 * विवरण: स्मार्ट हाइब्रिड ऐड मैनेजर (GitHub Utility Portal और Blogger दोनों के लिए)
 */

// 1. मुख्य सेटिंग्स
const IS_GOOGLE_ADSENSE_APPROVED = false; // AdSense अप्रूवल मिलने पर true करें

const GOOGLE_ADS_CONFIG = {
  client: "ca-pub-XXXXXXXXXXXXXXXX", // अपनी AdSense पब्लिशर ID यहाँ डालें
  slot: "1234567890"                  // अपना Ad Slot ID यहाँ डालें
};

// 2. आपके विज्ञापन डेटा
const MY_CUSTOM_ADS = [
  {
    tag: "विशेष ऑफर",
    title: "डिजिटल टूल्स और प्रीमियम सर्विसेज पर 50% छूट!",
    desc: "Extrasalary स्टोर पर आज ही नए टूल्स और ऑफर्स चेक करें।",
    btnText: "स्टोर पर जाएं",
    link: "https://extrasalarydotcom.github.io/Extrasalary-store/",
    bgLinear: "linear-gradient(135deg, #f59e0b, #ea580c, #e11d48)"
  },
  {
    tag: "ट्रेवल बुकिंग",
    title: "कन्फर्म ट्रेन और बस टिकट बुक करें तुरंत!",
    desc: "बिना किसी झंझट के लाइव सीट उपलब्धता देखें और टिकट बनाएं।",
    btnText: "टिकट बुक करें",
    link: "https://bitli.in/Wj4D6tI",
    bgLinear: "linear-gradient(135deg, #4f46e5, #7c3aed, #4338ca)"
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
    <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 16px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
      <span style="display: block; font-size: 10px; letter-spacing: 1px; color: #94a3b8; font-weight: bold; text-transform: uppercase; margin-bottom: 8px;">
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
    console.error("AdSense लोड एरर:", error);
  }
}

// 4. कस्टम विज्ञापन रेंडर करने का फ़ंक्शन
function displayCustomAd(container) {
  const ad = MY_CUSTOM_ADS[currentAdIndex];

  container.innerHTML = `
    <div style="background: ${ad.bgLinear}; border-radius: 16px; padding: 18px; color: #ffffff; position: relative; box-shadow: 0 6px 16px rgba(0,0,0,0.12); display: flex; flex-direction: column; gap: 10px; text-align: left; box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
      
      <span style="position: absolute; top: 10px; right: 12px; font-size: 8px; letter-spacing: 0.5px; text-transform: uppercase; background: rgba(0,0,0,0.25); padding: 2px 6px; border-radius: 4px; font-weight: bold;">
        प्रायोजित (Sponsored)
      </span>

      <span style="background: rgba(255,255,255,0.25); font-size: 10px; font-weight: bold; padding: 2px 8px; border-radius: 12px; text-transform: uppercase; width: fit-content;">
        ${ad.tag}
      </span>

      <h4 style="font-size: 16px; font-weight: bold; margin: 0; color: #ffffff; line-height: 1.3;">
        ${ad.title}
      </h4>

      <p style="font-size: 12px; margin: 0; color: rgba(255,255,255,0.92); line-height: 1.4;">
        ${ad.desc}
      </p>

      <div style="margin-top: 4px;">
        <a href="${ad.link}" target="_blank" rel="noopener noreferrer sponsored" style="background: #ffffff; color: #0f172a; padding: 8px 16px; border-radius: 8px; font-size: 12px; font-weight: bold; text-decoration: none; display: inline-block; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          ${ad.btnText} →
        </a>
      </div>
    </div>
  `;

  currentAdIndex = (currentAdIndex + 1) % MY_CUSTOM_ADS.length;
}

// 5. मुख्य शुरुआत (GitHub और Blogger दोनों कंटेनर ढूँढेगा)
function initAdsEngine() {
  const container = document.getElementById("self-hosted-ad-container") || document.getElementById("extrasalary-ad-box");
  if (!container) return;

  if (IS_GOOGLE_ADSENSE_APPROVED) {
    loadGoogleAdSense(container);
  } else {
    displayCustomAd(container);
    if (!adRotationTimer) {
      adRotationTimer = setInterval(() => {
        displayCustomAd(container);
      }, 6000); // 6 सेकंड में ऑटो-रोटेट होगा
    }
  }
}

// पेज लोड होने पर तुरंत चलाएं
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAdsEngine);
} else {
  initAdsEngine();
}
