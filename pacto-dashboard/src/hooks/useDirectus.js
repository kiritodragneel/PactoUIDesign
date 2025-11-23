import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchCollection, createRecord, updateRecord, deleteRecord } from '../lib/directus';

/**
 * Hook to fetch data from a Directus collection
 * @param {string} collection - The name of the collection
 * @param {object} options - Query options for filtering, sorting, etc.
 */
export const useCollection = (collection, options = {}) => {
  return useQuery({
    queryKey: ['collection', collection, options],
    queryFn: () => fetchCollection(collection, options),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!collection,
  });
};

/**
 * Hook to create a new item in a Directus collection
 * @param {string} collection - The name of the collection
 */
export const useCreateItem = (collection) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => createRecord(collection, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collection', collection] });
    },
  });
};

/**
 * Hook to update an item in a Directus collection
 * @param {string} collection - The name of the collection
 */
export const useUpdateItem = (collection) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateRecord(collection, id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collection', collection] });
    },
  });
};

/**
 * Hook to delete an item from a Directus collection
 * @param {string} collection - The name of the collection
 */
export const useDeleteItem = (collection) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteRecord(collection, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collection', collection] });
    },
  });
};

/**
 * Hook to fetch multiple collections at once
 * @param {string[]} collections - Array of collection names
 */
export const useMultipleCollections = (collections) => {
  return collections.map(collection => useCollection(collection));
};

export default {
  useCollection,
  useCreateItem,
  useUpdateItem,
  useDeleteItem,
  useMultipleCollections,
};
