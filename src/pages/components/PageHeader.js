import React from 'react';

const navItems = [
  {
    text: 'Головна',
    link: '/',
  },
  {
    text: 'Інша сторінка',
    link: '/other-page.html',
  },
];

export default () => (
  <header>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">Logo</a>
      <button className="navbar-toggler"
              type="button" data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"/>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          {navItems.map(item => (
            <li className="nav-item">
              <a className="nav-link" href={item.link}>{item.text}</a>
            </li>
          ))}
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <input className="form-control mr-sm-2" type="search" placeholder="Введіть ваш запит" aria-label="Введіть ваш запит"/>
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Пошук</button>
        </form>
      </div>
    </nav>
  </header>
);
