import './RocketSpinner.css';

// Spinner from https://codepad.co/snippet/css-moon-rocket-loading-spinner
export default function RocketSpinner() {
    return(
        <div className="moon">
            <img src="https://cdn2.iconfinder.com/data/icons/thesquid-ink-40-free-flat-icon-pack/64/space-rocket-512.png" style={{width: '30px', height: '20px'}} className="loader"/>
            <ul>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>
    );
}