
import React, { useState } from 'react';
import { usePackages } from '@/hooks/admin/usePackages';
import { Package } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PackageTable } from '@/components/admin/packages/PackageTable';
import { PackageForm } from '@/components/admin/packages/PackageForm';
import { DeletePackageDialog } from '@/components/admin/packages/DeletePackageDialog';
import { PackagesHeader } from '@/components/admin/packages/PackagesHeader';

const PackagesPage: React.FC = () => {
  const {
    packages,
    isLoading,
    error,
    handleAddPackage,
    handleEditPackage,
    handleDeletePackageClick,
    handleSubmitPackage,
    handleConfirmDelete,
    editingPackage,
    isDeleteDialogOpen,
    isFormDialogOpen,
    setIsDeleteDialogOpen,
    setIsFormDialogOpen,
    isSubmitting,
    isDeleting
  } = usePackages();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  // Filter packages based on search term and active status
  const filteredPackages = packages.filter(pkg => {
    // First apply search filter
    const matchesSearch = pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Then apply tab filter
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'active') return matchesSearch && pkg.isActive;
    if (activeTab === 'inactive') return matchesSearch && !pkg.isActive;
    
    return matchesSearch;
  });
  
  // Handle search
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };
  
  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="space-y-6">
      <PackagesHeader onAddPackage={handleAddPackage} onSearch={handleSearch} />
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="bg-zinc-800">
          <TabsTrigger value="all">Tất cả</TabsTrigger>
          <TabsTrigger value="active">Đang kích hoạt</TabsTrigger>
          <TabsTrigger value="inactive">Đã vô hiệu</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-4">
          <Card className="border-zinc-800 bg-zinc-900 text-white">
            <CardContent className="pt-6">
              <PackageTable
                packages={filteredPackages}
                isLoading={isLoading}
                error={error instanceof Error ? error : null}
                onEdit={handleEditPackage}
                onDelete={handleDeletePackageClick}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="active" className="mt-4">
          <Card className="border-zinc-800 bg-zinc-900 text-white">
            <CardContent className="pt-6">
              <PackageTable
                packages={filteredPackages}
                isLoading={isLoading}
                error={error instanceof Error ? error : null}
                onEdit={handleEditPackage}
                onDelete={handleDeletePackageClick}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="inactive" className="mt-4">
          <Card className="border-zinc-800 bg-zinc-900 text-white">
            <CardContent className="pt-6">
              <PackageTable
                packages={filteredPackages}
                isLoading={isLoading}
                error={error instanceof Error ? error : null}
                onEdit={handleEditPackage}
                onDelete={handleDeletePackageClick}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Package Form Dialog */}
      <PackageForm
        open={isFormDialogOpen}
        onOpenChange={setIsFormDialogOpen}
        onSubmit={handleSubmitPackage}
        package={editingPackage}
        isSubmitting={isSubmitting}
      />
      
      {/* Delete Package Dialog */}
      <DeletePackageDialog
        open={isDeleteDialogOpen}
        packageName={packages.find(p => p.id === editingPackage?.id)?.name}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default PackagesPage;
