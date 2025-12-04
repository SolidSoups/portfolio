import MainContent from './MainContent';
import Sidebar from './Sidebar';
import { useState } from 'react';
import { SECTIONS } from './constants';
import './style.css';
import './App.css';

export default function App() {
    const [activeSection, setActiveSection] = useState(SECTIONS.ABOUT);

    function onNavigate(newSection) {
        console.log('New Section: ' + newSection);

        setActiveSection(newSection);
    }

    return (
        <>
            <div className="grid-container">
                <div className="column-1">
                    <Sidebar
                        activeSection={activeSection}
                        onNavigate={onNavigate}
                    />
                </div>
                <div className="column-2">
                    <MainContent
                        activeSection={activeSection}
                        onNavigate={onNavigate}
                    />
                </div>
            </div>
        </>
    );
}
