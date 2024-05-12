import { Address } from '../service/address.service';

export function formatAddress(address: Address): string {
  return `${address.name}, ${address.code} ${address.city}, ${address.country}`;
}