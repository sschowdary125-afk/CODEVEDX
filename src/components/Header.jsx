function Header({ darkMode, onToggleTheme }) {
  return (
    <header className="header">
      <div>
        <h1>My Tasks</h1>
        <p>Stay organized. Get things done.</p>
      </div>

      <button
        className="theme-button"
        onClick={onToggleTheme}
        aria-label="Toggle theme"
      >
        {darkMode ? "☀" : "☾"}
      </button>
    </header>
  );
}

export default Header;