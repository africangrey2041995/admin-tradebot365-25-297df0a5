
import React, { useEffect, useRef } from 'react';
import ApiEndpoint from './ApiEndpoint';
import CodeBlock from './CodeBlock';
import { apiDocSections } from '@/data/apiDocsData';

interface ApiDocContentProps {
  searchQuery: string;
  activeSectionId: string;
  onSectionObserved: (sectionId: string) => void;
}

const ApiDocContent = ({ searchQuery, activeSectionId, onSectionObserved }: ApiDocContentProps) => {
  const sectionRefs = useRef<{[key: string]: HTMLDivElement | null}>({});
  
  // Setup intersection observer to detect which section is currently in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            onSectionObserved(entry.target.id);
          }
        });
      },
      { threshold: 0.2, rootMargin: '-100px 0px -50% 0px' }
    );
    
    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    
    return () => observer.disconnect();
  }, [onSectionObserved]);
  
  // Scroll to active section when it changes (e.g., when user clicks on TOC)
  useEffect(() => {
    if (activeSectionId && sectionRefs.current[activeSectionId]) {
      sectionRefs.current[activeSectionId]?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [activeSectionId]);

  // Filter sections by search query
  const getFilteredSections = () => {
    if (!searchQuery) return apiDocSections;
    
    const lowercaseQuery = searchQuery.toLowerCase();
    
    return apiDocSections.filter((section) => {
      const matchesTitle = section.title.toLowerCase().includes(lowercaseQuery);
      const matchesContent = section.content?.toLowerCase().includes(lowercaseQuery);
      
      // Also check subsections if they exist
      const matchesSubsections = section.subsections?.some(
        (subsection) => 
          subsection.title.toLowerCase().includes(lowercaseQuery) ||
          subsection.content?.toLowerCase().includes(lowercaseQuery)
      );
      
      return matchesTitle || matchesContent || matchesSubsections;
    });
  };

  const filteredSections = getFilteredSections();

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <h1 ref={el => sectionRefs.current['overview'] = el} id="overview" className="text-3xl font-bold mb-4 text-white">
        TradeBOT365 API Documentation
      </h1>
      <p className="text-zinc-300 mb-8">
        Tài liệu API cho TradeBOT365 dành cho Frontend và Backend developers. Các API này cho phép bạn tương tác với hệ thống TradeBOT365 để quản lý bot, tài khoản, theo dõi hiệu suất và nhiều hơn nữa.
      </p>

      {filteredSections.map((section) => (
        <div key={section.id} ref={el => sectionRefs.current[section.id] = el} id={section.id} className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-white border-b border-zinc-800 pb-2">
            {section.title}
          </h2>
          
          {section.content && <div className="mb-6 text-zinc-300">{section.content}</div>}
          
          {section.endpoints?.map((endpoint, index) => (
            <ApiEndpoint
              key={`${section.id}-endpoint-${index}`}
              id={`${section.id}-endpoint-${index}`}
              method={endpoint.method}
              path={endpoint.path}
              description={endpoint.description}
              authentication={endpoint.authentication}
              deprecated={endpoint.deprecated}
              beta={endpoint.beta}
            >
              {endpoint.requestSchema && (
                <>
                  <h4 className="text-sm font-semibold mb-2 text-zinc-300">Request Body</h4>
                  <CodeBlock 
                    code={endpoint.requestSchema} 
                    language="json" 
                    title="Request Schema"
                  />
                </>
              )}
              
              {endpoint.responseSchema && (
                <>
                  <h4 className="text-sm font-semibold mb-2 text-zinc-300">Response Body</h4>
                  <CodeBlock 
                    code={endpoint.responseSchema} 
                    language="json" 
                    title="Response Schema"
                  />
                </>
              )}
              
              {endpoint.parameters && (
                <>
                  <h4 className="text-sm font-semibold mb-2 text-zinc-300">Parameters</h4>
                  <ul className="list-disc pl-5 text-zinc-300 text-sm mb-4">
                    {endpoint.parameters.map((param, i) => (
                      <li key={i} className="mb-1">
                        <code className="bg-zinc-800 px-1 py-0.5 rounded">{param.name}</code>{' '}
                        <span className="text-zinc-400">({param.type})</span>
                        {param.required && <span className="text-red-400 text-xs"> *required</span>} - {param.description}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </ApiEndpoint>
          ))}
          
          {section.subsections?.map((subsection) => (
            <div 
              key={subsection.id} 
              ref={el => sectionRefs.current[subsection.id] = el} 
              id={subsection.id}
              className="mb-8 ml-4"
            >
              <h3 className="text-xl font-semibold mb-3 text-white">
                {subsection.title}
              </h3>
              
              {subsection.content && <div className="mb-6 text-zinc-300">{subsection.content}</div>}
              
              {subsection.endpoints?.map((endpoint, index) => (
                <ApiEndpoint
                  key={`${subsection.id}-endpoint-${index}`}
                  id={`${subsection.id}-endpoint-${index}`}
                  method={endpoint.method}
                  path={endpoint.path}
                  description={endpoint.description}
                  authentication={endpoint.authentication}
                  deprecated={endpoint.deprecated}
                  beta={endpoint.beta}
                >
                  {endpoint.requestSchema && (
                    <>
                      <h4 className="text-sm font-semibold mb-2 text-zinc-300">Request Body</h4>
                      <CodeBlock 
                        code={endpoint.requestSchema} 
                        language="json" 
                        title="Request Schema"
                      />
                    </>
                  )}
                  
                  {endpoint.responseSchema && (
                    <>
                      <h4 className="text-sm font-semibold mb-2 text-zinc-300">Response Body</h4>
                      <CodeBlock 
                        code={endpoint.responseSchema} 
                        language="json" 
                        title="Response Schema"
                      />
                    </>
                  )}
                  
                  {endpoint.parameters && (
                    <>
                      <h4 className="text-sm font-semibold mb-2 text-zinc-300">Parameters</h4>
                      <ul className="list-disc pl-5 text-zinc-300 text-sm mb-4">
                        {endpoint.parameters.map((param, i) => (
                          <li key={i} className="mb-1">
                            <code className="bg-zinc-800 px-1 py-0.5 rounded">{param.name}</code>{' '}
                            <span className="text-zinc-400">({param.type})</span>
                            {param.required && <span className="text-red-400 text-xs"> *required</span>} - {param.description}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </ApiEndpoint>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ApiDocContent;
