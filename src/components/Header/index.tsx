import React from 'react';

import './styles.scss';

function Header() {
  return (
    <header className="m-4 p-4">
      <img
        src="https://icoholder.com/media/cache/ico_logo_view_page/files/img/c3cf7f2813bd51723a9a2f09c970741f.png"
        className="logo"
        alt="logo"
      />
      <h1 className="p-2 fs-4 text-uppercase">Neptune Mutual</h1>
    </header>
  );
}

export default Header;
