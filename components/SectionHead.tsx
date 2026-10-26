import type { CSSProperties, ReactNode } from "react";

interface Props {
  eyebrow: string;
  title: string;
  top?: ReactNode;
  bottom?: ReactNode;
  style?: CSSProperties;
}

export default function SectionHead({ eyebrow, title, top, bottom, style }: Props) {
  return (
    <div className="head rv" style={style}>
      {top}
      <div className="eyebrow">{eyebrow}</div>
      <h2 className="section-title">{title}</h2>
      {bottom}
    </div>
  );
}
