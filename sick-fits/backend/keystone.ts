import 'dotenv/config';
import { 
  config, 
  createSchema,
} from '@keystone-next/keystone/schema';
import { 
  createAuth,
} from '@keystone-next/auth';
import {
  withItemData,
  statelessSessions,
} from '@keystone-next/keystone/session';
import { User } from './schemas/User';
import { Product } from './schemas/Product';
import { ProductImage } from './schemas/ProductImage';
import { insertSeedData } from './seed-data';

const databaseURL = process.env.DATABASE_URL 
  || 'mongodb://localhost/sick-fits-keystone';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360,
  secret: process.env.COOKIE_SECRET,
};


const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    // TODO: Initial roles
  }
});


export default withAuth(config({
  server: {
    cors: {
      origin: [process.env.FRONTEND_URL],
      credentials: true,
    },
  },
  db: {
    adapter: 'mongoose',
    url: databaseURL,
    async onConnect(keystone) {
      if (process.argv.includes('--seed-data')) {
        await insertSeedData(keystone);
      }
    }
  },
  lists: createSchema({
    // Schema items go in here
    User,
    Product,
    ProductImage,
  }),
  ui: {
    // TODO: Change this for roles
    isAccessAllowed: ({ session }) => {
      // console.log(session);
      return session?.data;
    },
  },
  session: withItemData(
    statelessSessions(sessionConfig),
    {
      User: 'id',
    }
  )
}));
