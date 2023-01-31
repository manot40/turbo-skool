import { DataSource } from 'typeorm';

// Entities
import User from './User';
import Password from './Password';

const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  logging: false,
  username: 'root',
  password: '',
  database: 'skool',
  migrations: [],
  subscribers: [],
  synchronize: true,
  entities: [User, Password],
});

export default AppDataSource;
