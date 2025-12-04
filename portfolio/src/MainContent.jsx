import './MainContent.css';
import { SECTIONS, getSectionLabel } from './constants';
import About from './About';
import Portfolio from './Portfolio';
import Blog from './Blog';
import Contact from './Contact';

export default function MainContent({ activeSection, onNavigate }) {
    return (
        <>
            <div className="mainContent">
                <h1 className="pageHeader">{getSectionLabel(activeSection)}</h1>
                <div className="content">
                    {activeSection === SECTIONS.ABOUT && (
                        <About onNavigate={onNavigate} />
                    )}
                    {activeSection === SECTIONS.PORTFOLIO && <Portfolio />}
                    {activeSection === SECTIONS.BLOG && <Blog />}
                    {activeSection === SECTIONS.CONTACT && <Contact />}
                </div>
            </div>
        </>
    );
}
