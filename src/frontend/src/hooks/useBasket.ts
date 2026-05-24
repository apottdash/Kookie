import { useCallback, useEffect, useState } from "react";
import type { BasketItem, Vendor } from "../types";

const STORAGE_KEY = "wedbridge_basket";

function loadBasket(): BasketItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as BasketItem[]) : [];
  } catch {
    return [];
  }
}

function saveBasket(items: BasketItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function useBasket() {
  const [items, setItems] = useState<BasketItem[]>(loadBasket);

  useEffect(() => {
    saveBasket(items);
  }, [items]);

  const addToBasket = useCallback((vendor: Vendor) => {
    setItems((prev) => {
      if (prev.some((i) => i.vendor.id === vendor.id)) return prev;
      return [...prev, { vendor, addedAt: Date.now(), notes: "" }];
    });
  }, []);

  const removeFromBasket = useCallback((vendorId: number) => {
    setItems((prev) => prev.filter((i) => i.vendor.id !== vendorId));
  }, []);

  const isInBasket = useCallback(
    (vendorId: number) => items.some((i) => i.vendor.id === vendorId),
    [items],
  );

  const updateNotes = useCallback((vendorId: number, notes: string) => {
    setItems((prev) =>
      prev.map((i) => (i.vendor.id === vendorId ? { ...i, notes } : i)),
    );
  }, []);

  const clearBasket = useCallback(() => setItems([]), []);

  return {
    items,
    addToBasket,
    removeFromBasket,
    isInBasket,
    updateNotes,
    clearBasket,
  };
}
