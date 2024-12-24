import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'wine_cet4_word' })
export class Word {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255, nullable: true })
    cet4_word: string;

    @Column({ length: 255, nullable: true })
    cet4_phonetic: string;

    @Column({ type: 'text', nullable: true })
    cet4_translate: string;
    
    @Column({ type: 'text', nullable: true })
    cet4_distortion: string;

    @Column({ type: 'text', nullable: true })
    cet4_phrase: string;

    @Column({ type: 'text', nullable: true })
    cet4_samples: string;
}
