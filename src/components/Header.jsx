import { Link } from "react-router-dom";
const Header = () => {
  return (
    <>
      <header className="nav-container">
        <h1>Traffic Lights</h1>
      </header>
      <nav className="navbar">
        <Link to="/">Головна</Link>
        <Link to="/vertical">Вертикальний світлофор</Link>
        <Link to="/horizontal">Горизонтальний світлофор</Link>
      </nav>
    </>
  );
};

export default Header;
