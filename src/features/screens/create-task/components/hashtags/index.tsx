"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Hashtag } from "@/lib/db";
import { CardActionArea } from "@/components/ui/card-action-area";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";

interface HashtagSelectorProps {
    hashtags: Hashtag[];
    setHashtags: (hashtags: Hashtag[]) => void;
}

const COLORS = [
    '#EF4444', '#F97316', '#EAB308', '#22C55E', '#3B82F6', '#6366F1', '#A855F7', '#EC4899'
];

const SUGGESTED_HASHTAGS: Hashtag[] = [
    { name: '#work', color: '#3B82F6' },
    { name: '#personal', color: '#A855F7' },
    { name: '#health', color: '#22C55E' },
    { name: '#study', color: '#F97316' }
];

const getRandomColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];

const HashtagSelector = ({ hashtags, setHashtags }: HashtagSelectorProps) => {
    const [inputValue, setInputValue] = useState("");
    const [globalHashtags, setGlobalHashtags] = useState<Hashtag[]>([]);

    useEffect(() => {
        const fetchGlobalHashtags = async () => {
            try {
                const { getHashtags } = await import('@/lib/db');
                const fetched = await getHashtags();
                if (fetched && fetched.length > 0) {
                    setGlobalHashtags(fetched);
                } else {
                    setGlobalHashtags(SUGGESTED_HASHTAGS);
                }
            } catch (error) {
                console.warn("Could not fetch global hashtags:", error);
                setGlobalHashtags(SUGGESTED_HASHTAGS);
            }
        };
        fetchGlobalHashtags();
    }, []);

    const toggleHashtag = (tag: Hashtag) => {
        if (hashtags.some(t => t.name === tag.name)) {
            setHashtags(hashtags.filter(t => t.name !== tag.name));
        } else {
            setHashtags([...hashtags, tag]);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (inputValue.trim()) {
                const newName = inputValue.trim().startsWith('#') ? inputValue.trim() : `#${inputValue.trim()}`;
                if (!hashtags.some(t => t.name === newName)) {
                    const suggested = globalHashtags.find(t => t.name === newName);
                    if (suggested) {
                        setHashtags([...hashtags, suggested]);
                    } else {
                        setHashtags([...hashtags, { name: newName, color: getRandomColor() }]);
                    }
                }
                setInputValue("");
            }
        }
    };

    const suggestedNonSelected = globalHashtags.filter(tag => !hashtags.some(t => t.name === tag.name));

    return (
        <div>
            <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3 block">Hashtags</label>
            <div className="flex flex-wrap gap-2 mb-3">
                {hashtags.map(tag => (
                    <CardActionArea
                        component="div"
                        key={tag.name}
                        className="flex items-center gap-1 ps-3 pe-0.5 h-9 rounded-full text-white text-sm font-medium"
                        style={{ backgroundColor: tag.color }}
                    >
                        <span>{tag.name}</span>
                        <Button
                            size="icon"
                            variant="ghost"
                            type="button"
                            onClick={() => toggleHashtag(tag)}
                            className="text-white/70 rounded-full"
                        >
                            <X className="w-3.5 h-3.5" />
                        </Button>
                    </CardActionArea>
                ))}

                <InputGroup className="w-32 px-3 py-1.5 h-9 rounded-full border border-neutral-200 bg-neutral-50 focus-within:border-neutral-400 focus-within:bg-white transition-colors">
                    <InputGroupInput onChange={(e) => setInputValue(e.target.value)}
                        value={inputValue}
                        onKeyDown={handleKeyDown}
                        placeholder="add tag..."
                        className="bg-transparent text-sm font-medium text-neutral-900 placeholder:text-neutral-400 outline-none"
                    />
                    <InputGroupAddon>
                        #
                    </InputGroupAddon>
                </InputGroup>

            </div>

            <div className="flex flex-wrap gap-2">
                {suggestedNonSelected.map(tag => (
                    <CardActionArea
                        key={tag.name}
                        type="button"
                        onClick={() => toggleHashtag(tag)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-neutral-200 bg-white text-sm font-medium hover:bg-neutral-50 transition-colors dark:text-neutral-800"

                    >
                        <div className="size-2 rounded-full" style={{ backgroundColor: tag.color }} />
                        {tag.name}
                    </CardActionArea>
                ))}
            </div>
        </div>
    );
}

export default HashtagSelector
