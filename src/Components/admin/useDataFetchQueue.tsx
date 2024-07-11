import { useState, useEffect } from 'react';

interface QueueItem {
  id: string;
  fetch: () => Promise<any>;
}

export const useDataFetchQueue = (initialQueue: QueueItem[]) => {
  const [queue, setQueue] = useState<QueueItem[]>(initialQueue);
  const [currentItem, setCurrentItem] = useState<QueueItem | null>(null);
  const [results, setResults] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const processQueue = async () => {
      if (queue.length === 0 || currentItem) return;

      const nextItem = queue[0];
      setCurrentItem(nextItem);
      setIsLoading(true);

      try {
        const result = await nextItem.fetch();
        setResults(prev => ({ ...prev, [nextItem.id]: result }));
      } catch (error) {
        console.error(`Error fetching data for ${nextItem.id}:`, error);
      }

      setQueue(prev => prev.slice(1));
      setCurrentItem(null);
      setIsLoading(false);
    };

    processQueue();
  }, [queue, currentItem]);

  return { results, isLoading };
};