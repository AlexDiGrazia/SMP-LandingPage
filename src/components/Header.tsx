import { business } from "@/lib/content";

export default function Header() {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <div className="brand">
          <div className="logo-mark">LOGO</div>
          <div className="brand__name">
            {business.brandName} <span>{business.city}</span>
          </div>
        </div>
        <a href={business.phoneHref} data-track="CallClick" className="header__phone">
          {business.phoneDisplay}
        </a>
      </div>
    </header>
  );
}
