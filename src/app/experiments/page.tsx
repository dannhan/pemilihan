"use client"

const handleSubmit = (e) => {
  e.preventDefault();
  const file = e.target[0]?.files[0];
  console.log({ file });
};

export default function App() {
  return (
    <div className="App">
      <form className="form" onSubmit={handleSubmit}>
        <input type="file" />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}
