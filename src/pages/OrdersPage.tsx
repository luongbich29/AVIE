import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GrainTexture from "../components/GrainTexture";

type OrderTab = "all" | "pending" | "shipping" | "delivered" | "cancelled";

interface OrderItem {
  id: string;
  code: string;
  price: string;
  imageSrc: string;
  title: string;
  details: string;
  quantity: string;
  itemCount: string;
  status: OrderTab;
}

export default function OrdersPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<OrderTab>("pending");

  const tabs = [
    { id: "all" as OrderTab, label: "Tất cả" },
    { id: "pending" as OrderTab, label: "Chờ xác nhận" },
    { id: "shipping" as OrderTab, label: "Đang giao" },
    { id: "delivered" as OrderTab, label: "Đã giao" },
    { id: "cancelled" as OrderTab, label: "Đã hủy" },
  ];

  const initialOrders: OrderItem[] = [
    {
      id: "o1",
      code: "AV2409101",
      price: "225.000đ",
      imageSrc: "https://i.ibb.co/PG3p6wTs/6.png",
      title: 'Áo Thun Unisex - 100% COTTON - “Bánh Mì”',
      details: "Phân loại: Kem / Size L",
      quantity: "x1",
      itemCount: "1 sản phẩm",
      status: "pending",
    },
    {
      id: "o2",
      code: "AV2409102",
      price: "225.000đ",
      imageSrc: "https://i.ibb.co/zhP9w9gz/10.png",
      title: 'Áo Thun Unisex - 100% COTTON - "Nón Lá"',
      details: "Phân loại: Đen Than / Standard",
      quantity: "x1",
      itemCount: "1 sản phẩm",
      status: "pending",
    },
    {
      id: "o3",
      code: "AV2409105",
      price: "225.000đ",
      imageSrc: "https://i.ibb.co/hxBR2WM3/3.png",
      title: 'Áo Thun Unisex - 100% Cotton - “Độc Lập”',
      details: "Phân loại: Đất Sét / Size XL",
      quantity: "x2",
      itemCount: "2 sản phẩm",
      status: "pending",
    },
  ];

  const [orders, setOrders] = useState<OrderItem[]>(initialOrders);

  const handleCancelOrder = (id: string, code: string) => {
    if (window.confirm(`Bạn có chắc chắn muốn hủy đơn hàng #${code}?`)) {
      setOrders((prev) =>
        prev.map((order) => (order.id === id ? { ...order, status: "cancelled" } : order))
      );
      alert(`Đơn hàng #${code} đã được hủy.`);
    }
  };

  const filteredOrders = orders.filter((order) => {
    if (activeTab === "all") return true;
    return order.status === activeTab;
  });

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col font-sans relative antialiased select-none pb-20">
      <GrainTexture />

      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-background border-b border-outline-variant">
        <div className="flex justify-between items-center px-container-padding h-16 w-full max-w-screen-xl mx-auto">
          <button
            onClick={() => alert("Chức năng tìm kiếm đơn hàng...")}
            className="text-primary hover:opacity-80 transition-opacity active:scale-95 w-10 h-10 flex items-center justify-center"
          >
            <span className="material-symbols-outlined">search</span>
          </button>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile tracking-widest text-primary uppercase font-sans font-bold">
            AoVie
          </h1>
          <button
            onClick={() => navigate("/thanh-toan")}
            className="text-primary hover:opacity-80 transition-opacity active:scale-95 w-10 h-10 flex items-center justify-center"
          >
            <span className="material-symbols-outlined">shopping_bag</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-16 pb-20 relative z-10">
        {/* Sticky Order Tabs */}
        <div className="sticky top-16 z-40 bg-surface border-b border-outline-variant overflow-x-auto hide-scrollbar">
          <nav className="flex px-4 space-x-8 min-w-max h-12 items-center">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`font-label-md text-label-md uppercase tracking-wider whitespace-nowrap font-sans h-full flex items-center transition-all ${
                    isActive ? "text-secondary border-b-2 border-secondary font-bold" : "text-on-surface-variant hover:text-secondary"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Order List */}
        <div className="p-4 space-y-4 max-w-2xl mx-auto">
          {filteredOrders.length === 0 ? (
            <div className="pt-20 flex flex-col items-center opacity-30 select-none">
              <span className="material-symbols-outlined text-6xl mb-2">shopping_bag</span>
              <p className="font-label-md text-label-md uppercase font-sans">
                Không có đơn hàng nào
              </p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-surface p-4 border border-outline-variant rounded-none transition-all hover:bg-surface-container-low active:scale-[0.99] duration-150"
              >
                <div className="flex justify-between items-center mb-4 pb-2 border-b border-outline-variant/30">
                  <span className="font-label-md text-label-md text-on-surface-variant font-sans">
                    Mã: #{order.code}
                  </span>
                  <span className="font-label-md text-label-md text-secondary uppercase tracking-tighter font-sans font-bold">
                    {order.price}
                  </span>
                </div>
                <div className="flex gap-4">
                  <div className="w-24 h-32 bg-surface-variant flex-shrink-0 overflow-hidden border border-outline-variant/30">
                    <img
                      alt={order.title}
                      className="w-full h-full object-cover"
                      src={order.imageSrc}
                    />
                  </div>
                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="font-headline-md text-headline-md text-primary leading-tight font-sans text-sm font-bold">
                        {order.title}
                      </h3>
                      <p className="font-body-md text-body-md text-on-surface-variant mt-1 font-sans">
                        {order.details}
                      </p>
                      <p className="font-body-md text-body-md text-on-surface-variant font-sans">
                        Số lượng: {order.quantity}
                      </p>
                    </div>
                    <div className="flex justify-between items-end">
                      <span className="font-label-md text-label-md text-on-surface-variant font-sans">
                        {order.itemCount}
                      </span>
                      <span className="font-headline-md text-headline-md text-secondary font-sans font-bold">
                        {order.price}
                      </span>
                    </div>
                  </div>
                </div>
                {order.status === "pending" && (
                  <div className="mt-4 pt-4 border-t border-outline-variant/30 flex justify-end gap-3">
                    <button
                      onClick={() => navigate("/chi-tiet-don-hang")}
                      className="px-6 py-2 border border-primary text-primary font-label-md text-label-md uppercase hover:bg-primary hover:text-white transition-all font-sans font-semibold"
                    >
                      Chi tiết
                    </button>
                    <button
                      onClick={() => handleCancelOrder(order.id, order.code)}
                      className="px-6 py-2 bg-primary text-white font-label-md text-label-md uppercase hover:opacity-90 transition-opacity font-sans font-semibold"
                    >
                      Hủy đơn
                    </button>
                  </div>
                )}
              </div>
            ))
          )}

          {/* End of list stamp */}
          {filteredOrders.length > 0 && (
            <div className="pt-10 flex flex-col items-center opacity-30 select-none">
              <span className="material-symbols-outlined text-6xl mb-2">shopping_bag</span>
              <p className="font-label-md text-label-md uppercase font-sans">
                Hết danh sách đơn hàng
              </p>
            </div>
          )}
        </div>
      </main>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 w-full z-50 border-t border-outline-variant bg-surface">
        <div className="flex justify-around items-center h-16 px-2 pb-safe w-full">
          <button
            onClick={() => navigate("/trang-chu")}
            className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-colors active:scale-90 w-16"
          >
            <span className="material-symbols-outlined">home</span>
            <span className="font-label-md text-[10px] mt-1 font-sans">Trang chủ</span>
          </button>
          <button
            onClick={() => navigate("/bo-loc")}
            className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-colors active:scale-90 w-16"
          >
            <span className="material-symbols-outlined">grid_view</span>
            <span className="font-label-md text-[10px] mt-1 font-sans">Danh mục</span>
          </button>
          <button
            onClick={() => navigate("/don-hang")}
            className="flex flex-col items-center justify-center text-secondary relative active:scale-90 w-16"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              receipt_long
            </span>
            <span className="font-label-md text-[10px] mt-1 font-sans font-bold">Đơn hàng</span>
            <div className="absolute -bottom-1 w-1 h-1 bg-secondary rounded-full"></div>
          </button>
          <button
            onClick={() => navigate("/thong-bao")}
            className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-colors active:scale-90 w-16"
          >
            <span className="material-symbols-outlined">notifications</span>
            <span className="font-label-md text-[10px] mt-1 font-sans">Thông báo</span>
          </button>
          <button
            onClick={() => navigate("/toi")}
            className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-colors active:scale-90 w-16"
          >
            <span className="material-symbols-outlined">person</span>
            <span className="font-label-md text-[10px] mt-1 font-sans">Tôi</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
