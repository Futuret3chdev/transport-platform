import styles from "../styles/booking.module.css";

export default function CostBreakdown({ estimate, isInternational }) {
  // 🛟 Safe fallback
  if (!estimate) {
    return (
      <section className={styles.panel}>
        <h3>Live Estimate</h3>
        <p className={styles.subtle}>
          Select pickup and dropoff locations to calculate pricing.
        </p>
      </section>
    );
  }

  const currency = "AUD"; // demo default (future: dynamic)

  /* =====================================================
     ✈️ INTERNATIONAL AIR FREIGHT
  ====================================================== */
  if (estimate.mode === "air" || isInternational) {
    return (
      <section className={styles.panel}>
        <h3>Live Estimate</h3>

        <ul>
          <li>
            Transport Mode:{" "}
            <strong>{estimate.transportLabel}</strong>
          </li>

          <li>
            Estimated Transit Time:{" "}
            <strong>{estimate.time}</strong>
          </li>

          <li>
            Base Air Freight Cost:{" "}
            <strong>
              {currency} ${estimate.base.toFixed(2)}
            </strong>
          </li>

          <li>
            Handling & Weight Surcharges:{" "}
            <strong>
              {currency} ${estimate.packaging.toFixed(2)}
            </strong>
          </li>

          {estimate.customs > 0 && (
            <li>
              Estimated Customs & Duties:{" "}
              <strong>
                {currency} ${estimate.customs.toFixed(2)}
              </strong>
            </li>
          )}

          {estimate.insurance > 0 && (
            <li>
              Shipment Insurance:{" "}
              <strong>
                {currency} ${estimate.insurance.toFixed(2)}
              </strong>
            </li>
          )}

          <li>
            GST (10%):{" "}
            <strong>
              {currency} ${estimate.gst.toFixed(2)}
            </strong>
          </li>
        </ul>

        <div className={styles.sectionDivider} />

        <div className={styles.estimateTotal}>
          {currency} ${estimate.total.toFixed(2)}
        </div>

        <p className={styles.subtle}>
          International air freight estimate. Final pricing may
          vary based on airline, customs clearance, and fuel
          surcharges.
        </p>
      </section>
    );
  }

  /* =====================================================
     🚚 DOMESTIC ROAD TRANSPORT
  ====================================================== */
  return (
    <section className={styles.panel}>
      <h3>Live Estimate</h3>

      <ul>
        <li>
          Transport Mode:{" "}
          <strong>{estimate.transportLabel}</strong>
        </li>

        <li>
          Distance:{" "}
          <strong>{estimate.distance} km</strong>
        </li>

        <li>
          Estimated Time:{" "}
          <strong>{estimate.time} mins</strong>
        </li>

        <li>
          Base Transport Cost:{" "}
          <strong>
            {currency} ${estimate.base.toFixed(2)}
          </strong>
        </li>

        <li>
          Packaging & Handling:{" "}
          <strong>
            {currency} ${estimate.packaging.toFixed(2)}
          </strong>
        </li>

        <li>
          GST (10%):{" "}
          <strong>
            {currency} ${estimate.gst.toFixed(2)}
          </strong>
        </li>
      </ul>

      <div className={styles.sectionDivider} />

      <div className={styles.estimateTotal}>
        {currency} ${estimate.total.toFixed(2)}
      </div>

      <p className={styles.subtle}>
        Pricing calculated in real time based on distance,
        vehicle size, and service level.
      </p>
    </section>
  );
}
