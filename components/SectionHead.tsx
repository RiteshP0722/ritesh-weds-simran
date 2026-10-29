interface Props {
  eyebrow: string;
  title: string;
}

/** Section heading: small caps eyebrow, script title, thin gold divider. */
export default function SectionHead({ eyebrow, title }: Props) {
  return (
    <div className="head rv">
      <div className="head-ornament" aria-hidden="true">
        ✦
      </div>
      <div className="eyebrow">{eyebrow}</div>
      <h2 className="section-title">{title}</h2>
      <div className="head-divider" aria-hidden="true">
        <span />✦<span />
      </div>
    </div>
  );
}
