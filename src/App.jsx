function App() {
  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <h1 className="font-bold text-2xl">
          <span className="text-3xl mr-2">👨‍💻</span>
          DevTinder
        </h1>
      </div>
      <div className="flex gap-2">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
