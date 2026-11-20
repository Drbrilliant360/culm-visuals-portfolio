import { STUDIO } from "../data/content";

export default function Footer() {
  return (
    // extra bottom padding on phones so the floating dock never covers the footer text
    <footer className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-3 px-5 pb-28 pt-10 text-sm text-muted md:px-10 md:pb-10">
      <span>© {new Date().getFullYear()} {STUDIO.name}. All designs belong to their respective clients.</span>
      <span>{STUDIO.city}</span>
    </footer>
  );
}
