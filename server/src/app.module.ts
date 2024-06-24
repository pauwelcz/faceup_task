import { Module } from '@nestjs/common';
import { RecordModule } from './record/record.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
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
