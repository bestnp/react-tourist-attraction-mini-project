import "./App.css";
import { useState } from "react";
import SearchBar from "./components/SearchBar";
import TravelCardList from "./components/TravelCardList";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleAddTag = (tag) => {
    const current = searchTerm.trim();
    const tokens = current ? current.split(/\s+/) : [];
    if (!tokens.includes(tag)) {
      const next = [...tokens, tag].join(" ");
      setSearchTerm(next);
    }
  };

  return (
    <div className="App">
      <header className="header-section">
        <div className="header-content">
          <h1>เที่ยวไหนดี</h1>
          <p className="header-subtitle">ค้นพบสถานที่ท่องเที่ยวที่น่าสนใจ พร้อมข้อมูลครบถ้วนและคำแนะนำจากผู้เชี่ยวชาญ</p>
          <div className="header-decoration">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </header>
      
      <main className="main-content">
        <SearchBar value={searchTerm} onSearch={handleSearch} />
        <TravelCardList searchTerm={searchTerm} onAddTag={handleAddTag} />
      </main>
    </div>
  );
}

export default App;
