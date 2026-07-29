import type { ProjectImage } from "@/data/site";

// Single-row screenshot reel in the shared media-card chrome. Scrolls
// left-to-right on its own in a seamless loop — no interaction needed.
// Hovering pauses it for a closer look.
export default function ScreenshotMarquee({
  images,
  layout = "phone",
}: {
  images: ProjectImage[];
  layout?: "phone" | "wide";
}) {
  // Phone shots run tall and narrow so the strip reads as a device screen.
  // Wide shots sit in a 2.39:1 anamorphic frame — the cinematic ratio.
  const isPhone = layout === "phone";
  const frame = isPhone ? "mx-auto max-w-[230px]" : "";

  // Two identical groups back-to-back; animating to -50% loops seamlessly.
  const loop = [...images, ...images];

  return (
    <figure className={`relative ${frame}`}>
      <div
        className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]"
        style={isPhone ? undefined : { aspectRatio: "2.39 / 1" }}
      >
        <div
          className="marquee-track flex w-max h-full items-center py-3"
          style={{ animationDuration: `${images.length * 7}s` }}
        >
          {loop.map((image, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={image.src}
              alt={i < images.length ? image.alt : ""}
              aria-hidden={i >= images.length}
              loading="lazy"
              className={`${
                isPhone ? "h-[420px]" : "max-h-full"
              } w-auto rounded-lg border border-white/10 mx-1.5 first:ml-3`}
            />
          ))}
        </div>
      </div>
      {/* edge fades so shots glide in and out instead of popping */}
      <div
        className={`pointer-events-none absolute inset-y-0 left-0 rounded-l-xl bg-gradient-to-r from-black/70 to-transparent ${
          layout === "phone" ? "w-6" : "w-12"
        }`}
        aria-hidden
      />
      <div
        className={`pointer-events-none absolute inset-y-0 right-0 rounded-r-xl bg-gradient-to-l from-black/70 to-transparent ${
          layout === "phone" ? "w-6" : "w-12"
        }`}
        aria-hidden
      />
    </figure>
  );
}
