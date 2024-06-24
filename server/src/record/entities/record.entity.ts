import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('records')
@ObjectType()
export class Record {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'Example field (placeholder)' })
  id: number;

  @Column()
  @Field({ description: 'Example field (placeholder)' })
  name: string;

  @Column()
  @Field({ nullable: true, description: 'Example field (placeholder)' })
  title: string;

  @Column()
  @Field({ nullable: true, description: 'Example field (placeholder)' })
  note: string;

  @Column()
  @Field(() => Int, { description: 'Example field (placeholder)' })
  age: number;

  @CreateDateColumn()
  @Field()
  created_at: Date;

  @UpdateDateColumn()
  @Field({ nullable: true })
  updated_at: Date;
}
