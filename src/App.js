import "./App.css";
import QRCode from "react-qr-code";
import { useState } from "react";
import { toDataURL } from "qrcode";

function App() {
    const [text, setText] = useState("");
    const [qrcode, setQrcode] = useState("");

    const handleChange = async (e) => {
        const inputValue = e.target.value;
        setText(inputValue);

        try {
            const qrCodeDataUrl = await toDataURL(inputValue,{
                width: 300,
                margin: 1.5,
                color: {
                    dark: '#335383ff',
                    light: '#ffffffff'
                }
            });
            setQrcode(qrCodeDataUrl);
        } catch (err) {
            console.error("Error generating QR code:", err);
        }
    };

    return (
        <>
            <div className="App">
                <h1>QR Code Generator</h1>
                <QRCode size={300} value={text || " "} />

                <div className="input-here">
                    <p>Enter your text here:</p>
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => handleChange(e)}
                    />
                </div>

                {qrcode && (
                    <div className="input-here">
                        <img src={qrcode} alt="Generated QR Code" />
                        <p><a href={qrcode} download="qrcode.png">Download</a></p>
                    </div>
                )}
            </div>
        </>
    );
}

export default App;
