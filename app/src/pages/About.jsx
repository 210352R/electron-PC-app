import React, { useEffect, useState } from 'react';

const About = () => {
  const [homeDir, setHomeDir] = useState('');
  const [osVersion, setOsVersion] = useState('');

  // Use useEffect to fetch the data when the component mounts
  useEffect(() => {
    // Fetch the home directory from the Electron preload script
    const fetchedHomeDir = window.electron.homeDir();
    const fetchedOsVersion = window.electron.osVersion();

    // Set the state with the fetched data
    setHomeDir(fetchedHomeDir);
    setOsVersion(fetchedOsVersion);
  }, []);

  return (
    <div>
      <h1>About Page</h1>
      <p>Home Directory: {homeDir}</p>
      <p>OS Version: {osVersion}</p>
    </div>
  );
};

export default About;
