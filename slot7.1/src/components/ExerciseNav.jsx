import { NavLink } from 'react-router-dom';

const navLinks = [
  { path: '/exercise-1', label: 'Exercise 1' },
  { path: '/exercise-2', label: 'Exercise 2' },
  { path: '/exercise-3', label: 'Exercise 3' },
  { path: '/exercise-4', label: 'Exercise 4' }
];

const ExerciseNav = () => {
  return (
    <nav className="app-nav">
      <h1>Slot 7 Exercises</h1>
      <ul>
        {navLinks.map((link) => (
          <li key={link.path}>
            <NavLink
              to={link.path}
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default ExerciseNav;
