import styles from "../styles/booking.module.css";

export default function ProviderResults({ providers = [], onApply }) {
  return (
    <section className={styles.providersSection}>
      <h2 className={styles.providersTitle}>
        Available Transport Providers
      </h2>

      {providers.length === 0 && (
        <p className={styles.noProviders}>
          No providers match your selected filters.
        </p>
      )}

      <div className={styles.providersGrid}>
        {providers.map((p) => (
          <div
            key={p.id}
            className={`${styles.providerCard} ${
              p.recommended ? styles.providerRecommended : ""
            }`}
          >
            {/* ⭐ RECOMMENDED BADGE */}
            {p.recommended && (
              <div className={styles.recommendedBadge}>
                Recommended
              </div>
            )}

            {/* HEADER */}
            <div className={styles.providerHeader}>
              <div>
                <h3 className={styles.providerName}>
                  {p.name}
                </h3>
                <span className={styles.providerVehicle}>
                  {p.vehicle}
                </span>
              </div>

              <div className={styles.providerPrice}>
                ${Number(p.price || 0).toFixed(2)}
              </div>
            </div>

            {/* META INFO */}
            <div className={styles.providerMeta}>
              <span>
                ETA:{" "}
                {typeof p.eta === "string"
                  ? p.eta
                  : `${p.eta} mins`}
              </span>

              {p.air && (
                <span className={styles.badgeAir}>
                  International Air
                </span>
              )}

              {p.verified && (
                <span className={styles.badgeVerified}>
                  Verified
                </span>
              )}

              {p.enclosed && (
                <span className={styles.badge}>
                  Enclosed
                </span>
              )}

              {p.twoPerson && (
                <span className={styles.badge}>
                  2-Person Crew
                </span>
              )}
            </div>

            {/* CTA */}
            <button
              className={styles.applyProviderBtn}
              onClick={() => onApply(p)}
            >
              Apply to this provider
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
