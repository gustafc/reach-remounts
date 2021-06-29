import "./App.css";

import React, { useState, useEffect } from "react";
import { Router, Link } from "@reach/router";

function pad(s, n) {
  return (s + ' '.repeat(n)).substring(0, n);
}

function ComponentWithInternalState(){
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count => count + 1)}>{count}</button>
}

function ExampleRoute({ path, uri, log }){
  useEffect(() => {
    const data = "path=" + pad(path, 10) + " uri=" + uri;
    log("Mounting:   " + data);
    return () => log("Unmounting: " + data);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return <div><ComponentWithInternalState /> We are on <code>{uri}</code> (<code>{path}</code>)</div>;
}

function AnotherRoute({ log }){
  useEffect(() => {
    log("Mounting:   Other component");
    return () => log("Unmounting: Other component");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return <div><ComponentWithInternalState /> This is another route component altogether.</div>;
}

function App() {
  const [log, updateLog] = useState([]);
  const addEntry = e => updateLog(log => [...log, e]);
  return <div>
    <nav>
      <Link to="/">Index</Link>{" "}
      <Link to="/foo">Foo</Link>{" "}
      <Link to="/bar">Bar</Link>{" "}
      <Link to="/id/123">123</Link>{" "}
      <Link to="/id/456">456</Link>{" "}
      <Link to="/other">Other component</Link>{" "}
    </nav>
    <Router>
      <ExampleRoute path="/"       log={addEntry} />
      <ExampleRoute path="/foo"    log={addEntry} />
      <ExampleRoute path="/bar"    log={addEntry} />
      <ExampleRoute path="/id/:id" log={addEntry} />
      <AnotherRoute path="/other" log={addEntry} />
    </Router>
    <h1>Log</h1>
    <pre>
      {log.join("\n")}
    </pre>
  </div>;
}

export default App;
