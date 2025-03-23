
import React, { useState, useEffect } from 'react';
import MainLayout from "@/components/layout/MainLayout";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import { createTocFromSections, apiDocSections } from '@/data/apiDocsData';
import ApiDocSidebar from '@/components/api-docs/ApiDocSidebar';
import ApiDocContent from '@/components/api-docs/ApiDocContent';
import ApiDocSearch from '@/components/api-docs/ApiDocSearch';

const ApiDocs = () => {
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSectionId, setActiveSectionId] = useState('overview');
  const [showSidebar, setShowSidebar] = useState(!isMobile);
  
  // Create table of contents from API sections
  const tableOfContents = createTocFromSections(apiDocSections);
  
  // Handle search input change
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  
  // Handle section selection from sidebar
  const handleSectionClick = (sectionId: string) => {
    setActiveSectionId(sectionId);
    if (isMobile) {
      setShowSidebar(false);
    }
  };
  
  // Handle observed section changes from IntersectionObserver
  const handleSectionObserved = (sectionId: string) => {
    if (!searchQuery) {
      setActiveSectionId(sectionId);
    }
  };
  
  // Toggle sidebar visibility on mobile
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  
  // Update sidebar visibility when switching between mobile and desktop
  useEffect(() => {
    setShowSidebar(!isMobile);
  }, [isMobile]);

  return (
    <MainLayout>
      <motion.div
        className="flex flex-col h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="flex h-full">
          {/* Sidebar Toggle Button (Mobile Only) */}
          {isMobile && (
            <button
              onClick={toggleSidebar}
              className="fixed bottom-4 right-4 z-50 bg-zinc-700 text-white p-3 rounded-full shadow-lg"
            >
              {showSidebar ? "×" : "≡"}
            </button>
          )}
          
          {/* Sidebar */}
          {showSidebar && (
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className={`${isMobile ? 'fixed z-40 left-0 top-0 h-full bg-zinc-950' : 'relative'}`}
            >
              <ApiDocSidebar
                sections={tableOfContents}
                activeSectionId={activeSectionId}
                onSectionClick={handleSectionClick}
              />
            </motion.div>
          )}
          
          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            <div className="p-4 border-b border-zinc-800">
              <ApiDocSearch onSearch={handleSearch} />
            </div>
            
            <ApiDocContent
              searchQuery={searchQuery}
              activeSectionId={activeSectionId}
              onSectionObserved={handleSectionObserved}
            />
          </div>
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default ApiDocs;
