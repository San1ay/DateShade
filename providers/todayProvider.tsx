"use client";

export default function TodayProvider({
  children,
}: {
  children: (today: Date) => React.ReactNode;
}) {
  const today = new Date();
  return <>{children(today)}</>;
}