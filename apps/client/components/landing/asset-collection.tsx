"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import AssetsCollectionGrid from "../ui/asset-collection-grid"
import { useAuth } from "@/hooks/useAuth"
import { getAssetCollections } from "@/actions/getAssetCollections"

interface Collection {
  id: string;
  name: string;
  description: string;
  category: any;
  userId: string;
}

export default function AssetsCollection() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  
  useEffect(() => {
    const fetchCollections = async () => {
      
      try {
        const result = await getAssetCollections(user?.id!);
        
        if (result && result.assetCollections) {
          setCollections(result.assetCollections);
        } else {
          toast.error("Failed to fetch collections");
          // Optionally set sample data if API fails
          // setCollections(sampleCollections);
        }
      } catch (error) {
        console.error("Error fetching collections:", error);
        toast.error("An error occurred while fetching collections");
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  const handleView = (id: string) => {
    toast(`You are viewing collection with ID: ${id}`);
  }

  const handleEdit = (id: string) => {
    toast(`You are editing collection with ID: ${id}`);
  }

  const handleDelete = (id: string) => {
    toast(`Collection with ID: ${id} has been deleted`);
    setCollections(collections.filter((collection) => collection.id !== id));
  }

  if (loading) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Asset Collections</h1>
      {collections.length > 0 ? (
        <AssetsCollectionGrid 
          collections={collections} 
          onView={handleView} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
      ) : (
        <p>No collections found</p>
      )}
    </div>
  );
}