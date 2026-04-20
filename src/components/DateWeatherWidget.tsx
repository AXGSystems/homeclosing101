"use client";

import { useState, useEffect } from "react";

interface WeatherData {
  temp: number;
  description: string;
  icon: string;
}

const WEATHER_CODES: Record<number, { desc: string; icon: string }> = {
  0: { desc: "Clear", icon: "sun" },
  1: { desc: "Mostly Clear", icon: "sun" },
  2: { desc: "Partly Cloudy", icon: "cloud-sun" },
  3: { desc: "Overcast", icon: "cloud" },
  45: { desc: "Foggy", icon: "cloud" },
  48: { desc: "Icy Fog", icon: "cloud" },
  51: { desc: "Light Drizzle", icon: "rain" },
  53: { desc: "Drizzle", icon: "rain" },
  55: { desc: "Heavy Drizzle", icon: "rain" },
  61: { desc: "Light Rain", icon: "rain" },
  63: { desc: "Rain", icon: "rain" },
  65: { desc: "Heavy Rain", icon: "rain" },
  71: { desc: "Light Snow", icon: "snow" },
  73: { desc: "Snow", icon: "snow" },
  75: { desc: "Heavy Snow", icon: "snow" },
  80: { desc: "Showers", icon: "rain" },
  81: { desc: "Mod. Showers", icon: "rain" },
  82: { desc: "Heavy Showers", icon: "rain" },
  95: { desc: "Thunderstorm", icon: "storm" },
  96: { desc: "Hail Storm", icon: "storm" },
  99: { desc: "Heavy Hail", icon: "storm" },
};

function WeatherIcon({ type, className }: { type: string; className?: string }) {
  const cn = className || "w-5 h-5";
  switch (type) {
    case "sun":
      return (
        <svg className={cn} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <circle cx="12" cy="12" r="4" fill="currentColor" opacity={0.2} stroke="currentColor" />
          <path strokeLinecap="round" d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41" />
        </svg>
      );
    case "cloud-sun":
      return (
        <svg className={cn} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <circle cx="8" cy="8" r="3" fill="currentColor" opacity={0.15} stroke="currentColor" />
          <path strokeLinecap="round" d="M8 3v1m-5 4h1m1.17-3.83l.71.71m8.24-.71l-.71.71M3.17 12.83l.71-.71" />
          <path d="M10 15.5a4 4 0 117 0H10z" fill="currentColor" opacity={0.1} stroke="currentColor" strokeLinejoin="round" />
          <path strokeLinecap="round" d="M7 15.5h12" />
        </svg>
      );
    case "cloud":
      return (
        <svg className={cn} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <path d="M6 16a4 4 0 01-.88-7.9A5.5 5.5 0 0115.9 7 4.5 4.5 0 0118 16H6z" fill="currentColor" opacity={0.1} strokeLinejoin="round" />
        </svg>
      );
    case "rain":
      return (
        <svg className={cn} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <path d="M6 13a4 4 0 01-.88-7.9A5.5 5.5 0 0115.9 4 4.5 4.5 0 0118 13H6z" fill="currentColor" opacity={0.1} strokeLinejoin="round" />
          <path strokeLinecap="round" d="M8 17v2m4-3v2m4-1v2" />
        </svg>
      );
    case "snow":
      return (
        <svg className={cn} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <path d="M6 13a4 4 0 01-.88-7.9A5.5 5.5 0 0115.9 4 4.5 4.5 0 0118 13H6z" fill="currentColor" opacity={0.1} strokeLinejoin="round" />
          <circle cx="8" cy="17" r="0.75" fill="currentColor" /><circle cx="12" cy="16" r="0.75" fill="currentColor" /><circle cx="16" cy="18" r="0.75" fill="currentColor" />
        </svg>
      );
    case "storm":
      return (
        <svg className={cn} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <path d="M6 12a4 4 0 01-.88-7.9A5.5 5.5 0 0115.9 3 4.5 4.5 0 0118 12H6z" fill="currentColor" opacity={0.1} strokeLinejoin="round" />
          <path d="M13 14l-2 4h3l-2 4" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
        </svg>
      );
    default:
      return (
        <svg className={cn} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <circle cx="12" cy="12" r="4" fill="currentColor" opacity={0.2} stroke="currentColor" />
        </svg>
      );
  }
}

function formatDate(date: Date): string {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const day = date.getDate();
  const suffix = day === 1 || day === 21 || day === 31 ? "st" : day === 2 || day === 22 ? "nd" : day === 3 || day === 23 ? "rd" : "th";
  return `${days[date.getDay()]}, ${months[date.getMonth()]} ${day}${suffix} ${date.getFullYear()}`;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

export default function DateWeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [now, setNow] = useState<Date>(new Date());
  const [city, setCity] = useState("");

  // Update clock every minute
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(timer);
  }, []);

  // Fetch weather from Open-Meteo (no API key needed)
  useEffect(() => {
    let cancelled = false;

    async function fetchWeather(lat: number, lon: number) {
      try {
        // Reverse geocode for city name
        const geoRes = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
        );
        if (geoRes.ok) {
          const geoData = await geoRes.json();
          if (!cancelled) setCity(geoData.city || geoData.locality || "");
        }

        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&temperature_unit=fahrenheit`
        );
        if (!res.ok) return;
        const data = await res.json();
        if (cancelled) return;

        const cw = data.current_weather;
        const code = cw.weathercode as number;
        const info = WEATHER_CODES[code] || { desc: "Unknown", icon: "sun" };
        setWeather({
          temp: Math.round(cw.temperature),
          description: info.desc,
          icon: info.icon,
        });
      } catch {
        /* Weather not critical */
      }
    }

    if (typeof navigator !== "undefined" && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => fetchWeather(pos.coords.latitude, pos.coords.longitude),
        () => {
          // Fallback: Washington D.C. (ALTA HQ)
          fetchWeather(38.9072, -77.0369);
          if (!cancelled) setCity("Washington, D.C.");
        },
        { timeout: 5000 }
      );
    } else {
      fetchWeather(38.9072, -77.0369);
      setCity("Washington, D.C.");
    }

    return () => { cancelled = true; };
  }, []);

  return (
    <div className="bg-white border border-gray-100 border-t-0 rounded-b-xl px-4 py-3 shadow-lg flex items-center justify-between w-full">
      {/* Date & time */}
      <div className="min-w-0">
        <p className="text-[13px] text-alta-navy font-bold leading-snug truncate">{formatDate(now)}</p>
        <p className="text-[11px] text-gray-500 font-medium">{formatTime(now)}{city ? ` \u00B7 ${city}` : ""}</p>
      </div>

      {/* Weather */}
      {weather ? (
        <div className="flex items-center gap-2 shrink-0 ml-3">
          <WeatherIcon type={weather.icon} className="w-7 h-7 text-alta-teal" />
          <div className="text-right">
            <p className="text-[15px] text-alta-navy font-bold leading-none">{weather.temp}&deg;F</p>
            <p className="text-[10px] text-gray-500 font-medium leading-tight mt-0.5">{weather.description}</p>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2 shrink-0 ml-3">
          <div className="w-7 h-7 rounded-full bg-gray-100 animate-pulse" />
          <div className="text-right">
            <div className="w-10 h-4 bg-gray-100 rounded animate-pulse mb-0.5" />
            <div className="w-12 h-2 bg-gray-50 rounded animate-pulse" />
          </div>
        </div>
      )}
    </div>
  );
}
