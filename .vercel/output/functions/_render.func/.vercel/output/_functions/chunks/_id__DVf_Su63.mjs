export { renderers } from '../renderers.mjs';

const page = () => import('./pages/_id__DtoXSSE_.mjs').then(n => n._);

export { page };
