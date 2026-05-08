import PersonalizedAIAssistant from "@/components/PersonalizedAIAssistant";
import CompetitorTable from "@/components/CompetitorTable";
import FloatingChatWidget from "@/components/ui/floating-chat";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <PersonalizedAIAssistant />
      
      <div className="grid grid-cols-1 gap-8">
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white tracking-tight">Market Intelligence</h2>
          </div>
          <CompetitorTable />
        </section>
      </div>

      <FloatingChatWidget />
    </div>
  );
}
