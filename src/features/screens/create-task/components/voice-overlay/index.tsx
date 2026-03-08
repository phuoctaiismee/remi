"use client";

import { Mic } from "lucide-react";

interface VoiceOverlayProps {
    isOpen: boolean;
}

export function VoiceOverlay({ isOpen }: VoiceOverlayProps) {
    if (!isOpen) return null;

    return (
        <div className="absolute inset-0 z-50 bg-white/95 backdrop-blur-md flex flex-col items-center justify-center p-6 animate-in fade-in duration-200">
            <div className="relative mb-8">
                <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-20"></div>
                <div className="absolute inset-[-24px] bg-blue-400 rounded-full animate-pulse opacity-10"></div>
                <div className="relative z-10 w-28 h-28 rounded-full flex items-center justify-center transition-all duration-300 bg-blue-500 text-white shadow-[0_0_40px_rgba(59,130,246,0.5)] scale-110">
                    <Mic className="w-12 h-12" />
                </div>
            </div>

            <h3 className="text-2xl font-semibold text-neutral-900 mb-2 text-center">
                Listening...
            </h3>
            <p className="text-neutral-500 text-center min-h-[60px] max-w-[250px]">
                Keep holding and speak your task...
            </p>
        </div>
    );
}
