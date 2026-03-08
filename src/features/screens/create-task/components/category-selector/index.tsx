"use client";

interface CategorySelectorProps {
    category: string;
    setCategory: (c: string) => void;
}

export function CategorySelector({ category, setCategory }: CategorySelectorProps) {
    const categories = ['Work', 'Personal', 'Health', 'Study'];

    return (
        <div>
            <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3 block">Category</label>
            <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                    <button
                        key={cat}
                        type="button"
                        onClick={() => setCategory(cat)}
                        className={`px-4 py-2.5 rounded-full border text-sm font-medium transition-colors ${category === cat ? 'bg-neutral-900 text-white border-neutral-900' : 'bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50'}`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>
    );
}
