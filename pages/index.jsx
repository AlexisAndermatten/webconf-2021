const { Button } = require('~/components/common/Button');

const Home = () => (
  <main
    style={{
      background: '#272D5B linear-gradient(135deg, #272D5B 20%, #4E0528)',
      height: '100%',
      width: '100%',
      display: 'grid',
      placeItems: 'center',
    }}
  >
    <div
      style={{
        background: '#fff',
        borderRadius: '50%',
        display: 'grid',
        placeItems: 'center',
        width: '320px',
        height: '320px',
        padding: '10px',
      }}
    >
      <img
        src="/images/desktop-logo.svg"
        alt="WebConf LATAM 2021"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
    <Button
      onClick={() => {
        window.location = '/cfp';
      }}
    >
      Postulá tu charla
    </Button>
  </main>
);

export default Home;
