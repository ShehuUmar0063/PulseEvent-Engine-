import React, { useState } from 'react';
import {
  Archive,
  Table as TableIcon,
  LayoutGrid,
  Search,
  Download,
  Trash2,
  Eye,
  X,
  Copy,
  Check,
  Plus,
  ArrowUpDown,
  Filter,
} from 'lucide-react';
import { VaultAsset } from '../types';

interface AssetVaultProps {
  assets: VaultAsset[];
  onDeleteAsset: (id: string) => void;
  onClearAll: () => void;
  isDarkMode: boolean;
}

export const AssetVault: React.FC<AssetVaultProps> = ({
  assets,
  onDeleteAsset,
  onClearAll,
  isDarkMode,
}) => {
  const [viewMode, setViewMode] = useState<'table' | 'gallery'>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [inspectAsset, setInspectAsset] = useState<VaultAsset | null>(null);
  const [copiedAlt, setCopiedAlt] = useState(false);

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      asset.metadata.sessionTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.metadata.presenterName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.metadata.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      categoryFilter === 'all' || asset.metadata.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(assets.map((a) => a.metadata.category)));

  const handleExportJSON = () => {
    if (assets.length === 0) return;
    const blob = new Blob([JSON.stringify(assets, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pulseevent_vault_database_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyAlt = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAlt(true);
    setTimeout(() => setCopiedAlt(false), 2000);
  };

  return (
    <div
      className={`rounded-lg border transition-colors overflow-hidden ${
        isDarkMode
          ? 'bg-[#1e1e1e] border-[#2c2c2c] text-[#d4d4d4]'
          : 'bg-[#ffffff] border-[#e9e9e7] text-[#37352f]'
      }`}
    >
      {/* Notion Database Header */}
      <div
        className={`px-4 py-3 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
          isDarkMode ? 'border-[#2c2c2c]' : 'border-[#e9e9e7]'
        }`}
      >
        <div className="flex items-center gap-2">
          <div
            className={`w-6 h-6 rounded flex items-center justify-center text-xs font-semibold ${
              isDarkMode ? 'bg-[#2a2a2a] text-[#ffffff]' : 'bg-[#efefed] text-[#37352f]'
            }`}
          >
            📋
          </div>
          <div>
            <h3 className="text-sm font-semibold tracking-tight flex items-center gap-2">
              <span>Event Asset Database</span>
              <span className="text-[11px] font-mono opacity-50 font-normal">
                ({assets.length} {assets.length === 1 ? 'record' : 'records'})
              </span>
            </h3>
          </div>
        </div>

        {/* Database Controls: Views, Search & Export */}
        <div className="flex items-center gap-2">
          {/* Notion View Switcher: Table | Gallery */}
          <div
            className={`flex items-center p-0.5 rounded border text-xs ${
              isDarkMode ? 'bg-[#181818] border-[#2c2c2c]' : 'bg-[#f7f6f3] border-[#e9e9e7]'
            }`}
          >
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium cursor-pointer ${
                viewMode === 'table'
                  ? isDarkMode
                    ? 'bg-[#2b2b2b] text-white shadow-xs'
                    : 'bg-[#ffffff] text-[#37352f] shadow-xs'
                  : 'opacity-60 hover:opacity-100'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Table</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('gallery')}
              className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium cursor-pointer ${
                viewMode === 'gallery'
                  ? isDarkMode
                    ? 'bg-[#2b2b2b] text-white shadow-xs'
                    : 'bg-[#ffffff] text-[#37352f] shadow-xs'
                  : 'opacity-60 hover:opacity-100'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Gallery</span>
            </button>
          </div>

          {assets.length > 0 && (
            <>
              {/* Search input */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 opacity-40 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter records..."
                  className={`pl-8 pr-2.5 py-1 text-xs rounded border outline-none w-32 sm:w-44 transition-all ${
                    isDarkMode
                      ? 'bg-[#181818] border-[#2c2c2c] text-[#e6e6e6] focus:border-[#444444]'
                      : 'bg-[#fbfbfa] border-[#e9e9e7] text-[#37352f] focus:border-[#2383e2]'
                  }`}
                />
              </div>

              {/* Export button */}
              <button
                type="button"
                onClick={handleExportJSON}
                className={`p-1.5 rounded border opacity-70 hover:opacity-100 transition-opacity cursor-pointer ${
                  isDarkMode
                    ? 'bg-[#222222] border-[#333333]'
                    : 'bg-[#f7f6f3] border-[#e0dfdc]'
                }`}
                title="Export database as JSON"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mandatory ZERO DEMO DATA Placeholder */}
      {assets.length === 0 && (
        <div className="py-16 px-6 text-center flex flex-col items-center justify-center">
          <div
            className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 text-lg opacity-50 ${
              isDarkMode ? 'bg-[#252525]' : 'bg-[#f7f6f3]'
            }`}
          >
            📭
          </div>
          <h4 className="text-sm font-semibold mb-1 opacity-90">
            No event assets in this workspace. Upload your first capture to begin.
          </h4>
          <p className="text-xs max-w-md opacity-60 leading-relaxed mb-4">
            This database is clean and completely unpopulated. Drag a photo or whiteboard scan into the ingestion block above to index structured event data.
          </p>
        </div>
      )}

      {/* Populated Table View */}
      {assets.length > 0 && viewMode === 'table' && (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr
                className={`border-b text-[11px] font-medium opacity-60 ${
                  isDarkMode
                    ? 'border-[#2c2c2c] bg-[#1a1a1a]/50'
                    : 'border-[#e9e9e7] bg-[#fbfbfa]'
                }`}
              >
                <th className="py-2 px-3 font-normal">Aa Session Name</th>
                <th className="py-2 px-3 font-normal">👤 Speaker</th>
                <th className="py-2 px-3 font-normal">🏷️ Category</th>
                <th className="py-2 px-3 font-normal text-right">📈 Sentiment</th>
                <th className="py-2 px-3 font-normal text-right">🕒 Created</th>
                <th className="py-2 px-3 font-normal text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-current/10">
              {filteredAssets.map((asset) => (
                <tr
                  key={asset.id}
                  onClick={() => setInspectAsset(asset)}
                  className={`cursor-pointer transition-colors ${
                    isDarkMode ? 'hover:bg-[#252525]' : 'hover:bg-[#f7f6f3]'
                  }`}
                >
                  <td className="py-2 px-3 font-medium flex items-center gap-2 max-w-[240px] truncate">
                    <img
                      src={asset.previewUrl}
                      alt=""
                      className="w-5 h-5 rounded object-cover border border-current/10 shrink-0"
                    />
                    <span className="truncate">{asset.metadata.sessionTitle}</span>
                  </td>
                  <td className="py-2 px-3 opacity-80 max-w-[160px] truncate">
                    {asset.metadata.presenterName}
                  </td>
                  <td className="py-2 px-3 opacity-70">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-mono border ${
                        isDarkMode
                          ? 'bg-[#252525] border-[#333333]'
                          : 'bg-[#f0efed] border-[#e2e1de]'
                      }`}
                    >
                      {asset.metadata.category}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-right font-mono tabular-nums text-emerald-500 font-semibold">
                    {(asset.metadata.sentimentScore * 100).toFixed(0)}%
                  </td>
                  <td className="py-2 px-3 text-right font-mono opacity-50 text-[11px] tabular-nums">
                    {new Date(asset.capturedAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td className="py-2 px-3 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteAsset(asset.id);
                      }}
                      className="p-1 rounded opacity-40 hover:opacity-100 hover:text-rose-500 transition-all cursor-pointer"
                      title="Delete record"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Populated Gallery View */}
      {assets.length > 0 && viewMode === 'gallery' && (
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
          {filteredAssets.map((asset) => (
            <div
              key={asset.id}
              onClick={() => setInspectAsset(asset)}
              className={`rounded-md border overflow-hidden cursor-pointer transition-all flex flex-col justify-between ${
                isDarkMode
                  ? 'bg-[#1a1a1a] border-[#2c2c2c] hover:border-[#404040]'
                  : 'bg-[#fbfbfa] border-[#e9e9e7] hover:border-[#d0cecb]'
              }`}
            >
              <div className="aspect-video bg-neutral-900 overflow-hidden relative">
                <img
                  src={asset.previewUrl}
                  alt={asset.metadata.sessionTitle}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/60 text-[10px] font-mono text-white">
                  {(asset.metadata.sentimentScore * 100).toFixed(0)}%
                </span>
              </div>
              <div className="p-3 space-y-1">
                <h4 className="text-xs font-semibold truncate leading-tight">
                  {asset.metadata.sessionTitle}
                </h4>
                <p className="text-[11px] opacity-60 truncate">{asset.metadata.presenterName}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Notion Page / Record Inspector Modal */}
      {inspectAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-150">
          <div
            className={`w-full max-w-3xl rounded-lg border shadow-2xl flex flex-col max-h-[90vh] overflow-hidden ${
              isDarkMode
                ? 'bg-[#1e1e1e] border-[#303030] text-[#d4d4d4]'
                : 'bg-[#ffffff] border-[#e2e1de] text-[#37352f]'
            }`}
          >
            {/* Modal Top Bar */}
            <div
              className={`px-5 py-3 border-b flex items-center justify-between text-xs ${
                isDarkMode ? 'border-[#2c2c2c]' : 'border-[#e9e9e7]'
              }`}
            >
              <span className="opacity-60 font-mono text-[11px]">
                ID: {inspectAsset.id} &bull; {inspectAsset.eventContext}
              </span>
              <button
                onClick={() => setInspectAsset(null)}
                className="opacity-50 hover:opacity-100 p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* Title & Page Icon */}
              <div className="flex items-start gap-3">
                <div className="text-3xl select-none">⚡</div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold tracking-tight">
                    {inspectAsset.metadata.sessionTitle}
                  </h2>
                  <p className="text-xs opacity-60 mt-0.5">
                    Presented by {inspectAsset.metadata.presenterName}
                  </p>
                </div>
              </div>

              {/* Image & Properties Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="rounded-md overflow-hidden border border-current/15 aspect-video bg-neutral-900">
                  <img
                    src={inspectAsset.previewUrl}
                    alt={inspectAsset.metadata.altText}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Properties list */}
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-[11px] opacity-50 uppercase tracking-wider block mb-1">
                      Category
                    </span>
                    <span className="font-medium">{inspectAsset.metadata.category}</span>
                  </div>

                  <div>
                    <span className="text-[11px] opacity-50 uppercase tracking-wider block mb-1">
                      Sentiment Index
                    </span>
                    <span className="font-mono text-emerald-500 font-semibold">
                      {(inspectAsset.metadata.sentimentScore * 100).toFixed(0)}% Score &bull;{' '}
                      {inspectAsset.metadata.sentimentLabel}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] opacity-50 uppercase tracking-wider block mb-1">
                      Alt Text Description
                    </span>
                    <p className="opacity-80 leading-relaxed text-[11px]">
                      {inspectAsset.metadata.altText}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quotes */}
              <div>
                <h4 className="text-xs font-semibold opacity-70 mb-2">Key Highlights</h4>
                <div className="space-y-1.5 text-xs">
                  {inspectAsset.metadata.keyQuotes.map((q, i) => (
                    <div
                      key={i}
                      className={`p-2.5 rounded border text-[11px] italic ${
                        isDarkMode
                          ? 'bg-[#171717] border-[#292929]'
                          : 'bg-[#fbfbfa] border-[#e9e9e7]'
                      }`}
                    >
                      &ldquo;{q.replace(/^“|”$/g, '')}&rdquo;
                    </div>
                  ))}
                </div>
              </div>

              {/* Press bulletin if available */}
              {inspectAsset.bulletin && (
                <div>
                  <h4 className="text-xs font-semibold opacity-70 mb-2">Compiled Wire Release</h4>
                  <pre
                    className={`p-3 rounded border font-mono text-[11px] whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto ${
                      isDarkMode
                        ? 'bg-[#151515] border-[#292929] text-[#cccccc]'
                        : 'bg-[#fbfbfa] border-[#e9e9e7] text-[#444444]'
                    }`}
                  >
                    {inspectAsset.bulletin.pressRelease}
                  </pre>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div
              className={`px-5 py-3 border-t flex items-center justify-between text-xs ${
                isDarkMode ? 'border-[#2c2c2c] bg-[#181818]' : 'border-[#e9e9e7] bg-[#fbfbfa]'
              }`}
            >
              <button
                type="button"
                onClick={() => {
                  onDeleteAsset(inspectAsset.id);
                  setInspectAsset(null);
                }}
                className="text-rose-500 hover:underline cursor-pointer"
              >
                Delete from Workspace
              </button>
              <button
                type="button"
                onClick={() => setInspectAsset(null)}
                className={`px-3 py-1 rounded border text-xs font-medium cursor-pointer ${
                  isDarkMode ? 'border-[#333333] hover:bg-[#252525]' : 'border-[#e0dfdc] hover:bg-[#efefed]'
                }`}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
