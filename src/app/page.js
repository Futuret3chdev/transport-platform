"use client";

import { useEffect, useState } from "react";
import FiltersPanel from "../components/FiltersPanel";
import CostBreakdown from "../components/CostBreakdown";
import ProviderResults from "../components/ProviderResults";
import { calculateEstimate } from "../lib/pricing";
import { getDistanceAndTime } from "../lib/distance";
import { matchProviders } from "../lib/providers";
import styles from "../styles/booking.module.css";

/* =========================
   Initial Form State
========================= */
const INITIAL_FILTERS = {
  transportSize: "Small (Documents / Parcels)",
  vehicleType: "Any",
  itemQty: "1–2",
  deliverySpeed: "Standard",

  // ✈️ Air freight inputs
  weightKg: 10,
  declaredValue: 1000,
  declaredCurrency: "AUD",
  insurance: false,

  // Pricing / capability flags
  fragile: false,
  lifting: false,
  enclosed: false,
  verifiedOnly: false,
  twoPerson: false,

  priceRange: 250,
  jobNotes: "",

  pickup: null,
  dropoff: null,
};

export default function Home() {
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [estimate, setEstimate] = useState(null);
  const [providers, setProviders] = useState([]);
  const [showProviders, setShowProviders] = useState(false);

  // 🔁 Used to force-reset Google Places inputs
  const [resetKey, setResetKey] = useState(0);

  /* =========================
     Detect International Jobs
  ========================= */
  const isInternational =
    filters.pickup?.country &&
    filters.dropoff?.country &&
    filters.pickup.country !== filters.dropoff.country;

  /* =========================
     Recalculate Pricing
  ========================= */
  useEffect(() => {
    async function updateEstimate() {
      // ✈️ INTERNATIONAL → AIR FREIGHT
      if (isInternational) {
        setEstimate(
          calculateEstimate({
            mode: "air",
            transportSize: filters.transportSize,
            itemQty: filters.itemQty,
            deliverySpeed: filters.deliverySpeed,
            weightKg: filters.weightKg,
            declaredValue: filters.declaredValue,
            insurance: filters.insurance,
            fragile: filters.fragile,
            lifting: filters.lifting,
          })
        );
        return;
      }

      // 🚚 DOMESTIC → ROAD TRANSPORT
      if (!filters.pickup?.placeId || !filters.dropoff?.placeId) {
        setEstimate(null);
        return;
      }

      try {
        const result = await getDistanceAndTime(
          filters.pickup.placeId,
          filters.dropoff.placeId
        );

        setEstimate(
          calculateEstimate({
            mode: "road",
            distanceKm: result.distanceKm,
            durationMin: result.durationMin,
            transportSize: filters.transportSize,
            itemQty: filters.itemQty,
            deliverySpeed: filters.deliverySpeed,
            fragile: filters.fragile,
            lifting: filters.lifting,
          })
        );
      } catch {
        setEstimate(null);
      }
    }

    updateEstimate();
  }, [filters, isInternational]);

  /* =========================
     Apply → Match Providers
  ========================= */
  const handleApply = () => {
    if (!estimate) return;
    setProviders(matchProviders(filters, estimate, isInternational));
    setShowProviders(true);
  };

  /* =========================
     Clear Form (FULL RESET)
  ========================= */
  const handleClear = () => {
    setFilters(INITIAL_FILTERS);
    setEstimate(null);
    setProviders([]);
    setShowProviders(false);

    // 🔥 Force Google address inputs to reset
    setResetKey((k) => k + 1);
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Instant Transport Booking</h1>
      <p className={styles.subtitle}>
        Real-time estimates, transparent pricing, instant job submission
      </p>

      <div className={styles.layout}>
        <FiltersPanel
          filters={filters}
          setFilters={setFilters}
          resetKey={resetKey}
        />
        <CostBreakdown estimate={estimate} />
      </div>

      <button
        className={`${styles.applyMainBtn} ${
          !filters.pickup || !filters.dropoff
            ? styles.applyDisabled
            : ""
        }`}
        disabled={!filters.pickup || !filters.dropoff}
        onClick={handleApply}
      >
        Apply for Transport
      </button>

      <button
        className={styles.clearBtn}
        onClick={handleClear}
      >
        Clear form
      </button>

      {showProviders && (
        <ProviderResults
          providers={providers}
          onApply={(provider) =>
            alert(
              `Applied to ${provider.name}\n\nDemo submission.\n\nNotes:\n${filters.jobNotes}`
            )
          }
        />
      )}
    </main>
  );
}
