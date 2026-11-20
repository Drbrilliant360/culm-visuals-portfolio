import { HugeiconsIcon } from "@hugeicons/react";

/** Thin wrapper around Hugeicons so every icon is decorative by default (aria-hidden). */
export default function Icon({ icon, size = 20, className = "", strokeWidth = 1.7 }) {
  return <HugeiconsIcon icon={icon} size={size} strokeWidth={strokeWidth} className={className} aria-hidden="true" />;
}
