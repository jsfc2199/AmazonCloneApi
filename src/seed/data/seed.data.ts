import * as bcrypt from 'bcrypt';

interface seedUser {
  identification: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  cellphone: string;
}

interface seedCreditCard {
  creditCardNumber: string;
  creditCardPass: string;
}

interface seedAddresses {
  country: string;
  city: string;
  streetAddress: string;
}

interface seedData {
  users: seedUser[];
  addresses: seedAddresses[];
  creditCards: seedCreditCard[];
}
export const initialData: seedData = {
  users: [
    {
      identification: '123456789',
      name: 'John',
      lastName: 'Doe',
      email: 'johnny.d@gmail.com',
      password: bcrypt.hashSync('password123', 10),
      phone: null,
      cellphone: null,
    },
    {
      identification: '987654321',
      name: 'Jane',
      lastName: 'Smith',
      email: 'j.smithy@hotmail.com',
      password: bcrypt.hashSync('qwerty123', 10),
      phone: null,
      cellphone: '5555555555',
    },
    {
      identification: '654321987',
      name: 'Carlos',
      lastName: 'Lopez',
      email: 'c.lopez@yahoo.com',
      password: bcrypt.hashSync('abc123', 10),
      phone: '5551234567',
      cellphone: null,
    },
    {
      identification: '246813579',
      name: 'Emily',
      lastName: 'Johnson',
      email: 'emily.j@outlook.com',
      password: bcrypt.hashSync('password456', 10),
      phone: '1112223333',
      cellphone: null,
    },
    {
      identification: '135792468',
      name: 'Samantha',
      lastName: 'Brown',
      email: 'sam.b@gmail.com',
      password: bcrypt.hashSync('secure123', 10),
      phone: null,
      cellphone: null,
    },
    {
      identification: '987123456',
      name: 'Michael',
      lastName: 'White',
      email: 'mike.white@yahoo.com',
      password: bcrypt.hashSync('password!', 10),
      phone: null,
      cellphone: '7776665555',
    },
    {
      identification: '654789321',
      name: 'Alicia',
      lastName: 'Gomez',
      email: 'alicia_g@outlook.com',
      password: bcrypt.hashSync('abcABC123', 10),
      phone: '1239876543',
      cellphone: null,
    },
    {
      identification: '123987654',
      name: 'David',
      lastName: 'Martinez',
      email: 'dave.m@gmail.com',
      password: bcrypt.hashSync('securePassword', 10),
      phone: '3335557777',
      cellphone: '8889990000',
    },
    {
      identification: '321654987',
      name: 'Laura',
      lastName: 'Rodriguez',
      email: 'laura.r@yahoo.com',
      password: bcrypt.hashSync('password123!', 10),
      phone: null,
      cellphone: '5556667777',
    },
    {
      identification: '456123789',
      name: 'Kevin',
      lastName: 'Chen',
      email: 'kev.c@hotmail.com',
      password: bcrypt.hashSync('hello123', 10),
      phone: '7779998888',
      cellphone: null,
    },
    {
      identification: '789456123',
      name: 'Sophie',
      lastName: 'Nguyen',
      email: 'sophie.n@outlook.com',
      password: bcrypt.hashSync('abc123ABC', 10),
      phone: null,
      cellphone: '3331114444',
    },
    {
      identification: '159357456',
      name: 'James',
      lastName: 'Kim',
      email: 'j.kim@gmail.com',
      password: bcrypt.hashSync('p@ssw0rd', 10),
      phone: '2224446666',
      cellphone: null,
    },
    {
      identification: '357951357',
      name: 'Olivia',
      lastName: 'Lee',
      email: 'olivia_the_great@hotmail.com',
      password: bcrypt.hashSync('secure!', 10),
      phone: null,
      cellphone: '7772223333',
    },
    {
      identification: '753159852',
      name: 'Ethan',
      lastName: 'Brown',
      email: 'ethan_the_best@yahoo.com',
      password: bcrypt.hashSync('password12345', 10),
      phone: '8887776666',
      cellphone: null,
    },
    {
      identification: '852963741',
      name: 'Isabella',
      lastName: 'Chang',
      email: 'isabella_c@gmail.com',
      password: bcrypt.hashSync('helloWorld', 10),
      phone: null,
      cellphone: '6663339999',
    },
  ],
  addresses: [
    {
      country: 'Italy',
      city: 'Rome',
      streetAddress: '123 Via Appia',
    },
    {
      country: 'Canada',
      city: 'Toronto',
      streetAddress: '456 Yonge Street',
    },
    {
      country: 'Japan',
      city: 'Tokyo',
      streetAddress: '789 Shibuya',
    },
    {
      country: 'Australia',
      city: 'Sydney',
      streetAddress: '101 George Street',
    },
    {
      country: 'France',
      city: 'Paris',
      streetAddress: '234 Rue de Rivoli',
    },
    {
      country: 'Mexico',
      city: 'Mexico City',
      streetAddress: '567 Avenida Reforma',
    },
    {
      country: 'United States',
      city: 'New York',
      streetAddress: '890 Broadway',
    },
    {
      country: 'Brazil',
      city: 'Rio de Janeiro',
      streetAddress: '111 Copacabana Beach',
    },
    {
      country: 'United Kingdom',
      city: 'London',
      streetAddress: '222 Baker Street',
    },
    {
      country: 'Germany',
      city: 'Berlin',
      streetAddress: '333 Friedrichstrabe',
    },
    {
      country: 'Spain',
      city: 'Madrid',
      streetAddress: '444 Gran Vía',
    },
    {
      country: 'China',
      city: 'Beijing',
      streetAddress: '555 Wangfujing Street',
    },
    {
      country: 'South Africa',
      city: 'Cape Town',
      streetAddress: '666 Long Street',
    },
    {
      country: 'Russia',
      city: 'Moscow',
      streetAddress: '777 Red Square',
    },
    {
      country: 'India',
      city: 'Mumbai',
      streetAddress: '888 Marine Drive',
    },
  ],
  creditCards: [
    {
      creditCardNumber: '8437131504',
      creditCardPass: bcrypt.hashSync('557', 10),
    },
    {
      creditCardNumber: '1988571169',
      creditCardPass: bcrypt.hashSync('597', 10),
    },
    {
      creditCardNumber: '2799118720',
      creditCardPass: bcrypt.hashSync('158', 10),
    },
    {
      creditCardNumber: '3865617763',
      creditCardPass: bcrypt.hashSync('502', 10),
    },
    {
      creditCardNumber: '7905390086',
      creditCardPass: bcrypt.hashSync('553', 10),
    },
    {
      creditCardNumber: '2840635786',
      creditCardPass: bcrypt.hashSync('275', 10),
    },
    {
      creditCardNumber: '6033351286',
      creditCardPass: bcrypt.hashSync('714', 10),
    },
    {
      creditCardNumber: '9700609205',
      creditCardPass: bcrypt.hashSync('490', 10),
    },
    {
      creditCardNumber: '0574304581',
      creditCardPass: bcrypt.hashSync('445', 10),
    },
    {
      creditCardNumber: '8817721070',
      creditCardPass: bcrypt.hashSync('534', 10),
    },
    {
      creditCardNumber: '8971678613',
      creditCardPass: bcrypt.hashSync('267', 10),
    },
    {
      creditCardNumber: '2172838438',
      creditCardPass: bcrypt.hashSync('928', 10),
    },
    {
      creditCardNumber: '0469789282',
      creditCardPass: bcrypt.hashSync('979', 10),
    },
    {
      creditCardNumber: '7326294545',
      creditCardPass: bcrypt.hashSync('391', 10),
    },
    {
      creditCardNumber: '2181804024',
      creditCardPass: bcrypt.hashSync('968', 10),
    },
  ],
};
