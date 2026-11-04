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

/*
 * How a colour swatch is applied to each model: which materials to colour and
 * whether to drop the base texture ("flat", exact colour) or multiply it ("tint").
 * Add an entry per real model once you have it (material names are in the .glb).
 */
const MODEL_COLOR_CONFIG = {
  "models/Duck.glb": { colorMaterials: ["blinn3-fx"], colorMode: "flat" },
  "models/Fox.glb": { colorMaterials: ["fox_material"], colorMode: "flat" },
  "models/CesiumMilkTruck.glb": { colorMaterials: ["truck"], colorMode: "flat" },
};
const NO_CONFIG = {};
export const colorConfigFor = (src) => MODEL_COLOR_CONFIG[src] || NO_CONFIG;

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
