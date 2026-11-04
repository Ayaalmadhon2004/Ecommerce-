import exploreProducts from "./exploreProducts";
import sellingProducts from "./sellingProducts";

/*
 * 3D data for products that come from the remote API (fakestoreapi.com), which
 * has no model3d / colors / hotspots fields. Keyed by the API product id.
 *
 * The models below are DEMO PLACEHOLDERS (Khronos sample assets) that do not
 * match the real products. To add a real model: drop the .glb in
 * public/models/ and add an entry here: { model3d, colors, hotspots }.
 */
const byName = (list, name) => list.find((p) => p.name === name) || {};
const pick = ({ model3d, colors, hotspots }) => ({ model3d, colors, hotspots });

export const MODELS_BY_API_ID = {
  1: pick(byName(sellingProducts, "Small BookSelf")),
  2: pick(byName(exploreProducts, "Breed Dry Dog Food")),
  3: pick(byName(exploreProducts, "Kids Electric Car")),
};

/**
 * Adds 3D fields to an API product. Local products (they have no `category`)
 * already carry their own fields, and their ids can collide with API ids, so
 * they are returned untouched. Fields already on the product always win.
 */
export function withModel3d(product) {
  if (!product || !product.category) return product;
  const extra = MODELS_BY_API_ID[product.id];
  return extra && extra.model3d ? { ...extra, ...product } : product;
}
