export function matchProviders(filters, estimate, isInternational) {
  if (!estimate) return [];

  /* ---------------------------------
     🚚 ROAD TRANSPORT PROVIDERS
  ---------------------------------- */
  const roadProviders = [
    {
      id: 1,
      name: "SwiftMove Transport",
      vehicle: "Van",
      verified: true,
      enclosed: false,
      twoPerson: false,
      priceMultiplier: 1,
      etaMultiplier: 1,
    },
    {
      id: 2,
      name: "HeavyLift Logistics",
      vehicle: "Truck",
      verified: true,
      enclosed: true,
      twoPerson: true,
      priceMultiplier: 1.25,
      etaMultiplier: 1.1,
    },
    {
      id: 3,
      name: "Metro Courier Co.",
      vehicle: "Car",
      verified: false,
      enclosed: false,
      twoPerson: false,
      priceMultiplier: 0.9,
      etaMultiplier: 0.9,
    },
  ];

  /* ---------------------------------
     ✈️ AIR FREIGHT PROVIDERS
  ---------------------------------- */
  const airProviders = [
    {
      id: 101,
      name: "Global Air Freight",
      vehicle: "Cargo Aircraft",
      verified: true,
      air: true,
      priceMultiplier: 1,
      eta: "2–4 business days",
    },
    {
      id: 102,
      name: "ExpressSky Logistics",
      vehicle: "International Air Express",
      verified: true,
      air: true,
      priceMultiplier: 1.2,
      eta: "1–3 business days",
    },
    {
      id: 103,
      name: "Economy Air Cargo",
      vehicle: "Consolidated Air Freight",
      verified: false,
      air: true,
      priceMultiplier: 0.85,
      eta: "4–7 business days",
    },
  ];

  /* ---------------------------------
     🌍 SELECT PROVIDER POOL
  ---------------------------------- */
  let providers = isInternational
    ? airProviders
    : roadProviders;

  /* ---------------------------------
     🔍 APPLY USER FILTERS
  ---------------------------------- */
  providers = providers.filter((p) => {
    if (filters.verifiedOnly && !p.verified) return false;
    if (!isInternational && filters.enclosed && !p.enclosed) return false;
    if (!isInternational && filters.twoPerson && !p.twoPerson) return false;
    return true;
  });

  /* ---------------------------------
     💰 CALCULATE FINAL PRICE & ETA
  ---------------------------------- */
  const enriched = providers.map((p) => {
    const safeTotal =
      typeof estimate.total === "number"
        ? estimate.total
        : 0;

    const price = Number(
      (safeTotal * (p.priceMultiplier || 1)).toFixed(2)
    );

    const eta = p.air
      ? p.eta
      : `${Math.round(
          estimate.time * (p.etaMultiplier || 1)
        )} mins`;

    const recommended =
      p.verified &&
      p.priceMultiplier === 1 &&
      (!p.air || p.eta === "2–4 business days");

    return {
      ...p,
      price,
      eta,
      recommended,
    };
  });

  /* ---------------------------------
     ⭐ SORT RESULTS (BEST FIRST)
  ---------------------------------- */
  enriched.sort((a, b) => {
    // Recommended first
    if (a.recommended && !b.recommended) return -1;
    if (!a.recommended && b.recommended) return 1;

    // Then cheapest
    return a.price - b.price;
  });

  return enriched;
}
