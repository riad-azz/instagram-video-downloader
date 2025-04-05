"use client";

import { useTransition } from "react";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import { CheckCheck, Globe } from "lucide-react";

import { Locale } from "./types";

import { cn } from "@/lib/utils";

import { localeOptionsList } from "./config";
import { clientJar } from "@/features/cookies/client-jar";

type LocaleSwitcherProps = Omit<
  React.ComponentProps<typeof Button>,
  "value" | "onValueChange"
>;

export function LocaleDropdown({ className, ...props }: LocaleSwitcherProps) {
  const router = useRouter();
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (newLocale: Locale) => {
    clientJar.locale.set(newLocale);

    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={isPending} asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn("h-9 w-9", className)}
          {...props}
        >
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {localeOptionsList.map((lang) => (
          <DropdownMenuItem
            key={lang.value}
            onClick={() => handleLocaleChange(lang.value)}
            className={locale === lang.value ? "bg-muted" : ""}
          >
            {lang.label}
            {locale === lang.value && (
              <CheckCheck className="ml-auto h-4 w-4" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
