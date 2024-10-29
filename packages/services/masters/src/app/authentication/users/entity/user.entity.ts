import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  
  @PrimaryGeneratedColumn({ name: "id", comment: 'Primary key, auto-generated unique identifier for each user' })
  id!: number; 

  @Column("varchar", { name: "email", unique: true, nullable: false, length: 255, comment: 'Unique email field for user authentication and identification' })
  email!: string;

  @Column("varchar", { name: "password", nullable: false, length: 255, comment: 'Hashed password for user authentication' })
  password!: string; 
}
