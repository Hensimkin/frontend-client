import Navbar from './Navbar.js'; // import the Navbar component

function ValidMAil() {
  return (
      <div className="App">

          <header className="header">
              <Navbar />
          </header>
          <main className="main_header">

              <h1>Verification link sent to your mail please verify before sign in</h1>

          </main>

      </div>
  );
}

export default ValidMAil;
