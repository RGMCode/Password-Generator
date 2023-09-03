import { useState } from 'react';
import '../App.css';

export default function PassowrdGenerator() {
    const [minLength, setMinLength] = useState(8);
    const [maxLength, setMaxLength] = useState(16);
    const [includeUppercase, setIncludeUppercase] = useState(true);
    const [includeLowercase, setIncludeLowercase] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(true);
    const [generatedPassword, setGeneratedPassword] = useState("");

    const generatePassword = () => {
        const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
        const numberChars = '0123456789';
        const symbolChars = '!@#$%&*-_=+<>';

        let mandatoryCharacters = '';
        let optionalCharacters = '';

        if (includeUppercase) mandatoryCharacters += upperCaseChars[Math.floor(Math.random() * upperCaseChars.length)];
        if (includeLowercase) mandatoryCharacters += lowerCaseChars[Math.floor(Math.random() * lowerCaseChars.length)];
        if (includeNumbers) mandatoryCharacters += numberChars[Math.floor(Math.random() * numberChars.length)];
        if (includeSymbols) mandatoryCharacters += symbolChars[Math.floor(Math.random() * symbolChars.length)];

        optionalCharacters = upperCaseChars.repeat(includeUppercase ? 1 : 0) +
            lowerCaseChars.repeat(includeLowercase ? 1 : 0) +
            numberChars.repeat(includeNumbers ? 1 : 0) +
            symbolChars.repeat(includeSymbols ? 1 : 0);

        if (optionalCharacters.length === 0 || maxLength < minLength || minLength < 8 || mandatoryCharacters.length > maxLength) {
            alert("Invalid settings");
            return;
        }

        let password = mandatoryCharacters;
        const remainingLength = Math.floor(Math.random() * (maxLength - mandatoryCharacters.length - minLength + 1) + minLength) - mandatoryCharacters.length;

        for (let i = 0; i < remainingLength; i++) {
            const randomIndex = Math.floor(Math.random() * optionalCharacters.length);
            password += optionalCharacters[randomIndex];
        }

        password = password.split('').sort(() => 0.5 - Math.random()).join('');

        setGeneratedPassword(password);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedPassword);
        alert("The generated password was copied");
    };

    return (
        <>
            <div className="password-generator">
                <div>
                    <h1>Password Generator</h1>
                    <div>
                        <input type="checkbox" checked={includeUppercase} onChange={() => setIncludeUppercase(!includeUppercase)} />
                        Include Uppercase
                    </div>
                    <div>
                        <input type="checkbox" checked={includeLowercase} onChange={() => setIncludeLowercase(!includeLowercase)} />
                        Include Lowercase
                    </div>
                    <div>
                        <input type="checkbox" checked={includeNumbers} onChange={() => setIncludeNumbers(!includeNumbers)} />
                        Include Numbers
                    </div>
                    <div>
                        <input type="checkbox" checked={includeSymbols} onChange={() => setIncludeSymbols(!includeSymbols)} />
                        Include Symbols
                    </div>
                    <div>
                        Min Length:
                        <input type="number" value={minLength} onChange={(e) => setMinLength(parseInt(e.target.value))} min="8" />
                    </div>
                    <div>
                        Max Length:
                        <input type="number" value={maxLength} onChange={(e) => setMaxLength(parseInt(e.target.value))} min={minLength} />
                    </div>
                    <button onClick={generatePassword}>Generate Password</button>
                    <br/>
                    <div>
                        <h1>{generatedPassword}</h1>
                        {generatedPassword && <button onClick={copyToClipboard}>Copy password</button>}
                    </div>
                </div>
            </div>
        </>
    );
}
