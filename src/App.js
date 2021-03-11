import LandscapeScreenView from './Components/UI/LandscapeScreenView';
import Layout from './Containers/Layout/Layout';

import { useState } from 'react';
import { useWindowSize } from './Hooks/useWindowSize/useWindowSize';
function App() {
  const [orientation, setOrientation] = useState('');
  const [width] = useWindowSize();

  window.addEventListener('orientationchange', function (event) {
    setOrientation(event.target.screen.orientation.type.split('-')[0]);
  });
  return width > 900 ? (
    <div>
      <Layout />
    </div>
  ) : (
    <div>
      {orientation === 'landscape' ? <LandscapeScreenView /> : <Layout />}
    </div>
  );
}

export default App;
