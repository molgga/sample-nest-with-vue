import { IsEmail, IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsNotEmpty()
  @IsEmail() // options?
  userId: string;

  @Column()
  userName: string;

  @Column({ default: true })
  isActive: boolean;
}
