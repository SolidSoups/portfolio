import './About.css';
import { SECTIONS } from './constants';

export default function About({ onNavigate }) {
    return (
        <div className="profile-container">
            <div>
                <p>
                    My name is <b>Elias Brown</b>. I am a 22 year old software
                    engineer based in Malmö, Sweden.
                </p>
                <p>
                    Currently studying <b>Game Engine & Tools Programming</b> at{' '}
                    <a
                        href="https://futuregames.se/se/locations/malmo/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        FutureGames Malmö
                    </a>
                    .
                </p>
            </div>
            <img
                src="/images/profile.JPG"
                alt="Elias Brown profile picture"
                className="profile-pic"
            />
        </div>
    );
}
