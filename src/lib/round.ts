import { Skills } from "../App";

export type RoundStats = Skills & { initialHp: number };

export type Round = {
  pokemon1Skills: RoundStats;
  pokemon2Skills: RoundStats;
  attacker: string;
};

export function getRounds(
  pokemon1Skills: Skills,
  pokemon2Skills: Skills,
  pokemon1Name: string,
  pokemon2Name: string
): Round[] {
  let rounds = [];

  function calculateFormulaHp(
    attack: number,
    defense: number,
    hp: number
  ): number {
    return Math.floor(hp - (attack / defense) * 25 * Math.random());
  }

  if (pokemon1Skills?.speed >= pokemon2Skills?.speed) {
    rounds.push({
      attacker: pokemon1Name,
      pokemon1Skills: {
        ...pokemon1Skills,
        initialHp: pokemon1Skills?.hp,
      },
      pokemon2Skills: {
        ...pokemon2Skills,
        hp: calculateFormulaHp(
          pokemon1Skills?.attack,
          pokemon2Skills?.defense,
          pokemon2Skills?.hp
        ),
        initialHp: pokemon2Skills?.hp,
      },
    });
  } else {
    rounds.push({
      attacker: pokemon2Name,
      pokemon1Skills: {
        ...pokemon1Skills,
        hp: calculateFormulaHp(
          pokemon2Skills?.attack,
          pokemon1Skills?.defense,
          pokemon1Skills?.hp
        ),
        initialHp: pokemon1Skills?.hp,
      },
      pokemon2Skills: {
        ...pokemon2Skills,
        initialHp: pokemon2Skills?.hp,
      },
    });
  }

  let latestRound;

  while (
    rounds[rounds.length - 1]?.pokemon1Skills.hp > 0 &&
    rounds[rounds.length - 1]?.pokemon2Skills.hp > 0
  ) {
    latestRound = rounds[rounds.length - 1];
    if (latestRound.attacker === pokemon1Name) {
      rounds.push({
        attacker: pokemon2Name,

        pokemon1Skills: {
          ...latestRound.pokemon1Skills,
          hp: calculateFormulaHp(
            latestRound.pokemon2Skills.attack,
            latestRound.pokemon1Skills.defense,
            latestRound.pokemon1Skills.hp
          ),
          initialHp: latestRound.pokemon1Skills?.hp,
        },
        pokemon2Skills: {
          ...latestRound.pokemon2Skills,
          initialHp: latestRound.pokemon2Skills?.hp,
        },
      });
    } else {
      rounds.push({
        attacker: pokemon1Name,
        pokemon1Skills: {
          ...latestRound.pokemon1Skills,
          initialHp: latestRound.pokemon1Skills?.hp,
        },
        pokemon2Skills: {
          ...latestRound.pokemon2Skills,
          hp: calculateFormulaHp(
            latestRound.pokemon1Skills.attack,
            latestRound.pokemon2Skills.defense,
            latestRound.pokemon2Skills.hp
          ),
          initialHp: latestRound.pokemon2Skills?.hp,
        },
      });
    }
  }
  if (rounds[rounds.length - 1]?.pokemon1Skills.hp < 0) {
    rounds[rounds.length - 1].pokemon1Skills.hp = 0;
  } else if (rounds[rounds.length - 1]?.pokemon2Skills.hp < 0) {
    rounds[rounds.length - 1].pokemon2Skills.hp = 0;
  }
  return rounds;
}
