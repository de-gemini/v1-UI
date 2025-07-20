interface LocationGroup {
    title: string;
    cities: string[];
  }

  interface Link {
    href: string;
    text: string;
  }

  const locationData: LocationGroup[] = [
    {
        title: 'A–B',
        cities: ['Alford', 'Barton-upon-Humber', 'Boston', 'Bourne', 'Brigg', 'Broughton']
    },
    {
        title: 'C–G',
        cities: ['Caistor', 'Crowland', 'Gainsborough', 'Grantham', 'Grimsby', 'Horncastle']
    },
    {
        title: 'H–M',
        cities: ['Immingham', 'Louth', 'Mablethorpe', 'Market Deeping', 'Market Rasen', 'North Hykeham']
    },
    {
        title: 'S–W',
        cities: ['Scunthorpe', 'Skegness', 'Sleaford', 'Spalding', 'Stamford', 'Wainfleet All Saints', 'Waltham', 'Winterton', 'Woodhall Spa']
    }
];
