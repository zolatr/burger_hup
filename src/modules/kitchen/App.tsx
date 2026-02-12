import { TopBar } from "./components/TopBar";
import { KanbanBoard } from "./components/KanbanBoard";
import { useStore } from "@store/useStore";

function App() {
  const { orders } = useStore();

  const today = new Date().toISOString().split('T')[0];
  const dailyOrders = orders.filter(o => o.createdAt.startsWith(today)).length;
  const activeOrders = orders.filter(o => ['pending', 'preparing', 'ready'].includes(o.status)).length;
  const pendingOrders = orders.filter(o => o.status === 'pending').length;

  const stats = {
    gunluk: dailyOrders,
    aktif: activeOrders,
    bekleyen: pendingOrders,
  };

  return (
    <div className="dark h-screen flex flex-col bg-[#1D1D1D] overflow-hidden">
      <TopBar stats={stats} />
      <KanbanBoard />
    </div>
  );
}

export default App;
