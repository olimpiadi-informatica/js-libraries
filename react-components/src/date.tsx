import clsx from "clsx";
import { intlFormat, intlFormatDistance } from "date-fns";

type DateProps = {
  date: Date;
  dateStyle?: Intl.DateTimeFormatOptions["dateStyle"] | "hidden";
  timeStyle?: Intl.DateTimeFormatOptions["timeStyle"] | "hidden";
  locale?: string;
  className?: string;
};

function style(dateStyle: DateProps["dateStyle"], timeStyle: DateProps["timeStyle"]) {
  return {
    dateStyle: dateStyle === "hidden" ? undefined : dateStyle,
    timeStyle: timeStyle === "hidden" ? undefined : timeStyle,
  };
}

export function DateTime({
  date,
  dateStyle = "medium",
  timeStyle = "short",
  locale,
  className,
}: DateProps) {
  const formatted = locale
    ? intlFormat(date, style(dateStyle, timeStyle), { locale })
    : intlFormat(date, style(dateStyle, timeStyle));
  const duration = intlFormatDistance(date, new Date(), { locale });

  return (
    <abbr title={duration} className={clsx(className)}>
      {formatted}
    </abbr>
  );
}

export function DateDistance({
  date,
  dateStyle = "medium",
  timeStyle = "short",
  locale,
  className,
}: DateProps) {
  const formatted = locale
    ? intlFormat(date, style(dateStyle, timeStyle), { locale })
    : intlFormat(date, style(dateStyle, timeStyle));
  const duration = intlFormatDistance(date, new Date(), { locale });

  return (
    <abbr title={formatted} className={clsx(className)}>
      {duration}
    </abbr>
  );
}
