import { getEquipmentImage } from '@/lib/data/equipmentImages';

/**
 * Brands whose "stationary-bike" photo is an indoor cycling (spin) bike, so it
 * can stand in for the spin-bike card. Checked by eye 2026-11-16. Assault
 * Fitness is left out: its photo is an air bike, not a spin bike.
 */
const SPIN_BIKE_FROM_STATIONARY = new Set([
  'peloton', 'keiser', 'schwinn', 'life-fitness', 'precor', 'matrix',
  'technogym', 'echelon', 'nordictrack', 'sunny-health',
]);

/**
 * Photo of this brand's own machine of the given type, or undefined. The
 * generic appliance photos show other brands' logos, so they are never used as
 * a fallback on a brand page: no matching photo means a card without one.
 */
export function getBrandEquipmentPhoto(brandSlug: string, equipmentSlug: string): string | undefined {
  const own = getEquipmentImage(brandSlug, equipmentSlug);
  if (own) return own.src;
  if (equipmentSlug === 'spin-bike' && SPIN_BIKE_FROM_STATIONARY.has(brandSlug)) {
    return getEquipmentImage(brandSlug, 'stationary-bike')?.src;
  }
  return undefined;
}
