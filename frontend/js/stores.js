import { writable } from 'svelte/store';
import { HubCard } from './cards'
const card = new HubCard(-314159, -314159, '-314159', '-314159', '-3, -1, -4, -5, -9', '-314159', '-314159', '-314159');

export const playCards = writable([]);

export const newCard = writable(card)