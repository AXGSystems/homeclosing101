/**
 * ClosingFolder — barrel re-export for the My Closing Folder system.
 *
 * Usage in any client component:
 *   import { useClosingFolder } from '@/components/ClosingFolder';
 *   const { items, addItem, removeItem, clearAll } = useClosingFolder();
 *
 *   addItem({ type: 'glossary', title: 'Escrow', content: 'A deposit of money...' });
 */

export {
  useClosingFolder,
  ClosingFolderContext,
  type ClosingFolderItem,
} from './ClosingFolderProvider';

export { default as ClosingFolderProvider } from './ClosingFolderProvider';
export { default as ClosingFolderButton } from './ClosingFolderButton';
