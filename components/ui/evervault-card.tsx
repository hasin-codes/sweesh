"use client";
import React from "react";
import { cn } from "@/lib/utils";

export const EvervaultCard = ({
  className,
}: {
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "p-0.5 bg-transparent w-full h-full relative",
        className
      )}
    >
      <div className="rounded-3xl w-full relative overflow-hidden bg-transparent h-full">
        <CardPattern />
      </div>
    </div>
  );
};

export function CardPattern() {
  return (
    <div className="pointer-events-none">
      <div className="absolute inset-0 rounded-2xl [mask-image:linear-gradient(white,transparent)] opacity-50"></div>
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 opacity-100 backdrop-blur-xl"></div>
    </div>
  );
}

