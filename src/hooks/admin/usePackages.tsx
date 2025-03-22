
import { useState } from 'react';
import { Package } from '@/types';
import { usePackageQueries } from './usePackageQueries';
import { usePackageMutations } from './usePackageMutations';

export function usePackages() {
  // State for UI management
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);

  // Get package queries
  const { packagesQuery, packageDetailQuery } = usePackageQueries(selectedPackageId);
  
  // Get package mutations
  const { createMutation, updateMutation, deleteMutation } = usePackageMutations();

  // Handler functions
  const handleAddPackage = () => {
    setEditingPackage(null);
    setIsFormDialogOpen(true);
  };

  const handleEditPackage = (pkg: Package) => {
    setEditingPackage(pkg);
    setIsFormDialogOpen(true);
  };

  const handleDeletePackageClick = (packageId: string) => {
    setSelectedPackageId(packageId);
    setIsDeleteDialogOpen(true);
  };

  const handleSubmitPackage = (packageData: Omit<Package, 'id' | 'createdAt' | 'updatedAt'> | Partial<Package>) => {
    if (editingPackage) {
      updateMutation.mutate({
        packageId: editingPackage.id,
        updates: packageData as Partial<Package>
      });
      setIsFormDialogOpen(false);
    } else {
      createMutation.mutate(packageData as Omit<Package, 'id' | 'createdAt' | 'updatedAt'>);
      setIsFormDialogOpen(false);
    }
  };

  const handleConfirmDelete = () => {
    if (selectedPackageId) {
      deleteMutation.mutate(selectedPackageId);
      setIsDeleteDialogOpen(false);
    }
  };

  return {
    // Data from queries
    packages: packagesQuery.data || [],
    isLoading: packagesQuery.isLoading,
    error: packagesQuery.error,

    selectedPackage: packageDetailQuery.data,
    isLoadingPackageDetail: packageDetailQuery.isLoading,
    packageDetailError: packageDetailQuery.error,

    // UI state
    editingPackage,
    isDeleteDialogOpen,
    isFormDialogOpen,
    isSubmitting: createMutation.isPending || updateMutation.isPending,
    isDeleting: deleteMutation.isPending,

    // Actions
    setSelectedPackageId,
    handleAddPackage,
    handleEditPackage,
    handleDeletePackageClick,
    handleSubmitPackage,
    handleConfirmDelete,
    
    setIsDeleteDialogOpen,
    setIsFormDialogOpen
  };
}
