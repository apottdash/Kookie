import { Captions } from "lucide-react";

interface SubtitleBadgeProps {
  className?: string;
}

export default function SubtitleBadge({ className = "" }: SubtitleBadgeProps) {
  return (
    <span
      className={`badge-subtitle ${className}`}
      title="Subtitles available / preferred"
      aria-label="Subtitle preference enabled"
    >
      <Captions className="w-3 h-3" aria-hidden="true" />
      <span>CC</span>
    </span>
  );
}
