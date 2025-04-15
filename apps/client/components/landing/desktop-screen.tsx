import Safari from "../ui/safari";

export function DesktopScreen() {
  return (
    <div className="relative z-50">
      <Safari
        url="viewchain.in"
        className="size-full shadow-2xl shadow-primary/30 dark:shadow-primary/20"
      />
    </div>
  );
}