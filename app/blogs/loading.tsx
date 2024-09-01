
export default function Loading() {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#f1f5f9]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-[#6b7280]" />
        <div className="mt-8 text-2xl font-bold text-[#374151]">Loading...</div>
        <div className="mt-4 text-[#6b7280]">Loading spicy blogs</div>
      </div>
    )
  }