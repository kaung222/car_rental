export interface Car {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  image: string;
  seats: number;
  transmission: string;
  fuel: string;
  rating: number;
  reviews: number;
  features: string[];
}

export const cars: Car[] = [
  {
    id: '1',
    name: 'Porsche 911',
    brand: 'Porsche',
    category: 'Sports',
    price: 299000,
    image: 'https://images.unsplash.com/photo-1618480483701-c31ac5590db4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzcG9ydHMlMjBjYXIlMjBzaWRlJTIwdmlld3xlbnwxfHx8fDE3Njk4ODA3NjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    seats: 2,
    transmission: 'Automatic',
    fuel: 'Gasoline',
    rating: 4.9,
    reviews: 127,
    features: ['Premium Sound System', 'Leather Seats', 'GPS Navigation', 'Bluetooth', 'Backup Camera']
  },
  {
    id: '2',
    name: 'Tesla Model S',
    brand: 'Tesla',
    category: 'Sedan',
    price: 189000,
    image: 'https://images.unsplash.com/photo-1768352725354-de7554665056?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzZWRhbiUyMGNhciUyMHdoaXRlfGVufDF8fHx8MTc2OTkxMzQxNnww&ixlib=rb-4.1.0&q=80&w=1080',
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Electric',
    rating: 4.8,
    reviews: 203,
    features: ['Autopilot', 'Premium Interior', 'Long Range Battery', 'Supercharger Access', 'Glass Roof']
  },
  {
    id: '3',
    name: 'Range Rover Sport',
    brand: 'Land Rover',
    category: 'SUV',
    price: 249000,
    image: 'https://images.unsplash.com/photo-1736508835016-f3b85ea09dcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTVVYlMjBjYXIlMjBibGFja3xlbnwxfHx8fDE3Njk4Nzk3Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    seats: 7,
    transmission: 'Automatic',
    fuel: 'Hybrid',
    rating: 4.7,
    reviews: 156,
    features: ['4WD', 'Leather Interior', 'Panoramic Sunroof', 'Advanced Safety', 'Premium Audio']
  },
  {
    id: '4',
    name: 'BMW i4',
    brand: 'BMW',
    category: 'Electric',
    price: 169000,
    image: 'https://images.unsplash.com/photo-1714557632393-64ed972394ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpYyUyMGNhciUyMG1vZGVybnxlbnwxfHx8fDE3Njk4ODMyOTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Electric',
    rating: 4.6,
    reviews: 89,
    features: ['Fast Charging', 'Sport Package', 'Digital Cockpit', 'Heated Seats', 'Wireless Charging']
  },
  {
    id: '5',
    name: 'Mercedes AMG GT',
    brand: 'Mercedes',
    category: 'Convertible',
    price: 329000,
    image: 'https://images.unsplash.com/photo-1627750673335-f898352cd380?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb252ZXJ0aWJsZSUyMGNhciUyMHJlZHxlbnwxfHx8fDE3Njk5NDcxMzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    seats: 2,
    transmission: 'Automatic',
    fuel: 'Gasoline',
    rating: 4.9,
    reviews: 92,
    features: ['AMG Performance', 'Sport Exhaust', 'Convertible Top', 'Carbon Fiber', 'Track Mode']
  },
  {
    id: '6',
    name: 'Mini Cooper',
    brand: 'Mini',
    category: 'Compact',
    price: 79000,
    image: 'https://images.unsplash.com/photo-1701314860844-cd2152fa9071?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wYWN0JTIwY2FyJTIwY2l0eXxlbnwxfHx8fDE3Njk4NTA1NzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    seats: 4,
    transmission: 'Manual',
    fuel: 'Gasoline',
    rating: 4.5,
    reviews: 145,
    features: ['Compact Design', 'Fuel Efficient', 'Easy Parking', 'City Mode', 'Bluetooth']
  }
];

export const categories = ['All', 'Sports', 'Sedan', 'SUV', 'Electric', 'Convertible', 'Compact'];
