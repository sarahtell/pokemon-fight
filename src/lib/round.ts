import { Skills } from "../components/PokemonPresentation";

export type Round = {
    pokemon1Skills: Skills;
    pokemon2Skills: Skills;
    attacker: string;
}

export function getRounds(
    pokemon1Skills: Skills,
    pokemon2Skills: Skills,
    pokemon1Name: string,
    pokemon2Name: string
): Round[] {
    let rounds = [];

    if (pokemon1Skills?.speed >= pokemon2Skills?.speed) {
        rounds.push({
            attacker: pokemon1Name,
            pokemon1Skills: pokemon1Skills,
            pokemon2Skills: {
                ...pokemon2Skills,
                hp: pokemon2Skills?.hp - pokemon1Skills?.attack,
            },
        });
    } else {
        rounds.push({
            attacker: pokemon2Name,
            pokemon1Skills: {
                ...pokemon1Skills,
                hp: pokemon1Skills?.hp - pokemon2Skills?.attack,
            },
            pokemon2Skills: pokemon2Skills,
        });
    }

    let latestRound

    while (
        rounds[rounds.length - 1]?.pokemon1Skills.hp > 0 &&
        rounds[rounds.length - 1]?.pokemon2Skills.hp > 0
    ) {
        latestRound = rounds[rounds.length - 1]
        if (latestRound.attacker === pokemon1Name) {
            rounds.push({
                attacker: pokemon2Name,

                pokemon1Skills: {
                    ...latestRound.pokemon1Skills,
                    hp: latestRound.pokemon1Skills.hp - latestRound.pokemon2Skills.attack,
                },
                pokemon2Skills: latestRound.pokemon2Skills,
            });
        } else {
            rounds.push({
                attacker: pokemon1Name,
                pokemon1Skills: latestRound.pokemon1Skills,
                pokemon2Skills: {
                    ...latestRound.pokemon2Skills,
                    hp: latestRound.pokemon2Skills.hp - latestRound.pokemon1Skills.attack,
                },
            });
        }
        if (rounds.length > 5) {
            return rounds;
        }
    }

    return rounds;
}