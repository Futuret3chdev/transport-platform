import styles from "../styles/booking.module.css";
import AddressInput from "./AddressInput";

export default function FiltersPanel({
  filters,
  setFilters,
  resetKey,
}) {
  const isInternational =
    filters.pickup?.country &&
    filters.dropoff?.country &&
    filters.pickup.country !== filters.dropoff.country;

  return (
    <section className={styles.panel}>
      <h3>Transport Filters</h3>

      {/* =========================
         Addresses
      ========================= */}
      <label className={styles.label}>Pickup Address</label>
      <AddressInput
        key={`pickup-${resetKey}`}
        placeholder="Enter pickup location"
        onSelect={(place) =>
          setFilters((prev) => ({ ...prev, pickup: place }))
        }
      />

      <label className={styles.label}>Dropoff Address</label>
      <AddressInput
        key={`dropoff-${resetKey}`}
        placeholder="Enter dropoff location"
        onSelect={(place) =>
          setFilters((prev) => ({ ...prev, dropoff: place }))
        }
      />

      {/* =========================
         Job Notes
      ========================= */}
      <label className={styles.label}>
        Job Description / Notes
      </label>
      <textarea
        className={styles.textarea}
        placeholder="Describe the shipment, access, stairs, parking, fragile notes, etc."
        rows={4}
        value={filters.jobNotes}
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            jobNotes: e.target.value,
          }))
        }
      />

      {/* =========================
         Transport Size
      ========================= */}
      <label className={styles.label}>Transport Size</label>
      <select
        className={styles.select}
        value={filters.transportSize}
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            transportSize: e.target.value,
          }))
        }
      >
        <option>Small (Documents / Parcels)</option>
        <option>Medium (Boxes / Furniture)</option>
        <option>Large (Appliances / Pallets)</option>
        <option>XL / Truck</option>
      </select>

      {/* =========================
         Vehicle Type
      ========================= */}
      <label className={styles.label}>Vehicle Type</label>
      <select
        className={styles.select}
        value={isInternational ? "Air Freight" : filters.vehicleType}
        disabled={isInternational}
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            vehicleType: e.target.value,
          }))
        }
      >
        {isInternational ? (
          <option>Air Freight</option>
        ) : (
          <>
            <option>Any</option>
            <option>Motorbike</option>
            <option>Car</option>
            <option>Van</option>
            <option>Truck</option>
            <option>Semi / Heavy Transport</option>
          </>
        )}
      </select>

      {/* =========================
         Item Quantity
      ========================= */}
      <label className={styles.label}>Item Quantity</label>
      <select
        className={styles.select}
        value={filters.itemQty}
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            itemQty: e.target.value,
          }))
        }
      >
        <option>1–2</option>
        <option>3–5</option>
        <option>6–8</option>
        <option>8+</option>
      </select>

      {/* =========================
         Delivery Speed
      ========================= */}
      <label className={styles.label}>Delivery Speed</label>
      <select
        className={styles.select}
        value={filters.deliverySpeed}
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            deliverySpeed: e.target.value,
          }))
        }
      >
        <option>Standard</option>
        <option>Same Day</option>
        <option>Express</option>
        <option>Scheduled</option>
      </select>

      {/* =========================
         ✈️ INTERNATIONAL AIR FREIGHT
      ========================= */}
      {isInternational && (
        <>
          <div className={styles.sectionDivider} />

          <h4 style={{ marginTop: 8 }}>
            International Air Freight Details
          </h4>

          {/* Weight */}
          <label className={styles.label}>
            Shipment Weight (kg)
          </label>
          <input
            className={styles.input}
            type="number"
            min="1"
            value={filters.weightKg}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                weightKg: Number(e.target.value) || 1,
              }))
            }
          />

          {/* Declared Value + Currency */}
          <label className={styles.label}>
            Declared Value
          </label>
          <div style={{ display: "flex", gap: 10 }}>
            <select
              className={styles.select}
              value={filters.declaredCurrency}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  declaredCurrency: e.target.value,
                }))
              }
            >
              <option value="AUD">AUD</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>

            <input
              className={styles.input}
              type="number"
              min="0"
              step="100"
              value={filters.declaredValue}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  declaredValue:
                    Number(e.target.value) || 0,
                }))
              }
            />
          </div>

          {/* Insurance */}
          <label className={styles.label}>
            <input
              type="checkbox"
              checked={filters.insurance}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  insurance: e.target.checked,
                }))
              }
            />{" "}
            Add shipment insurance (recommended)
          </label>
        </>
      )}

      {/* =========================
         General Toggles
      ========================= */}
      <label className={styles.label}>
        <input
          type="checkbox"
          checked={filters.fragile}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              fragile: e.target.checked,
            }))
          }
        />{" "}
        Fragile items
      </label>

      <label className={styles.label}>
        <input
          type="checkbox"
          checked={filters.lifting}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              lifting: e.target.checked,
            }))
          }
        />{" "}
        Requires lifting
      </label>

      <label className={styles.label}>
        <input
          type="checkbox"
          checked={filters.enclosed}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              enclosed: e.target.checked,
            }))
          }
        />{" "}
        Enclosed vehicle
      </label>

      <label className={styles.label}>
        <input
          type="checkbox"
          checked={filters.verifiedOnly}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              verifiedOnly: e.target.checked,
            }))
          }
        />{" "}
        Verified providers only
      </label>

      <label className={styles.label}>
        <input
          type="checkbox"
          checked={filters.twoPerson}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              twoPerson: e.target.checked,
            }))
          }
        />{" "}
        Two-person delivery
      </label>

      {/* =========================
         Price Range
      ========================= */}
      <label className={styles.label}>
        Target Price Range
      </label>
      <input
        className={styles.input}
        type="range"
        min="0"
        max="10000"
        value={filters.priceRange}
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            priceRange: Number(e.target.value),
          }))
        }
      />
    </section>
  );
}
