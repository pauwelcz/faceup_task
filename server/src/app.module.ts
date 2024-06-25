import { Module } from '@nestjs/common';
import { RecordModule } from './record/record.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_SQL_HOST || 'localhost',
      port: parseInt(process.env.MYSQL_SQL_PORT) || 3306,
      username: process.env.MYSQL_ROOT_PASSWORD || 'root',
      password: process.env.MYSQL_ROOT_PASSWORD || 'root',
      database: process.env.MYSQL_DATABASE || 'faceup',
      entities: ['dist/**/*.entity.js'],
      synchronize: false,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
    }),
    RecordModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
