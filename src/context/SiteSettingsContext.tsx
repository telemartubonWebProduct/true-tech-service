"use client";

import React, { createContext, useContext } from "react";

interface SiteSettingsType {
  lineSupportUrl: string;
}

const SiteSettingsContext = createContext<SiteSettingsType>({
  lineSupportUrl: "https://lin.ee/DprkCdo", // fallback default
});

export const SiteSettingsProvider = ({
  children,
  settings,
}: {
  children: React.ReactNode;
  settings: Partial<SiteSettingsType>;
}) => {
  return (
    <SiteSettingsContext.Provider
      value={{
        lineSupportUrl: settings.lineSupportUrl || "https://lin.ee/DprkCdo",
      }}
    >
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettings = () => useContext(SiteSettingsContext);