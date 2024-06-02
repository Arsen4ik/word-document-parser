import { useState } from "react";
import FileInput from "./components/FileInput";
import ParsedData from "./components/ParsedData";

const App = () => {
  const [data, setData] = useState<string[][]>([]);

  return (
    <main>
      <FileInput setData={setData} />
      {!!data.length && <ParsedData data={data} />}
    </main>
  );
}

export default App;