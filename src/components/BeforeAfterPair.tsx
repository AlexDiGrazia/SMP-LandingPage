import Image from "next/image";

type Props = {
  beforeSrc?: string;
  afterSrc?: string;
  label?: string;
  small?: boolean;
  className?: string;
};

/**
 * Renders a real before/after photo pair once beforeSrc/afterSrc are supplied
 * (drop files in /public and pass the path), otherwise falls back to the
 * striped placeholder from the design reference so the layout stays
 * representative until real assets land.
 */
export default function BeforeAfterPair({ beforeSrc, afterSrc, label, small, className }: Props) {
  return (
    <div className={`ba-pair ${small ? "ba-pair--card" : ""} ${className ?? ""}`}>
      <Slot src={beforeSrc} text={label ? `${label} — BEFORE` : "BEFORE"} small={small} />
      <Slot src={afterSrc} text={label ? `${label} — AFTER` : "AFTER"} small={small} />
    </div>
  );
}

function Slot({ src, text, small }: { src?: string; text: string; small?: boolean }) {
  return (
    <div className={`ba-slot ${small ? "ba-slot--sm" : ""}`}>
      {src ? (
        <Image src={src} alt={text} fill sizes="(max-width: 768px) 50vw, 25vw" style={{ objectFit: "cover" }} />
      ) : (
        <span className="ba-slot__label">{text}</span>
      )}
    </div>
  );
}
