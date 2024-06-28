import { Module } from '@nestjs/common';
import { RecordModule } from './record/record.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
      context: ({ req, res }) => ({ req, res }),
      upload: false,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_SQL_HOST || 'localhost',
      port: parseInt(process.env.MYSQL_SQL_PORT) || 3306,
      username: process.env.MYSQL_ROOT_PASSWORD || 'root',
      password: process.env.MYSQL_ROOT_PASSWORD || 'root',
      database: process.env.MYSQL_DATABASE || 'faceup',
      entities: ['dist/**/*.entity.js'],
      synchronize: false,
      timezone: 'Z',
    }),
    RecordModule,
    FileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
function ApolloServerPluginLandingPageLocalDefault(): any {
  throw new Error('Function not implemented.');
}

