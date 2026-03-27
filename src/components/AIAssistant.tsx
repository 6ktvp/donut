import { useState } from "react";
import { Sparkles, Search, Image as ImageIcon, Loader2, X, ExternalLink } from "lucide-react";
import { aiService } from "@/src/services/aiService";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "motion/react";

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"search" | "image">("search");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ text: string; sources: any[] } | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await aiService.searchInfo(query);
      setResult(res);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateImage = async () => {
    if (!query) return;
    setLoading(true);
    setGeneratedImage(null);
    try {
      const img = await aiService.generateImage(query);
      setGeneratedImage(img);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50 bg-primary text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center gap-2 font-bold"
      >
        <Sparkles className="w-6 h-6" />
        <span className="hidden md:inline">Donut AI</span>
      </button>

      {/* Modal Assistant */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-dark/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[80vh]"
            >
              {/* Header */}
              <div className="bg-primary p-6 text-white flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-8 h-8" />
                  <div>
                    <h3 className="text-xl font-black">Donut AI Assistant</h3>
                    <p className="text-xs font-medium opacity-80">Como posso ajudar você hoje?</p>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-gray-100">
                <button 
                  onClick={() => setActiveTab("search")}
                  className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${activeTab === "search" ? "text-primary border-b-2 border-primary" : "text-gray-400 hover:text-dark"}`}
                >
                  <Search className="w-4 h-4" /> Pesquisa Inteligente
                </button>
                <button 
                  onClick={() => setActiveTab("image")}
                  className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${activeTab === "image" ? "text-primary border-b-2 border-primary" : "text-gray-400 hover:text-dark"}`}
                >
                  <ImageIcon className="w-4 h-4" /> Gerador de Imagens
                </button>
              </div>

              {/* Content Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={activeTab === "search" ? "O que você quer aprender hoje?" : "Descreva a imagem que deseja criar..."}
                    className="flex-1 bg-light border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none"
                    onKeyDown={(e) => e.key === "Enter" && (activeTab === "search" ? handleSearch() : handleGenerateImage())}
                  />
                  <button 
                    onClick={activeTab === "search" ? handleSearch : handleGenerateImage}
                    disabled={loading}
                    className="bg-primary text-white px-6 rounded-xl font-bold text-sm hover:bg-primary/90 disabled:opacity-50 transition-all"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Enviar"}
                  </button>
                </div>

                {/* Results */}
                <div className="space-y-4">
                  {loading && (
                    <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                      <Loader2 className="w-12 h-12 animate-spin mb-4" />
                      <p className="text-sm font-medium">Processando sua solicitação...</p>
                    </div>
                  )}

                  {result && (
                    <div className="bg-light rounded-2xl p-6 prose prose-sm max-w-none">
                      <ReactMarkdown>{result.text}</ReactMarkdown>
                      {result.sources.length > 0 && (
                        <div className="mt-6 pt-6 border-t border-gray-200">
                          <p className="text-xs font-bold text-gray-400 uppercase mb-3">Fontes:</p>
                          <div className="flex flex-wrap gap-2">
                            {result.sources.map((source: any, i: number) => (
                              <a 
                                key={i} 
                                href={source.uri} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-xs bg-white px-3 py-1 rounded-full border border-gray-200 flex items-center gap-1 hover:text-primary transition-colors"
                              >
                                {source.title} <ExternalLink className="w-3 h-3" />
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {generatedImage && (
                    <div className="space-y-4">
                      <img 
                        src={generatedImage} 
                        alt="Generated" 
                        className="w-full rounded-2xl shadow-lg"
                        referrerPolicy="no-referrer"
                      />
                      <a 
                        href={generatedImage} 
                        download="donut-ai-image.png"
                        className="block text-center text-primary font-bold text-sm hover:underline"
                      >
                        Baixar Imagem
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
