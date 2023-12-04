import ToggleTheme from "@/components/atoms/toggle-theme";

export default function AppTopbar() {
  return (
    <div>
      <div className="flex h-12 max-h-12 items-center justify-between py-2 px-5 border-b ">
        <p className="text-sm text-foreground-lighter">Preferences</p>

        <div>
          <ToggleTheme />
        </div>
      </div>
    </div>
  );
}
