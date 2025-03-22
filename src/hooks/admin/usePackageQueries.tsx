
import { useQuery } from '@tanstack/react-query';
import { fetchPackages, getPackageById } from '@/api/packages';

export function usePackageQueries(selectedPackageId: string | null = null) {
  // Query for fetching all packages
  const packagesQuery = useQuery({
    queryKey: ['adminPackages'],
    queryFn: fetchPackages
  });

  // Query for fetching a specific package by ID
  const packageDetailQuery = useQuery({
    queryKey: ['adminPackage', selectedPackageId],
    queryFn: () => selectedPackageId ? getPackageById(selectedPackageId) : null,
    enabled: !!selectedPackageId
  });

  return {
    packagesQuery,
    packageDetailQuery
  };
}
