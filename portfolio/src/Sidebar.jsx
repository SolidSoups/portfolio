import './Sidebar.css';
import { SECTIONS_LIST } from './constants';

export default function Sidebar({ activeSection, onNavigate }) {
    return (
        <div className="sidebar">
            <h1 className="header">
                ELIAS
                <br />
                BROWN
            </h1>
            <nav>
                <ul className="bullets">
                    {SECTIONS_LIST.map((section) => (
                        <li key={section.id}>
                            <a
                                href={`#${section.id}`}
                                className={
                                    activeSection == section.id ? 'active' : ''
                                }
                                onClick={(e) => {
                                    e.preventDefault();
                                    onNavigate(section.id);
                                }}
                            >
                                {section.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}
