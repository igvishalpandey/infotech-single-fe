import CategoryTree from "@components/category/CategoryTree";

export default function CategoryLayout({ categories, children }) {
  return (
    <div className="max-w-screen-2xl mx-auto px-3 sm:px-10 py-10 flex gap-6">
      <aside className="w-64 border-r border-leather-border pr-4 sticky top-24 h-screen overflow-y-auto">
        <CategoryTree categories={categories} />
      </aside>

      <main className="flex-1">{children}</main>
    </div>
  );
}
