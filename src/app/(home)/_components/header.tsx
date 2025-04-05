"use client";

import React from "react";

import { useTranslations } from "next-intl";
import { useIsMobile } from "@/hooks/use-is-mobile";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { LogoImage, LogoText } from "@/components/logo";
import { LocaleDropdown } from "@/features/i18n/locale-dropdown";
import { ThemeToggleButton } from "@/features/theme/theme-toggle-button";

import { Menu } from "lucide-react";

import { homeLinks } from "@/lib/constants";

export function Header() {
  const isMobile = useIsMobile();
  const [open, setOpen] = React.useState(false);

  const t = useTranslations("layouts.home.header");

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  React.useEffect(() => {
    if (!isMobile && open) {
      setOpen(false);
    }
  }, [isMobile, open]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white backdrop-blur supports-[backdrop-filter]:bg-gray-50/60 dark:bg-gray-900/80">
      <div className="container mx-auto flex h-16 items-center px-4">
        <div
          role="button"
          onClick={scrollUp}
          className="flex cursor-pointer items-center gap-2"
        >
          <LogoImage className="h-6 w-6 text-teal-500" />
          <LogoText />
        </div>

        {/* Desktop Navigation */}
        <nav className="ml-auto hidden items-center gap-6 md:flex">
          <a
            href={homeLinks.features}
            className="text-sm font-medium transition-colors hover:text-teal-500"
          >
            {t("links.features")}
          </a>
          <a
            href={homeLinks.howItWorks}
            className="text-sm font-medium transition-colors hover:text-teal-500"
          >
            {t("links.howItWorks")}
          </a>
          <a
            href={homeLinks.frequentlyAsked}
            className="text-sm font-medium transition-colors hover:text-teal-500"
          >
            {t("links.frequentlyAsked")}
          </a>

          <div className="border-border flex items-center gap-2 border-l pl-2">
            <LocaleDropdown />
            <ThemeToggleButton />
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="ml-auto flex items-center md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[80%] bg-gradient-to-b from-white to-gray-100 pr-0 sm:w-[350px] dark:from-gray-800 dark:to-gray-900"
            >
              <SheetHeader className="border-b">
                <SheetTitle>
                  <div className="flex items-center gap-2">
                    <LogoImage className="h-6 w-6 text-teal-500" />
                    <LogoText />
                  </div>
                </SheetTitle>
              </SheetHeader>
              <div className="flex h-full flex-col">
                <nav className="flex flex-col gap-4 px-4">
                  <a
                    href={homeLinks.features}
                    className="px-2 py-2 text-lg font-medium transition-colors hover:text-teal-500"
                    onClick={() => setOpen(false)}
                  >
                    {t("links.features")}
                  </a>

                  <a
                    href={homeLinks.howItWorks}
                    className="px-2 py-2 text-lg font-medium transition-colors hover:text-teal-500"
                    onClick={() => setOpen(false)}
                  >
                    {t("links.howItWorks")}
                  </a>
                  <a
                    href={homeLinks.frequentlyAsked}
                    className="px-2 py-2 text-lg font-medium transition-colors hover:text-teal-500"
                    onClick={() => setOpen(false)}
                  >
                    {t("links.frequentlyAsked")}
                  </a>
                </nav>
              </div>
              <div className="border-border mt-auto border-t px-4 py-2">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      {t("themeLabel")}
                    </span>
                    <ThemeToggleButton variant="outline" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      {t("localeLabel")}
                    </span>
                    <LocaleDropdown variant="outline" />
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
