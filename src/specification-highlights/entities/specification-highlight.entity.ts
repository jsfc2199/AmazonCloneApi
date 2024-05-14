import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SpecificationHighlight {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({
    type: 'text',
    nullable: false,
    unique: false,
  })
  feature: string;

  @Column({
    type: 'text',
    nullable: true,
    unique: false,
  })
  featureDescription?: string;

  @Column({
    type: 'text',
    nullable: false,
    unique: false,
  })
  featureDisplayName: string;

  @Column({
    type: 'text',
    nullable: false,
    unique: false,
  })
  assembledSpecs: string;

  @Column({
    type: 'text',
    nullable: true,
    unique: false,
  })
  assembledDescription?: string;

  @Column({
    type: 'text',
    nullable: false,
    unique: false,
  })
  assembledDisplayName: string;
}
