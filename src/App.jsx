import { useState } from "react";
import "./App.css";
import { Route, useHistory, Link, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import { Box, Dialog } from "@mui/material";

// state
/*
  Component State
  - Easiest to use
  - Causes the most bugs--spaghetti code
  - Should always ask yourself if this state belongs higher up

  Global State
  - Single source of truth
  - Access to middleware
  - Network layer aka react-query
  - Can also be spaghettified by having too many contexts
  - State managers like Redux or Zustand are the best choices

  URL state + localstorage + indexedDB
  - when state needs to survive across sessions
  - state needs to be linkable / shareable
*/

// inlining vs outlining
/*
  - should always default to inline (think about a book)
  - best outlining is creating components / hooks / utility functions / configs
  
  When to outline?
  - files get too long
  - something can be shared
*/

// naming conventions

// keys and reconcilation
/*
  - Virtual Dom -> State Change -> Reconcilation -> Virtual Dom
  - The "paint" phase is the most expensive website operation wrt performance
  - Keys allow React to reuse elements
  - Keys are either unique or not (data or index)
*/

// routing - Sept 12
/*
  path = list
  - when there's "nested information"

  searchParams = object
  - when there's page independant data

  achors = single value
  - for linking to headers

  path to regex
  https://v5.reactrouter.com/web/api/Route/path-string-string
  https://github.com/pillarjs/path-to-regexp/tree/v1.7.0#usage

  Ask yourself: are paths static or dynamic?
  - if static hardcode a string
  - if dynamic use params aka :someValue
*/

const HeyModal = ({ setSearch }) => (
  <Box p={10}>
    <p>Hey I'm a modal!</p>
    <Link to="/" onClick={() => setSearch("")}>
      <Button>Close</Button>
    </Link>
  </Box>
);

const Modals = {
  HeyModal,
};

const Modal = (props) => {
  const { modal } = useParams();
  const Component = Modals[modal];
  return (
    <Dialog open={!!Component}>{Component && <Component {...props} />}</Dialog>
  );
};

function App() {
  const [search, setSearch] = useState("");
  // const [open, setOpen] = useState(false);
  const history = useHistory();

  return (
    <>
      <Route path="/:foo">
        {(props) => <pre>{JSON.stringify(props, null, 2)}</pre>}
      </Route>
      {/* <Button onClick={() => setOpen(true)}>Open Modal</Button> */}
      <input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          history.push({ pathname: e.target.value });
        }}
      />
      <Route path="/:modal">
        <Modal setSearch={setSearch} />
      </Route>
    </>
  );
}

export default App;
