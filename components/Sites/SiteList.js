import React from 'react';
import Site from './Site';

const SitesList = ({sites}) => {

  return (

    <section>
      {sites.map(site =>
        <Site key={site.id} site={site}/>
      )};
    </section>

  );

};


export default SitesList;
