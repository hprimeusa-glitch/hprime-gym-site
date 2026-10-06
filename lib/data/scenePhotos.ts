/**
 * Scene Photos Data — technician + gym equipment photos
 * Auto-generated from batch_gym_scenes. Each photo has brand/type metadata
 * for smart filtering on service and brand pages.
 */

export interface ScenePhoto {
  src: string;
  alt: string;
  brand: string;       // e.g. "life-fitness", "nordictrack"
  equipmentType: string; // e.g. "treadmill", "elliptical"
}

const ALL_SCENE_PHOTOS: ScenePhoto[] = [
  // scene-01 excluded: too studio-lit
  { src: '/photos/scenes/scene-02.webp', alt: 'NordicTrack treadmill maintenance service', brand: 'nordictrack', equipmentType: 'treadmill' },
  { src: '/photos/scenes/scene-03.webp', alt: 'Peloton Tread repair by H-Prime technician', brand: 'peloton', equipmentType: 'treadmill' },
  // scene-04 excluded: eyes closed
  { src: '/photos/scenes/scene-05.webp', alt: 'Life Fitness elliptical maintenance', brand: 'life-fitness', equipmentType: 'elliptical' },
  { src: '/photos/scenes/scene-06.webp', alt: 'NordicTrack elliptical repair', brand: 'nordictrack', equipmentType: 'elliptical' },
  { src: '/photos/scenes/scene-07.webp', alt: 'Peloton Bike+ repair service', brand: 'peloton', equipmentType: 'stationary-bike' },
  { src: '/photos/scenes/scene-08.webp', alt: 'Keiser M3i stationary bike maintenance', brand: 'keiser', equipmentType: 'stationary-bike' },
  { src: '/photos/scenes/scene-09.webp', alt: 'Schwinn IC4 bike repair', brand: 'schwinn', equipmentType: 'stationary-bike' },
  { src: '/photos/scenes/scene-10.webp', alt: 'Concept2 rowing machine service', brand: 'concept2', equipmentType: 'rowing-machine' },
  { src: '/photos/scenes/scene-11.webp', alt: 'WaterRower repair by technician', brand: 'waterrower', equipmentType: 'rowing-machine' },
  { src: '/photos/scenes/scene-12.webp', alt: 'Hydrow rowing machine maintenance', brand: 'hydrow', equipmentType: 'rowing-machine' },
  { src: '/photos/scenes/scene-13.webp', alt: 'StairMaster Gauntlet repair service', brand: 'stairmaster', equipmentType: 'stair-machine' },
  { src: '/photos/scenes/scene-14.webp', alt: 'Life Fitness PowerMill stair machine repair', brand: 'life-fitness', equipmentType: 'stair-machine' },
  { src: '/photos/scenes/scene-15.webp', alt: 'Hammer Strength weight machine service', brand: 'hammer-strength', equipmentType: 'weight-machine' },
  { src: '/photos/scenes/scene-16.webp', alt: 'Body-Solid weight machine repair', brand: 'body-solid', equipmentType: 'weight-machine' },
];

/**
 * Get the best (first matching) scene photo for a given equipment type.
 * Used for hero images on service pages.
 */
export function getBestScenePhoto(equipmentType: string): ScenePhoto | null {
  return ALL_SCENE_PHOTOS.find(p => p.equipmentType === equipmentType) || null;
}

/**
 * Get scene photos sorted by relevance:
 * 1. Exact match (brand + type)
 * 2. Same equipment type
 * 3. Same brand (different type)
 * 4. Everything else
 */
export function getScenePhotos(opts?: { brand?: string; equipmentType?: string }): string[] {
  if (!opts?.brand && !opts?.equipmentType) {
    return ALL_SCENE_PHOTOS.map(p => p.src);
  }

  const { brand, equipmentType } = opts;

  const scored = ALL_SCENE_PHOTOS.map(photo => {
    let score = 0;
    if (brand && photo.brand === brand) score += 2;
    if (equipmentType && photo.equipmentType === equipmentType) score += 4;
    return { photo, score };
  });

  scored.sort((a, b) => b.score - a.score);

  return scored.map(s => s.photo.src);
}
