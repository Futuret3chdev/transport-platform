"use client";

import { useEffect, useRef } from "react";
import styles from "../styles/booking.module.css";

export default function AddressInput({ placeholder, onSelect }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleSelect = async (event) => {
      let place;

      // ✅ Handle ALL current Google event formats
      if (event.place) {
        place = event.place;
      } else if (event.detail?.place) {
        place = event.detail.place;
      } else if (event.placePrediction) {
        place = event.placePrediction.toPlace();
      } else {
        console.warn("Unknown place select event:", event);
        return;
      }

      try {
        await place.fetchFields({
          fields: [
            "id",
            "formattedAddress",
            "displayName",
            "addressComponents",
          ],
        });

        const countryComponent = place.addressComponents?.find(
          (c) => c.types.includes("country")
        );

        const payload = {
          placeId: place.id,
          description:
            place.formattedAddress ||
            place.displayName ||
            "",
          country:
            countryComponent?.shortText ||
            countryComponent?.longText ||
            null,
        };

        console.log("Address selected:", payload);

        onSelect(payload);
      } catch (error) {
        console.error("Failed to fetch place fields:", error);
      }
    };

    el.addEventListener("gmp-placeselect", handleSelect);
    el.addEventListener("gmp-select", handleSelect);

    return () => {
      el.removeEventListener("gmp-placeselect", handleSelect);
      el.removeEventListener("gmp-select", handleSelect);
    };
  }, [onSelect]);

  return (
    <gmp-place-autocomplete
      ref={ref}
      class={styles.input}
      placeholder={placeholder}
      requested-place-fields="id,formattedAddress,addressComponents"
    />
  );
}
