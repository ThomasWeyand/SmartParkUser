export type InfoExtra = {
    title: string;
    description: string;
};

export class InfoExtraPicker {
    private static baseList: InfoExtra[] = [
        { title: "Stadium Master Park", description: "Perfeito para treinadores que estão sempre em busca de novos desafios. Com vagas cobertas e seguras, é ideal para quem precisa de praticidade e rapidez antes de uma batalha importante. Oferece fácil acesso à Arena Master e à Liga Pokémon, com áreas reservadas para bicicletas e PokéTransportes." },
        { title: "Park Charizard", description: "Este estacionamento é perfeito para treinadores destemidos que não se intimidam com o calor da batalha. Com amplas vagas para veículos de todos os tamanhos, é ideal para quem busca praticidade e agilidade para explorar regiões vulcânicas e terrenos desafiadores. Perfeito para quem tem espírito de fogo!" },
        { title: "Park Shaolin", description: "Inspirado na disciplina e força dos tipos Lutador e Psíquico, oferece vagas espaçosas e tranquilas, cercadas por trilhas meditativas e fontes de água cristalina. Ideal para quem valoriza a paz interior e a maestria em batalha." },
        { title: "Water Park Squirtle", description: "Com vagas para veículos aquáticos, é ideal para quem explora as rotas marítimas e as praias cristalinas da região. Popular entre fãs de batalhas aquáticas e nadadores de longa distância." },
        { title: "Park Psíquico", description: "Cercado por cristais energéticos e símbolos ancestrais, oferece vagas amplas e seguras, perfeitas para aqueles que confiam no poder da mente. Ideal para quem valoriza estratégia, precisão e uma visão além do alcance." },
        { title: "Pikachu Parking", description: "Pika Pika! Pika chu chu, Pikachu! Pika pika, chu chu! Pikachu pika, pika chu! Pikaaa, chu chu, pika pika!" },
        { title: "Rocket Park", description: "Com segurança reforçada e acesso exclusivo a túneis ocultos, é perfeito para quem não teme desafios e sabe que a vitória muitas vezes exige riscos." },
        { title: "Flavin do Pneu", description: "Conhecido por seu atendimento descontraído e espírito de aventura, esse estacionamento é o ponto de encontro dos treinadores mais experientes." },
    ];

    private available: InfoExtra[] = [];

    private shuffle(array: InfoExtra[]): InfoExtra[] {
        const copy = [...array];
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    }

    public pick(): InfoExtra {
        if (this.available.length === 0) {
            this.available = this.shuffle(InfoExtraPicker.baseList);
        }
        return this.available.pop()!;
    }
}
