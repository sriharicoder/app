import SunGlow from "./SunGlow";
import MoonGlow from "./MoonGlow";
import Clouds from "./Clouds";
import Rain from "./Rain";
import Thunder from "./Thunder";
import Wind from "./Wind";

export type WeatherType = "sunny" | "cloudy" | "rainy" | "storm";

type Props = {
  weather: WeatherType;
  isNight: boolean;
};

export default function WeatherAnimation({ weather, isNight }: Props) {
  return (
    <>
      {/* 🌞 / 🌙 BACKGROUND LAYER */}
      <BackgroundLayer>
        {isNight ? <MoonGlow /> : <SunGlow />}
      </BackgroundLayer>

      {/* ☁️ CLOUDS */}
      {(weather === "cloudy" || weather === "storm") && (
        <MidLayer>
          <Clouds />
        </MidLayer>
      )}

      {/* 🌬 WIND */}
      {(weather === "cloudy" || weather === "storm") && (
        <MidLayer>
          <Wind />
        </MidLayer>
      )}

      {/* 🌧 RAIN */}
      {(weather === "rainy" || weather === "storm") && (
        <FrontLayer>
          <Rain />
        </FrontLayer>
      )}

      {/* ⛈ THUNDER (TOP MOST) */}
      {weather === "storm" && (
        <TopLayer>
          <Thunder />
        </TopLayer>
      )}
    </>
  );
}

/* ---------------- LAYERS ---------------- */

function BackgroundLayer({ children }: { children: React.ReactNode }) {
  return (
    <Layer zIndex={0}>
      {children}
    </Layer>
  );
}

function MidLayer({ children }: { children: React.ReactNode }) {
  return (
    <Layer zIndex={1}>
      {children}
    </Layer>
  );
}

function FrontLayer({ children }: { children: React.ReactNode }) {
  return (
    <Layer zIndex={2}>
      {children}
    </Layer>
  );
}

function TopLayer({ children }: { children: React.ReactNode }) {
  return (
    <Layer zIndex={3}>
      {children}
    </Layer>
  );
}

function Layer({
  children,
  zIndex,
}: {
  children: React.ReactNode;
  zIndex: number;
}) {
  return (
    <>{/*
      pointerEvents="none" ensures
      animations never block touches
    */}
      <>{children}</>
    </>
  );
}
