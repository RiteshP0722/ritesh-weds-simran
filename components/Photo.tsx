import { placeholderBg } from "@/lib/utils";

interface Props {
  src: string;
  index: number;
  /** Text shown on the gradient placeholder when there is no photo */
  label: string;
  alt?: string;
}

/** Photo with a gradient placeholder fallback. */
export default function Photo({ src, index, label, alt = "" }: Props) {
  return (
    <div className="ph" style={src ? undefined : { background: placeholderBg(index) }}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} loading="lazy" />
      ) : (
        <span>{label}</span>
      )}
    </div>
  );
}
