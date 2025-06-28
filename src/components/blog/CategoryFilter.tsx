
import React from 'react';
import { Button } from '@/components/ui/button';

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryFilter({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <section className="py-8 bg-white border-b sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              onClick={() => onCategoryChange(category)}
              className={`
                rounded-full px-6 py-2 font-medium transition-all duration-200
                ${activeCategory === category 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg' 
                  : index === 1 && activeCategory !== category
                    ? 'border-2 border-gray-300 text-gray-700 hover:border-purple-300 hover:text-purple-600'
                    : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                }
              `}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
