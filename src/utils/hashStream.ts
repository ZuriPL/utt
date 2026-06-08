import { createHash } from "node:crypto";

export function createHashTransformStream() {
  const hash = createHash("sha512");

  return new TransformStream({
    transform(chunk) {
      hash.update(chunk);
	},
    flush(controller) {
      controller.enqueue(new TextEncoder().encode(hash.digest("hex")));
    }
  });
}
