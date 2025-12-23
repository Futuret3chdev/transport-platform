// lib/pricing.js

// 🌍 Demo FX rates → BASE CURRENCY = AUD
const FX_RATES = {
  AUD: 1,
  USD: 1.52,
  EUR: 1.65,
  GBP: 1.92,
};

export function calculateEstimate({
  mode = "road",

  // Road
  distanceKm = 0,

  // Shared
  transportSize = "Small",
  itemQty = "1–2",
  deliverySpeed = "Standard",
  fragile = false,
  lifting = false,

  // ✈️ Air-only
  weightKg = 0,
  declaredValue = 0,
  declaredCurrency = "AUD",
  insurance = false,
}) {
  /* =================================
     ✈️ INTERNATIONAL AIR FREIGHT
  ================================= */
  if (mode === "air") {
    const sizeKey = transportSize.split(" ")[0];

    const airBaseRates = {
      Small: 1200,
      Medium: 2200,
      Large: 4200,
      XL: 6500,
    };

    const base = airBaseRates[sizeKey] ?? 2500;

    // ⚖️ Weight surcharge (first 5kg included)
    const safeWeight = Number(weightKg) || 0;
    const weightSurcharge = Math.max(0, safeWeight - 5) * 8;

    // ⚡ Speed multiplier
    const speedMultiplier =
      deliverySpeed === "Express" ? 1.4 :
      deliverySpeed === "Same Day" ? 1.25 :
      1;

    // ➕ Handling add-ons
    const handlingAddons =
      (fragile ? 150 : 0) +
      (lifting ? 250 : 0);

    // 💱 Convert declared value → AUD
    const safeDeclared = Number(declaredValue) || 0;
    const fxRate = FX_RATES[declaredCurrency] ?? 1;
    const declaredAUD = safeDeclared * fxRate;

    // 🧾 Customs (demo estimate)
    const customs = declaredAUD > 0 ? declaredAUD * 0.08 : 0;

    // 🛡️ Insurance
    const insuranceFee =
      insurance && declaredAUD > 0
        ? declaredAUD * 0.015
        : 0;

    const subtotal =
      base * speedMultiplier +
      weightSurcharge +
      handlingAddons +
      customs +
      insuranceFee;

    const gst = subtotal * 0.1;

    return {
      mode: "air",
      transportLabel: "International Air Freight",
      distance: "N/A",
      time: "2–5 business days",

      base,
      packaging: weightSurcharge + handlingAddons,
      customs,
      insurance: insuranceFee,

      declaredValue: safeDeclared,
      declaredCurrency,
      declaredAUD,

      gst,
      total: subtotal + gst,
    };
  }

  /* =================================
     🚚 DOMESTIC ROAD TRANSPORT
  ================================= */
  const safeDistance = Number(distanceKm) || 0;

  const baseRatePerKm = 3.2;

  const sizeMultipliers = {
    Small: 1,
    Medium: 1.25,
    Large: 1.5,
    XL: 1.9,
  };

  const speedMultipliers = {
    Standard: 1,
    "Same Day": 1.2,
    Express: 1.4,
    Scheduled: 1,
  };

  const qtyMultipliers = {
    "1–2": 1,
    "3–5": 1.2,
    "6–8": 1.4,
    "8+": 1.6,
  };

  const sizeKey = transportSize.split(" ")[0];
  const sizeMultiplier = sizeMultipliers[sizeKey] ?? 1;
  const qtyMultiplier = qtyMultipliers[itemQty] ?? 1;
  const speedMultiplier = speedMultipliers[deliverySpeed] ?? 1;

  let base = safeDistance * baseRatePerKm;
  base *= sizeMultiplier * qtyMultiplier * speedMultiplier;

  let addons = 0;
  if (fragile) addons += 10;
  if (lifting) addons += 15;

  const subtotal = base + addons;
  const gst = subtotal * 0.1;

  return {
    mode: "road",
    transportLabel: "Road Transport",
    distance: safeDistance.toFixed(1),
    time: Math.round(safeDistance * 1.5),

    base,
    packaging: addons,
    gst,
    total: subtotal + gst,
  };
}
