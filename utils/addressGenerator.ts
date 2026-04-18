// utils/addressGenerator.ts
import { faker } from '@faker-js/faker';

/**
 * Generates a realistic address object for testing.
 */
export function generateAddress() {
  return {
    street: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    postalCode: faker.location.zipCode(),
    country: faker.location.country(),
  };
}

/**
 * Generates a full address string (single line).
 */
export function generateFullAddress(): string {
  const addr = generateAddress();
  return `${addr.street}, ${addr.city}, ${addr.state} ${addr.postalCode}, ${addr.country}`;
}
