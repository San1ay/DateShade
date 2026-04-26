import TodayProvider from "@/providers/todayProvider";
import MonthGridClient from "./monthGridClient";

type Props = {
  month: number;
  monthName: string;
  year: number;
};

export default function MonthGrid(props: Props) {
  return (
    <TodayProvider>
      {(today) => <MonthGridClient {...props} today={today} />}
    </TodayProvider>
  );
}