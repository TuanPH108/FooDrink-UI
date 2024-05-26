export { renderers } from '../renderers.mjs';

const page = () => import('./pages/CreateRestaurant_CH8_AAib.mjs').then(n => n.C);

export { page };
