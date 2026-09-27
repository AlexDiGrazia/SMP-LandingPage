import { business } from "@/lib/content";

export default function StickyBar() {
  return (
    <div className="sticky-bar" aria-hidden={false}>
      <a href="#consult" className="btn btn-primary">
        Free Consultation
      </a>
      <a href={business.phoneHref} data-track="CallClick" className="btn-outline">
        Call Karl
      </a>
    </div>
  );
}
