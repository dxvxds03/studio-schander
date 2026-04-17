export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-layout">
      <style>{`body { cursor: default !important; } * { cursor: auto; }`}</style>
      {children}
    </div>
  )
}
