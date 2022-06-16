import { round } from "lodash";
import { Skills } from "../components/PokemonPresentation";

export type RoundStats = Skills & {initialHp: number};

export type Round = {
    pokemon1Skills: RoundStats;
    pokemon2Skills: RoundStats;
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
            pokemon1Skills: {
                ...pokemon1Skills,
                initialHp: pokemon1Skills?.hp
            },
            pokemon2Skills: {
                ...pokemon2Skills,
                hp: pokemon2Skills?.hp - pokemon1Skills?.attack,
                initialHp: pokemon2Skills?.hp
            },
        });
    } else {
        rounds.push({
            attacker: pokemon2Name,
            pokemon1Skills: {
                ...pokemon1Skills,
                hp: pokemon1Skills?.hp - pokemon2Skills?.attack,
                initialHp: pokemon1Skills?.hp
            },
            pokemon2Skills: {
                ...pokemon2Skills,
                initialHp: pokemon2Skills?.hp
            },
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
                    initialHp: latestRound.pokemon1Skills?.hp
                },
                pokemon2Skills: {
                    ...latestRound.pokemon2Skills,
                    initialHp: latestRound.pokemon2Skills?.hp
            },
            });
        } else {
            rounds.push({
                attacker: pokemon1Name,
                pokemon1Skills: {
                    ...latestRound.pokemon1Skills,
                    initialHp: latestRound.pokemon1Skills?.hp
            },
                pokemon2Skills: {
                    ...latestRound.pokemon2Skills,
                    hp: latestRound.pokemon2Skills.hp - latestRound.pokemon1Skills.attack,
                    initialHp: latestRound.pokemon2Skills?.hp
                },
            });
        }
    }
    if (rounds[rounds.length - 1]?.pokemon1Skills.hp < 0) {
        rounds[rounds.length - 1].pokemon1Skills.hp = 0
    } else if (rounds[rounds.length - 1]?.pokemon2Skills.hp < 0) {
        rounds[rounds.length - 1].pokemon2Skills.hp = 0
    }
    return rounds;
}