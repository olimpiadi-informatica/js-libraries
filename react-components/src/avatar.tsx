import clsx from "clsx";

type Props = {
  username: string;
  url: string;
  size: number;
  className?: string;
};

export function Avatar({ username, url, size, className }: Props) {
  return (
    <div className={clsx("avatar max-h-full max-w-full", className)}>
      <div className="rounded" style={{ width: size, height: size }}>
        <img
          src={`${url}&s=${size}`}
          srcSet={[1, 2, 3].map((m) => `${url}&s=${size * m} ${m}x`).join(", ")}
          width={size}
          height={size}
          alt={`Foto profilo di ${username}`}
          className="skeleton rounded-none"
        />
      </div>
    </div>
  );
}
