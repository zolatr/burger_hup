import { TopBar } from "./components/TopBar";
import { KanbanBoard } from "./components/KanbanBoard";
import { Toaster } from "./components/ui/sonner";

function App() {
  // Stats will be calculated and passed from KanbanBoard component
  const stats = {
    gunluk: 8,
    aktif: 4,
    bekleyen: 3,
  };

  return (
    <div className="dark h-screen flex flex-col bg-[#1D1D1D] overflow-hidden">
      <TopBar stats={stats} />
      <KanbanBoard />
      <Toaster position="top-right" richColors />
    </div>
  );
}

export default App;
