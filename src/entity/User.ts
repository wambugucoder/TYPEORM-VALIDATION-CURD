
import { Length, IsEmail, Min, IsNotEmpty, Max, MinLength, MaxLength } from 'class-validator';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("user_table", { synchronize:true})
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:"varchar",nullable:false})
    @Length(5, 20, { message: "Length must be 5-20" })
    @IsNotEmpty({ message: "Name Field is required" })
    name: string;

    @Column({ nullable: false, type: "varchar" })
    @IsEmail({}, { message: "Invalid Email" })
    @IsNotEmpty({ message: "Email Field is required" })
    email: string;

    @Column({type:"varchar",nullable:false})
    @MinLength(5, { message: "minimum 5 characters" })
    @MaxLength(100, { message: "max 100 characters" })
    @IsNotEmpty({ message: "Password Field is required" })
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}