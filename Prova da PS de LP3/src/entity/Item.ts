import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Produto } from "./Produto";

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantidade: number;

  @Column()
  dataEntradaEstoque: Date;

  @ManyToOne(() => Produto)
  produto: Produto;
}
