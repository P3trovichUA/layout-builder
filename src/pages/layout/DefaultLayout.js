import React from 'react';

import HTML from './HtmlFrame';
import PageHeader from '../components/PageHeader';

export default ({title, children}) => (
  <HTML title={title}>
  <div className="container">
    <PageHeader/>
  </div>
  <div className="container">
    <hr/>
    {children}
  </div>
  </HTML>
);
