
import React from 'react';
import { cn } from '@/lib/utils';

interface Section {
  id: string;
  title: string;
  subsections?: { id: string; title: string }[];
}

interface ApiDocSidebarProps {
  sections: Section[];
  activeSectionId: string;
  onSectionClick: (sectionId: string) => void;
}

const ApiDocSidebar = ({ sections, activeSectionId, onSectionClick }: ApiDocSidebarProps) => {
  return (
    <div className="w-64 p-4 border-r border-zinc-800 overflow-y-auto h-full">
      <h3 className="text-lg font-semibold mb-4 text-white">Mục lục</h3>
      <nav>
        <ul className="space-y-1">
          {sections.map((section) => (
            <li key={section.id}>
              <button
                onClick={() => onSectionClick(section.id)}
                className={cn(
                  "w-full text-left px-2 py-1.5 rounded text-sm transition-colors",
                  activeSectionId === section.id 
                    ? "bg-zinc-800 text-white" 
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                )}
              >
                {section.title}
              </button>
              
              {section.subsections && section.subsections.length > 0 && (
                <ul className="pl-4 mt-1 space-y-1">
                  {section.subsections.map((subsection) => (
                    <li key={subsection.id}>
                      <button
                        onClick={() => onSectionClick(subsection.id)}
                        className={cn(
                          "w-full text-left px-2 py-1 rounded text-xs transition-colors",
                          activeSectionId === subsection.id 
                            ? "bg-zinc-800 text-white" 
                            : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                        )}
                      >
                        {subsection.title}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default ApiDocSidebar;
