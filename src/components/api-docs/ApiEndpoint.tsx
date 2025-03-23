
import React, { ReactNode } from 'react';
import { Badge } from "@/components/ui/badge";
import { ShieldAlert, Info } from "lucide-react";

interface ApiEndpointProps {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  description: string;
  authentication?: boolean;
  deprecated?: boolean;
  beta?: boolean;
  id: string;
  children?: ReactNode;
}

const methodColors = {
  GET: 'bg-blue-500/20 text-blue-500',
  POST: 'bg-green-500/20 text-green-500',
  PUT: 'bg-amber-500/20 text-amber-500',
  DELETE: 'bg-red-500/20 text-red-500',
  PATCH: 'bg-purple-500/20 text-purple-500'
};

const ApiEndpoint = ({ 
  method, 
  path, 
  description, 
  authentication = true,
  deprecated = false,
  beta = false,
  id,
  children
}: ApiEndpointProps) => {
  return (
    <div id={id} className="mb-8 border border-zinc-800 rounded-lg overflow-hidden">
      <div className="bg-zinc-900 p-4 flex items-center justify-between">
        <div className="flex items-center">
          <Badge className={`${methodColors[method]} border-0 mr-3`}>
            {method}
          </Badge>
          <code className="text-white font-mono">{path}</code>
        </div>
        <div className="flex space-x-2">
          {authentication && (
            <Badge variant="outline" className="border-amber-500/50 text-amber-500">
              <ShieldAlert size={14} className="mr-1" />
              Auth Required
            </Badge>
          )}
          {deprecated && (
            <Badge variant="outline" className="border-red-500/50 text-red-500">
              Deprecated
            </Badge>
          )}
          {beta && (
            <Badge variant="outline" className="border-blue-500/50 text-blue-500">
              <Info size={14} className="mr-1" />
              Beta
            </Badge>
          )}
        </div>
      </div>
      <div className="p-4 bg-zinc-950">
        <p className="text-zinc-300 mb-4">{description}</p>
        {children}
      </div>
    </div>
  );
};

export default ApiEndpoint;
