import { useState } from 'react';
import Head from 'next/head';

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }

  const onUserChangedText = (event) => {
    console.log(event.target.value);
    setUserInput(event.target.value);
  };
  return (
    <div className="root">
      <Head>
        <title>Smart Contracts Audit GPT-3</title>
      </Head>
      <div className="container">
        <div className="header">
        <div className="header-subtitle">
           <h1>By DIPASS.IO</h1>
          </div>
          <div className="header-title">
            <h1>Solidity Smart Contracts Audits</h1>
          </div>
          <div className="header-subtitle">
            <h2>powered by GPT-3</h2>
          </div>
        </div>
      </div>
      <div className="prompt-container">
        <div style={{ color: "#FFF" }}>Paste your solidity code below and our AI tool will give you</div>
        <div style={{ color: "#FFF" }}>the list of vulnerabilities & consequences.</div>
        <div style={{ color: "#FFF" }}> <h1>Note:</h1></div>
        <div style={{ color: "#FFF" }}>🪲 Generate a few times to make sure you find all the bugs 🪲 </div>
        <div style={{ color: "#FFF" }}><h1>Disclaimer:</h1></div>
        <div style={{ color: "#FFF" }}>💀 This tool is in beta and should not be a source of actual auditing. Use at own risk 💀</div>
        <textarea
          placeholder="start typing here"
          className="prompt-box"
          value={userInput}
          onChange={onUserChangedText}
        />
        <div className="prompt-buttons">
          <a
            className={isGenerating ? 'generate-button loading' : 'generate-button'}
            onClick={callGenerateEndpoint}
          >
            <div className="generate">
              {isGenerating ? <span class="loader"></span> : <p>Audit</p>}
            </div>
          </a>
        </div>
        {apiOutput && (
          <div className="output">
            <div className="output-header-container">
              <div className="output-header">
                <h3>Output</h3>
              </div>
            </div>
            <div className="output-content" style={{ backgroundColor: "#BADA55", padding: "10px", marginBottom: "40px" }}>
              {apiOutput}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

